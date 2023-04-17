import * as React from "react";
import { regionNames } from "../../sites-global/global";

const Address = (props: any) => {
    const { address } = props;

  return (
    <>
      <div className="address notHighlight ">
      <div className="location-icon notHighlight">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 15.385 20">
  <g id="ICONS-_-location-Copy" data-name="ICONS-/-location-Copy" transform="translate(-4 -6)">
    <g id="Group" transform="translate(0 5)">
      <path id="location" d="M11.692,1a7.692,7.692,0,0,1,7.692,7.692C19.385,12.524,13.956,21,11.692,21S4,12.524,4,8.692A7.692,7.692,0,0,1,11.692,1Zm0,3.846a3.846,3.846,0,1,0,3.846,3.846A3.846,3.846,0,0,0,11.692,4.846Z" fill="#fff" fill-rule="evenodd"/>
    </g>
  </g>
</svg>
      </div>

        {/* <a href={gmapsLink} target="_blank" className="hover:underline"> */}
           <div className="address_1 notHighlight">
            <div ><span className="notHighlight">{address.line1},</span></div>
            {address.line2 && (<div><span className="notHighlight">{address.line2},</span></div>)}
            <div ><span className="notHighlight">{address.city}, {address.region}</span> </div>
            {<div ><span className="notHighlight">{address.postalCode}, {regionNames.of(address.countryCode)}</span></div>}
        {/* </a> */}
      </div>
      </div>
    </>
  );
};

export default Address;
