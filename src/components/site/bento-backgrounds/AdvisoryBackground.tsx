import { CodeBlock } from '~/components/site/CodeBlock'

const BEFORE = `export function useAuth() {
  const [user, setUser] = useState(null) // [!code --]
  useEffect(() => { // [!code --]
    fetchUser().then(setUser) // [!code --]
  }, []) // [!code --]
  return user
}
`

const AFTER = `export function useAuth() {
  const { data: user } = useQuery({ // [!code ++]
    queryKey: ['user'], // [!code ++]
    queryFn: fetchUser, // [!code ++]
  }) // [!code ++]
  return user
}
`

export function AdvisoryBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute -top-10 lg:inset-y-6 lg:left-[38%] w-[500px] lg:w-auto scale-50 -left-9 lg:scale-100 lg:left-1/5 lg:right-4 grid grid-cols-2 gap-3 -rotate-1 opacity-70 transition-all duration-500 group-hover:-translate-y-1 group-hover:opacity-100">
        <CodeBlock
          code={BEFORE}
          lang="ts"
          filename="useAuth.ts"
          label="before"
          className="shadow-lg"
        />
        <CodeBlock
          code={AFTER}
          lang="ts"
          filename="useAuth.ts"
          label="after"
          className="shadow-lg"
        />
      </div>

    </div>
  )
}
