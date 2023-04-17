import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import classNames from 'classnames';
import * as React from "react";
import { CompositionMethod, useComposedCssClasses } from '../../hooks/useComposedCssClasses';


interface ResultsCountCssClasses {
  container?: string,
  text?: string,
  number?: string
}

const builtInCssClasses: ResultsCountCssClasses = {
  container: '',
  text: 'text-base mt-6 sm:mt-0  text-[#737373] ',
  number: 'font-medium'
}

interface Props {
  customCssClasses?: ResultsCountCssClasses,
  cssCompositionMethod?: CompositionMethod,
  allowresult:any,
  postalLoading:any,
  inputvalue:any
}

export interface ResultsCountConfig {
  resultsCount?: number,
  resultsLength?: number,
  offset?: number,
  verticalResultsCount:number,
  customCssClasses?: ResultsCountCssClasses,
  cssCompositionMethod?: CompositionMethod,
  showallowresult:any,
  postal:any,
  showinput:any

}


export default function ResultsCount(props: Props) {
  let resultsCount = useSearchState(state => state.vertical?.resultsCount) || 0;
  let resultsLength = useSearchState(state => state.vertical?.results?.length) || 0;
  const offset = useSearchState(state => state.vertical?.offset) || 0;
  const allResultsForVertical = useSearchState(state => state.vertical?.noResults?.allResultsForVertical.results?.length) ||0;
  const verticalResultsCount = useSearchState(state => state.vertical.resultsCount) || 0;
  const allResultsCountForVertical = useSearchState(state => state.vertical?.noResults?.allResultsForVertical.resultsCount) || 0;
  if (verticalResultsCount == 0) {
    resultsCount = allResultsCountForVertical;  
    resultsLength=allResultsForVertical
  }
  return <ResultsCountDisplay showinput ={props.inputvalue} postal={props.postalLoading} showallowresult={props.allowresult} verticalResultsCount={verticalResultsCount} resultsCount={resultsCount} resultsLength={resultsLength} offset={offset} {...props}/>;
}

export function ResultsCountDisplay({
  resultsCount=0,
  resultsLength=0,
  verticalResultsCount,
  customCssClasses,
  cssCompositionMethod,
  showallowresult,
}: ResultsCountConfig): JSX.Element | null {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  const  userSearchAction:any= useSearchActions();

  if (resultsLength === 0) {
    return null;
  }
  var id:any = document.getElementsByClassName("FilterSearchInput");
  var Message:any;

    if (id.length > 0) {  
      Message= id[0].value;
    } 



  const messageArray = [
    resultsLength + " of "+
    resultsCount +
    ' stores near '+
    `"${userSearchAction.state.query.input?.length>0?userSearchAction.state.query.input: Message}"`
  ];

  const spanArray = messageArray.map((value, index) => {
    return <span key={`${index}-${value}`} className={builtInCssClasses.text}>{value}</span>
  });
  
  return <div className={cssClasses.container}>
    {verticalResultsCount!=0 && !showallowresult && Message?.length > 0 ?spanArray:''}
    
    </div>
}