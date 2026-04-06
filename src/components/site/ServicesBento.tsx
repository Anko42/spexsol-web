import { useTranslation } from 'react-i18next'
import { ServiceCard } from './ServiceCard'
import { SystemsIcon } from '~/components/icons/SystemsIcon'
import { ToolingIcon } from '~/components/icons/ToolingIcon'

export function ServicesBento() {
  const { t } = useTranslation('home')
  const services = [
    {
      icon: <SystemsIcon className="h-4 w-5" />,
      title: t('services.systems.title'),
      description: t('services.systems.description'),
    },
    {
      icon: <ToolingIcon className="size-[18px] text-success" />,
      title: t('services.tooling.title'),
      description: t('services.tooling.description'),
    },
  ]
  return (
    <div className="grid w-full grid-cols-2 gap-4 pt-12">
      {services.map((s) => (
        <ServiceCard key={s.title} {...s} />
      ))}
    </div>
  )
}
