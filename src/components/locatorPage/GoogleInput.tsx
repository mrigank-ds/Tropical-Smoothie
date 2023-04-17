import {
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import FilterSearch from "../locatorPage/FilterSearch";
import $ from "jquery";
import {
  AnswerExperienceConfig,
  search_icn,
} from "../../sites-global/global";
import { v4 as uuid } from "uuid";

import React, {
  KeyboardEvent,
  useRef,
  useEffect,
  useState,
  useMemo,
} from "react";
import errorbox from "../../images/error-status-icon.png";

export interface InputDropdownCssClasses {
  inputDropdownContainer?: string;
  inputDropdownContainer___active?: string;
  dropdownContainer?: string;
  filterSearchContainer?: string;
  inputElement?: string;
  inputContainer?: string;
  divider?: string;
  logoContainer?: string;
  searchButtonContainer?: string;
}

interface Props {
  inputValue?: string;
  placeholder?: string;
  screenReaderInstructions: string;
  screenReaderText: string;
  onlyAllowDropdownOptionSubmissions?: boolean;
  forceHideDropdown?: boolean;
  onSubmit?: (value: string) => void;
  renderSearchButton?: () => JSX.Element | null;
  renderLogo?: () => JSX.Element | null;
  onInputChange: (value: string) => void;
  onInputFocus: (value: string) => void;
  onDropdownLeave?: (value: string) => void;
  cssClasses?: InputDropdownCssClasses;
  handleSetUserShareLocation: (value: string, userShareStatus: boolean) => void;
  handleInputValue: () => void;
}

export default function GoogleInput({
  inputValue = "",
  placeholder,
  setPostalLoading,
  renderSearchButton = () => null,
  onInputChange,
  onInputFocus,
  cssClasses = {},
  handleInputValue,
  params,
  displaymsg,
  setDisplaymsg,
  setStartGeoCode,
  getCoordinates,
  setCheckAllowed,
  updateParam,
  errorstatus,
  setErrorStatus,
}: React.PropsWithChildren<Props>): JSX.Element | null {
  type FilterHandle = React.ElementRef<typeof FilterSearch>;
  const [inputvalue, setInputValue] = React.useState("");
  const [allowlocation, setallowLocation] = React.useState("");
  const filterRef = useRef<FilterHandle>(null);
  const [latestUserInput, setLatestUserInput] = useState(inputValue);
  const [childrenKey, setChildrenKey] = useState(0);
  const [norecord, setNorecord] = useState(true);
  const [keyUpStatus, setKeyUpStatus] = useState(true);
  const locationinbuit =
    useSearchState((state) => state.vertical?.results) || [];
  const screenReaderInstructionsId = useMemo(() => uuid(), []);
  const loading = useSearchState((s) => s.searchStatus.isLoading);
  const inputRef = useRef<HTMLInputElement>(null);
  const locationResults = useSearchState((s) => s.vertical.results) || [];
  const allResultsForVertical =
    useSearchState(
      (state) =>
        state.vertical?.noResults?.allResultsForVertical.results?.length
    ) || 0;
  const searchActions = useSearchActions();
  let numSections = 0;
  console.log(inputValue, latestUserInput, filterRef.current);
  const [focusedOptionId, setFocusedOptionId] = useState<string | undefined>(
    undefined
  );
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();
  let googleLib = typeof google !== "undefined" ? google : null;
  /**
   * Handles changing which section should become focused when focus leaves the currently-focused section.
   * @param pastSectionEnd Whether the section focus left from the end or the beginning of the section.
   */

  function handleDocumentKeyUp(evt: KeyboardEvent<HTMLInputElement>) {
    if (["ArrowDown", "ArrowUp"].includes(evt.key)) {
      evt.preventDefault();
    }
    if (
      evt.key == "Enter" &&
      latestUserInput != "" &&
      locationResults.length == 0
    ) {
      let searchKey: any = document.getElementsByClassName("FilterSearchInput");
      let Search: any = searchKey[0].value;
      setErrorStatus(false);
      updateParam(Search);
      setNorecord(true);
      setStartGeoCode(true);
      setLatestUserInput(Search);
      getCoordinates(Search);
    }
    if (
      evt.key == "Enter" &&
      latestUserInput != "" &&
      locationResults.length > 0
    ) {
      let searchKey: any = document.getElementsByClassName("FilterSearchInput");
      let Search: any = searchKey[0].value;
      setErrorStatus(false);
      updateParam(Search);
      setStartGeoCode(true);
      setLatestUserInput(Search);
      getCoordinates(Search);
    }
    if (evt.key == "Enter" && latestUserInput == "") {
      setErrorStatus(true);
    }

    handleInputValue();
    if (evt.key === "Backspace" || evt.key === "x" || evt.key === "Delete") {
      if (inputValue == "") {
        updateParam("");
        setCheckAllowed(false);
        setNorecord(false);
        setDisplaymsg(false);
        setLatestUserInput("");
        if (keyUpStatus && !loading) {
          // searchActions.setVertical("locations");
          searchActions.setQuery("");
          searchActions.setOffset(0);
          searchActions.setUserLocation(params);
          searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
          searchActions.executeVerticalQuery();
          setKeyUpStatus(false);
        }
      }
    }
  }

  useEffect(() => {
    if (inputValue != "") {
      setKeyUpStatus(true);
      setErrorStatus(false);
      setLatestUserInput(inputValue);
    } else {
      setCheckAllowed(false);
    }
    if (!keyUpStatus) {
      // searchActions.setVertical("locations");
    }
  }, [inputValue]);
  useEffect(() => {
    if (googleLib && typeof google.maps === "object") {
      let pacInput: any = document?.getElementById("pac-input");
      let options: any = {
        options: {
          //types: ["(regions)"],
          componentRestrictions: { country: "uk" },
          fields: ["address_component", "geometry"],
        },
      };
      const autoComplete = new google.maps.places.Autocomplete(
        pacInput,
        options
      );
      if (autoComplete) {
        function pacSelectFirst(input: HTMLInputElement) {
          var _addEventListener = input.addEventListener;

          function addEventListenerWrapper(type: string, listener: any) {
            if (type == "keydown") {
              var orig_listener = listener;

              listener = function (event: { which: number }) {
                var suggestion_selected = $(".pac-item-selected").length > 0;

                if (
                  (event.which == 13 || event.which == 9) &&
                  !suggestion_selected
                ) {
                  var simulated_downarrow = $.Event("keydown", {
                    keyCode: 40,
                    which: 40,
                  });
                  orig_listener.apply(input, [simulated_downarrow]);
                }

                orig_listener.apply(input, [event]);
              };
            }

            _addEventListener.apply(input, [type, listener]);
          }

          if (input.addEventListener) {
            input.addEventListener = addEventListenerWrapper;
          }
        }

        setAutocomplete(autoComplete);
        pacSelectFirst(pacInput);
        $("#search-location-button")
          .off("click")
          .on("click", function () {
            var keydown = document.createEvent("HTMLEvents");
            keydown.initEvent("keydown", true, false);
            Object.defineProperty(keydown, "keyCode", {
              get: function () {
                return 13;
              },
            });
            Object.defineProperty(keydown, "which", {
              get: function () {
                return 13;
              },
            });
            pacInput.dispatchEvent(keydown);
          });

        google.maps.event.addListener(
          autoComplete,
          "place_changed",
          function () {
            const searchKey: any = pacInput.value;
            const place = autoComplete.getPlace();
            if (searchKey) {
              getCoordinates(searchKey);
              updateParam(searchKey);
              // getGoogleInput(searchKey);
            }
          }
        );
      }
    }
    return () => {
      if (autocomplete) {
        autocomplete.unbindAll();
      }
    };
  }, [googleLib]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentValue: any = urlParams.get("myParam");
    if (latestUserInput !== currentValue) {
      if (currentValue !== "" && currentValue !== null) {
        setLatestUserInput(currentValue);
        getCoordinates(currentValue);
      }
      // Do something with the updated value, such as update a form field or make an API call
    }
  }, []);

  useEffect(() => {
    document.removeEventListener("keydown", Findinput);
    if (latestUserInput === "") {
      setNorecord(false);
      setDisplaymsg(false);
    } else if (!loading && locationResults.length == 0) {
      setDisplaymsg(true);
    }
    setDisplaymsg(false);
  });
  useEffect(() => {
    setLatestUserInput(inputValue);
  }, [inputValue]);

  const Findinput = () => {
    const searchKey: any = document.getElementsByClassName("FilterSearchInput");
    let pacInput: any = document?.getElementById("pac-input");
    let Search: any = pacInput.value;
    setInputValue("");
    if (Search != "") {
      getCoordinates(Search);
      updateParam(Search);
    }
    if (locationinbuit.length == 0 && !loading && searchKey[0].value != "") {
      setDisplaymsg(true);
    } else {
      setDisplaymsg(false);
    }
  };

  return (
    <>
      <div className="locator-find-block">
        {allowlocation.length > 0 ? (
          <div className="for-allow">{allowlocation}</div>
        ) : (
          ""
        )}
        <div className="search-form">
          <input
            id="pac-input"
            type="text"
            placeholder={placeholder}
            className="FilterSearchInput"
            onChange={(evt) => {
              const value = evt.target.value;
              setNorecord(false);
              setDisplaymsg(false);
              setPostalLoading(false);
              setLatestUserInput(value);
              onInputChange(value);
              onInputFocus(value);
              setChildrenKey(childrenKey + 1);
            }}
            onKeyUp={handleDocumentKeyUp}
            value={inputValue !== "" ? inputValue : latestUserInput}
            ref={inputRef}
            aria-describedby={screenReaderInstructionsId}
            aria-activedescendant={focusedOptionId}
          />
          {errorstatus && (
            <span className="Error-msg">
              <img src={errorbox} />
              Please fill out this field
            </span>
          )}

          <div className={cssClasses.searchButtonContainer}>
            {renderSearchButton()}
          </div>
        </div>
        {(locationResults.length == 0 && allResultsForVertical > 0) ||
        (locationResults.length == 0 && displaymsg && !loading) ? (
          <h4 className="font-bold">
            Sorry we do not have any location in your area here you can check
            other stores
          </h4>
        ) : (
          ""
        )}
      </div>

      <button
        className="search-btn"
        aria-label="Search bar icon"
        id="search-location-button"
        onClick={Findinput}
      >
        <span dangerouslySetInnerHTML={{ __html: search_icn }} />
      </button>
    </>
  );
}
