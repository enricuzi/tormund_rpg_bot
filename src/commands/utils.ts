import parse from 'node-html-parser'

export const fetchWebPage = async (url: string) => {
  const response = await fetch(url)
  const page = await response.text()
  return parse(page)
}
