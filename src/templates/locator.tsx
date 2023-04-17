import * as React from "react";
import "../index.css";
import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import PageLayout from "../components/layouts/PageLayout";
import SearchLayout from "../components/locatorPage/SearchLayout";
import {
  experienceKey,
  apiKey,
  verticalKey,
  stagingBaseurl,
  AnswerExperienceConfig,
  favicon,
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
} from "../sites-global/global";
import { JsonLd } from "react-schemaorg";
import { StaticData } from "../sites-global/staticData";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";

export const config: TemplateConfig = {
  stream: {
    $id: "Locator",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "name"
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityIds: ["AL-021"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = () => {
  return `/index.html`;
};
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: `${
      document.c_meta_title
        ? document.c_meta_title
        : `Tropical Smoothie Stores Near Me`
    }`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
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

const Locator: Template<TemplateRenderProps> = ({ path, document, __meta }) => {
  const { _site } = document;

  let templateData = { document: document, __meta: __meta };
  return (
    <>
      <JsonLd<locator>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Tropical Smoothie ",
          url: stagingBaseurl,
          logo: favicon,
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@id": "#",
                name: "Home",
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@id": stagingBaseurl + path,
                name: "Store Locator",
              },
            },
          ],
        }}
      />
      
          <PageLayout global={_site}>
            <SearchHeadlessProvider
              experienceKey={experienceKey}
              locale={AnswerExperienceConfig.locale}
              apiKey={apiKey}
              verticalKey={verticalKey}
              experienceVersion="STAGING"
              sessionTrackingEnabled={true}
              endpoints={AnswerExperienceConfig.endpoints}
            >
              <SearchLayout _site={_site} />
            </SearchHeadlessProvider>
          </PageLayout>
       
    </>
  );
};

export default Locator;
