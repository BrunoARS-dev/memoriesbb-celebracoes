import { cookies } from "next/headers";
import QRCode from "qrcode";

import { AdminDashboard } from "@/components/gallery/admin-dashboard";
import { AdminLogin } from "@/components/gallery/admin-login";
import { celebration } from "@/content/celebration";
import { galleryAdminCookie, isAdminPasswordConfigured, verifyAdminSession } from "@/lib/gallery/admin-auth";
import { listGalleryPhotos } from "@/lib/gallery/database";

export const dynamic = "force-dynamic";

export default async function GalleryAdminPage() {
  if (!isAdminPasswordConfigured()) {
    return <main className="gallery-admin-setup"><h1>Configuração necessária</h1><p>Defina <code>GALLERY_ADMIN_PASSWORD</code> com pelo menos 12 caracteres e reinicie a aplicação.</p></main>;
  }
  const cookieStore = await cookies();
  if (!verifyAdminSession(cookieStore.get(galleryAdminCookie)?.value)) return <AdminLogin />;
  const gallery = celebration.gallery;
  if (!celebration.modules.gallery || !gallery) return <main className="gallery-admin-setup"><h1>Galeria desativada</h1></main>;
  const qrCode = await QRCode.toDataURL(gallery.publicUrl, { width: 640, margin: 2, errorCorrectionLevel: "M" });
  return <AdminDashboard initialPhotos={listGalleryPhotos()} publicUrl={gallery.publicUrl} qrCode={qrCode} />;
}
