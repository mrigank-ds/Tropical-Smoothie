import * as React from 'react'
import Kitchen from "../../images/kitchen.svg";
import ClickCollect from "../../images/click.svg";
import Opentopublic from "../../images/door.svg";
function Amunities(props:any) {

const service_img_array =[
Kitchen,
ClickCollect,
Opentopublic
];

  return props.c_facility ? (
    <div className="c_facility">
       
        {props.c_facility && props.c_facility.map((res: any,index:number) => {
          return service_img_array && service_img_array.map((img:any,index2:number)=>{
            if(index==index2){
            return (<>
            <div className='c_facility_hover'>
            <img src={img} alt="" /> 
            <p>{res}</p>
            </div>
            </>)
            }
          })})}
          </div>
          ) : (
            null
          )}

export default Amunities