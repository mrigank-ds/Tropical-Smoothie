import * as React from "react";
import Link from "../commons/Link";
function Menu(props: any) {

  return (
    <>
      <ul className="primary-nav">
      <li>
        </li>
        {props.menu.c_headerLink && props.menu.c_headerLink.map((item: any, i: number) => {
          return (
          
              <li key={i}>
              <Link props={item.headerLinks} />
              </li>
          )
        })}

      </ul>
    </>
  )
}

export default Menu