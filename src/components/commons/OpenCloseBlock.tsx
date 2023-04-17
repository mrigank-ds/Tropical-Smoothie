import * as React from "react";
import useOpenClose from "../../hooks/useOpenClose";
import { houtsIcon } from "../../sites-global/global";
import { Week } from "./hours";

interface OpenCloseBlock {
  hoursData: Week;
  timeZone: string;
  id: any;
}
function OpenCloseBlock({ id, hoursData, timeZone }: OpenCloseBlock) {
  const { openObject } = useOpenClose(hoursData, timeZone);

  const week: any = {
    sunday: "Sunday",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
  };

  const formatTime = (time: string) => {
    const tempDate = new Date("January 1, 2020 " + time);
    const localeString = "en-US";

    return tempDate.toLocaleTimeString(localeString.replace("_", "-"), {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  if (openObject.isOpen) {
    if (openObject.start === "00:00" && openObject.end === "23:59") {
      return (
        <>
          <div className="location-icon notHighlight">
            <div dangerouslySetInnerHTML={{ __html: houtsIcon }} />{" "}
          </div>
          <div className={"opendot notHighlight"} id={id}>
            Open 24 Hours
          </div>
        </>
      );
    } else {
      return (
        <div className={"opendot green-dot"} id={id}>
          <div className="location-icon notHighlight">
            <div dangerouslySetInnerHTML={{ __html: houtsIcon }} />{" "}
          </div>
          <div className="hours-info notHighlight">
            {" "}
            <span className="font-main-font notHighlight"> Open now - </span>
            <span className="lowercase notHighlight">
              {formatTime(openObject.start).replace(":00", "")}
            </span>
            {" to "}
            <span className="lowercase notHighlight">
              {formatTime(openObject.end).replace(":00", "")}
            </span>
          </div>
        </div>
      );
    }
  } else if (openObject.isClosed && openObject.start) {
    return (
      <div className={"closeddot 4 notHighlight"} id={id}>
        <div className="location-icon notHighlight">
          <div dangerouslySetInnerHTML={{ __html: houtsIcon }} />{" "}
        </div>
        <div className="red-dot">
          <div className="hours-info notHighlight">
            <span className="font-main-font notHighlight"> Closed - </span>
            {"Opens at "}
            <span className="lowercase notHighlight">
              {formatTime(openObject.start).replace(":00", "")}
            </span>{" "}
            {openObject.day ? week[openObject.day] : ""}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="closeddot 2 notHighlight" id={id}>
        <div className="red-dot notHighlight">
          <div className="location-icon notHighlight">
            <div dangerouslySetInnerHTML={{ __html: houtsIcon }} />{" "}
          </div>
          <div className="hours-info notHighlight">Closed</div>
        </div>
      </div>
    );
  }
}

export default OpenCloseBlock;
