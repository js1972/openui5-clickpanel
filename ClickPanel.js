//
// New Control ClickPanel.
//
// Features:
// - Allows a click anywhere in the header to open/close the panel
// - Allows you to specify custom open/close icons
// - Allows you to bolden the header text on hovering over the header area
//
sap.ui.define(['jquery.sap.global', 'sap/m/Panel'],
	function($, Panel) {
	"use strict";

	return Panel.extend("programic.ClickPanel", {
		metadata: {
			properties: {
				expandIcon: {type : "string", defaultValue : "sap-icon://navigation-right-arrow"},
				collapseIcon: {type : "string", defaultValue : "sap-icon://navigation-down-arrow"},
				highlightOnHover: {type: "boolean", defaultValue: true}
			}
		},

		// Setup a custom header for the Panel so that we can capture click events
		// and toggle expand/collapse.
		// We can use a label or any other control here, but below I've mimicked the
		// standard Panel header in a HTML control.
		// Additionally we setup custom icons.
		onBeforeRendering: function() {
			Panel.prototype.onBeforeRendering.apply(this, arguments);

			//this._header = new sap.m.Label({
			//  text: this.getHeaderText(),
			//  design: sap.m.LabelDesign.Bold,
			//  width: "100%"
			//});

			// Below is a replica of the html used in the standard sap.m.Panel but with the
			// pointer cursor added
			this._header = new sap.ui.core.HTML({
				content: "<h1 width='100%' class='sapMPanelHdr' style='cursor: pointer;'>" + this.getHeaderText() + "</h1>"
			});

			if (this.oIconCollapsed && this.getExpandIcon()) {
				this.oIconCollapsed.setSrc(this.getExpandIcon());
			}
		},

		// Attach to the click event on our custom header and toggle expand/collapse.
		// Also handle mouse movements over the header to highlight the text - giving
		// more of an indication that you can click here...
		onAfterRendering: function () {
			Panel.prototype.onAfterRendering.apply(this, arguments);

			var that = this;
			this._header.attachBrowserEvent("click", function () {
				that.setExpanded(!that.getExpanded());
			});

			if (this.getHighlightOnHover() === true) {
				this._header.attachBrowserEvent("mouseover mouseout", function (event) {
					if (event.type == "mouseover") {
						this.$().data("fw", this.$().css("font-weight"));
						this.$().css("font-weight", "bold");
					} else {
						this.$().css("font-weight", this.$().data("fw"));
					}
					return false;
				});
			}

			// Additionally we attach to the mouse events of the Icon and highlight
			// the header.
			if (this.getHighlightOnHover() === true) {
				this._getIcon().attachBrowserEvent("mouseover mouseout", function (event) {
					if (event.type == "mouseover") {
						that._header.$().data("fw", this.$().css("font-weight"));
						that._header.$().css("font-weight", "bold");
					} else {
						that._header.$().css("font-weight", that._header.$().data("fw"));
					}
					return false;
				});
			}
		},

		getHeader: function() {
			return this._header;
		},

		// Replave the Panels setExpanded() function so that we can specify our
		// own icons.
		setExpanded: function(e) {
			Panel.prototype.setExpanded.apply(this, arguments);
			if (e) {
				if (this.oIconCollapsed && this.getCollapseIcon()) {
					this.oIconCollapsed.setSrc(this.getCollapseIcon());
					this.oIconCollapsed.$().css('transform', 'translateY(-50%)');
				}
			} else {
				if (this.oIconCollapsed && this.getExpandIcon()) {
					this.oIconCollapsed.setSrc(this.getExpandIcon());
				}
			}
		},

		// In this renderer we override the standard Panels renderHeader() function - the
		// only change from the standard code is to render our custom header (which has a
		// click handler) instead of simply writing out the header text.
		// Note: these changes are only valid for a Panel with header text and NOT a header
		// toolbar.
		// Note: This is a STATIC method so cannot reference 'this'.
		renderer: {
			renderHeader: function(oRm, oPanel) {
				var bIsExpandable = oPanel.getExpandable(),
					bIsExpanded = oPanel.getExpanded(),
					oHeaderTBar = oPanel.getHeaderToolbar(),
					sHeaderClass;

				if (bIsExpandable) {
					// we need a wrapping div around icon and header
					// otherwise the border needed for both do not exact align
					oRm.write("<header");
					if (oHeaderTBar) {
						sHeaderClass = "sapMPanelWrappingDivTb";
					} else {
						sHeaderClass = "sapMPanelWrappingDiv";
					}

					oRm.addClass(sHeaderClass);
					if (bIsExpanded) {
						oRm.addClass(sHeaderClass + "Expanded");
					}

					oRm.writeClasses();
					oRm.write(">");

					var oIcon = oPanel._getIcon();
					if (bIsExpanded) {
						oIcon.addStyleClass("sapMPanelExpandableIconExpanded");
					} else {
						oIcon.removeStyleClass("sapMPanelExpandableIconExpanded");
					}

					oRm.renderControl(oIcon);
				}

				// render header
				var sHeaderText = oPanel.getHeaderText();

				if (oHeaderTBar) {
					oHeaderTBar.setDesign(sap.m.ToolbarDesign.Transparent, true);
					oRm.renderControl(oHeaderTBar);

				} else if (sHeaderText || bIsExpandable) {
					oRm.write("<h1");
					oRm.addClass("sapMPanelHdr");
					oRm.writeClasses();
					oRm.writeAttribute("id", oPanel.getId() + "-header");
					oRm.write(">");
					//oRm.writeEscaped(sHeaderText);
	            	oRm.renderControl(oPanel.getHeader());
					oRm.write("</h1>");
				}

				if (bIsExpandable) {
					oRm.write("</header>");
				}

				var oInfoTBar = oPanel.getInfoToolbar();

				if (oInfoTBar) {
					if (bIsExpandable) {
						// use this class as marker class to ease selection later in onAfterRendering
						oInfoTBar.addStyleClass("sapMPanelExpandablePart");
					}

					// render infoBar
					oInfoTBar.setDesign(sap.m.ToolbarDesign.Info, true);
					oRm.renderControl(oInfoTBar);
				}
			}
		}
	});
}, /* bExport= */ true);
