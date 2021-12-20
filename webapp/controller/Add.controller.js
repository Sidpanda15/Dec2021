sap.ui.define([

    'soyuz/sid/fiori/controller/BaseController',
    'soyuz/sid/fiori/util/formatter',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/m/MessageToast',
    'sap/m/MessageBox',
    'sap/ui/model/json/JSONModel',
    "sap/m/StandardListItem",
    'sap/ui/core/Fragment'

], function(BaseController,
    formatter,
    Filter,
    FilterOperator,
    MessageToast,
    MessageBox,
    JSONModel,
    StandardListItem,
    Fragment) {
    'use strict';
    return BaseController.extend("soyuz.sid.fiori.controller.View1", {
        onInit: function() {
            //obtain the router object
            //we need to ask component.js to give us the router object
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oLocalModel = new JSONModel();
            this.oLocalModel.setData({
                "productData": {
                    "PRODUCT_ID": "",
                    "TYPE_CODE": "PR",
                    "CATEGORY": "Notebooks",
                    "NAME": "",
                    "DESCRIPTION": "",
                    "SUPPLIER_ID": "0100000051",
                    "SUPPLIER_NAME": "TECUM",
                    "TAX_TARIF_CODE": "1 ",
                    "MEASURE_UNIT": "EA",
                    "WEIGHT_MEASURE": "4.300 ",
                    "WEIGHT_UNIT": "KG",
                    "PRICE": "",
                    "CURRENCY_CODE": "EUR"
                }
            });
            this.getView().setModel(this.oLocalModel, "data");
        },
        onSave: function() {
            // MessageToast.show("Save will happen soon");
            // Step1 : get the odata model object
            var oDataModel = this.getView().getModel();
            // step 2: prepare payload data
            var payload = this.oLocalModel.getProperty("/productData");
            // step 3 : send the post call
            oDataModel.create("/ProductSet01", payload, {
                success: function(data) {
                    MessageToast.show("Product is saved Successfully");
                },
                error: function(oErr) {
                    MessageBox.error(JSON.parse(oErr.responseText).error.innererror.errordetails[0].message)
                }
            })
        },
        inpField: null,
        oSupplierPopup: null,
        onF4Supplier: function(oEvent) {
            this.inpField = oEvent.getSource();
            if (!this.oSupplierPopup) {
                Fragment.load({
                    name: "soyuz.sid.fiori.fragments.popup",
                    controller: this,
                    id: "idSuppliers"
                }).then(this.onCallBackSupplier.bind(this));
            } else {
                this.oSupplierPopup.open();
            }
        },
        onCallBackSupplier: function(oFragment) {
            this.oSupplierPopup = oFragment;
            this.getView().addDependent(this.oSupplierPopup);
            this.oSupplierPopup.bindAggregation("items", {
                path: '/SupplierSet',
                template: new sap.m.StandardListItem({
                    icon: 'sap-icon://employee',
                    title: "{BP_ID}",
                    description: "{EMAIL_ADDRESS}"
                })
            });
            this.oSupplierPopup.setTitle("Suppliers");
            this.oSupplierPopup.setMultiselect(false);
        },

        onConfirm: function(oEvent) {
            var sId = oEvent.getParameter("id");
            if (sId.indexOf("idSuppliers") !== -1) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                var sCityName = oSelectedItem.getTitle();
                this.inpField.setValue(sCityName);
            }
        },
        onEnter: function(oEvent) {
            //step1 : what is the product id user entered into the field
            var productId = oEvent.getParameter("value");
            // step 2 : get the odata model object
            var oDataModel = this.getView().getModel();
            // step3 : read single record from the odata model
            var that = this;
            oDataModel.read("/ProductSet01('" + productId + "')", {
                // step4 : in success call back populate my data- set local model
                success: function(data) {
                    that.oLocalModel.setProperty("/productData", data);
                },
                // step5 : error handling if you love it
                error: function(oError) {
                    MessageBox.error("Dude there is a situation here!")
                }

            })
        },
        onLoad: function(oEvent) {
            var productId = oEvent.getParameter("value");
            // step 2 : get the odata model object
            var oDataModel = this.getView().getModel();
            // step3 : read single record from the odata model
            var that = this;
            oDataModel.callFunction("/GetMostExpensiveProduct", {
                urlParameters: {
                    "I_CATEGORY": "Notebooks"
                },
                // step4 : in success call back populate my data- set local model
                success: function(data) {
                    that.oLocalModel.setProperty("/productData", data);
                },
                // step5 : error handling if you love it
                error: function(oError) {
                    MessageBox.error("Dude there is a situation here!")
                }

            })
        }
    });
});