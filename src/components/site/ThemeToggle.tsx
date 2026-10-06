import { useEffect, useState } from 'react'
import { cn } from '~/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const read = () => setIsDark(root.classList.contains('dark'))
    read()
    const observer = new MutationObserver(read)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const toggle = () => {
    const next = !isDark
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'label inline-flex h-9 min-w-9 cursor-pointer items-center justify-center gap-2 rounded-full px-2.5 transition-colors duration-150 hover:bg-fg/5 hover:!text-fg',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="relative size-3 overflow-hidden rounded-full border border-current"
      >
        <span
          className={cn(
            'absolute inset-y-0 left-0 w-1/2 bg-current transition-transform duration-300',
            isDark && 'translate-x-full',
          )}
        />
      </span>
      <span className="hidden sm:inline">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  )
}
