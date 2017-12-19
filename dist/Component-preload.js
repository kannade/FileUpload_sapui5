/**
* This file was auto-generated by SAP Web IDE build and includes all
* the source files required by SAPUI5 runtime for performance optimization.
* PLEASE DO NOT EDIT THIS FILE!! Changes will be overwritten the next time the build is run.
*/
jQuery.sap.registerPreloadedModules({
	"version": "2.0",
	"name": "alfa/hr/ess/FilesUploads/Component-preload",
	"modules": {
		"alfa/hr/ess/FilesUploads/Component.js": "sap.ui.define([\n\t\"sap/ui/core/UIComponent\",\n\t\"sap/ui/Device\",\n\t\"alfa/hr/ess/FilesUploads/model/models\"\n], function(UIComponent, Device, models) {\n\t\"use strict\";\n\n\treturn UIComponent.extend(\"alfa.hr.ess.FilesUploads.Component\", {\n\n\t\tmetadata: {\n\t\t\tmanifest: \"json\"\n\t\t},\n\n\t\t/**\n\t\t * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.\n\t\t * @public\n\t\t * @override\n\t\t */\n\t\tinit: function() {\n\t\t\t// call the base component's init function\n\t\t\tUIComponent.prototype.init.apply(this, arguments);\n\n\t\t\t// set the device model\n\t\t\tthis.setModel(models.createDeviceModel(), \"device\");\n\t\t}\n\t});\n});",
		"alfa/hr/ess/FilesUploads/view/App.view.xml": "<mvc:View xmlns:html=\"http://www.w3.org/1999/xhtml\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns=\"sap.m\"\n\tcontrollerName=\"alfa.hr.ess.FilesUploads.controller.App\" displayBlock=\"true\">\n\t<App>\n\t\t<pages>\n\t\t\t<Page title=\"{i18n>title}\">\n\t\t\t\t<content>\n\t\t\t\t\t<sap.ui.layout:VerticalLayout xmlns:sap.ui.layout=\"sap.ui.layout\" width=\"100%\" id=\"__layout0\">\n\t\t\t\t\t\t<sap.ui.layout:content>\n\t\t\t\t\t\t\t<UploadCollection instantUpload=\"true\" uploadUrl=\"{ParamMdl>/AttachmentUploadUrl}\" id=\"uplCollId\" uploadComplete=\"onUploadComplete\"\n\t\t\t\t\t\t\t\tbeforeUploadStarts=\"onBeforeUploadStarts\" uploadTerminated=\"onUploadTerminated\" fileDeleted=\"onFileDeleted\" items=\"{ path: '/Files' }\"\n\t\t\t\t\t\t\t\tmultiple=\"true\">\n\t\t\t\t\t\t\t\t<items>\n\t\t\t\t\t\t\t\t\t<UploadCollectionItem documentId=\"{filename}\" url=\"{url}\" fileName=\"{filename}\" mimeType=\"{mimetype}\" attributes=\"{path : 'attributes', templateShareable : false}\">\n\t\t\t\t\t\t\t\t\t\t<attributes>\n\t\t\t\t\t\t\t\t\t\t\t<ObjectAttribute title=\"{title}\" text=\"{path : 'text', formatter : '.formatAttribute'}\" active=\"{active}\" press=\"onAttributePress\"/>\n\t\t\t\t\t\t\t\t\t\t</attributes>\n\t\t\t\t\t\t\t\t\t</UploadCollectionItem>\n\t\t\t\t\t\t\t\t</items>\n\t\t\t\t\t\t\t</UploadCollection>\n\t\t\t\t\t\t</sap.ui.layout:content>\n\t\t\t\t\t</sap.ui.layout:VerticalLayout>\n\t\t\t\t</content>\n\t\t\t</Page>\n\t\t</pages>\n\t</App>\n</mvc:View>",
		"alfa/hr/ess/FilesUploads/controller/App.controller.js": "sap.ui.define([\n\t\"sap/ui/core/mvc/Controller\",\n\t\"sap/m/MessageToast\",\n\t\"sap/ui/model/json/JSONModel\",\n\t\"sap/ui/model/odata/v2/ODataModel\",\n\t\"../model/util\"\n], function(Controller, MessageToast, JSONModel, ODataModel, Util) {\n\t\"use strict\";\n\n\treturn Controller.extend(\"alfa.hr.ess.FilesUploads.controller.App\", {\n\t\tsFileUrl: \"/sap/opu/odata/SAP/ZHR_TEST1_SRV\",\n\t\tsUpldId: \"uplCollId\",\n\t\tonInit: function() {\n\t\t\tthis._oDataModel = new ODataModel(this.sFileUrl);\n\t\t\tthis.updateFiles();\n\n\t\t\tvar oParamMdl = new JSONModel({\n\t\t\t\tAttachmentUploadUrl: \"/sap/opu/odata/SAP/ZHR_TEST1_SRV/Files\"\n\t\t\t});\n\t\t\tthis.getView().byId(\"uplCollId\").setModel(oParamMdl, \"ParamMdl\");\n\t\t},\n\t\t\n\t\tupdateFiles : function(){\n\t\t\tthis._oDataModel.read(\"/Files\", {\n\t\t\t\tsuccess: this.onFilesSuccess.bind(this),\n\t\t\t\terror: function(oEvt) {\n\t\t\t\t\tMessageToast.show(\"Ошибка при загрузке списка файлов\");\n\t\t\t\t}\n\t\t\t});\n\t\t},\n\n\t\tonFilesSuccess: function(oEvt) {\n\t\t\tfor (var i = 0; i < oEvt.results.length; i++) {\n\t\t\t\toEvt.results[i].url = this.sFileUrl + \"/Files('\" + oEvt.results[i].filename + \"')/$value\";\n\t\t\t\toEvt.results[i].attributes = [{\n\t\t\t\t\ttitle: \"Загружено пользователем\",\n\t\t\t\t\ttext: oEvt.results[i].user\n\t\t\t\t}, {\n\t\t\t\t\ttitle: \"Дата загрузки\",\n\t\t\t\t\ttext: Util.printDate(oEvt.results[i].changedDate)\n\t\t\t\t}, {\n\t\t\t\t\ttitle: \"Время загрузки\",\n\t\t\t\t\ttext: Util.msToTime(oEvt.results[i].changedTime.ms)\n\t\t\t\t}];\n\t\t\t}\n\t\t\tvar oMdl = new JSONModel({\n\t\t\t\tFiles: oEvt.results\n\t\t\t});\n\n\t\t\tvar oElem = this.getView().byId(this.sUpldId);\n\t\t\toElem.setModel(oMdl);\n\t\t\tthis.updateTitle();\n\t\t},\n\n\t\tonUploadComplete: function(oEvt) {\n\t\t\tvar oElem = this.getView().byId(this.sUpldId);\n\t\t\tvar oMdl = oElem.getModel();\n\t\t\tvar oData = oMdl.getData();\n\t\t\tvar aFiles = oEvt.getParameter(\"files\");\n\t\t\taFiles.forEach(function(oFile) {\n\t\t\t\tif (oData.Files) {\n\t\t\t\t\toData.Files.push({\n\t\t\t\t\t\tfilename: oFile.fileName,\n\t\t\t\t\t\tmimetype: \"\",\n\t\t\t\t\t\turl: this.sFileUrl + \"/Files('\" + encodeURIComponent(oFile.fileName) + \"')/$value\"\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t}.bind(this));\n\t\t\toMdl.setData(oData);\n\t\t\toElem.setModel(oMdl);\n\t\t\t\n\t\t\t\n\t\t\tthis.updateFiles();\n\t\t\tMessageToast.show(\"onUploadComplete\");\n\t\t},\n\n\t\tonUploadTerminated: function(oEvt) {\n\t\t\tMessageToast.show(\"onUploadTerminated\");\n\t\t},\n\n\t\tonBeforeUploadStarts: function(oEvt) {\n\t\t\tvar oParams = oEvt.getParameters();\n\t\t\tvar oDataModel = new ODataModel(\"/sap/opu/odata/SAP/ZHR_TEST1_SRV/\");\n\t\t\toParams.addHeaderParameter(new sap.m.UploadCollectionParameter({\n\t\t\t\tname: \"slug\",\n\t\t\t\tvalue: encodeURIComponent(oEvt.getParameter(\"fileName\"))\n\t\t\t}));\n\t\t\toParams.addHeaderParameter(new sap.m.UploadCollectionParameter({\n\t\t\t\tname: \"x-csrf-token\",\n\t\t\t\tvalue: oDataModel.getSecurityToken()\n\t\t\t}));\n\t\t\toParams.addHeaderParameter(new sap.m.UploadCollectionParameter({\n\t\t\t\tname: \"sendXHR\",\n\t\t\t\tvalue: true\n\t\t\t}));\n\n\t\t\tMessageToast.show(\"onBeforeUploadStarts\");\n\t\t},\n\n\t\tonFileDeleted: function(oEvent) {\n\t\t\tvar sFile = oEvent.getParameter(\"documentId\");\n\t\t\tvar oData = this.getView().byId(this.sUpldId).getModel().getData().Files;\n\t\t\t$.each(oData, function(index) {\n\t\t\t\tif (oData[index] && oData[index].filename === sFile) {\n\t\t\t\t\toData.splice(index, 1);\n\t\t\t\t}\n\t\t\t});\n\n\t\t\tvar sAddr = \"/Files('\" + encodeURIComponent(sFile) + \"')\";\n\t\t\tthis._oDataModel.remove(sAddr, {\n\t\t\t\tsuccess: function() {\n\t\t\t\t\tMessageToast.show(\"Файл успешно удален\");\n\t\t\t\t},\n\t\t\t\terror: function() {\n\t\t\t\t\tMessageToast.show(\"Произошла ошибка при удалении\");\n\t\t\t\t}\n\t\t\t});\n\n\t\t\tthis.getView().byId(\"uplCollId\").getModel().setData({\n\t\t\t\t\"Files\": oData\n\t\t\t});\n\t\t\tthis.updateTitle();\n\t\t},\n\n\t\tupdateTitle: function() {\n\t\t\tvar oElem = this.getView().byId(this.sUpldId);\n\t\t\toElem.setNumberOfAttachmentsText(\"Файлы (\" + oElem.getItems().length + \")\");\n\t\t}\n\t});\n});",
		"alfa/hr/ess/FilesUploads/model/models.js": "sap.ui.define([\n\t\"sap/ui/model/json/JSONModel\",\n\t\"sap/ui/Device\"\n], function(JSONModel, Device) {\n\t\"use strict\";\n\n\treturn {\n\n\t\tcreateDeviceModel: function() {\n\t\t\tvar oModel = new JSONModel(Device);\n\t\t\toModel.setDefaultBindingMode(\"OneWay\");\n\t\t\treturn oModel;\n\t\t}\n\n\t};\n});",
		"alfa/hr/ess/FilesUploads/model/util.js": "sap.ui.define([], function() {\n\t\"use strict\";\n\n\treturn {\n\t\tmsToTime: function(duration) {\n\t\t\tvar milliseconds = parseInt((duration % 1000) / 100),\n\t\t\t\tseconds = parseInt((duration / 1000) % 60),\n\t\t\t\tminutes = parseInt((duration / (1000 * 60)) % 60),\n\t\t\t\thours = parseInt((duration / (1000 * 60 * 60)) % 24);\n\n\t\t\thours = (hours < 10) ? \"0\" + hours : hours;\n\t\t\tminutes = (minutes < 10) ? \"0\" + minutes : minutes;\n\t\t\tseconds = (seconds < 10) ? \"0\" + seconds : seconds;\n\n\t\t\treturn hours + \":\" + minutes + \":\" + seconds + ( milliseconds > 0 ? \".\" + milliseconds : \"\" );\n\t\t},\n\t\t\n\t\tprintDate : function(oDate){\n\t\t\tvar dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : \"dd.MM.YYYY\" });   \n\t\t\tvar sDate = dateFormat.format(oDate);\n\t\t\treturn sDate;\n\t\t}\n\t};\n});"
	}
});