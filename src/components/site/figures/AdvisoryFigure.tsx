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

export function AdvisoryFigure() {
  return (
    <div
      aria-hidden="true"
      className="grid h-full w-full grid-cols-1 content-center gap-3 p-4 sm:grid-cols-2 sm:p-6"
    >
      <CodeBlock code={BEFORE} lang="ts" filename="useAuth.ts" label="before" />
      <CodeBlock
        code={AFTER}
        lang="ts"
        filename="useAuth.ts"
        label="after"
        className="hidden sm:block"
      />
    </div>
  )
}
