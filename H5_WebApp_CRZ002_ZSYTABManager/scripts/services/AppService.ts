module h5.application {

    export interface IAppService {
        getAuthority(company: string, division: string, m3User: string, programName: string, charAt: number): ng.IPromise<boolean>;
        getDivisionList(company: string, division: string): ng.IPromise<M3.IMIResponse>;
        getWarehouseList(company: string): ng.IPromise<M3.IMIResponse>;
        getFacilityList(company: string, division: string): ng.IPromise<M3.IMIResponse>;
        getZSYTABTableNames(): ng.IPromise<M3.IMIResponse>;
        lstZSYTABRecords(): ng.IPromise<M3.IMIResponse>;
        saveZSYTABRecord(tableName: string, tableDesc: string, path: string, server: string, folderPath: string, port: string, protocol: string): ng.IPromise<M3.IMIResponse>;
        getAlphaZSYTABRecord(fileName: string): ng.IPromise<M3.IMIResponse>;
        getZSYTABRecord(PK01: string, PK02: string, PK03: string): ng.IPromise<M3.IMIResponse>;
        deleteCSYTABRecord(keyVal: string, language: string, divi: string): ng.IPromise<M3.IMIResponse>;
        getZSYTABColumnNamesRecord(fileName: string): ng.IPromise<M3.IMIResponse>;
        addZSYTABRecord(tableName: string, tableDesc: string, path: string, server: string, folderPath: string, port: string, protocol: string): ng.IPromise<M3.IMIResponse>;
    }

    export class AppService implements IAppService {

        static $inject = ["RestService", "$filter", "$q"];

        constructor(private restService: h5.application.IRestService, private $filter: h5.application.AppFilter, private $q: ng.IQService) {
        }

        public getAuthority(company: string, division: string, m3User: string, programName: string, charAt: number): ng.IPromise<boolean> {
            let request = {
                DIVI: division,
                USID: m3User,
                PGNM: programName
            };

            return this.restService.executeM3MIRestService("MDBREADMI", "SelCMNPUS30", request).then((val: M3.IMIResponse) => {
                if (angular.equals([], val.items)) {
                    request.DIVI = "";

                    return this.restService.executeM3MIRestService("MDBREADMI", "SelCMNPUS30", request).then((val: M3.IMIResponse) => {

                        if (angular.equals([], val.items)) {

                            return false;
                        } else {
                            let test = val.item.ALO;
                            if (charAt < test.length && '1' == test.charAt(charAt)) {
                                return true;
                            } else {
                                return false;
                            }

                        }
                    });
                } else {

                    let test = val.item.ALO;
                    if (charAt < test.length && '1' == test.charAt(charAt)) {
                        return true;
                    } else {

                        return false;
                    }
                }
            });
        }
        public getAlphaZSYTABRecord(fileName: string): ng.IPromise<M3.IMIResponse> {

            let requestData = {
                KPID: "ZSYTAB",
                PK01: fileName,


            };
            return this.restService.executeM3MIRestService("CUSEXTMI", "GetAlphaKPI", requestData).then((val: M3.IMIResponse) => { return val; });
        }
        public lstZSYTABRecords(): ng.IPromise<M3.IMIResponse> {

            let requestData = {
                KPID: "ZSYTAB",
            };

            return this.restService.executeM3MIRestService("CUSEXTMI", "LstAlphaKPI", requestData).then((val: M3.IMIResponse) => { return val; });
        }
        public getZSYTABTableNames(): ng.IPromise<M3.IMIResponse> {
            let requestData = {
                KPID: "ZSYTAB",

            };
            return this.restService.executeM3MIRestService("CUSEXTMI", "LstAlphaKPI", requestData).then((val: M3.IMIResponse) => { return val; });
        }
        public getZSYTABRecord(PK01: string, PK02: string, PK03: string): ng.IPromise<M3.IMIResponse> {

            let requestData = {
                KPID: "ZSYTAB",
                PK01: PK01,
                PK02: PK02,
                PK03: PK03,


            };
            return this.restService.executeM3MIRestService("CUSEXTMI", "GetAlphaKPI", requestData).then((val: M3.IMIResponse) => { return val; });
        }

        public getZSYTABColumnNamesRecord(fileName: string): ng.IPromise<M3.IMIResponse> {

            let requestData = {
                KPID: "ZSYTAB",
                PK01: fileName,
                PK02: "COLUMNS",
                PK03: "NA",
                PK04: "NA"

            };
            return this.restService.executeM3MIRestService("CUSEXTMI", "GetAlphaKPI", requestData).then((val: M3.IMIResponse) => { return val; });
        }
        public getDivisionList(company: string, division: string): ng.IPromise<M3.IMIResponse> {
            let requestData = {
                CONO: company,
                DIVI: division
            };
            return this.restService.executeM3MIRestService("MNS100MI", "LstDivisions", requestData).then((val: M3.IMIResponse) => { return val; });
        }

        public getWarehouseList(company: string): ng.IPromise<M3.IMIResponse> {
            let requestData = {
                CONO: company
            };
            return this.restService.executeM3MIRestService("MMS005MI", "LstWarehouses", requestData, 0).then((val: M3.IMIResponse) => { return val; });
        }

        public getFacilityList(company: string, division: string): ng.IPromise<M3.IMIResponse> {
            let requestData = {
                CONO: company,
                DIVI: division
            };
            return this.restService.executeM3MIRestService("CRS008MI", "ListFacility", requestData).then((val: M3.IMIResponse) => { return val; });
        }



        public getCustomerList(company: string): ng.IPromise<M3.IMIResponse> {
            let requestData = {
                CONO: company
            }
            return this.restService.executeM3MIRestService("CRS610MI", "LstByName", requestData).then((val: M3.IMIResponse) => { return val; });
        }
        public saveZSYTABRecord(tableName: string, tableDesc: string, server: string, folderPath: string, port: string, protocol: string, pgmName: string): ng.IPromise<M3.IMIResponse> {

            let requestData = {
                KPID: "ZSYTAB",
                PK01: tableName,
                AL30: tableDesc,
                AL31: server,
                AL32: folderPath,
                AL33: port,
                AL34: protocol,
                AL35: pgmName,
            }
            return this.restService.executeM3MIRestService("CUSEXTMI", "ChgAlphaKPI", requestData).then((val: M3.IMIResponse) => { return val; });
        }
        public addZSYTABRecord(tableName: string, tableDesc: string, server: string, folderPath: string, port: string, protocol: string, pgmName: string): ng.IPromise<M3.IMIResponse> {
            let requestData = {
                KPID: "ZSYTAB",
                PK01: tableName,
                AL30: tableDesc,
                AL31: server,
                AL32: folderPath,
                AL33: port,
                AL34: protocol,
                AL35: pgmName,
            }
            return this.restService.executeM3MIRestService("CUSEXTMI", "AddAlphaKPI", requestData).then((val: M3.IMIResponse) => { return val; });
        }
        public deleteCSYTABRecord(keyVal: string, language: string, divi: string): ng.IPromise<M3.IMIResponse> {
            let requestData = {
                KPID: "ZSYTAB",
                PK01: keyVal,
                PK02: language,
                PK03: divi,
            }
            return this.restService.executeM3MIRestService("CUSEXTMI", "DelAlphaKPI", requestData).then((val: M3.IMIResponse) => { return val; });
        }


    }
}