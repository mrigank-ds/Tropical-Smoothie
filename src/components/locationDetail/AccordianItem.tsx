import * as React from "react";
import RtfConverter from "@yext/rtf-converter";
const AccordionItem = ({
  showDescription,
  ariaExpanded,
  fontWeightBold,
  background,
  item,
  index,
  onClick,
}) => (
    
  <div className="faq-tab py-0 mt-2" key={item.question}>

      <div
        aria-expanded={ariaExpanded}
        aria-controls={`faq${index + 1}_desc`}
        role="button"
        className={`faq__question-button !px-0 ${fontWeightBold}`}
        onClick={onClick}
      >
      <div className={`faq-tab-label  ${background} `}>
      <div dangerouslySetInnerHTML={{__html: RtfConverter.toHTML(item.question)}}/>
     </div>
      </div>
      <div
        id={`faq${index + 1}_desc`}
        data-qa="faq__desc"
        className={`faq-tab-content ${showDescription}`}
      >
       <div dangerouslySetInnerHTML={{__html: RtfConverter.toHTML(item.answer)}}/> 
      </div>
  </div>
);

export default AccordionItem;