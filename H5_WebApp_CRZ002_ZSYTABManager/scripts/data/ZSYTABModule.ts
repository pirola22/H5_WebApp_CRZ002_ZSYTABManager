module h5.application {
    export interface IZSYTABModule {
        
        reload: boolean;
        transactionStatus: {
            //itemMasterList: boolean;
            ZSYTABList : boolean,
            ZSYTABRecord : boolean,
          //  ZSYTABColumnNamesRecord : boolean;//for column names
            
        };
      
        
         ZSYTABList: any; //list of table names
        ZSYTABListGrid: IUIGrid;
        
        selectedZSYTABListRow: any;
         ZSYTABRecord: any;
        loadZSYTABRecordModule: any //the function that will be called when a selection is made
        //  ZSYTABColumnNamesRecord: any;// for column names
    }
}