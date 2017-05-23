/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * cloudDetail module
 */
define(['ojs/ojcore', 'knockout', 'appVar', 'ojs/ojbutton'
], function (oj, ko, gVar) {
    /**
     * The view model for the main content view template
     */
    function cloudDetailContentViewModel() {
        var self = this;

        self.d_icon = ko.observable();
        self.d_Type = ko.observable();
        self.d_Name = ko.observable();
        self.d_money = ko.observable();
        self.d_link = ko.observable();
        self.d_desc = ko.observable();
        self.d_metric = ko.observable();
        self.d_Type_bg = ko.observable();


        self.goonline = function () {
            window.open(self.d_link().toString());
        };

        self.backtoHome = function () {
            oj.Router.rootInstance.go("Home");
        };

        // Media Queries for repsonsive header and navigation
        // Create small screen media query to update button menu display
        var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
        self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

        /**
         * Optional ViewModel method invoked when this ViewModel is about to be
         * used for the View transition.  The application can put data fetch logic
         * here that can return a Promise which will delay the handleAttached function
         * call below until the Promise is resolved.
         * @param {Object} info - An object with the following key-value pairs:
         * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
         * @param {Function} info.valueAccessor - The binding's value accessor.
         * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
         * the promise is resolved
         */
        self.handleActivated = function (info) {
            // Implement if needed
            if (gVar.currentCloud !== undefined) {
                self.d_Type(gVar.currentCloud.type);
                self.d_Name(gVar.currentCloud.name);
                self.d_money(gVar.currentCloud.price);
                self.d_link(gVar.currentCloud.link);
                self.d_desc(gVar.currentCloud.description);
                self.d_icon(gVar.currentCloud.icon);
                self.d_metric(gVar.currentCloud.metric);
                self.d_Type_bg(gVar.currentCloud.color);
            };

        };

        /**
         * Optional ViewModel method invoked after the View is inserted into the
         * document DOM.  The application can put logic that requires the DOM being
         * attached here.
         * @param {Object} info - An object with the following key-value pairs:
         * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
         * @param {Function} info.valueAccessor - The binding's value accessor.
         * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
         */
        self.handleAttached = function (info) {
            // Implement if needed
        };


        /**
         * Optional ViewModel method invoked after the bindings are applied on this View. 
         * If the current View is retrieved from cache, the bindings will not be re-applied
         * and this callback will not be invoked.
         * @param {Object} info - An object with the following key-value pairs:
         * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
         * @param {Function} info.valueAccessor - The binding's value accessor.
         */
        self.handleBindingsApplied = function (info) {
            // Implement if needed
        };

        /*
         * Optional ViewModel method invoked after the View is removed from the
         * document DOM.
         * @param {Object} info - An object with the following key-value pairs:
         * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
         * @param {Function} info.valueAccessor - The binding's value accessor.
         * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
         */
        self.handleDetached = function (info) {
            // Implement if needed
        };
    }

    return new cloudDetailContentViewModel;
});
