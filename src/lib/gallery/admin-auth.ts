import { createHmac, timingSafeEqual } from "node:crypto";

export const galleryAdminCookie = "memories_gallery_admin";

function getAdminPassword() {
  return process.env.GALLERY_ADMIN_PASSWORD?.trim() || "";
}

function createSessionToken(password: string) {
  return createHmac("sha256", password).update("memoriesbb-gallery-admin-v1").digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function isAdminPasswordConfigured() {
  return getAdminPassword().length >= 12;
}

export function verifyAdminPassword(candidate: string) {
  const password = getAdminPassword();
  return password.length >= 12 && safeEqual(candidate, password);
}

export function verifyAdminSession(token: string | undefined) {
  const password = getAdminPassword();
  return Boolean(token && password.length >= 12 && safeEqual(token, createSessionToken(password)));
}

export function getAdminSessionToken() {
  const password = getAdminPassword();
  if (password.length < 12) throw new Error("GALLERY_ADMIN_PASSWORD deve ter ao menos 12 caracteres.");
  return createSessionToken(password);
}
