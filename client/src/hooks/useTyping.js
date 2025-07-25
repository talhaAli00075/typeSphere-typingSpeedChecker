import { useState } from "react";
import { getRandomNormalParagraph, getRandomCapitalParagraph , getRandomPuncParagraph , getRandomNumberParagraph} from "../utils/getRandomParagraph";
import { normalParagraphs , capitalParagraphs , punctuationParagraphs , numberParagraphs } from "../data/paragraphs";

export const useTyping = () => {
  const [paragraph, setparagraph] = useState(
    getRandomNormalParagraph(normalParagraphs)
  );

  const handleChange = () => {
    const para = getRandomNormalParagraph(normalParagraphs);
    setparagraph(para);
  };
  const handleChangeCapital = () => {
    const para = getRandomCapitalParagraph(capitalParagraphs);
    setparagraph(para);
  };
  const handleChangePunc = () => {
    const para = getRandomPuncParagraph(punctuationParagraphs);
    setparagraph(para);
  };
  const handleChangeNumber = () => {
    const para = getRandomNumberParagraph(numberParagraphs);
    setparagraph(para);
  };
  return {
    paragraph,
    handleChange,
    handleChangeCapital,
    handleChangePunc,
    handleChangeNumber
  };
};

