import {
  MAX_FILE_SIZE_MB,
  MAX_UPLOAD_FILES,
  MIN_IMAGES,
} from "../constants/admin";

export const productToForm = (product) => ({
  title: product?.title ?? "",
  description: product?.description ?? "",
  price: product?.price ?? "",
  rating: product?.rating ?? 0,
  stockQuantity: product?.stockQuantity ?? "",
  imageUrls: (product?.images ?? []).join("\n"),
});

export const parseImageUrls = (text) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

// Возвращает текст ошибки или null
export const validateImages = (mode, imageUrls, files) => {
  if (mode === "urls") {
    return parseImageUrls(imageUrls).length < MIN_IMAGES
      ? `Add at least ${MIN_IMAGES} image URLs (one per line)`
      : null;
  }

  if (files.length < MIN_IMAGES) {
    return `Select at least ${MIN_IMAGES} image files`;
  }
  if (files.length > MAX_UPLOAD_FILES) {
    return `You can upload up to ${MAX_UPLOAD_FILES} files`;
  }
  const tooBig = files.find((f) => f.size > MAX_FILE_SIZE_MB * 1024 * 1024);
  if (tooBig) {
    return `${tooBig.name} is larger than ${MAX_FILE_SIZE_MB} MB`;
  }
  return null;
};

const baseFields = (form) => ({
  title: form.title.trim(),
  description: form.description.trim(),
  price: Number(form.price),
  rating: Number(form.rating || 0),
  stockQuantity: Number(form.stockQuantity),
});

export const buildJsonPayload = (form) => ({
  ...baseFields(form),
  images: parseImageUrls(form.imageUrls),
});

export const buildFormData = (form, files) => {
  const data = new FormData();
  Object.entries(baseFields(form)).forEach(([key, value]) =>
    data.append(key, String(value))
  );
  files.forEach((file) => data.append("images", file));
  return data;
};