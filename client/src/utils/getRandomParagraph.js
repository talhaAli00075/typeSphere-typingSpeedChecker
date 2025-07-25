import { normalParagraphs , punctuationParagraphs , numberParagraphs , capitalParagraphs} from "../data/paragraphs"

export const getRandomNormalParagraph = () => {
  const randomNumber = Math.floor(Math.random() * normalParagraphs.length)
  return normalParagraphs[randomNumber]
}
export const getRandomCapitalParagraph = () => {
  const randomNumber = Math.floor(Math.random() * capitalParagraphs.length)
  return capitalParagraphs[randomNumber]
}
export const getRandomPuncParagraph = () => {
  const randomNumber = Math.floor(Math.random() * punctuationParagraphs.length)
  return punctuationParagraphs[randomNumber]
}
export const getRandomNumberParagraph = () => {
  const randomNumber = Math.floor(Math.random() * numberParagraphs.length)
  return numberParagraphs[randomNumber]
}
