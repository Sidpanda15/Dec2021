sap.ui.define([

    'soyuz/sid/fiori/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
	"sap/ui/core/routing/History"

], function(BaseController,MessageBox,MessageToast,History) {
    'use strict';
    return BaseController.extend("soyuz.sid.fiori.controller.Supplier",{
       onInit: function(){

        this.oRouter= this.getOwnerComponent().getRouter();
        //we need a method which is triggred everytime route changes
        this.oRouter.getRoute("supplier").attachMatched(this.herculis, this);
       },
       herculis: function(oEvent){
           var sPath= "/suppliers/"+oEvent.getParameter("arguments").suppId;
        //    MessageToast.show("herculis is called: ", oEvent.getParameter("arguments").fruitId);
           this.getView().bindElement(sPath);

       },
       onBack: function(){
        
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("detail", {
                    fruitId:0
                }, true);
			}
		}
      
   });
});