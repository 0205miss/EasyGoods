import 'server-only'
 
const transcipt = {
  en: () => import('@/transcript/en.json').then((module) => module.default),
  nl: () => import('./dictionaries/nl.json').then((module) => module.default),
}
 
export const getTranslate = async (locale) => transcipt[locale]()