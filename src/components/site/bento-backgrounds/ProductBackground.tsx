import { Iphone } from '~/components/site/Iphone'
import { Safari } from '~/components/site/Safari'

export function ProductBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Safari window — wider, behind, tilted left */}
      <div className="absolute top-0 lg:top-9 left-2/3 lg:left-[54%]  w-[280px]  scale-50 lg:scale-100 -translate-x-[58%] rotate-[-3deg] drop-shadow-2xl transition-all duration-500 group-hover:-translate-y-1">
        <Safari url="spexsol.sk" />
      </div>

      {/* iPhone — smaller, in front, offset right and tilted right */}
      <div className="absolute top-3 lg:top-12 left-[60%] lg:left-3/5 w-[90px] scale-50 lg:scale-100 translate-x-4 rotate-[3deg] drop-shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:translate-x-5">
        <Iphone />
      </div>

      {/* Fade to card color so the copy area stays clean */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-card via-card/90 to-transparent" />
    </div>
  )
}
