import { useEffect, useState } from 'react'
import { FileIcon } from 'lucide-react'
import { cn } from '~/lib/utils'

function useIsDark() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const read = () => setIsDark(root.classList.contains('dark'))
    read()
    const observer = new MutationObserver(read)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return isDark
}

interface CodeBlockProps {
  code: string
  lang: string
  filename: string
  label?: string
  className?: string
  lightTheme?: string
  darkTheme?: string
}

export function CodeBlock({
  code,
  lang,
  filename,
  label,
  className,
  lightTheme = 'github-light',
  darkTheme = 'github-dark',
}: CodeBlockProps) {
  const isDark = useIsDark()
  const [html, setHtml] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function run() {
      try {
        const [{ codeToHtml }, { transformerNotationDiff, transformerNotationHighlight }] =
          await Promise.all([
            import('shiki'),
            import('@shikijs/transformers'),
          ])
        const result = await codeToHtml(code, {
          lang,
          theme: isDark ? darkTheme : lightTheme,
          transformers: [
            transformerNotationDiff({ matchAlgorithm: 'v3' }),
            transformerNotationHighlight({ matchAlgorithm: 'v3' }),
          ],
        })
        if (!cancelled) setHtml(result)
      } catch (err) {
        console.error('shiki highlight failed', err)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [code, lang, isDark, lightTheme, darkTheme])

  return (
    <div
      className={cn(
        'overflow-hidden rounded-md border border-[var(--line)] bg-[var(--surface)]',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-[var(--line)] bg-input px-2 py-1 text-[11px] text-fg-muted">
        <FileIcon className="h-3 w-3" />
        <span className="truncate">{filename}</span>
        {label && <span className="ml-auto">{label}</span>}
      </div>

      {html ? (
        <div
          className={cn(
            'font-mono text-[10px] leading-[1.5]',
            '[&>pre]:!bg-transparent [&>pre]:py-2',
            '[&>pre>code]:block',
            '[&>pre>code>.line]:block [&>pre>code>.line]:px-3',
            '[&>pre>code>.diff.add]:bg-emerald-500/15',
            '[&>pre>code>.diff.remove]:bg-rose-500/15',
            '[&>pre>code>.highlighted]:bg-accent/10',
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="overflow-hidden whitespace-pre px-3 py-2 font-mono text-[10px] leading-[1.5] text-fg-muted">
          {code.replace(/\s*\/\/\s*\[!code [^\]]+\]/g, '')}
        </pre>
      )}
    </div>
  )
}
