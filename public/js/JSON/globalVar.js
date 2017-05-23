define(['ojs/ojcore', 'jquery'],
        function (oj, $) {
            /**
             * The view model for the main content view template
             */
            function appVariablesModel() {
                var self = this;
                self.currentCloud = {
                };

                self.NodeJSAPIURL = "https://javadaynodejsdemoapplication-gse00011010.apaas.em3.oraclecloud.com/javaDayTokyoNodejs/list/";
                self.NodeJSSearchAPIURL = "https://javadaynodejsdemoapplication-gse00011010.apaas.em3.oraclecloud.com/javaDayTokyoNodejs/service/";

                self.totalCloud = new Array();

                self.getIcon = function (name) {
                    var imageIcon;
//                    console.log("icon name is " + name);
                    imageIcon = "css/images/" + name + ".png";
                    
//                    if (type === 'IaaS')
//                        imageIcon = "css/images/StorageCloud.png";
//                    else if (type === 'PaaS')
//                        imageIcon = "css/images/ApplicationContainerCloud.png";
//                    else
//                        imageIcon = 'css/images/GlobalHumanResourcesCloud.png';
                    return imageIcon;
                };

                self.getColor = function (type) {
                    var bg_color;
                    if (type === 'IaaS')
                        bg_color = 'background: rgb(0,124,168)';
                    else if (type === 'PaaS')
                        bg_color = 'background: rgb(34,130,114)';
                    else
                        bg_color = 'background: rgb(0,129,147)';
                    return bg_color;
                };

                self.getFinalData = function (JSONReturn) {

                    if (JSONReturn !== undefined && JSONReturn[0] !== "") {
                        self.totalCloud = new Array();
                        var newArray = JSON.parse(JSONReturn);
                        for (var i = 0; i < newArray.length; i++) {
                            var value = newArray[i];
                            var color = self.getColor(value.type);
                            var newName = self.Trim(value.name);
                            var Icon = self.getIcon(newName);
                            value.color = color;
                            value.icon = Icon;
                            value.id = i;
                            self.totalCloud.push(value);
                        }

                        return self.totalCloud;
                    } else {

                    }

                };


                self.Trim = function (str)
                {
                    var result;
                    result = str.replace(/\s/g, "");
                    return result;
                };


                self.getFinalData();
            }

            return new appVariablesModel();
        });