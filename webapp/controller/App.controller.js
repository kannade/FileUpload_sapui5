sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/odata/v2/ODataModel",
	"../model/util"
], function(Controller, MessageToast, JSONModel, ODataModel, Util) {
	"use strict";

	return Controller.extend("alfa.hr.ess.FilesUploads.controller.App", {
		sFileUrl: "/sap/opu/odata/SAP/ZHR_TEST1_SRV",
		sUpldId: "uplCollId",
		onInit: function() {
			this._oDataModel = new ODataModel(this.sFileUrl);
			this.updateFiles();

			var oParamMdl = new JSONModel({
				AttachmentUploadUrl: "/sap/opu/odata/SAP/ZHR_TEST1_SRV/Files"
			});
			this.getView().byId("uplCollId").setModel(oParamMdl, "ParamMdl");
		},
		
		updateFiles : function(){
			this._oDataModel.read("/Files", {
				success: this.onFilesSuccess.bind(this),
				error: function(oEvt) {
					MessageToast.show("Ошибка при загрузке списка файлов");
				}
			});
		},

		onFilesSuccess: function(oEvt) {
			for (var i = 0; i < oEvt.results.length; i++) {
				oEvt.results[i].url = this.sFileUrl + "/Files('" + oEvt.results[i].filename + "')/$value";
				oEvt.results[i].attributes = [{
					title: "Загружено пользователем",
					text: oEvt.results[i].user
				}, {
					title: "Дата загрузки",
					text: Util.printDate(oEvt.results[i].changedDate)
				}, {
					title: "Время загрузки",
					text: Util.msToTime(oEvt.results[i].changedTime.ms)
				}];
			}
			var oMdl = new JSONModel({
				Files: oEvt.results
			});

			var oElem = this.getView().byId(this.sUpldId);
			oElem.setModel(oMdl);
			this.updateTitle();
		},

		onUploadComplete: function(oEvt) {
			var oElem = this.getView().byId(this.sUpldId);
			var oMdl = oElem.getModel();
			var oData = oMdl.getData();
			var aFiles = oEvt.getParameter("files");
			aFiles.forEach(function(oFile) {
				if (oData.Files) {
					oData.Files.push({
						filename: oFile.fileName,
						mimetype: "",
						url: this.sFileUrl + "/Files('" + encodeURIComponent(oFile.fileName) + "')/$value"
					});
				}
			}.bind(this));
			oMdl.setData(oData);
			oElem.setModel(oMdl);
			
			
			this.updateFiles();
			MessageToast.show("onUploadComplete");
		},

		onUploadTerminated: function(oEvt) {
			MessageToast.show("onUploadTerminated");
		},

		onBeforeUploadStarts: function(oEvt) {
			var oParams = oEvt.getParameters();
			var oDataModel = new ODataModel("/sap/opu/odata/SAP/ZHR_TEST1_SRV/");
			oParams.addHeaderParameter(new sap.m.UploadCollectionParameter({
				name: "slug",
				value: encodeURIComponent(oEvt.getParameter("fileName"))
			}));
			oParams.addHeaderParameter(new sap.m.UploadCollectionParameter({
				name: "x-csrf-token",
				value: oDataModel.getSecurityToken()
			}));
			oParams.addHeaderParameter(new sap.m.UploadCollectionParameter({
				name: "sendXHR",
				value: true
			}));

			MessageToast.show("onBeforeUploadStarts");
		},

		onFileDeleted: function(oEvent) {
			var sFile = oEvent.getParameter("documentId");
			var oData = this.getView().byId(this.sUpldId).getModel().getData().Files;
			$.each(oData, function(index) {
				if (oData[index] && oData[index].filename === sFile) {
					oData.splice(index, 1);
				}
			});

			var sAddr = "/Files('" + encodeURIComponent(sFile) + "')";
			this._oDataModel.remove(sAddr, {
				success: function() {
					MessageToast.show("Файл успешно удален");
				},
				error: function() {
					MessageToast.show("Произошла ошибка при удалении");
				}
			});

			this.getView().byId("uplCollId").getModel().setData({
				"Files": oData
			});
			this.updateTitle();
		},

		updateTitle: function() {
			var oElem = this.getView().byId(this.sUpldId);
			oElem.setNumberOfAttachmentsText("Файлы (" + oElem.getItems().length + ")");
		}
	});
});