import { useSearchState, Result } from "@yext/search-headless-react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  twMerge,
  useComposedCssClasses,
} from "../../hooks/useComposedCssClasses";
import Mapicon2 from "../../images/MGMpin.svg";
import clustericon from "../../images/cluster.png";
import Hovermap from "../../images/MGMhover1.svg";
import { renderToString } from "react-dom/server";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import Address from "../commons/Address";
import OpenClose from "../commons/openClose";
import $ from "jquery";
import UserMarker from "../../images/map-center.svg";
import { StaticData } from "../../sites-global/staticData";
import useFetchResults from "../../hooks/useFetchResults";
import map_marker from "../../images/map-marker.svg";
import { houtsIcon } from "../../sites-global/global";
/**
 * CSS class interface for the {@link GoogleMaps} component
 *
 * @public
 */
declare global {
  interface Window {
    getdirection: any;
  }
}
export interface GoogleMapsCssClasses {
  googleMapsContainer?: string;
}

/**
 * Props for the {@link GoogleMaps} component
 *
 * @public
 */
export interface GoogleMapsProps {
  apiKey: string;
  centerLatitude: number;
  centerLongitude: number;
  defaultZoom: number;
  showEmptyMap: boolean;
  check: boolean;
  providerOptions?: google.maps.MapOptions;
  customCssClasses?: GoogleMapsCssClasses;
  mobile: any;
  activeIndex: number | null;
  setActiveIndex: any;
  setMobile: any;
}

type UnwrappedGoogleMapsProps = Omit<GoogleMapsProps, "apiKey" | "locale">;
let mapMarkerClusterer: { clearMarkers: () => void };
// let infoWindow:any = null;
const builtInCssClasses: Readonly<GoogleMapsCssClasses> = {
  googleMapsContainer: "locator-map-block",
};

/**
 * A component that renders a map with markers to show result locations.
 *
 * @param props - {@link GoogleMapsProps}
 * @returns A React element conatining a Google Map
 *
 * @public
 */
export function GoogleMaps(props: GoogleMapsProps) {
  return (
    <div>
      <UnwrappedGoogleMaps {...props} />
    </div>
  );
}

