let constant={
    stagingBaseurl:"https://main-nicely--unchanged--kangaroo-sbx-pgsdemo-com.sbx.preview.pagescdn.com/"  ,
     slugify(slugString: any) {
        slugString.toLowerCase().toString();
        slugString = slugString.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/g, "");
        slugString = slugString.replaceAll("  ", "-");
        slugString = slugString.replaceAll(" ", "-");
        return slugString.toLowerCase();
      },
       convertToRtf(rtf:any) {
        rtf = rtf.replace(/\\par[d]?/g, "");
        rtf = rtf.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "")
        rtf=rtf.replace('/','');
        rtf=rtf.replace(';','');
        rtf=rtf.replace('-','');
        return rtf.replace(/\\'[0-9a-zA-Z]{2}/g, "").trim();
    }
    }
export default constant