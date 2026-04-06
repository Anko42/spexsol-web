import { Outlet, createFileRoute, notFound } from '@tanstack/react-router'
import { isSupportedLanguage } from '~/i18n/config'

export const Route = createFileRoute('/$lang')({
  beforeLoad: ({ params }) => {
    if (!isSupportedLanguage(params.lang)) {
      throw notFound()
    }
  },
  component: LangLayout,
})

function LangLayout() {
  return <Outlet />
}
