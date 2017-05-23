/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Home module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appVar', 'ojs/ojknockout', 'ojs/ojselectcombobox', 'ojs/ojlistview', 'ojs/ojdatacollection-common', 'ojs/ojcollectiontreedatasource'
], function (oj, ko, $, gVar) {
    /**
     * The view model for the main content view template
     */
    function HomeContentViewModel() {
        var self = this;
        self.data = new Array();
        self.c_image = ko.observable();
        self.c_title = ko.observable();
        self.c_type = ko.observable();
        self.keyword = ko.observableArray();
        self.tags = ko.observableArray();
        self.c_image = ko.observable();
        self.dataSource = ko.observable([]);
        self.items = ko.observableArray([]);
        self.dbSource = new oj.ArrayTableDataSource(self.items, {idAttribute: "id"});
        self.selectedItems = ko.observableArray([]);
        self.c_Type_bg = ko.observable();
        self.tempArr = new Array();


        self.logSelected = function (data, ui)
        {
            if (ui.option === 'currentItem')
            {
                $.each(self.items(), function (index, value)
                {
                    if (ui.value === self.items()[index].id) {
                        gVar.currentCloud = self.items()[index];
                    }
                });
                oj.Router.rootInstance.go('cloudDetail');
            }
        };

        self.gotoDetail = function () {
            oj.Router.rootInstance.go('cloudDetail');
        };

        self.getCloudList = function (param) {
            var cloudlistUrl = gVar.NodeJSAPIURL;
            if (param !== undefined && undefined !== param[0]) {
                cloudlistUrl = gVar.NodeJSSearchAPIURL + param;
            }
            console.log(cloudlistUrl);
            $.ajax({
                type: "GET",
                url: cloudlistUrl,
                cache: false,
                success: function (data) {
                    if (data !== undefined && data !== "[]") {
                        $("#homeError").hide();
                    } else {
                        $("#homeError").show();
                    }
                    self.items(gVar.getFinalData(data));

                    if (param === undefined || param === "") {
                        self.data = new Array();
                        $.each(JSON.parse(data), function (index, value)
                        {
                            var tempObj = {
                                value: value.name,
                                label: value.name
                            };
                            self.data.push(tempObj);
                        });
                        self.tags(self.data);
                    }
                },
                error: function (err) {
                    alert(err.statusText);
                }
            });
        };

        self.getCloudList();

        self.valueChangeHandler = function (context, ui) {

            if (ui.option === "value") {
                //recall with ui.value
                if (ui.value === "") {
                    self.getCloudList();
                } else {
                    self.getCloudList(ui.value);
                }

            }
        };

        var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
        self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

        self.handleActivated = function (info) {
            // Implement if needed
            $("#homeError").hide();
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
//            $.getJSON("js/JSON/allCloudInfomation.json").done(function (data) {
//               
//            });
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
            self.tags();
            self.dataSource();
            self.items();
            self.data = new Array();
        };
    }

    return new HomeContentViewModel();
});