function UnwrappedGoogleMaps({
  centerLatitude,
  centerLongitude,
  defaultZoom: zoom,
  showEmptyMap,
  check,
  providerOptions,
  customCssClasses,
  mobile,
  activeIndex,
  setActiveIndex,
  setMobile,
}: UnwrappedGoogleMapsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [hover, setHover] = useState(true);
  const loading = useSearchState((s) => s.searchStatus.isLoading);

  // if(!infoWindow){ infoWindow = new google.maps.InfoWindow();}
  let center: any = {
    lat: Number,
    lng: Number,
  };
  let centerlast: any = {
    lat: Number,
    lng: Number,
  };
  const refLocationResults = useRef([]);
  const locationResults = useFetchResults() || [];
  refLocationResults.current = locationResults;
  useEffect(() => {}, [locationResults]);

  const handleMediaQueryChange = (mediaQuery: any) => {
    if (mediaQuery.matches) {
      map?.setZoom(8);
    }
  };
  locationResults.length > 0
    ? locationResults.map((result: any, i: number) => {
        if (i == 0 && result) {
          center = {
            lat: result.rawData.yextDisplayCoordinate
              ? result.rawData.yextDisplayCoordinate.latitude
              : result.rawData.displayCoordinate.latitude,
            lng: result.rawData.yextDisplayCoordinate
              ? result.rawData.yextDisplayCoordinate.longitude
              : result.rawData.displayCoordinate.longitude,
          };
        }
      })
    : (center = {
        lat: centerLatitude,
        lng: centerLongitude,
      });

  let info = false;
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  const noResults = !locationResults.length;
  let containerCssClass = cssClasses.googleMapsContainer;

  if (noResults && !showEmptyMap) {
    containerCssClass = twMerge(cssClasses.googleMapsContainer, "hidden");
  }

  const pinStyles = {
    fill: "#da261b", //default google red
    stroke: "#da261b",
    text: "white",
    fill_selected: "#000",
    stroke_selected: "#000",
    text_selected: "#fff",
  };

  const marker_icon = {
    // default google pin path
    /*path: "M18.942,56.14C2.965,32.568,0,30.149,0,21.486A21.3,21.3,0,0,1,21.111,0,21.3,21.3,0,0,1,42.222,21.486c0,8.663-2.965,11.082-18.942,34.654a2.614,2.614,0,0,1-4.339,0Zm2.17-25.7a8.954,8.954,0,1,0-8.8-8.953A8.875,8.875,0,0,0,21.111,30.439Z",*/
    url: Mapicon2,
    fillColor: pinStyles.fill,
    scale: 1,
    fillOpacity: 1,
    strokeColor: pinStyles.stroke,
    strokeWeight: 1,
    labelOrigin: new google.maps.Point(21, 22),
  };

  const bounds = new google.maps.LatLngBounds();
  const markers1 = useRef<google.maps.Marker[]>([]);
  const usermarker = useRef<google.maps.Marker[]>([]);
  const infoWindow = useRef(new google.maps.InfoWindow());
  deleteMarkers();
  userdeleteMarkers();
  const userlat: any = useSearchState((s) => s.location.locationBias) || [];
  const iplat = userlat.latitude;
  const iplong = userlat.longitude;
  const position = {
    lat: iplat,
    lng: iplong,
  };
  const Usermarker1 = new google.maps.Marker({
    position,
    map,
    icon: UserMarker,
  });
  usermarker.current.push(Usermarker1);
  try {
    if (mapMarkerClusterer) {
      mapMarkerClusterer.clearMarkers();
    }
  } catch (e) {}

  let i = 0;
  for (const result of locationResults) {
    i++;
    const position = getPosition(result);
    const marker = new google.maps.Marker({
      position,
      map,
      icon: Mapicon2,
      // label: {
      //   text: String(i),
      //   color: "white",
      // },
      // animation: google.maps.Animation.DROP
    });

    const location = new google.maps.LatLng(position.lat, position.lng);
    bounds.extend(location);
    markers1.current.push(marker);
  }

  if (markers1.current.length > 0) {
    const markers = markers1.current;
    mapMarkerClusterer = new MarkerClusterer({
      map,
      markers,
      renderer: {
        render: ({ markers, position: position }) => {
          return new google.maps.Marker({
            position: {
              lat: position.lat(),
              lng: position.lng(),
            },
            icon: clustericon,
            label: {
              text: String(markers?.length),
              color: "white",
            },
            //  animation: google.maps.Animation.DROP,
          });
        },
      },
    });
  }

  useEffect(() => {
    if (loading) {
      setHover(true);
    }
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
          ...providerOptions,
        })
      );
    } else if (markers1.current.length > 0 && map && check && hover) {
      const mediaQuery = window.matchMedia("(max-width: 1023px)");
      mediaQuery.addListener(handleMediaQueryChange);
      if (mobile) {
        handleMediaQueryChange(mediaQuery);
        setMobile(false);
      }
      bounds.extend(position);
      map?.fitBounds(bounds);
    }

    if (activeIndex != null && mobile) {
      setTimeout(() => {
        bounds.extend(position);
        map?.setCenter(position);
      }, 500);
      setTimeout(() => {
        map?.setZoom(13);
      }, 800);
      infoWindow.current.open(map, markers1.current[activeIndex]);
    }
    gridHover(markers1, Hovermap, Mapicon2);
    gridclick(markers1, Hovermap, Mapicon2, refLocationResults);
  }, [ref, center, map, providerOptions, zoom, position]);

  for (let i = 0; i < markers1.current.length; i++) {
    markers1.current[i].addListener("click", () => {
      setActiveIndex(i);
      setHover(false);
      if (!info) {
        markers1.current[i].setIcon(Hovermap);
      }
      const resultelement = document.getElementById(`result-${i + 1}`);
      if (resultelement) {
        resultelement.classList.add("active");
        resultelement.classList.add("fixed-hover");
      }

      const position = getPosition(locationResults[i]);

      Infowindow(i, locationResults[i]);
      scrollToRow(i);
      const currentZoom = map?.getZoom() || 17;
      console.log("currentZoom", currentZoom);

      setTimeout(() => {
        // bounds.extend(position);
        map?.setCenter(position);
      }, 500);

      setTimeout(() => {
        if (currentZoom && currentZoom < 19) {
          map?.setZoom(19);
        } else {
          map?.setZoom(currentZoom);
        }
      }, 800);

      infoWindow.current.open(map, markers1.current[i]);
    });

    markers1.current[i].addListener("mouseover", () => {
      if (hover) {
        markers1.current[i].setIcon(Hovermap);

        addActiveGrid(i);
      }
    });
    markers1.current[i].addListener("mouseout", () => {
      if (hover) {
        markers1.current[i].setIcon(Mapicon2);
      }
      if (hover) {
        removeActiveGrid(i);
      }
    });
  }

  if (infoWindow.current != null) {
    infoWindow.current.addListener("closeclick", () => {
      setHover(true);
      setActiveIndex(null);
      info = false;
      infoWindow.current.close();
      locationResults.map((result: any, index: number) => {
        const resultelement = document.querySelectorAll(
          `.result-list-inner-${index + 1}`
        );
        for (let index = 0; index < resultelement.length; index++) {
          resultelement[index].classList.remove("active", "fixed-hover");
        }
      });
      // bounds.extend(centerlast);
      bounds.extend(position);
      map?.fitBounds(bounds);
    });
  }

  function addActiveGrid(index: any) {
    const elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].classList.remove("active");
    }
    document.querySelectorAll(".result")[index].classList.add("active");
  }
  function removeActiveGrid(index: any) {
    const elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].classList.remove("active");
    }
    document.querySelectorAll(".result")[index].classList.remove("active");
  }
  function gridHover(
    markerPins: any,
    marker_hover_icon: any,
    marker_icon: any
  ) {
    const elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].addEventListener("mouseover", (e) => {
        if (hover) {
          markerPins.current[index].setIcon(marker_hover_icon);

          addActiveGrid(index);
        }
      });
      elements[index].addEventListener("mouseout", () => {
        if (hover) {
          // if(!info){
          if (elements[index].classList.contains("fixed-hover")) {
            markerPins.current[index].setIcon(marker_hover_icon);
          } else {
            markerPins.current[index].setIcon(marker_icon);
          }

          removeActiveGrid(index);
        }
      });
    }
  }
  function gridclick(
    markerPins: any,
    marker_hover_icon: any,
    marker_icon: any,
    locationResults: any
  ) {
    const elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      if (!elements[index].classList.contains("markerEventBinded")) {
        elements[index].classList.add("markerEventBinded");
        elements[index].addEventListener("click", (e) => {
          if (
            !(e.target as HTMLInputElement).classList.contains("notHighlight")
          ) {
            markerPins.current[index].setIcon(marker_icon);
            $(".result").removeClass("fixed-hover");
            locationResults.current.map((result: any, i: number) => {
              if (i == index && !mobile) {
                google.maps.event.trigger(markerPins.current[i], "click");
              }
            });
          }
        });
      }
    }
  }
  const metersToMiles = (meters: number) => {
    const miles = meters * 0.000621371;
    return miles.toFixed(2);
  };

  function Infowindow(i: number, result: any): void {
    info = true;
    let url = "";

    const name: any = result.rawData.name?.toLowerCase();
    const string1: any = name.toString();
    const result1: any = string1.replaceAll(" ", "-");
    if (!result.rawData.slug) {
      url = `${result.rawData.id}-${result1}`;
    } else {
      url = `${result.rawData.slug.toString()}`;
    }

    const MarkerContent = (
      <>
        {" "}
        <div className="flex w-full flex-col max-w-[24rem] pl-4  md:w-[22.5rem] font-main-font text-base">
          <div className="location-name-miles">
            <h2>
              <a className="inline-block notHighlight" href={url}>
                {result.rawData.name}
              </a>
            </h2>
            {result.distance ? (
              <div className="distance">
                <img src={map_marker} alt="" />
                {metersToMiles(result.distance ?? 0)}{" "}
                <span>{StaticData.miles}</span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="content-col info-window-content">
            <Address address={result.rawData.address} />
          </div>
          {result.rawData.mainPhone && (
            <div className="info-map notHighlight items-center">
              <div className="telephone">
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
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <a href="tel:01738 441566">{result.rawData.mainPhone}</a>
            </div>
          )}
          {result.rawData.hours && result.rawData.hours.reopenDate ? (
            ""
          ) : result.rawData.hours ? (
            <div className="">
              <OpenClose
                timezone={result.rawData.timezone}
                hours={result.rawData.hours}
                infowindow={true}
              />
            </div>
          ) : (
            <div className="closeddot notHighlight red-dot">
              <div className="location-icon">
                <div dangerouslySetInnerHTML={{ __html: houtsIcon }} />
              </div>
              <div className="hours-info closeddot">Closed</div>
            </div>
          )}
        </div>
        <div className="button-bx !ml-4 !mb-0">
          {result.rawData.displayCoordinate ? (
            <a
              data-listener="false"
              data-latitude={result.rawData.displayCoordinate.latitude}
              data-longitude={result.rawData.displayCoordinate.longitude}
              className="cursor-pointer  getdirection btn"
              rel="noopener noreferrer"
              data-city={result.rawData.address.city}
              data-country={result.rawData.address.countryCode}
              data-region={result.rawData.address.region}
            >
              {StaticData.getDirection}
            </a>
          ) : (
            <a
              data-listener="false"
              data-latitude={result.rawData.yextDisplayCoordinate.latitude}
              data-longitude={result.rawData.yextDisplayCoordinate.longitude}
              data-city={result.rawData.address.city}
              data-country={result.rawData.address.countryCode}
              data-region={result.rawData.address.region}
              className="cursor-pointer getdirection1 btn"
              rel="noopener noreferrer"
            >
              {StaticData.getDirection}
            </a>
          )}
        </div>
      </>
    );

    const string = renderToString(MarkerContent);
    infoWindow.current.setContent(string);
    // infoWindow.current.setOptions();
  }

  google.maps.event.addListener(infoWindow.current, "domready", () => {
    let inputs;
    inputs = document.getElementsByClassName("getdirection");
    if (inputs.length == 0) {
      inputs = document.getElementsByClassName("getdirection1");
    }
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("click", GetDirection);
    }
  });

  function GetDirection(e: any) {
    let origin: any = null;

    if (e.target.dataset.city) {
      origin = e.target.dataset.city;
    } else if (e.target.dataset.region) {
      origin = e.target.dataset.region;
    } else {
      origin = e.target.dataset.country;
    }
    if (navigator.geolocation) {
      const error = (error: any) => {
        const getDirectionUrl =
          "https://www.google.com/maps/dir/?api=1&destination=" +
          e.target.dataset.latitude +
          "," +
          e.target.dataset.longitude +
          "&origin=" +
          origin +
          ",UK";
        window.open(getDirectionUrl, "_blank");
      };
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const currentLatitude = position.coords.latitude;
          const currentLongitude = position.coords.longitude;
          const getDirectionUrl =
            "https://www.google.com/maps/dir/?api=1&destination=" +
            e.target.dataset.latitude +
            "," +
            e.target.dataset.longitude +
            "&origin=" +
            currentLatitude +
            "," +
            currentLongitude;
          window.open(getDirectionUrl, "_blank");
        },
        error,
        {
          timeout: 10000,
        }
      );
    }
  }

  function deleteMarkers(): void {
    for (let i = 0; i < markers1.current.length; i++) {
      markers1.current[i].setMap(null);
      map?.setCenter(center);
    }
    markers1.current = [];
  }
  function userdeleteMarkers(): void {
    for (let i = 0; i < usermarker.current.length; i++) {
      usermarker.current[i].setMap(null);
    }
    usermarker.current = [];
  }

  return (
    <>
      <div className={containerCssClass} ref={ref} />
    </>
  );
}

function getPosition(result: Result) {
  const lat = result.rawData.yextDisplayCoordinate
    ? (result.rawData as any).yextDisplayCoordinate.latitude
    : (result.rawData as any).displayCoordinate.latitude;
  const lng = result.rawData.yextDisplayCoordinate
    ? (result.rawData as any).yextDisplayCoordinate.longitude
    : (result.rawData as any).displayCoordinate.longitude;
  return { lat, lng };
}

function scrollToRow(index: any) {
  const result: any = [].slice.call(
    document.querySelectorAll(`.result`) || []
  )[0];
  const offset: any = [].slice.call(document.querySelectorAll(`.result`) || [])[
    index
  ];

  // alert(offset.offsetTop-result.offsetTop);
  const o = offset.offsetTop - result.offsetTop;

  [].slice
    .call(document.querySelectorAll(".scrollbar-container") || [])
    .forEach(function (el: any) {
      el.scrollTop = o;
    });
}
