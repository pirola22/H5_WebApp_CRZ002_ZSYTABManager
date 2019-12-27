var h5;
(function (h5) {
    var application;
    (function (application) {
        var AppService = (function () {
            function AppService(restService, $filter, $q) {
                this.restService = restService;
                this.$filter = $filter;
                this.$q = $q;
            }
            AppService.prototype.getAuthority = function (company, division, m3User, programName, charAt) {
                var _this = this;
                var request = {
                    DIVI: division,
                    USID: m3User,
                    PGNM: programName
                };
                return this.restService.executeM3MIRestService("MDBREADMI", "SelCMNPUS30", request).then(function (val) {
                    if (angular.equals([], val.items)) {
                        request.DIVI = "";
                        return _this.restService.executeM3MIRestService("MDBREADMI", "SelCMNPUS30", request).then(function (val) {
                            if (angular.equals([], val.items)) {
                                return false;
                            }
                            else {
                                var test = val.item.ALO;
                                if (charAt < test.length && '1' == test.charAt(charAt)) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            }
                        });
                    }
                    else {
                        var test = val.item.ALO;
                        if (charAt < test.length && '1' == test.charAt(charAt)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                });
            };
            AppService.prototype.getAlphaZSYTABRecord = function (fileName) {
                var requestData = {
                    KPID: "ZSYTAB",
                    PK01: fileName,
                };
                return this.restService.executeM3MIRestService("CUSEXTMI", "GetAlphaKPI", requestData).then(function (val) { return val; });
            };
            AppService.prototype.lstZSYTABRecords = function () {
                var requestData = {
                    KPID: "ZSYTAB",
                };
                return this.restService.executeM3MIRestService("CUSEXTMI", "LstAlphaKPI", requestData).then(function (val) { return val; });
            };
            AppService.prototype.getZSYTABTableNames = function () {
                var requestData = {
                    KPID: "ZSYTAB",
                };
                return this.restService.executeM3MIRestService("CUSEXTMI", "LstAlphaKPI", requestData).then(function (val) { return val; });
            };
            AppService.prototype.getZSYTABRecord = function (PK01, PK02, PK03) {
                var requestData = {
                    KPID: "ZSYTAB",
                    PK01: PK01,
                    PK02: PK02,
                    PK03: PK03,
                };
                return this.restService.executeM3MIRestService("CUSEXTMI", "GetAlphaKPI", requestData).then(function (val) { return val; });
            };
            AppService.prototype.getZSYTABColumnNamesRecord = function (fileName) {
                var requestData = {
                    KPID: "ZSYTAB",
                    PK01: fileName,
                    PK02: "COLUMNS",
                    PK03: "NA",
                    PK04: "NA"
                };
                return this.restService.executeM3MIRestService("CUSEXTMI", "GetAlphaKPI", requestData).then(function (val) { return val; });
            };
            AppService.prototype.getDivisionList = function (company, division) {
                var requestData = {
                    CONO: company,
                    DIVI: division
                };
                return this.restService.executeM3MIRestService("MNS100MI", "LstDivisions", requestData).then(function (val) { return val; });
            };
            AppService.prototype.getWarehouseList = function (company) {
                var requestData = {
                    CONO: company
                };
                return this.restService.executeM3MIRestService("MMS005MI", "LstWarehouses", requestData, 0).then(function (val) { return val; });
            };
            AppService.prototype.getFacilityList = function (company, division) {
                var requestData = {
                    CONO: company,
                    DIVI: division
                };
                return this.restService.executeM3MIRestService("CRS008MI", "ListFacility", requestData).then(function (val) { return val; });
            };
            AppService.prototype.getCustomerList = function (company) {
                var requestData = {
                    CONO: company
                };
                return this.restService.executeM3MIRestService("CRS610MI", "LstByName", requestData).then(function (val) { return val; });
            };
            AppService.prototype.saveZSYTABRecord = function (tableName, tableDesc, server, folderPath, port, protocol, pgmName) {
                var requestData = {
                    KPID: "ZSYTAB",
                    PK01: tableName,
                    AL30: tableDesc,
                    AL31: server,
                    AL32: folderPath,
                    AL33: port,
                    AL34: protocol,
                    AL35: pgmName,
                };
                return this.restService.executeM3MIRestService("CUSEXTMI", "ChgAlphaKPI", requestData).then(function (val) { return val; });
            };
            AppService.prototype.addZSYTABRecord = function (tableName, tableDesc, server, folderPath, port, protocol, pgmName) {
                var requestData = {
                    KPID: "ZSYTAB",
                    PK01: tableName,
                    AL30: tableDesc,
                    AL31: server,
                    AL32: folderPath,
                    AL33: port,
                    AL34: protocol,
                    AL35: pgmName,
                };
                return this.restService.executeM3MIRestService("CUSEXTMI", "AddAlphaKPI", requestData).then(function (val) { return val; });
            };
            AppService.prototype.deleteCSYTABRecord = function (keyVal, language, divi) {
                var requestData = {
                    KPID: "ZSYTAB",
                    PK01: keyVal,
                    PK02: language,
                    PK03: divi,
                };
                return this.restService.executeM3MIRestService("CUSEXTMI", "DelAlphaKPI", requestData).then(function (val) { return val; });
            };
            AppService.$inject = ["RestService", "$filter", "$q"];
            return AppService;
        }());
        application.AppService = AppService;
    })(application = h5.application || (h5.application = {}));
})(h5 || (h5 = {}));
