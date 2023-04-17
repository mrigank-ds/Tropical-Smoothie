import * as React from "react";
import Menu from "./Menu";
import { logo } from "../../sites-global/global";
import Linking from "../commons/Link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import branch from "../../images/branch.png";
const Nav = (props: any) => {
  React.useEffect(() => {
    document.body.setAttribute("id", "body");
  });
  const toggle = () => {
    (document.getElementById("body") as HTMLInputElement).classList.toggle(
      "menu-opened"
    );
  };
  const RemoveMenu = () => {
    (document.getElementById("body") as HTMLInputElement).classList.remove(
      "menu-opened"
    );
  };

  return (
    <>
      {/* This is for full part logo */}

      <div className="site-header">
        <div className="container-custom">
          {!props.isSmallScreen && (
            <div
              className="trustpilot-widget"
              data-locale="en-GB"
              data-template-id="5419b732fbfb950b10de65e5"
              data-businessunit-id="5843003c0000ff0005988644"
              data-style-height="24px"
              data-style-width="100%"
              data-theme="light"
            >
              <a
                href="https://uk.trustpilot.com/review/mgmtimber.co.uk"
                target="_blank"
                rel="noopener"
              >
                Trustpilot
              </a>
            </div>
          )}
          <div className="header-top">
            <div className="middle-head">
              <button
                type="button"
                className="menu-btn"
                id="menu-btn"
                onClick={toggle}
              >
                <div class="menu-icon-box">
                  <div class="menu-icon-inner"></div>
                </div>
              </button>

              <div className="logo-inner">
                {props._site.c_logo ? (
                  <a
                    href={
                      props._site.c_logo.clickthroughUrl
                        ? props._site.c_matalan_header_logo.clickthroughUrl
                        : "https://www.matalan.co.uk/"
                    }
                  >
                    <LazyLoadImage
                      src={props._site.c_matalan_header_logo.image.url}
                      alt="middlelogo"
                    />
                  </a>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: logo }} />
                )}
              </div>

              <div className="search-bar w-full hidden sm:block">
                <input
                  className="site-input appearance-none  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder={props._site.c_menuSearchBarPlaceholderText}
                />
                <button
                  type="submit"
                  title="Search"
                  class="btn-search"
                  aria-label="Search"
                  disabled=""
                ></button>
              </div>

              <div className="link-left">
                <ul className="top-hdr-links">
                  <li className="px-0 sm:px-4 inline">
                    <div
                      className="store-inner"
                      key={props._site.c_jobListCTA.label}
                    >
                      <i className="icon-wishlist ki ki-wishlist text-3xl"></i>
                      <Linking props={props._site.c_jobListCTA} />
                    </div>
                    <div
                      className="store-inner"
                      key={props._site.c_jobListCTA.label}
                    >
                      <img src={branch} alt="" />
                      <Linking props={props._site.c_branchLocatorCTA} />
                    </div>
                    {/* <Linking props={toplinks}/> */}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="search-bar w-full block sm:hidden">
          <div className="nav-search-wrapper">
            <input
              className="site-input appearance-none  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder={props._site.c_menuSearchBarPlaceholderText}
            />
            <button
              type="submit"
              title="Search"
              class="btn-search"
              aria-label="Search"
              disabled=""
            ></button>
          </div>
        </div>
        <div className="main-nav" onClick={RemoveMenu}>
          <div className="container-custom">
            <Menu menu={props._site} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
