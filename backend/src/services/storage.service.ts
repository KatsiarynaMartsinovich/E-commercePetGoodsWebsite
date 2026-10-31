import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { supabase, SUPABASE_BUCKET } from '../lib/supabase.js';

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];

export class StorageService {
  static async uploadImage(buffer: Buffer, originalName: string, mimetype: string) {
    if (!ALLOWED_MIME.includes(mimetype)) {
      throw new Error(`Unsupported file type: ${mimetype}`);
    }

    const ext = path.extname(originalName) || '.jpg';
    const objectKey = `products/${randomUUID()}${ext}`;

    const { error } = await supabase.storage
      .from(SUPABASE_BUCKET)
      .upload(objectKey, buffer, {
        contentType: mimetype,
        upsert: false,
      });

    if (error) throw new Error(`Supabase upload failed: ${error.message}`);

    const { data } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(objectKey);
    return data.publicUrl;
  }
}