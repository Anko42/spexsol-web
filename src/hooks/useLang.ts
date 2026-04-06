import { useParams } from '@tanstack/react-router'
import {
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
  type SupportedLanguage,
} from '~/i18n/config'

export function useLang(): SupportedLanguage {
  const params = useParams({ strict: false }) as { lang?: string }
  return isSupportedLanguage(params.lang) ? params.lang : DEFAULT_LANGUAGE
}
