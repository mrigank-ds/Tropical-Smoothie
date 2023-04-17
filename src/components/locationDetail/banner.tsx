import * as React from "react";
import Defaultimage from "../../images/luxurystore.jpg"

export type Address = {
  line1: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
};

type Banner = {
  data:any
  c_bannerCta:any,
  c_banner:any
};


const Banner = (props: Banner) => {
  const {data,c_banner,c_bannerCta} = props;
if(typeof data != 'undefined'){
  return (
      <div className="hero-section">
        <img className="hero-image"
          src={data.photoGallery?data.photoGallery[0].image.url:Defaultimage} alt="banner" width="1" height="1" />
        <div className="hero-content">
          <div className="container">
            <div className="banner-text">
              <h1>{data.c_bannerTitile?data.c_bannerTitile:''}</h1>
            </div>
          </div>
        </div>
        </div>
      );
  }else{
    return(<div className="hero-section">
    <img className="hero-image"
      src={c_banner?c_banner.image[0].url:Defaultimage} alt="banner" width="1" height="1" />
    <div className="hero-content">
      <div className="container">
        <div className="banner-text text-center">
          <h1>{c_banner.title?c_banner.title:''}</h1>
          <button className="btn notHighligh">{c_bannerCta.label}</button>
        </div>
      </div>
    
    </div>
    </div>)
  }
};
 export default Banner;
