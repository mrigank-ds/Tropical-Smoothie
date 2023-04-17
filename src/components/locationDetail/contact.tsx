import * as React from "react";
import Hours from "../commons/hours";
import GetDirection from "../commons/GetDirection";
import { StaticData } from "../../sites-global/staticData";
import Model from "./Model";
import CustomMap from "./CustomMap";
import OpenClose from "../commons/openClose";
import Amunities from "./Amunities";

const Contact = (props: any) => {
  const {
    address,
    phone,
    latitude,
    longitude,
    timezone,
    name,
    c_facility,
    hours,
    email,
    c_specific_day,
    additionalHoursText,
    yextDisplayCoordinate,
    c_getDirectionsCTAText,
  } = props;
  return (
    <>
      <div className="address-main-sec">
        <h4 className="box-title">{name ? name : "Store Details"}</h4>

        <div className="icon-row content-col">
          <div className="icon location-icon">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 15.385 20"
            >
              <g
                id="ICONS-_-location-Copy"
                data-name="ICONS-/-location-Copy"
                transform="translate(-4 -6)"
              >
                <g id="Group" transform="translate(0 5)">
                  <path
                    id="location"
                    d="M11.692,1a7.692,7.692,0,0,1,7.692,7.692C19.385,12.524,13.956,21,11.692,21S4,12.524,4,8.692A7.692,7.692,0,0,1,11.692,1Zm0,3.846a3.846,3.846,0,1,0,3.846,3.846A3.846,3.846,0,0,0,11.692,4.846Z"
                    fill="#fff"
                    fill-rule="evenodd"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div className="  address-text notHighlight">
            {address.line1}
            <div>{address.line2 && <div>{address.line2}</div>}</div>
            <div>{address.city}</div>
            <div>{address.postalCode}</div>
          </div>
        </div>

        {phone ? (
          <div className="icon-row">
            <div className="icon telephone">
              {" "}
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
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
            <div className="content-col">
              <a id="address" className=" location-phn" href={`tel:${phone}`}>
                {phone}
              </a>
            </div>
          </div>
        ) : (
          ""
        )}
        {email && (
          <div className="icon-row">
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
                ></path>
              </svg>
            </div>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        )}

        <div className="openClosestatus closeing-div">
          <OpenClose timezone={timezone} hours={hours} />
        </div>
        <div className="icon-row content-col availability-col">
          <Amunities c_facility={c_facility} />
        </div>
        <ul className="">
          <li className="button-bx direction-button">
            <GetDirection
              buttonText={
                c_getDirectionsCTAText
                  ? c_getDirectionsCTAText
                  : StaticData.getDirection
              }
              detailpage={true}
              address={address}
              latitude={latitude}
              longitude={longitude}
            />
          </li>
        </ul>

        <div className="map-sec">
          <CustomMap prop={yextDisplayCoordinate} />
        </div>
      </div>

      {hours && typeof hours.monday != "undefined" ? (
        <div className="hours">
          <div className="hours-sec">
            <div className="title-with-link-1">
              <h4 className="box-title">{"Opening Hours"}</h4>
            </div>
            <div className="hours-div mb-5 md:mb-1 flex flex-col">
              {hours.holidayHours && typeof hours.reopenDate == "undefined" ? (
                <>
                  <Model
                    name={StaticData.Holdiay}
                    holidayHours={hours.holidayHours}
                    c_specific_day={c_specific_day}
                  />
                </>
              ) : (
                ""
              )}
              {hours && (
                <Hours
                  title={"Opening Hours"}
                  additionalHoursText={additionalHoursText}
                  hours={hours}
                  c_specific_day={c_specific_day}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Contact;
