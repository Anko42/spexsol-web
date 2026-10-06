import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  })

  console.error('DefaultCatchBoundary Error:', error)

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 pb-16 pt-32 sm:px-6 sm:pt-40">
      <p className="eyebrow">500</p>
      <ErrorComponent error={error} />
      <div className="flex gap-2 items-center flex-wrap">
        <button
          onClick={() => {
            router.invalidate()
          }}
          className="inline-flex h-10 items-center rounded-field border border-line px-4 text-[14px] font-medium text-fg transition-colors hover:bg-card"
        >
          Try again
        </button>
        {isRoot ? (
          <Link
            to="/"
            className="inline-flex h-10 items-center rounded-field border border-line px-4 text-[14px] font-medium text-fg transition-colors hover:bg-card"
          >
            Home
          </Link>
        ) : (
          <Link
            to="/"
            className="inline-flex h-10 items-center rounded-field border border-line px-4 text-[14px] font-medium text-fg transition-colors hover:bg-card"
            onClick={(e) => {
              e.preventDefault()
              window.history.back()
            }}
          >
            Go back
          </Link>
        )}
      </div>
    </div>
  )
}
