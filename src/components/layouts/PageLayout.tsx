import * as React from "react";
import { useEffect, useState } from "react";
import Footer from "./footer";
import Nav from "./Nav";

type Props = {
    title?: string;
    _site?: any;
    global:any;
    children?: React.ReactNode;
};
 
  const PageLayout = ({
    global,
    children,
  }: Props) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      const script = document.createElement("script");
    
      script.src = "//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
      script.async = true;
    
      document.body.appendChild(script);
      const mediaQuery = window.matchMedia("(max-width: 767px)");
      mediaQuery.addListener(handleMediaQueryChange);
      handleMediaQueryChange(mediaQuery);
  
      return () => {
        mediaQuery.removeListener(handleMediaQueryChange);
      };
    }, []);
  
    const handleMediaQueryChange = (mediaQuery:any) => {
      if (mediaQuery.matches) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    return (
        <>
        
                {children}
       
        </>
    );
  };

export default PageLayout;
  