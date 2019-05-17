export = analysis;
declare function analysis(allData: any, timeout: any, bailout: any, only: any, json: any, fileFilter: any): any;
declare namespace analysis {
  function memAnalytics(heapData: any, limit: any): any;
  function memAnalyticsP(transform: any, options: any): any;
  function serialize(jsHeapSnapShot: any, index: any, limit: any, need: any): any;
}
