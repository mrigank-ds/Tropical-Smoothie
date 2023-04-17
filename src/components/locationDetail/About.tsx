import { Link } from "@yext/pages/components";
import * as React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import constant from "../../constant";
export default function About(props: any) {
  return (
    <div className="about-sec about-page">
      <div className="container-custom">
        <div className="about-inner-sec">
          <div className="w-full lg:w-2/5 xl:w-[47%] relative  left-0">
            <div className="lg:h-full">
              {props.c_aboutInformation.image
                ? props.c_aboutInformation.image.map((element: any) => (
                    <LazyLoadImage
                      src={element.url}
                      key={element.url}
                      width={658}
                      height={518}
                      alt="photo"
                    />
                  ))
                : ""}
            </div>
          </div>
          <div className="about-content">
            <div className="mb-4">
              <h2>{props.c_aboutInformation.title}</h2>
              <div className="">
                <div
                  className="about-content-inner"
                  dangerouslySetInnerHTML={{
                    __html: constant.convertToRtf(
                      props.c_aboutInformation.description
                    ),
                  }}
                />
              </div>
              {props.c_aboutInformation.readMore.link &&
              props.c_aboutInformation.readMore.label ? (
                <div className="content-center w-full ">
                  <Link
                    href={props.c_aboutInformation.readMore.link}
                    className="button-red"
                    data-ya-track={`about-button`}
                    eventName={`about-button`}
                    rel="noopener noreferrer"
                  >
                    {props.c_aboutInformation.readMore.label}
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
