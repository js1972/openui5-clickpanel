# openui5-clickpanel
ClickPanel control - replacement for sap.m.Panel with clickable header row (instead of just the icon)

This control allows for:
+ Clicking anywhere in the header to toggle expand/collapse
+ Specify custom open/close icons (or leave as default arrows)
+ Optional highlight of header text when hovering over panel header (along with the pointer icon)

See below for a screen-shot of the included sample application (included as index.html and application.js) which shows a variety of Panels. The first two show examples of using **addDelegate()** to capture the click event on the panel header. The issue with this technique is it relies on the UI5 CSS being stable which is not guaranteed unlike the JavaScript API.
Note here that when the header toolbar is used on the panel its not perfect. You need to actually click on the toolbar text - the logic to skip the buttons is also ugly.

The next two examples show the ClickPanel in action. One is created declarativey in the XML view and the other dynamically in application.js. The benefit of using a custom control is that it is self-contained and we don't need to pollute the calling application with code to trap events, etc.
The control still uses UI5 CSS however. There is no way to escape this, particularly because I want it to render exactly as the standard sap.m.Panel does.

The ClickPanel control falls back to working as a standard sap.m.Panel if you use it with a headerToolbar. You can however use the info toolbar which is only rendered when the panel is expanded and still get the features of the ClickPanel.

![image](https://cloud.githubusercontent.com/assets/1317161/16406095/8d2321c0-3d3e-11e6-818c-4b2880de72c7.png)

##OpenUI5 version
This has been tested up to OpenUI5/SAPUI5 version 1.38.4.
