sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    'use strict';
    return UIComponent.extend("soyuz.sid.fiori.Component", {
        metadata: {
            manifest: "json"
        },
        init: function() {
            UIComponent.prototype.init.apply(this);

            var oRouter = this.getRouter();
            oRouter.initialize();
        },
        //  createContent: function(){
        //          var oView = new sap.ui.view({
        //          id: "",
        // 		 viewName: "soyuz.sid.fiori.view.App",
        // 		 type: "XML"
        //                  });
        //          var oAppCon= oView.byId("idAppCon")
        //           var oView1 = new sap.ui.view({
        //          id: "1",
        // 		 viewName: "soyuz.sid.fiori.view.View1",
        // 		 type: "XML"
        //                  });
        //          var oView2 = new sap.ui.view({
        //          id: "idAppView2",
        // 		 viewName: "soyuz.sid.fiori.view.View2",
        // 		 type: "XML"
        //                  });
        //         var oAvengers = new sap.ui.view({
        //         id: "idAvenger",
        //         viewName: "soyuz.sid.fiori.view.Avengers",
        //         type: "XML"
        //                 });

        //          oAppCon.addMasterPage(oView1).addDetailPage(oAvengers).addDetailPage(oView2);
        //          return  oView;
        //         },
        destroy: function() {

        }
    });
});