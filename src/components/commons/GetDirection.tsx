import { Link } from "@yext/pages/components";
import * as React from "react";
import direction from "../../images/direction.svg";
import { conversionDetailsDirection} from "../../sites-global/global";


const GetDirection = (props: any) => {
  const { 
    buttonText, 
    latitude,
	  address,
    longitude,
    detailpage 
  } = props;

  console.log(props.longitude,"Address");
  
  const getDirectionUrl = (address : any) => {
    let origin: any = null;
    
    if (address.city) {
      origin = address.city;
    } else if (address.region) {
      origin = address.region;
    }  else {
      origin = address.country;
    }
  };
  const conversionDetails_direction = conversionDetailsDirection;
  return (
    <>
      <Link
        data-ya-track="getdirections"
        eventName={`getdirections`}
        className="btn notHighligh"
        onClick={getDirectionUrl(props.address)}
        href={"#javascript"}
        rel="noopener noreferrer"
        // conversionDetails={conversionDetails_direction}
      >
        {!detailpage && <img src={direction} alt="" />}
        {buttonText}
      </Link>
    </>
  );
};

export default GetDirection;
