sap.ui.define([

    'soyuz/sid/fiori/controller/BaseController',
    'soyuz/sid/fiori/util/formatter',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/m/MessageToast'

], function(BaseController, Formatter, Filter, FilterOperator, MessageToast) {
    'use strict';
    return BaseController.extend("soyuz.sid.fiori.controller.View1", {
        formatter: Formatter,
        onInit: function() {
            //obtain the router object
            //we need to ask component.js to give us the router object
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        onClick: function(sFruitId) {
            this.oRouter.navTo("detail", {
                fruitId: sFruitId
            });

            //   var oAppCon = this.getView().getParent();
            //   oAppCon.to("idAppView2");
        },
        onMessage: function() {

            MessageToast.show("your Order is Placed")

        },

        onDelete: function(oEvent) {
            var itemToBeDeleted = oEvent.getParameter("listItem");
            var oList = oEvent.getSource();
            oList.removeItem(itemToBeDeleted);
        },
        getAllItems: function name(params) {
            debugger;
            var oList = this.getView().byId("idList");
            var allItems = oList.getSelectedItems();
            return allItems;
        },
        onDeleteData: function(params) {

            var oList = this.getView().byId("idList");
            var allItems = this.getAllItems();
            for (let index = 0; index < allItems.length; index++) {
                const element = allItems[index];
                oList.removeItem(element);
            }
        },
        onNavToNext: function(params) {

            var allObjects = this.getAllItems();
            var allItems = [];
            for (let index = 0; index < allObjects.length; index++) {
                const element = allObjects[index];
                var item = element.getModel().getProperty(element.getBindingContextPath());
                allItems.push(item);

            }
            this.getView().getModel().setProperty("/selectedFruits", allItems)
            this.onClick();
        },
        onSelectionChange: function(oEvent) {
            //  debugger;
            var selectedAddress = oEvent.getParameter("listItem");
            var sPath = selectedAddress.getBindingContextPath();
            //  var oView2= this.getView().getParent().getParent().getDetailPages()[1];
            //  this.getView().getParent().getParent().to("idAppView2");
            //  oView2.bindElement(sPath);
            var sIndex = sPath.split("/")[sPath.split("/").length - 1]
            this.onClick(sIndex);

        },
        onAdd: function() {
            this.oRouter.navTo("addProduct");
        },

        onSearch: function(oEvent) {
            //   debugger;
            var whatWasSearched;
            if (!whatWasSearched) {
                whatWasSearched = oEvent.getParameter("newValue");
            }
            var oFilter = new Filter("CATEGORY", FilterOperator.Contains, whatWasSearched);
            //   var oFilter2 = new Filter("type", FilterOperator.Contains , whatWasSearched);
            var aFilter = [oFilter];
            var oNewFilter = new Filter({
                filters: aFilter,
                and: false
            })
            var oList = this.getView().byId("idList");
            oList.getBinding("items").filter(oNewFilter);
        }
    });
});