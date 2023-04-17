/* eslint-disable react/prop-types */
import * as React from "react";
// import Banner from "../components/banner";
import GetDirection from "../components/commons/GetDirection";
import constant from "../constant";
// import { stagingBaseUrl } from "../constants";
// import bannerImage from "../images/banner.png"
import "../index.css";
var currentUrl = "";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import BreadCrumbs from "../components/layouts/Breadcrumb";
import Banner from "../components/locationDetail/banner";
import storedetail from "../images/store-detail.svg";
import map_marker from "../images/map-marker.svg";
import { StaticData } from "../sites-global/staticData";
import { Addresssvg, favicon, mobilesvg, regionNames, stagingBaseurl } from "../sites-global/global";
import { JsonLd } from "react-schemaorg";
import Address from "../components/commons/Address";
import PageLayout from "../components/layouts/PageLayout";
import OpenClose from "../components/commons/openClose";
import timesvg from "../images/watch-icn.svg";
import { Link } from "@yext/pages/components";
import Amunities from "../components/locationDetail/Amunities";
var currentUrl = "";
export const config: TemplateConfig = {
  stream: {
    $id: "tropical-city",
    filter: {
      entityTypes: ["ce_city"],
      savedFilterIds: ["dm_tropical-smoothie_address_city"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.emails",
      // "dm_directoryChildren.c_facility",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.name",
      "dm_directoryChildren.id",
      "dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryChildren.address",
      "dm_directoryChildren.hours",
      "dm_directoryChildren.yextDisplayCoordinate"
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  let url: any = ""
  document.dm_directoryParents.map((i: any) => {
    
    // if (i.meta.entityType.id == 'ce_country') {
    //   url = `${i.slug}`
    // }
     if (i.meta.entityType.id == 'ce_region') {
      url = `${url}/${i.slug}/${document.slug.toString()}`
    }
  })
  return url;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  let canonical="";
   document.dm_directoryChildren.map((entity: any) => {
      canonical=  entity.address.countryCode.toLowerCase().replaceAll(" ", "-") + '/' +  entity.address.region.toLowerCase().replaceAll(" ", "-");
          })

  return {
    title: `${document.c_meta_title?document.c_meta_title:`Tropical Smoothie Stores in ${document.name} | Find a Local Store`}`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          href: "http://dynl.mktgcdn.com/p/VH99ZDrASGlb5cI8Z1vkKpQiXZ81T_7BII6gXBKvhS4/339x72.png",
        },
      }
    ],
  };
};

