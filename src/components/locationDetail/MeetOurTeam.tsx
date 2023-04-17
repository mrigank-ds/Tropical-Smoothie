import * as React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import constant from "../../constant";
function MeetOurTeam(props: any) {
  return (
    <div className="">
             <div className="meet-team">
              <div className="container-custom1">
              <h2 className="for-mob container-custom text-center mb-2">{props.c_meetOurTeamHeading}</h2>
                <div className="flex flex-raw flex-wrap">
   
      {props.c_meetTeam &&
        props.c_meetTeam.map((res: any, index: number) => {
          return (
                 <div className="team-page">
                  <div className="w-full relative  left-0 p-3">
                    <div className="lg:h-full">
                      <LazyLoadImage
                        src={res.image[0].url}
                        key={res.image[0].url}
                        width={658}
                        height={518}
                        alt={`meetteam-${index}`}
                      />
                    </div>
                  </div>
                    <div className="mb-4">
                      <h2 className="meet-title">{res.title}</h2>
                      <div className="">
                        <div
                          className="about-content-inner"
                          dangerouslySetInnerHTML={{
                            __html: constant.convertToRtf(res.description),
                          }}
                        />
                    </div>
                  </div>
                  </div>
              
          );
        })}
          </div>
              </div>
            </div>
    </div>
  );
}

export default MeetOurTeam;
