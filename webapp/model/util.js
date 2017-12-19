sap.ui.define([], function() {
	"use strict";

	return {
		msToTime: function(duration) {
			var milliseconds = parseInt((duration % 1000) / 100),
				seconds = parseInt((duration / 1000) % 60),
				minutes = parseInt((duration / (1000 * 60)) % 60),
				hours = parseInt((duration / (1000 * 60 * 60)) % 24);

			hours = (hours < 10) ? "0" + hours : hours;
			minutes = (minutes < 10) ? "0" + minutes : minutes;
			seconds = (seconds < 10) ? "0" + seconds : seconds;

			return hours + ":" + minutes + ":" + seconds + ( milliseconds > 0 ? "." + milliseconds : "" );
		},
		
		printDate : function(oDate){
			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd.MM.YYYY" });   
			var sDate = dateFormat.format(oDate);
			return sDate;
		}
	};
});