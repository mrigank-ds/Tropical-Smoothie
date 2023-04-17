import * as React from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export default function FeaturesBrand(props:any) {

    const photos = props.c_features_brand && props.c_features_brand.map((element:any) => (   

        <SplideSlide>
       <div className="img-splide">
       <img height='100' width="100" src={element.url} />
       </div>
        </SplideSlide>    
      ));
  return (
    <>
    <h1 className="text-center text-xxl pb-3">{props.name}</h1>
    <div className="Features-brand">
   <Splide id="splide-feturedbrand"
        options={{
          rewind: false,
          type: "splide",
          perPage: 3,
          perMove: 1,
          arrows: false,
          drag: false,
          pagination: false,
          lazyLoad: "nearby",
          breakpoints: {
            1920: {
              perPage:6,
              drag: true,
              pagination: true,
              arrows: true,
              type: "splide",
            },
            767: {
              perPage:2,
              drag: true,
              pagination: false,
              arrows: true,
              type: "splide",
            },
            565: {
              perPage:1,
              drag: true,
              pagination: false,
              arrows: true,
              type: "splide",
            },
          },
        }}>
          {photos}
      </Splide>
      </div>
    </>
  )
}
