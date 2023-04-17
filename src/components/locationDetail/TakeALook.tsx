import * as React from 'react'

function TakeALook(props:any) {
    console.log(props,"props")
  return (<>
  <h2 className="text-center text-xxl pb-3">{props.c_branchHeading}</h2>
    <div className='block md:flex flex-row w-full gap-6'>
         {props.c_branchImage&& props.c_branchImage.map((element:any)=>{
            return (
                <div className="Branches w-full">
                <img src={element.url} />
                </div>
            )
         })}
           
    </div>
    </>
  )
}

export default TakeALook