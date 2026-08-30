export type GalleryPhoto = {
  id: string;
  gridUrl: string;
  fullUrl: string;
  width: number;
  height: number;
  createdAt: string;
};

export type GalleryPhotoRecord = {
  id: string;
  grid_filename: string;
  full_filename: string;
  width: number;
  height: number;
  created_at: number;
};
