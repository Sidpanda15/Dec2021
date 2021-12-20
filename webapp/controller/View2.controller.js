sap.ui.define([
    'soyuz/sid/fiori/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    "sap/ui/core/routing/History",
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function(BaseController, MessageBox, MessageToast, History, Fragment, Filter, FilterOperator) {
    'use strict';
    return BaseController.extend("soyuz.sid.fiori.controller.View2", {
        onInit: function() {

            this.oRouter = this.getOwnerComponent().getRouter();
            //we need a method which is triggred everytime route changes
            this.oRouter.getRoute("detail").attachMatched(this.herculis, this);
        },
        herculis: function(oEvent) {
            //    debugger;
            var sPath = "/" + oEvent.getParameter("arguments").fruitId;
            var oMsg = oEvent.getParameter("arguments").fruitId;
            MessageToast.show("herculis is called: " + oMsg);
            this.getView().bindElement({
                path: sPath,
                parameters: {
                    expand: 'To_Supplier'
                }
            });

        },
        oSupplierPopup: null,
        oCityPopup: null,
        onFilter: function(oEvent) {
            this.inpField = oEvent.getSource();
            if (!this.oSupplierPopup) {
                Fragment.load({
                    name: "soyuz.sid.fiori.fragments.popup",
                    controller: this,
                    id: "idSupp"
                }).then(function(oFragment) {
                    debugger;
                    // setting the global variable to avoid creation of object again and again
                    this.oSupplierPopup = oFragment;
                    //explicitly allow resources(model) access to these fragments
                    this.getView().addDependent(this.oSupplierPopup);
                    // doing agg binding to load all the data
                    this.oSupplierPopup.bindAggregation("items", {
                            path: '/suppliers',
                            template: new sap.m.StandardListItem({
                                icon: "sap-icon://supplier",
                                title: '{contactPerson}',
                                description: "{city}"
                            })
                        })
                        //to open the popup
                    this.oSupplierPopup.open();
                }.bind(this));
            } else {
                this.oSupplierPopup.open();
            }
            //    MessageToast.show("This Functionability is under construction");

        },
        onConfirm: function(oEvent) {
            var sId = oEvent.getParameter("id");
            if (sId.indexOf("City") !== -1) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                var sCityName = oSelectedItem.getTitle();
                this.inpField.setValue(sCityName);
            } else {
                var aSelectedItems = oEvent.getParameter("selectedItems");
                var aFilter = [];
                for (let index = 0; index < aSelectedItems.length; index++) {
                    const element = aSelectedItems[index];
                    const sTitle = element.getTitle();
                    var oFilter = new Filter("contactPerson", FilterOperator.Contains, sTitle);
                    aFilter.push(oFilter);

                }
                var oFilterFinal = new Filter({
                    filters: aFilter,
                    and: false
                });
                this.getView().byId("idTable").getBinding("items").filter(oFilterFinal);
            }




        },
        inpField: null,
        onF4Help: function(oEvent) {

            //MessageToast.show("This Functionability is under construction");
            // var that=this;

            this.inpField = oEvent.getSource();
            if (!this.oCityPopup) {
                Fragment.load({
                    name: "soyuz.sid.fiori.fragments.popup",
                    controller: this,
                    id: "idCity"
                }).then(function(oFragment) {
                    debugger;
                    // setting the global variable to avoid creation of object again and again
                    this.oCityPopup = oFragment;
                    //explicitly allow resources(model) access to these fragments
                    this.getView().addDependent(this.oCityPopup);
                    // doing agg binding to load all the data
                    this.oCityPopup.bindAggregation("items", {
                            path: '/cities',
                            template: new sap.m.StandardListItem({
                                icon: "sap-icon://home",
                                title: '{name}',
                                description: "{state}"
                            })
                        })
                        //to open the popup
                    this.oCityPopup.open();
                    this.oCityPopup.setTitle("Cities");
                    this.oCityPopup.setMultiSelect(false)
                }.bind(this));
            } else {
                this.oCityPopup.open();
            }

        },


        onBack: function() {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("empty", true);
            }
            //   var oAppCon = this.getView().getParent();
            //   oAppCon.to("idAppView1");
        },
        onSave: function() {
            MessageBox.confirm("Are You Sure?", {
                title: "confirm.here!",
                onClose: function(status) {
                    if (status === "OK") {
                        MessageToast.show("HEY! I saved your Order");

                    } else {
                        MessageBox.error("Oops ! Something Went Wrong");
                    }
                }
            });
        },
        onCancel: function() {
            MessageBox.error("You cancel the order");
        },
        onItemPress: function(oEvent) {
            var sPath = oEvent.getParameter("listItem").getBindingContextPath();
            var sIndex = sPath.split("/")[sPath.split("/").length - 1]
            this.oRouter.navTo("supplier", {
                suppId: sIndex
            });
            MessageToast.show("Supplier detail is here")
        }
    });
});