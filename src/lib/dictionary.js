import 'server-only'
const dictionaries = {
  en: () => import('@/transcript/en.json').then((module) => module.default),
  'zh-TW': () => import('@/transcript/zh-TW.json').then((module) => module.default),
  'zh-CN': () => import('@/transcript/zh-CN.json').then((module) => module.default),
  'yo': () => import('@/transcript/yo.json').then((module) => module.default)
}
 
export const getDictionary = async (locale) => dictionaries[locale]()