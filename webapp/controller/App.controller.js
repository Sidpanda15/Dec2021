sap.ui.define([
    'soyuz/sid/fiori/controller/BaseController'
], function(BaseController) {
    'use strict';
    return BaseController.extend("soyuz.sid.fiori.controller.App", {
        onInit: function() {
            console.log("Hello folks..... ")
        }
    });

});