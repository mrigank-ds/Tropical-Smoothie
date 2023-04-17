import * as React from "react";
import Address from "../commons/Address";
import GetDirection from "../commons/GetDirection";
import OpenClose from "../commons/openClose";
import { Link } from "@yext/pages/components";
import Amunities from "./Amunities";
import { StaticData } from "../../sites-global/staticData";
import storedetail from "../../images/store-detail.svg";
import map_marker from "../../images/map-marker.svg";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
export default function Nearby(props: any) {
  const [neabyData, setnearbyData] = React.useState(
    props.externalApiData.response.results
  );
  const metersToMiles = (meters: number) => {
    const miles = meters * 0.000621371;
    return miles.toFixed(2);
  };

  return (
    <>
      {/* <Splide
        id="splide-nearby"
        options={{
          rewind: false,
          type: "slide",
          perPage: 3,
          perMove: 1,
          arrows: false,
          drag: false,
          pagination: false,
          lazyLoad: "nearby",
          breakpoints: {
            1279: {
              perPage: 1,
              drag: true,
              pagination: true,
              arrows: false,
              type: "splide",
            },
          },
        }}
      > */}
      <div className="nearby-sec-inner">
        {neabyData.map((location: any, index: number) => {
          let url = "";
          var name: any = location.data.name?.toLowerCase();
          var string: any = name.toString();
          let result1: any = string.replaceAll(" ", "-");
          if (!location.data.slug) {
            url = `/${location.data.id}-${result1}`;
          } else {
            url = `/${location.data.slug.toString()}`;
          }

          if (index > 0) {
            return (
              <div className="nearby-card" key={location.data.name}>
                  <div className="nearby-card1">

                <div className="location-name-miles icon-row">
                  <h2>
                    <Link
                      className="inline-block notHighlight"
                      href={url}
                      data-ya-track={`${location.data.name}`}
                      eventName={`${location.data.name}`}
                      rel="noopener noreferrer"
                    >
                      {location.data.name}
                    </Link>
                  </h2>
                  </div>
                <div className="distance mt-4">
                  {typeof location.distance != "undefined" ? (<>
                     <img src={map_marker} alt="" />
                    <div className="">
                      {metersToMiles(location.distance)}{" "}
                      <span>{StaticData.miles}</span>
                    </div></>
                  ) : (
                    ""
                  )}
                </div>
                
                <div className="icon-row content-col">
                  <Address address={location.data.address} />
                </div>
                {location.data.mainPhone && (
                  <div className="address notHighlight items-center">
                    <div className="telephone">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                      >
                        <g
                          id="ICONS-_-phone-Copy"
                          data-name="ICONS-/-phone-Copy"
                          transform="translate(-2 -2)"
                        >
                          <g id="Group" transform="translate(2 2)">
                            <path
                              id="Path"
                              d="M8.886,13.578A15.222,15.222,0,0,1,2.422,7.115a2.827,2.827,0,0,1,.227-3.3l.133-.135.143-.144.328-.33.033-.033A7.833,7.833,0,0,1,4.223,2.3a1.811,1.811,0,0,1,.727-.281,1.358,1.358,0,0,1,1.252.47,10.331,10.331,0,0,1,.9,1.183l.083.119.065.092a1.194,1.194,0,0,1-.076,1.514c-.3.345-.577.64-.9.958-.033.033-.029.085.058.192A17,17,0,0,0,9.48,9.682c.085.069.135.072.167.04.319-.322.614-.6.959-.9a1.2,1.2,0,0,1,1.514-.076l.092.065.117.081a10.334,10.334,0,0,1,1.186.906,1.357,1.357,0,0,1,.47,1.252,1.813,1.813,0,0,1-.281.727,7.879,7.879,0,0,1-.872.938l-.032.032-.33.328-.144.143-.135.133A2.825,2.825,0,0,1,8.886,13.578Z"
                              transform="translate(-2 -2)"
                              fill="#fff"
                              fill-rule="evenodd"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <a href="tel:01738 441566">{location.data.mainPhone}</a>
                  </div>
                )}

                {location.data.emails && (
                  <div className="address notHighlight items-center mt-3">
                    <div className="email">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 9"
                      >
                        <path
                          id="Icon_awesome-envelope"
                          data-name="Icon awesome-envelope"
                          d="M11.773,7.472a.141.141,0,0,1,.227.11v4.793A1.125,1.125,0,0,1,10.875,13.5H1.125A1.125,1.125,0,0,1,0,12.375V7.584a.14.14,0,0,1,.227-.11c.525.408,1.221.926,3.612,2.662A4.193,4.193,0,0,0,6,11.252a4.2,4.2,0,0,0,2.163-1.116C10.554,8.4,11.248,7.88,11.773,7.472ZM6,10.5c.544.009,1.327-.684,1.72-.97,3.11-2.257,3.347-2.454,4.064-3.016A.561.561,0,0,0,12,6.07V5.625A1.125,1.125,0,0,0,10.875,4.5H1.125A1.125,1.125,0,0,0,0,5.625V6.07a.564.564,0,0,0,.216.443c.717.56.954.759,4.064,3.016C4.673,9.816,5.456,10.509,6,10.5Z"
                          transform="translate(0 -4.5)"
                          fill="#fff"
                        />
                      </svg>
                    </div>
                    <a href="mailto:mgmPerth@mgmtimber.com">
                      {location.data.emails[0]}
                    </a>
                  </div>
                )}

                <div className="icon-row closeing-div">
                  {location.data.hours ? (
                    <div
                      className="flex open-now-string items-center "
                      data-id={`main-shop-${location.data.id}`}
                    >
                      <OpenClose
                        timezone={location.data.timezone}
                        hours={location.data.hours}
                        deliveryHours={location.data.hours}
                      ></OpenClose>
                    </div>
                  ) : (
                    <div className="closeddot notHighlight red-dot">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                      >
                        <circle
                          id="Ellipse_5"
                          data-name="Ellipse 5"
                          cx="4"
                          cy="4"
                          r="4"
                          fill="#ad1e1f"
                        />
                      </svg>
                      <div className="hours-info text-lg font-second-main-font closeddot">
                        Closed
                      </div>
                    </div>
                  )}
                </div>
                {location.data.c_facility && (
                <div className="icon-row content-col availability-col">
                  
                    <Amunities c_facility={location.data.c_facility} />
                
                </div>
                  )}
                <div className="button-bx">
                  <GetDirection
                    buttonText={
                      props.c_getDirectionsCTAText
                        ? props.c_getDirectionsCTAText
                        : "Get directions"
                    }
                    address={location.data.address}
                    latitude={
                      location.data.displayCoordinate
                        ? location.data.displayCoordinate.latitude
                        : location.data.yextDisplayCoordinate.latitude
                    }
                    detailpage={false}
                    longitude={
                      location.data.displayCoordinate
                        ? location.data.displayCoordinate.longitude
                        : location.data.yextDisplayCoordinate.longitude
                    }
                  />

                  <Link
                    className="btn"
                    href={url}
                    data-ya-track={`viewstore-${location.data.name}`}
                    eventName={`viewstore-${location.data.name}`}
                    rel="noopener noreferrer"
                  >
                    <img src={storedetail} alt="" />
                    {StaticData.StoreDetailbtn}
                  </Link>
                </div>
              </div>
                   </div>
            );
          }
        })}
      </div>
      {props.c_viewmoreCta && (
        <div className="content-center w-full text-center nearby-cta">
          <Link
            href={props.c_viewmoreCta.link}
            className="button-red"
            data-ya-track={`about-button`}
            eventName={`about-button`}
            rel="noopener noreferrer"
          >
            {props.c_viewmoreCta.label}
          </Link>
        </div>
      )}
    </>
  );
}
