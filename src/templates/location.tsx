/* eslint-disable no-empty */
/* eslint-disable no-self-assign */
/* eslint-disable react/prop-types */
/* eslint-disable no-prototype-builtins */
import * as React from "react";
import Contact from "../components/locationDetail/contact";
import Nearby from "../components/locationDetail/Nearby";
import { JsonLd } from "react-schemaorg";
import { nearByLocation } from "../types/nearByLocation";
import "../index.css";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  TransformProps,
  HeadConfig,
} from "@yext/pages";
import PageLayout from "../components/layouts/PageLayout";
import { fetch } from "@yext/pages/util";
import About from "../components/locationDetail/About";
import CustomMap from "../components/locationDetail/CustomMap";
import BreadCrumbs from "../components/layouts/Breadcrumb";
import Faq from "../components/locationDetail/Faqs";
import { StaticData } from "../sites-global/staticData";
import {
  AnswerExperienceConfig,
  apiKey,
  experienceKey,
  stagingBaseurl,
  verticalKey,
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
  favicon,
} from "../sites-global/global";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
  Link,
} from "@yext/pages/components";
import constant from "../constant";
import Banner from "../components/locationDetail/banner";
import AvailableStock from "../components/locationDetail/AvailableStock";
import MeetOurTeam from "../components/locationDetail/MeetOurTeam";
import FeaturesBrand from "../components/locationDetail/FeaturesBrand";
import TakeALook from "../components/locationDetail/TakeALook";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "locations",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "hours",
      "slug",
      "yextDisplayCoordinate",
      "displayCoordinate",
      "cityCoordinate",
      "description",
      "dm_directoryParents.name",
      "dm_directoryParents.dm_baseEntityCount",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  let url = "";
  const name: any = document.name.toLowerCase();
  const string: any = name.toString();
  const result: any = string.replaceAll(" ", "-");
  const finalresult: any = constant.slugify(result);
  if (typeof document.slug == "undefined") {
    url += `${document.id}-${finalresult}`;
  } else {
    url += `${constant.slugify(document.slug)}`;
  }
  return url;
};
/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.c_meta_title
      ? document.c_meta_title
      : `${document.name} Store of Tropical Smoothie`,
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
type ExternalApiData = TemplateProps & { externalApiData: nearByLocation };
export const transformProps: TransformProps<ExternalApiData> = async (
  data: any
) => {
  const location = `${
    data.document.yextDisplayCoordinate
      ? data.document.yextDisplayCoordinate.latitude
      : data.document.displayCoordinate.latitude
  },${
    data.document.yextDisplayCoordinate
      ? data.document.yextDisplayCoordinate.longitude
      : data.document.displayCoordinate.longitude
  }`;

  const url = `${AnswerExperienceConfig.endpoints.verticalSearch}?experienceKey=${experienceKey}&api_key=${apiKey}&v=20220511&version=${AnswerExperienceConfig.experienceVersion}&locale=${AnswerExperienceConfig.locale}&location=${location}&locationRadius=${AnswerExperienceConfig.locationRadius}&verticalKey=${verticalKey}&limit=4&retrieveFacets=true&skipSpellCheck=false&sessionTrackingEnabled=true&source=STANDARD`;

  const externalApiData = (await fetch(url).then((res: any) =>
    res.json()
  )) as nearByLocation;
  return { ...data, externalApiData };
};

type ExternalApiRenderData = TemplateRenderProps & {
  externalApiData: nearByLocation;
};

