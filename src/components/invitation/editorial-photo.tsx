import Image from "next/image";
import type { CelebrationPhoto } from "@/content/celebration";

export function EditorialPhoto({ photo, priority = false, className = "" }: {
  photo: CelebrationPhoto; priority?: boolean; className?: string;
}) {
  return (
    <figure className={`editorial-photo photo-${photo.tone ?? "blush"} ${className}`}>
      {photo.src ? (
        <Image src={photo.src} alt={photo.alt} fill priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      ) : (
        <div className="photo-placeholder" role="img" aria-label={photo.alt}>
          <span className="botanical-shadow" aria-hidden="true" />
          <span className="photo-line" aria-hidden="true" />
        </div>
      )}
    </figure>
  );
}
