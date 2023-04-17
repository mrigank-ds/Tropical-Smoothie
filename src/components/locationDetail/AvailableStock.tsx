import * as React from 'react'
import Link from '../commons/Link';

function AvailableStock(props:any) {
    function convertToRtf(rtf:any) {
        rtf = rtf.replace(/\\par[d]?/g, "");
        rtf = rtf.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "")
        rtf=rtf.replace('/','');
        rtf=rtf.replace(';','');
        rtf=rtf.replace('-','');
        return rtf.replace(/\\'[0-9a-zA-Z]{2}/g, "").trim();
    }
    console.log(props,"props")
  return (
    <div className="available-stock">
      <div className="container-custom1">
        <div className="about-inner-sec">
      <h2>{props.c_availableStockInformation.title}</h2>
      <div className="text-center m-auto">
      {props.c_availableStockInformation.availableLinks && props.c_availableStockInformation.availableLinks.map((res:any)=>{
       return    <Link props={res} />
      })}
      
      </div>
    </div>
  </div>
  </div>
  )
}

export default AvailableStock