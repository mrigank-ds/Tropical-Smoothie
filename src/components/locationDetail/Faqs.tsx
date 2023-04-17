import * as React from "react";
import { useState } from "react";
import AccordionItem from "./AccordianItem";
import { StaticData } from "../../sites-global/staticData";
import Link from "../commons/Link";

export default function Faq(props: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const renderedQuestionsAnswers = props.faqs.map(
    (item: any, index: number) => {
      console.log(props, "item");
      const showDescription = index === activeIndex ? "current" : "hidden";
      const background = index === activeIndex ? "active" : "";
      const fontWeightBold =
        index === activeIndex ? " font-weight-bold  py-0 mt-2" : "";
      const ariaExpanded = index === activeIndex ? "true" : "false";
      return (
        <AccordionItem
          key={index}
          showDescription={showDescription}
          fontWeightBold={fontWeightBold}
          ariaExpanded={ariaExpanded}
          background={background}
          item={item}
          index={index}
          onClick={() => {
            setActiveIndex(index);
          }}
        />
      );
    }
  );

  return (
    <>
      <div className=" faq-main-sec">
        <div className=" faq-card ">
          <div className="faq-sec-inner">
            <h2 className="">
              {props.c_faqHeading ? props.c_faqHeading : StaticData.FAQheading}
            </h2>
            <div className="faq-tabs">{renderedQuestionsAnswers}</div>
          </div>
        </div>
        <div className="faq_CTA">
        {props.c_readMoreCta &&
        <Link props={props.c_readMoreCta}/>}
        </div>
        </div>
    </>
  );
}