const City: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    name,
    dm_directoryParents,
    dm_directoryChildren,
    c_globalData,
    c_canonical,
    c_metaDescription,
    c_metaTitle,
    _site,
  } = document;
  let address;
  let c_companyrn;
  let c_footerLinks;
  let c_headerLinks1;
  let c_phoneNumber;
  let facebookPageUrl;
  let instagramHandle;
  let twitterHandle;
  let c_tikTok;
  // var sortedChildren = dm_directoryChildren.sort(function (a: any, b: any) {
  //   var a = a.name;
  //   var b = b.name;
  //   return a < b ? -1 : a > b ? 1 : 0;
  // });

  let slugString = "";
  document.dm_directoryParents.forEach((e: any) => {
    slugString += e.slug + "/";
  });

  const childrenDivs = dm_directoryChildren.map((entity: any) => {

    let origin: any = null;
    if (entity.address.city) {
      origin = entity.address.city;
    } else if (entity.address.region) {
      origin = entity.address.region;
    } else {
      origin = entity.address.country;
    }


    
    // let key: any = Object.keys(entity.hours)[0];
    let url = "";
    const name: any = entity.name.toLowerCase();
    const region: any = entity.address.region.toLowerCase();
    const initialregion: any = region.toString();
    const finalregion: any = initialregion.replaceAll(" ", "-");
    const city: any = entity.address.city.toLowerCase();
    const initialrcity: any = city.toString();
    const finalcity: any = initialrcity.replaceAll(" ", "-");
    const string: any = entity.address.line1.toLowerCase();
    const result: any = string.replaceAll(" ", "-");
    const finalresult: any = constant.slugify(result);
    if (!entity.slug) {
      url = `${city}/${finalresult}`;
    } else {
      url = `${city}/${constant.slugify(entity.slug)}`;
    }
    const metersToMiles = (meters: number) => {
      const miles = meters * 0.000621371;
      return miles.toFixed(2);
    };
    console.log(url,"url")
  


    return (
      <div className="nearby-card" key={entity.name}>
      <div className="location-name-miles icon-row">
        <h2>
          <Link
            className="inline-block notHighlight"
            href={url}
            data-ya-track={`${entity.name}`}
            eventName={`${entity.name}`}
            rel="noopener noreferrer"
          >
            {entity.name}
          </Link>
        </h2>
      </div>
      <div className="distance mt-4">
        {typeof entity.distance != "undefined" ? (<>
           <img src={map_marker} alt="" />
          <div className="">
            {metersToMiles(entity.distance)}{" "}
            <span>{StaticData.miles}</span>
          </div></>
        ) : (
          ""
        )}
      </div>
      <div className="icon-row content-col">
        <Address address={entity.address} />
      </div>
      {entity.mainPhone && (
        <div className="address notHighlight items-center">
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
                    fillRule="evenodd"
                  />
                </g>
              </g>
            </svg>
          </div>
          <a href={`tel:${entity.mainPhone}`}>{entity.mainPhone}</a>
        </div>
      )}

      {entity.emails && (
        <div className="address notHighlight items-center mt-3">
          <div className="email">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 9"
            >
              <path
                id="Icon_awesome-envelope"
                data-name="Icon awesome-envelope"
                d="M11.773,7.472a.141.141,0,0,1,.227.11v4.793A1.125,1.125,0,0,1,10.875,13.5H1.125A1.125,1.125,0,0,1,0,12.375V7.584a.14.14,0,0,1,.227-.11c.525.408,1.221.926,3.612,2.662A4.193,4.193,0,0,0,6,11.252a4.2,4.2,0,0,0,2.163-1.116C10.554,8.4,11.248,7.88,11.773,7.472ZM6,10.5c.544.009,1.327-.684,1.72-.97,3.11-2.257,3.347-2.454,4.064-3.016A.561.561,0,0,0,12,6.07V5.625A1.125,1.125,0,0,0,10.875,4.5H1.125A1.125,1.125,0,0,0,0,5.625V6.07a.564.564,0,0,0,.216.443c.717.56.954.759,4.064,3.016C4.673,9.816,5.456,10.509,6,10.5Z"
                transform="translate(0 -4.5)"
                fill="#fff"
              />
            </svg>
          </div>
          <a href="mailto:mgmPerth@mgmtimber.com">
            {entity.emails[0]}
          </a>
        </div>
      )}

      <div className="icon-row closeing-div">
        {entity.hours ? (
          <div
            className="flex open-now-string items-center "
            data-id={`main-shop-${entity.id}`}
          >
            <OpenClose
              timezone={entity.timezone}
              hours={entity.hours}
              deliveryHours={entity.hours}
            ></OpenClose>
          </div>
        ) : (
          <div className="closeddot notHighlight red-dot">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              viewBox="0 0 8 8"
            >
              <circle
                id="Ellipse_5"
                data-name="Ellipse 5"
                cx="4"
                cy="4"
                r="4"
                fill="#ad1e1f"
              />
            </svg>
            <div className="hours-info text-lg font-second-main-font closeddot">
              Closed
            </div>
          </div>
        )}
      </div>
      <div className="icon-row content-col availability-col">
        {/* {entity.c_facility && (
          <Amunities c_facility={entity.c_facility} />
        )} */}
      </div>
      <div className="button-bx">
        <GetDirection
          buttonText={
            entity.c_getDirectionsCTAText
              ? entity.c_getDirectionsCTAText
              : "Get directions"
          }
          address={entity.address}
          latitude={
            entity.displayCoordinate
              ? entity.displayCoordinate.latitude
              : entity.yextDisplayCoordinate.latitude
          }
          detailpage={false}
          longitude={
            entity.displayCoordinate
              ? entity.displayCoordinate.longitude
              : entity.yextDisplayCoordinate.longitude
          }
        />

        <Link
          className="btn"
          href={url}
          data-ya-track={`viewstore-${entity.name}`}
          eventName={`viewstore-${entity.name}`}
          rel="noopener noreferrer"
        >
          <img src={storedetail} alt="" />
          {StaticData.StoreDetailbtn}
        </Link>
      </div>
    </div>
  );
  });

  c_globalData &&
    c_globalData.map((i: any) => {
      address = i.address ? i.address : [];
      c_companyrn = i.c_companyrn ? i.c_companyrn : "";
      c_footerLinks = i.c_footerLinks ? i.c_footerLinks : [];
      c_headerLinks1 = i.c_headerLinks1 ? i.c_headerLinks1 : [];
      c_phoneNumber = i.phoneNumber ? i.phoneNumber : "";
      facebookPageUrl = i.facebookPageUrl ? i.facebookPageUrl : "";
      instagramHandle = i.instagramHandle ? i.instagramHandle : "";
      twitterHandle = i.twitterHandle ? i.twitterHandle : "";
      c_tikTok = i.c_tikTok ? i.c_tikTok : "";
    });

  let url: any = ""

  document.dm_directoryParents.map((i: any) => {
    if (i.meta.entityType.id == 'ce_country') {
      url = `${i.slug}`
    }
    else if (i.meta.entityType.id == 'ce_region') {
      url = `${url}/${i.slug}/${document.slug.toString()}`
    }
  })
  const breadcrumbScheme: any = [];
  let currentIndex: any = 0;
  dm_directoryParents &&
    dm_directoryParents.map((i: any, index: any) => {
      currentIndex = index;
      if (index != 0) {
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id": `${constant.stagingBaseurl}${i.slug}`,
            name: i.name,
          },
        });
      }
    });

  breadcrumbScheme.push({
    "@type": "ListItem",
    position: currentIndex + 1,
    item: {
      "@id": `${constant.stagingBaseurl}/${document.slug.toString()}`,
      name: document.name,
    },
  });
  return (
    <>
      <JsonLd<Organization>
        item={{
          "@context": "https://schema.org",
          "@type": "Store",
          name: "Matalan",
          //   url: _site.c_canonical,
          // logo: `${document.c_ogImage ? document.c_ogImage.map((result:any)=>{return result.url}) : ""}`
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",

          itemListElement: breadcrumbScheme,
        }}
      />
      <PageLayout global={_site}>
        <BreadCrumbs
          name={name}
          address={address}
          parents={dm_directoryParents}
          baseUrl={relativePrefixToRoot}
        ></BreadCrumbs>

        <div className="content-list city-page">
          <div className="container mx-auto">
            <div className="sec-title">
              <h2>
              Tropica Smoothie stores in {name}
              </h2>
            </div>
            <div className="flex flex-wrap justify-center items-start -mx-2.5 lg:-mx-[.9375rem]">
              {childrenDivs}
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};
export default City;