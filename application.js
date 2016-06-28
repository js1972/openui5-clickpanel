// local controller
sap.ui.controller("my.controller", {
	onInit: function() {
		var panel = this.byId("panel");

		// This is a hack way of enabling a click in the header of a Panel to toggle expand/collapse.
		panel.addDelegate({
			onclick: function(oEvent) {
				if (oEvent.target === panel.$().find(".sapMPanelHdr").get(0)) {
					panel.setExpanded(!panel.getExpanded());
				}
			}
		});

		// This is another test but using a panel with a header toolbar - its not quite working properly yet.
		var panel2 = this.byId("panel2");
		panel2.addDelegate({
			onclick: function(oEvent) {
				if ($(oEvent.target).hasClass("sapUiIcon")) {
					return;
				}
				if ($(oEvent.target).find(".sapUiIcon").get(0)) {
					return;
				}
				if (panel2.$().find("#__toolbar0").get(0)) {
					panel2.setExpanded(!panel2.getExpanded());
				}
			}
		});
	},

	//dummy code
	onSelect: function(evt){
		window.open("",  "_blank");
	}
});


// Instantiate the new control
sap.ui.require(["programic/ClickPanel"], function (ClickPanel) {
	var myControl = new ClickPanel("panel3", {
		expandable: true,
		expandIcon: "sap-icon://add",
		collapseIcon: "sap-icon://less",
		headerText: "Testing... 1... 2... 3... (added dynamically)",
		content: new sap.m.Text("txt1", {text: "Hell there! I've been added dynamically in JavaScript..."})
	});

	myControl.placeAt("content");
});

var oView = sap.ui.xmlview({
	viewContent: jQuery('#myView').html()
});
oView.placeAt('content');
