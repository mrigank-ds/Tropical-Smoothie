import { useSearchActions } from "@yext/search-headless-react";
import { useEffect, useState, useRef } from "react";
import * as React from "react";
import LocationCard from "./LocationCard";
import { GoogleMaps } from "./GoogleMaps";
import { useSearchState } from "@yext/search-headless-react";
import Geocode from "react-geocode";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import {
  AnswerExperienceConfig,
  center_latitude,
  center_longitude,
  googleApikey,
  UseMylocationsvg,
} from "../../sites-global/global";
import { StaticData } from "../../sites-global/staticData";
import FilterSearch from "../locatorPage/FilterSearch";
import ViewMore from "./ViewMore";
import VerticalResults from "../VerticalResults";
import ResultsCount from "./ResultsCount";
import useFetchResults from "../../hooks/useFetchResults";
import useGetPostalCodeLatLng from "../../hooks/useGetPostalCodeLatLng";
import { Wrapper } from "@googlemaps/react-wrapper";
import $ from "jquery";
import Skeleton from "react-loading-skeleton";
// import Banner from "../locationDetail/banner";
import homeicon from "../../images/home.png";
var params1: any = { latitude: center_latitude, longitude: center_longitude };
let mapzoom = 8;
const centerLatitude = center_latitude;
const centerLongitude = center_longitude;
const SearchLayout = (props: any): JSX.Element => {
  type FilterHandle = React.ElementRef<typeof FilterSearch>;
  const filterRef = useRef<FilterHandle>(null);
  const locationResults = useFetchResults() || [];
  const locationinbuit =
    useSearchState((state) => state.vertical?.results) || [];
  const [startgeocode, setStartGeoCode] = useState(false);
  const [displaymsg, setDisplaymsg] = useState(false);
  const [inputvalue, setInputValue] = React.useState("");
  const [errorstatus, setErrorStatus] = useState(false);
  const [postalLoading, setPostalLoading] = useState(false);
  const [checkallowed, setCheckAllowed] = useState(false);
  const { postalcode } = useGetPostalCodeLatLng();
  const [mobile, setMobile] = useState(false);
  const [allowlocation, setallowLocation] = React.useState("");
  const [allowresult, setAllowResult] = useState(false);
  const searchActions = useSearchActions();
  const loading = useSearchState((s) => s.searchStatus.isLoading);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [check, setCheck] = useState(false);
  const [newparam, SetNewparam] = React.useState({ latitude: 0, longitude: 0 });
  const [isLoading, setIsloading] = React.useState(true);
  var firstTimeRunners = true;

  const FirstLoad = () => {
    setCheck(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const params: any = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          params1 = params;
          SetNewparam(params1);
          mapzoom = 3;
          filterRef.current?.setParam(params);
          searchActions.setUserLocation(params1);
          searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
          searchActions.executeVerticalQuery();
        },
        function (error) {
          // eslint-disable-next-line no-empty
          if (error.code == error.PERMISSION_DENIED) {
          }
        }
      );
    }
    params1 = {
      latitude: 54.9191,
      longitude: -1.3692,
    };
    SetNewparam(params1);
    // mapzoom=8;
    filterRef.current?.setParam(params1);
    searchActions.setUserLocation(params1);
    searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
    searchActions.executeVerticalQuery();
    setTimeout(() => {
      setIsloading(false);
      $("body").removeClass("overflow-hidden");
    }, 3100);
  };

  const handleMediaQueryChange = (mediaQuery: any) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const onClick = () => {
    if (navigator.geolocation) {
      const error = (error: any) => {
        if (error.code == 1) {
          setallowLocation("Please allow your Location");
          setCheckAllowed(false);
        }
      };

      navigator.geolocation.getCurrentPosition(
        function (position) {
          Geocode.setApiKey(googleApikey);
          const inputformat = "";
          Geocode.fromLatLng(
            position.coords.latitude,
            position.coords.longitude
          ).then(
            (response: any) => {
              if (response.results[0]) {
                filterRef.current &&
                  filterRef.current.setInputValue(
                    response.results[0].formatted_address
                  );
                setallowLocation("");
                setErrorStatus(false);
                setAllowResult(true);
                setCheckAllowed(true);
              }
            },
            (error: any) => {
              console.error(error);
              setCheckAllowed(false);
            }
          );

          const params = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          mapzoom = 3;
          searchActions.setQuery("");
          searchActions.setVertical("locations");
          searchActions.setUserLocation(params);
          searchActions.setOffset(0);
          searchActions.executeVerticalQuery();
        },
        error,
        {
          timeout: 10000,
        }
      );
    }
  };

  const handleInputValue = () => {
    setInputValue("");
  };
  const handleSetUserShareLocation = (value: any, userShareStatus: boolean) => {
    setInputValue(value);
    if (userShareStatus) {
    }
  };
  function updateParam(latestUserInput: any) {
    var paramValue = latestUserInput; // Replace with your updated value
    var searchParams = new URLSearchParams(window.location.search);
    searchParams.set("myParam", paramValue);
    var newUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      searchParams.toString();
    window.history.replaceState({}, "", newUrl);
  }

  async function getCoordinates(address: string) {
    searchActions.setQuery("");
    if (address != "") {
      setErrorStatus(false);
      filterRef.current?.setInputValue(address);
      setPostalLoading(true);
      postalcode(address, params1, checkallowed);
    } else {
      setErrorStatus(true);
    }
  }

  const addClass = () => {
    document.body.setAttribute("class", "mapView");
    setMobile(true);
  };

  useEffect(() => {
    if (locationinbuit.length > 0) {
      setDisplaymsg(false);
    }
  }, [locationinbuit]);

  useEffect(() => {
    locationResults.map((result: any, index: number) => {
      const resultelement = document.querySelectorAll(
        `.result-list-inner-${index + 1}`
      );
      for (let index = 0; index < resultelement.length; index++) {
        if (
          resultelement[index].classList.contains("active") ||
          resultelement[index].classList.contains("fixed-hover")
        ) {
          resultelement[index].classList.remove("active", "fixed-hover");
        }
      }
    });
  }, [loading]);
  useEffect(() => {
    if (firstTimeRunners) {
      firstTimeRunners = false;
      FirstLoad();
    }
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);
  function Box({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div
        style={{
          display: "block",
          lineHeight: 2,
          padding: "1rem",
          marginBottom: "0.5rem",
        }}
      >
        {children}
      </div>
    );
  }
  function verticalbox({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div
        style={{
          display: "inline",
          width: 100,
          marginBottom: 100,
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <>
      <Wrapper
        apiKey={googleApikey}
        language={AnswerExperienceConfig.locale}
        libraries={["places", "geometry"]}
      >
        <div className="breadcrumb">
          <div className="container-custom">
            <ul>
              <li>
                <a href="#" className="home">
                  {" "}
                  <img src={homeicon} alt="" />
                </a>
              </li>
              <li>{StaticData.locator_breadcrumb}</li>
            </ul>
          </div>
        </div>
        {/* <Banner
          data={props._site}
          c_bannerCta={undefined}
          c_banner={undefined}
        /> */}

        <div className="locator-main">
          {allowlocation.length > 0 ? (
            <div className="for-allow">{allowlocation}</div>
          ) : (
            ""
          )}
          <div className="search-bx">
            <div className="location-with-filter">
              {isLoading ? (
                <Skeleton count={1} />
              ) : (
                <h1 className="">{StaticData.FindLocationtext}</h1>
              )}
            </div>
            {isLoading ? (
              <Skeleton count={1} />
            ) : (
              <div className="search-field">
                <FilterSearch
                  ref={filterRef}
                  setCheckAllowed={setCheckAllowed}
                  errorstatus={errorstatus}
                  setErrorStatus={setErrorStatus}
                  checkallowed={checkallowed}
                  displaymsg={displaymsg}
                  getCoordinates={getCoordinates}
                  updateParam={updateParam}
                  setPostalLoading={setPostalLoading}
                  setDisplaymsg={setDisplaymsg}
                  customCssClasses={{
                    filterSearchContainer: "m-2 w-full",
                    inputElement: "FilterSearchInput pr-[90px]",
                    optionsContainer: "options",
                  }}
                  setAllowResult={setAllowResult}
                  inputvalue={inputvalue}
                  setSearchInputValue={setInputValue}
                  params={params1}
                  startgeocode={startgeocode}
                  setStartGeoCode={setStartGeoCode}
                  searchFields={[
                    {
                      entityType: "location",
                      fieldApiName: "address.postalCode",
                    },
                    {
                      entityType: "location",
                      fieldApiName: "address.city",
                    },
                    {
                      entityType: "location",
                      fieldApiName: "address.region",
                    },
                  ]}
                  handleInputValue={handleInputValue}
                  handleSetUserShareLocation={handleSetUserShareLocation}
                  label={""}
                  sectioned={false}
                  searchInputValue={undefined}
                  handleEndPoimtCallBack={props.handleEndPoimtCallBack}
                />
              </div>
            )}

            <div className="fliter-sec block">
              {isLoading ? (
                <Skeleton count={1} width={100} />
              ) : (
                <button
                  className="useMyLocation"
                  title="Search using your current location!"
                  id="useLocation"
                  onClick={onClick}
                >
                  <span
                    className="icon"
                    dangerouslySetInnerHTML={{ __html: UseMylocationsvg }}
                  />
                  {isSmallScreen ? (
                    <span className=""> {StaticData.Usemylocation}</span>
                  ) : (
                    <span className=""> {StaticData.UsemylocationDesktop}</span>
                  )}
                </button>
              )}
              {isLoading ? (
                <Skeleton count={1} width={100} />
              ) : (
                <ResultsCount
                  customCssClasses={{
                    container: "my-0 text-dark-gray pt-5 sm:pt-0",
                  }}
                  postalLoading={postalLoading}
                  allowresult={allowresult}
                  inputvalue={inputvalue}
                />
              )}
            </div>
          </div>
          <div className="mobile-btns">
            <div className="button-bx">
              <a
                className="btn listBtn"
                href="javascript:void(0);"
                onClick={() => {
                  document.body.classList.remove("mapView");
                }}
              >
                {" "}
                List View
              </a>
              <a
                className="btn mapBtn"
                href="javascript:void(0);"
                onClick={addClass}
              >
                {" "}
                Map View
              </a>
            </div>
          </div>
          <div className=" map-section ">
            {isLoading ? (
              <Skeleton
                wrapper={Box}
                count={1}
                width={600}
                height={1000}
                direction={"ltr"}
              />
            ) : (
              <GoogleMaps
                mobile={mobile}
                setMobile={setMobile}
                apiKey={googleApikey}
                centerLatitude={centerLatitude}
                centerLongitude={centerLongitude}
                check={true}
                defaultZoom={mapzoom}
                activeIndex={activeIndex}
                setActiveIndex={(i: React.SetStateAction<number | null>) =>
                  setActiveIndex(i)
                }
                showEmptyMap={true}
              />
            )}
          </div>

          <div className="left-listing">
            {isLoading ? (
              <Skeleton
                wrapper={verticalbox}
                count={1}
                height={200}
                direction={"ltr"}
              />
            ) : (
              <PerfectScrollbar>
                <div>
                  <VerticalResults
                    displayAllOnNoResults={false}
                    CardComponent={LocationCard}
                    postalLoading={postalLoading}
                    locationResults={locationResults}
                    mode={props.mode}
                    customCssClasses={{
                      container:
                        "result-list flex flex-col scroll-smooth  overflow-auto",
                    }}
                  />

                  {locationResults && locationResults.length <= 0 ? (
                    <div className="browse-dir">
                      <a className="underline " href="/gb">
                        Use the search above or{" "}
                        <span className="font-second-main-font">
                          {" "}
                          browse our directory
                        </span>
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="button-bx">
                    <ViewMore
                      className={
                        " btn notHighlight lg:!w-[132%] !mb-2 button view-more"
                      }
                      idName={"view-more-button"}
                      buttonLabel={"View More"}
                    />
                  </div>
                </div>
              </PerfectScrollbar>
            )}
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default SearchLayout;
