import * as React from "react";
import "../index.css";
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
import constant from "../constant";
import Banner from "../components/locationDetail/banner";
import PageLayout from "../components/layouts/PageLayout";
import { favicon, stagingBaseurl } from "../sites-global/global";
import { StaticData } from "../sites-global/staticData";



/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "tropical-region",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.dm_baseEntityCount",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.address",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.address"
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["ce_region"],
      savedFilterIds: ["dm_tropical-smoothie_address_region"]
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};


export const getPath: GetPath<TemplateProps> = ({ document }) => {
  let url = "";
  // document.dm_directoryParents.map((i: any) => {
  //   if (i.meta.entityType.id == 'ce_country') {
  //     url += i.slug + "/";
  //   }
  // });
  url += document.slug.toString();

  return url;
};


// export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
//   return [`index-old/${document.id.toString()}`];
// };


export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  var canonical="";
  document.dm_directoryParents.map((entity: any) => {
    
      canonical=entity.slug.toLowerCase();
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

const region: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    name,
    _site,
    slug,
    address,
    c_banner_image,
    c_bannerHeading,
    dm_directoryParents,
    dm_directoryChildren
  } = document;
  const childrenDivs = dm_directoryChildren ? dm_directoryChildren.map((entity: any) => {
    let detlslug;


    if (typeof entity.dm_directoryChildren != "undefined") {

      if (entity.dm_baseEntityCount == 1) {
        entity.dm_directoryChildren.map((res: any) => {

          let detlslug1 = "";

          if (!res.slug) {
            let slugString = res.name.toLowerCase();
            let slug = slugString;
            detlslug1 = `${res.id}-${constant.slugify(slug)}`;
          } else {
            detlslug1 = `${constant.slugify(res.slug)}`;
          }

          detlslug = detlslug1;

        })
      } else {
        detlslug = "us/" + slug + "/" + constant.slugify(entity.slug);
      }

    }

    return (
      <>
      <li className=" storelocation-category">
        <a
          key={entity.slug}
          href={stagingBaseurl  + "/" + detlslug}
        >
          {entity.name} ({entity.dm_baseEntityCount})
        </a>
      </li>
      </>
    )
  }) : null;

 

  let bannerimage = c_banner_image && c_banner_image.image.url;
  return (
    <>
        <PageLayout global={_site}>
        <BreadCrumbs
            name={name}
            parents={dm_directoryParents}
            baseUrl={relativePrefixToRoot}
            address={address}
          ></BreadCrumbs>
          {/* <div className="location-dtl">     <Banner name={c_bannerHeading?c_bannerHeading:name} c_bannerImage={bannerimage}  /></div> */}
          

          <div className="content-list">
            <div className="container">
            <div className="sec-title">
                <h2 style={{ textAlign: "center" }}>
              {name}
                </h2>
              </div>
              <ul className="region-list">

                {childrenDivs}
              </ul>

            </div>
          </div>

          
        </PageLayout>
    </>
  )
}
export default region;