const Location: Template<ExternalApiRenderData> = ({
  relativePrefixToRoot,
  path,
  document,
  __meta,
  externalApiData,
}) => {
  const {
    _site,
    name,
    address,
    mainPhone,
    photoGallery,
    hours,
    description,
    displayCoordinate,
    cityCoordinate,
    timezone,
    slug,
    emails,
    yextDisplayCoordinate,
   dm_directoryParents,
  } = document;

  const templateData = { document: document, __meta: __meta };
  const hoursSchema = [];
  const breadcrumbScheme = [];
  for (const key in hours) {
    if (hours.hasOwnProperty(key)) {
      let openIntervalsSchema: Object = "";
      if (key !== "holidayHours") {
        if (hours[key].isClosed) {
          openIntervalsSchema = {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: key,
          };
        } else {
          let end = "";
          let start = "";
          if (typeof hours[key].openIntervals != "undefined") {
            const openIntervals = hours[key].openIntervals;
            for (const o in openIntervals) {
              if (openIntervals.hasOwnProperty(o)) {
                end = openIntervals[o].end;
                start = openIntervals[o].start;
              }
            }
          }
          openIntervalsSchema = {
            "@type": "OpeningHoursSpecification",
            closes: end,
            dayOfWeek: key,
            opens: start,
          };
        }
      } else {
      }

      hoursSchema.push(openIntervalsSchema);
    }
  }
  document.dm_directoryParents &&
    document.dm_directoryParents.map((i: any, index: any) => {
      if (i.meta.entityType.id == "ce_country") {
        document.dm_directoryParents[index].name =
          document.dm_directoryParents[index].name;
        document.dm_directoryParents[index].slug =
          document.dm_directoryParents[index].slug;

        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id":
              stagingBaseurl +
              document.dm_directoryParents[index].slug ,
            name: i.name,
          },
        });
      } else if (i.meta.entityType.id == "ce_region") {
        let url = "";
        document.dm_directoryParents.map((j: any) => {
          if (
            j.meta.entityType.id != "ce_region" &&
            j.meta.entityType.id != "ce_city" &&
            j.meta.entityType.id != "ce_root"
          ) {
            url = url + j.slug;
          }
        });
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id":
              stagingBaseurl +
              url +
              "/" +
              document.dm_directoryParents[index].slug ,
            name: i.name,
          },
        });
      } else if (i.meta.entityType.id == "ce_city") {
        let url = "";
        document.dm_directoryParents.map((j: any) => {
          if (
            j.meta.entityType.id != "ce_city" &&
            j.meta.entityType.id != "ce_root"
          ) {
            url = url + "/" + j.slug;
          }
        });
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id":
              stagingBaseurl +
              url +
              "/" +
              document.dm_directoryParents[index].slug ,
            name: i.name,
          },
        });
      }
    });

  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 4,
    item: {
      "@id": stagingBaseurl + path,
      name: document.name,
    },
  });
  const imageurl = photoGallery
    ? photoGallery.map((element: any) => {
        return element.image.url;
      })
    : null;

  return (
    <>
      {/* <JsonLd<Store>
        item={{
          "@context": "https://schema.org",
          "@type": "DepartmentStore",
          name: name,
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.countryCode,
          },
          openingHoursSpecification: hoursSchema,
          description: description,
          image: imageurl,
          telephone: mainPhone,
          url: `${c_canonical ? c_canonical : stagingBaseurl}${
            slug ? slug : `${name}`
          }`,
        }}
      /> */}
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",

          itemListElement: breadcrumbScheme,
        }}
      />
      {/* {c_relatedfaq ? (
        <>
          <JsonLd<FAQPage>
            item={{
              "@context": "https://schema.org",
              "@type": "FAQPage",

              mainEntity:
                c_relatedfaq &&
                c_relatedfaq.map((i: any) => {
                  return {
                    "@type": "Question",
                    name: i.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: `<p>${i.answer}</p>`,
                    },
                  };
                }),
            }}
          />
        </>
      ) : (
        <></>
      )} */}

      {/* <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={""}> */}
          <PageLayout global={_site}>
            <BreadCrumbs
              name={name}
              parents={dm_directoryParents}
              baseUrl={relativePrefixToRoot}
              address={undefined}
            ></BreadCrumbs>
            {/* {c_banner && c_bannerCta && (
              <Banner
                data={undefined}
                c_banner={c_banner}
                c_bannerCta={c_bannerCta}
              />
            )} */}
            <div className="location-information">
              <Contact
                address={address}
                phone={mainPhone}
                name={name}
                email={emails && emails[0]}
                timezone={timezone}
                latitude={
                  yextDisplayCoordinate
                    ? yextDisplayCoordinate.latitude
                    : displayCoordinate?.latitude ? displayCoordinate?.latitude :cityCoordinate.latitude
                }
                yextDisplayCoordinate={yextDisplayCoordinate}
                longitude={
                  yextDisplayCoordinate
                    ? yextDisplayCoordinate.longitude
                    : displayCoordinate?.longitude ? displayCoordinate.longitude : cityCoordinate.longitude
                }
                hours={hours}
              ></Contact>
              {hours ? (
                <div className="map-sec" id="map_canvas">
                  <CustomMap
                    prop={
                      yextDisplayCoordinate
                        ? yextDisplayCoordinate
                        : displayCoordinate
                    }
                  />
                </div>
              ) : (
                <div className="map-sec without-hours" id="map_canvas">
                  <CustomMap
                    prop={
                      yextDisplayCoordinate
                        ? yextDisplayCoordinate
                        : displayCoordinate
                    }
                  />
                </div>
              )}
            </div>

            {/* {c_aboutInformation && (
              <About c_aboutInformation={c_aboutInformation} />
            )}

            {c_availableStockInformation && (
              <AvailableStock
                c_availableStockInformation={c_availableStockInformation}
              />
            )}

            {c_meetOurTeamHeading && c_meetTeam &&
              <MeetOurTeam
                c_meetOurTeamHeading={c_meetOurTeamHeading}
                c_meetTeam={c_meetTeam}
              />} */}
            {/* {c_relatedfaq && (
            <div className="faq-sec">
            <div className="container-custom1">
                <Faq faqs={c_relatedfaq} c_faqHeading={c_faqHeading} c_readMoreCta={c_readMoreCta} />
            </div>
            </div>
            )} */}
              {(yextDisplayCoordinate ||
            cityCoordinate ||
            displayCoordinate) && 
            <div className="nearby-sec">
              <div className="container-custom1">
                <div className="sec-title">
                  <h2 className="">
                    {/* {c_nearbyTitile ? c_nearbyTitile : StaticData.NearStoretext} */} Nearby Locations
                  </h2>
                </div>
                  {/* <Nearby
                    externalApiData={externalApiData}
                    c_nearbyTitile={c_nearbyTitile}
                    c_viewmoreCta={c_viewmoreCta}
                  /> */}
              </div>
            </div>
              }
            {/* {c_branchImage && (
            <div className="gallery">
            <div className="container-custom1">
              <TakeALook
                c_branchImage={c_branchImage}
                c_branchHeading={c_branchHeading}
              />
            </div>
            </div> )} */}

            {/* {c_featuredBrandPhotos && (
            <div className="featuredBrand">
            <div className="container-custom1">
              <FeaturesBrand
                c_features_brand={c_featuredBrandPhotos}
                name={c_featuredBrandTitle}
              />
            </div>
            </div>
               )} */}

            
        
          </PageLayout>
        
    </>
  );
};

export default Location;
