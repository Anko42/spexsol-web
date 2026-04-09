interface ProductGalleryProps {
  screenshots: string[]
  productName: string
}

export function ProductGallery({
  screenshots,
  productName,
}: ProductGalleryProps) {
  if (screenshots.length === 0) return null

  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
      {screenshots.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${productName} screenshot ${i + 1}`}
          loading="lazy"
          className="h-auto w-[75vw] max-w-sm shrink-0 snap-center rounded-2xl object-cover [border:1px_solid_rgba(255,255,255,.1)] sm:w-full sm:max-w-none"
        />
      ))}
    </div>
  )
}
