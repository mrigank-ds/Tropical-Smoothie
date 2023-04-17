import * as React from "react";
import "../../index.css";
import { cookieText, cookiesUrl } from "../../sites-global/global";
import CookieConsent from "react-cookie-consent";
import { StaticData } from "../../sites-global/staticData";
import Link from "../commons/Link";
import jdgroup from "../../images/jd-group.png";

const Footer = (props: any) => {
  const { footer } = props;
  return (
    <>
      {props.isSmallScreen && (
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
      <footer className="site-footer">
        <div className="container-custom">
          <div className="link-sec-footer ">
            <div className="store-locator">
              <div className="company-logo mr-4">
                <img
                  src={footer.c_footer_logo.url}
                  height={5}
                  alt="footerlogo"
                />
              </div>
              <div className="Contactus flex flex-row text-white">
          <div className="footer-get">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><g id="ICONS-_-phone-Copy" data-name="ICONS-/-phone-Copy" transform="translate(-2 -2)"><g id="Group" transform="translate(2 2)"><path id="Path" d="M8.886,13.578A15.222,15.222,0,0,1,2.422,7.115a2.827,2.827,0,0,1,.227-3.3l.133-.135.143-.144.328-.33.033-.033A7.833,7.833,0,0,1,4.223,2.3a1.811,1.811,0,0,1,.727-.281,1.358,1.358,0,0,1,1.252.47,10.331,10.331,0,0,1,.9,1.183l.083.119.065.092a1.194,1.194,0,0,1-.076,1.514c-.3.345-.577.64-.9.958-.033.033-.029.085.058.192A17,17,0,0,0,9.48,9.682c.085.069.135.072.167.04.319-.322.614-.6.959-.9a1.2,1.2,0,0,1,1.514-.076l.092.065.117.081a10.334,10.334,0,0,1,1.186.906,1.357,1.357,0,0,1,.47,1.252,1.813,1.813,0,0,1-.281.727,7.879,7.879,0,0,1-.872.938l-.032.032-.33.328-.144.143-.135.133A2.825,2.825,0,0,1,8.886,13.578Z" transform="translate(-2 -2)" fill="#fff" fill-rule="evenodd"></path></g></g></svg>
              <Link props={footer.c_contactUs} />
          </div>
             <div className="footer-get">
              
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 16.611">
  <g id="ICONS-_-quote-Copy" data-name="ICONS-/-quote-Copy" transform="translate(-1 -3)">
    <g id="Group" transform="translate(1 3)">
      <path id="like" d="M21,10.321a1.845,1.845,0,0,0-1.843-1.843H16.3a5.687,5.687,0,0,0-.238-3.509,3.019,3.019,0,0,0-1.645-1.852,1.709,1.709,0,0,0-2,.523,1.3,1.3,0,0,0-.179,1.177c.622,2.04-2.008,3.831-2.692,4.166a4.929,4.929,0,0,0-1.221.833H5.893v-.3a.6.6,0,0,0-.6-.6H1.6a.6.6,0,0,0-.6.6v9.5a.6.6,0,0,0,.6.6H5.3a.6.6,0,0,0,.6-.6v-.827h3.1a6.9,6.9,0,0,0,3.7,1.423H16.92a1.845,1.845,0,0,0,1.843-1.843,1.825,1.825,0,0,0-.126-.654,1.838,1.838,0,0,0,1.66-1.823,1.813,1.813,0,0,0-.242-.894,1.822,1.822,0,0,0,.457-2.837A1.829,1.829,0,0,0,21,10.321Z" transform="translate(-1 -3)" fill="#fff" fill-rule="evenodd"/>
    </g>
  </g>
</svg>
<Link props={footer.c_getQuote} />
             </div>
              
              </div>
              {footer.c_store_finder.map((storfinder: any) => {
                return (
                  <div className="store-inner" key={storfinder.icon.url}>
                    <img src={storfinder.icon.url} alt="store-finder" />
                    <Link props={storfinder.cTA} />
                  </div>
                );
              })}
              
              <div className="jd-group">
                <img src={jdgroup} alt="" />
              </div>
            </div>
            
            {footer.c_customerServicesLinks ? (
              <div className="footer-block">
                <h4 className="footer-block-title">Customer Services</h4>
                <ul className="list-none">
                  {footer.c_customerServicesLinks.map(
                    (aboutMatalan: any) => {
                      return (
                        <li key={aboutMatalan.customerServices.label}>
                          <Link props={aboutMatalan.customerServices} />
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            ) : (
              ""
            )}
            {footer.c_footerLinks ? (
              <div className="footer-block">
                <h4 className="footer-block-title">About MGM</h4>
                <ul className="list-none">
                  {footer.c_footerLinks.map(
                    (customerService: any) => {
                      return (
                        <li key={customerService.headerLinks.label}>
                          <Link props={customerService.headerLinks} />
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            ) : (
              ""
            )}
          

            <div className="footer-block">
              <h4 className="footer-block-title">Follow US</h4>
              <ul className="social-media-bx">
                {footer.c_socialIcons.map((icon: any) => {
                  return (
                    <>
                      <li className="" key={icon.cTA.link}>
                        {" "}
                        <a
                          href={icon.cTA.link ? icon.cTA.link : "#"}
                          target="_blank"
                        >
                          <img
                            src={icon.icon.url}
                            height="32"
                            alt="social"
                            width="32"
                            className="inline-block w-5 h-auto"
                          />
                        </a>{" "}
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="cta-list text-white ">
                {footer.c_ctaList && footer.c_ctaList.map((res:any)=>{
                  return <Link props={res} />
                })}
            </div>
          <div className="company-info-footer">
         
            <div className="copyright-bx">
              <span className="text-xs flex-wrap" data-copyright="">
                {footer.c_footerDescription}
              </span>
            </div>
            
            <div className="store-inner flex flex-raw">
              {footer.c_paySecurelyIcon &&
                footer.c_paySecurelyIcon.map((Icon: any) => {
                  return (
                    <div>
                      <img src={Icon.url} alt="faq-icon" />
                    </div>
                  );
                })}
              <div></div>
            </div>
          </div>
        </div>
      </footer>

      <CookieConsent
        buttonText={"Accept"}
        buttonStyle={{
          marginLeft: "100px",
        }}
      >
        <p>
          {cookieText}
          <a className="text-cookies-link" href={cookiesUrl}>
            {StaticData.cookie}
          </a>
          .
        </p>
      </CookieConsent>
    </>
  );
};

export default Footer;
