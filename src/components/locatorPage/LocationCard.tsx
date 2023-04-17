import * as React from "react";
import { CardComponent } from "@yext/search-ui-react";
import { Location } from "../../types/search/locations";
import GetDirection from "../commons/GetDirection";
import timesvg from "../../images/watch-icn.svg";
import Address from "../commons/Address";
import OpenClose from "../commons/openClose";
import { StaticData } from "../../sites-global/staticData";
import { Link } from "@yext/pages/components";
import "react-loading-skeleton/dist/skeleton.css";
import constant from "../../constant";
import map_marker from "../../images/map-marker.svg";
import storedetail from "../../images/store-detail.svg";
import Hours from "../commons/hours";
import Amunities from "../locationDetail/Amunities";
import { useState } from "react";
const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
};

const LocationCard: CardComponent<Location> = (props: any) => {
  const [hoursopen, setHoursopen] = React.useState(false);
  const [timeStatus, setTimeStatus] = useState("");
  let url = "";
  function opentime(e: any) {
    const closethis = e.target.closest(".lp-param-results");
    if (
      closethis
        .querySelector(".storelocation-openCloseTime")
        .classList.contains("hidden")
    ) {
      closethis
        .querySelector(".storelocation-openCloseTime")
        .classList.remove("hidden");
      setHoursopen(true);
    } else {
      closethis
        .querySelector(".storelocation-openCloseTime")
        .classList.add("hidden");
      setHoursopen(false);
    }
    if (timeStatus == "") {
      setTimeStatus("active");
    } else {
      setTimeStatus("");
    }
  }

  return props.result.map((result: any, keyindex: number) => {
    const { address } = result.rawData;
    
    const name: any = result.rawData.name?.toLowerCase();
    
    const addressLine1 = address.line1;
    const addressCity = address.city;
    const shopName = result.rawData.name + ' ' +  addressCity
    const addressRegion = address.region;
    const addressPostalCode = address.postalCode;
    const countryCode = address.countryCode;
    const getDirectionUrlNew = 'https://www.google.com/maps/place/' + name +','+ addressLine1 +','+ addressCity +','+ addressRegion +','+ addressPostalCode +','+ countryCode
    const string: any = name.toString();
    const result1: any = string.replaceAll(" ", "-");
    // const finalslug:any=constant.slugify(result.rawData.slug);
    if (!result.rawData.slug) {
      url =
        props.mode === "development"
          ? `/location/${result.rawData.id}?locale=en`
          : `/${result.rawData.id}-${result1}`;
    } else {
      url =
        props.mode === "development"
          ? `/location/${result.rawData.slug}?locale=en`
          : `/${constant.slugify(result.rawData.slug)}`;
    }

    return (
      <>
      <div
        className={`location result-list-inner-${keyindex + 1} result`}
        id={`result-${keyindex + 1}`}
      >
        <div className="result-inner ">
          <div className="center-column">
            <div className="lp-param-results lp-subparam-hours">
              <div className="location-name-miles icon-row">
                <h2>
                  <Link
                    className="inline-block notHighlight"
                    data-ya-track={`viewDetail -${result.rawData.name}`}
                    eventName={`viewDetail -${result.rawData.name}`}
                    rel="noopener noreferrer"
                    href={url}
                  >
                    {shopName}
                  </Link>
                </h2>
                <div className="distance">
                  <img src={map_marker} alt="" />
                  {typeof result.distance != "undefined" ? (
                    <div className="">
                      {metersToMiles(result.distance)}{" "}
                      <span>{StaticData.miles}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="icon-row content-col address-with-availablity">
                <Address address={address} />
                {result.rawData.mainPhone && (
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
                              fillRule="evenodd"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <a href="tel:01738 441566">{result.rawData.mainPhone}</a>
                  </div>
                )}

                {result.rawData.emails && (
                  <div className="address notHighlight items-center">
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
                      {result.rawData.emails[0]}
                    </a>
                  </div>
                )}

                <div className="mt-2">
                  {result.rawData.hours?.reopenDate ? (
                    <>
                      <div className="icon">
                        {" "}
                        <img
                          className=" "
                          src={timesvg}
                          width="20"
                          height="20"
                          alt=""
                        />{" "}
                      </div>
                      <div
                        className="cursor-pointer flex open-now-string items-center "
                        data-id={`main-shop-${result.rawData.id}`}
                        onClick={opentime}
                      >
                        {StaticData.tempClosed}
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={timeStatus + " notHighlight flex open-now-string items-center cursor-pointer"}
                        data-id={`main-shop-${result.rawData.id}`}
                        onClick={opentime}
                      >
                        <OpenClose
                          timezone={result.rawData.timezone}
                          hours={result.rawData.hours}
                          id={result.rawData.id}
                          deliveryHours={result.rawData.hours}
                        ></OpenClose>
                      </div>
                    </>
                  )}
                </div>
                <div
                  className={`storelocation-openCloseTime  capitalize hidden`}
                >
                  {hoursopen ? (
                    typeof result.rawData.hours === "undefined" ? (
                      ""
                    ) : (
                      <Hours
                        key={result.rawData.name}
                        additionalHoursText={result.rawData.additionalHoursText}
                        hours={result.rawData.hours}
                        c_specific_day={result.rawData.c_specific_day}
                      />
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {result.rawData.c_facility && (
                <Amunities c_facility={result.rawData.c_facility} />
              )}
                {console.log(address,"latitude")}
              <div className="button-bx">
                <div className="btn-dir">
                  {result.rawData.displayCoordinate ? (
                    <GetDirection
                      buttonText={StaticData.getDirection}
                      address={address}
                      detailpage={false}
                      latitude={result.rawData.displayCoordinate?.latitude}
                      longitude={result.rawData.displayCoordinate?.longitude}
                    />
                  ) : (
                    
                    <GetDirection
                      buttonText={StaticData.getDirection}
                      address={address}
                      detailpage={false}
                      latitude={result.rawData.yextDisplayCoordinate?.latitude}
                      longitude={
                        result.rawData.yextDisplayCoordinate?.longitude
                      }
                    />
                  )}
                  
                  
                </div>
                <Link
                  type="button"
                  href={url}
                  className=" btn notHighlight btn-store"
                  data-ya-track={`viewStore -${result.rawData.name}`}
                  eventName={`viewStore -${result.rawData.name}`}
                  rel="noopener noreferrer"
                >
                  <img src={storedetail} alt="" />
                  {StaticData.StoreDetailbtn}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    );
  });
};

export default LocationCard;
