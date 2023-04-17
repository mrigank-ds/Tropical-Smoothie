import { useState } from "react";
import { useSearchActions } from "@yext/search-headless-react";
import { AnswerExperienceConfig, googleApikey } from "../sites-global/global";


const useGetPostalCodeLatLng = () => {
  const searchActions = useSearchActions();
  const [postalloading, setPostalLoading] = useState(false);
  const setLoading = (value: boolean) => {
    setPostalLoading(value);
  };
  let params: any;
  // Get the element with the specified class

  const postalcode = (
    postal: any,
    coordinates: { latitude: number; longitude: number },
    checkallowed: any,
  ) => {
   if(!checkallowed){ 
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${postal}&key=${googleApikey}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "ZERO_RESULTS") {
          searchActions.setQuery("gkhvfdjgbdbg");
          searchActions.setUserLocation(coordinates);
          searchActions.setOffset(0);
          searchActions.setVerticalLimit(AnswerExperienceConfig.limit)
          searchActions.executeVerticalQuery();
        } else if (json.results) {
          var status = false;
          json.results.map((components: any) => {
            for (let i = 0; i < components.address_components.length; i++) {
              const type = components.address_components[i].types[0];
              params = {
                latitude: components.geometry.location.lat,
                longitude: components.geometry.location.lng,
              };
              if (components.address_components[i].types.includes("country")) {
                if (components.address_components[i].short_name != "US") {
                  status = true;
                }
              }
            }
          });

          if (status) {
            searchActions.setQuery(postal);
            searchActions.setUserLocation(coordinates);
            searchActions.setOffset(0);
            searchActions.setVerticalLimit(AnswerExperienceConfig.limit)
            searchActions.executeVerticalQuery();
          } else {
            searchActions.setUserLocation(params);
            searchActions.setQuery("");
             searchActions.setVerticalLimit(AnswerExperienceConfig.limit)
            searchActions.executeVerticalQuery();
          }
        }
      })
      .catch(() => {});
  }else{
    searchActions.setVertical("locations");
    searchActions.setUserLocation(coordinates);
    searchActions.setOffset(0);
    searchActions.executeVerticalQuery();
  }
};

  return { postalcode, setLoading, postalloading };
};

export default useGetPostalCodeLatLng;
