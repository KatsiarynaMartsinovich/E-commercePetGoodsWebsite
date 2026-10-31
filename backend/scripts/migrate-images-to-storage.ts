import 'dotenv/config';
import { createHash } from 'node:crypto';
import { prisma } from '../src/lib/prisma.js';
import { supabase, SUPABASE_BUCKET } from '../src/lib/supabase.js';

const SOURCE_HOST = 'images.unsplash.com';
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];

// Одну и ту же картинку (она повторяется у разных товаров) качаем и грузим один раз
const uploaded = new Map<string, string>();

async function moveImage(url: string): Promise<string> {
  if (!url.includes(SOURCE_HOST)) return url;

  const done = uploaded.get(url);
  if (done) return done;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const contentType = (res.headers.get('content-type') ?? 'image/jpeg').split(';')[0];
  if (!ALLOWED.includes(contentType)) throw new Error(`Unsupported type ${contentType}`);

  const buffer = Buffer.from(await res.arrayBuffer());
  const ext = contentType === 'image/png' ? 'png' : contentType === 'image/webp' ? 'webp' : 'jpg';
  const key = `products/${createHash('sha1').update(url).digest('hex').slice(0, 16)}.${ext}`;

  const { error } = await supabase.storage
    .from(SUPABASE_BUCKET)
    .upload(key, buffer, { contentType, upsert: true });
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(key);
  uploaded.set(url, data.publicUrl);
  return data.publicUrl;
}

async function main() {
  const products = await prisma.product.findMany();
  let updated = 0;
  let failed = 0;

  for (const product of products) {
    const newImages: string[] = [];

    for (const url of product.images) {
      try {
        newImages.push(await moveImage(url));
      } catch (err: any) {
        failed++;
        console.warn(`⚠️  ${product.title}: не удалось перенести ${url} (${err.message})`);
        newImages.push(url); // оставляем старую ссылку
      }
    }

    if (newImages.some((img, i) => img !== product.images[i])) {
      await prisma.product.update({ where: { id: product.id }, data: { images: newImages } });
      updated++;
      console.log(`✅ ${product.title}`);
    }
  }

  console.log(`\nГотово. Товаров обновлено: ${updated}, ошибок: ${failed}`);
}

main()
  .catch((e) => {
    console.error('❌', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());