# openui5-clickpanel
ClickPanel control - replacement for sap.m.Panel with clickable header row (instead of just the icon)

This control allows for:
+ Clicking anywhere in the header to toggle expand/collapse
+ Specify custom open/close icons (or leave as default arrows)
+ Optional highlight of header text when hovering over panel header (along with the pointer icon)

See below for a screen-shot of the included sample application (included as index.html and application.js) which shows a variety of Panels. The first two show examples of using **addDelegate()** to capture the click event on the panel header. The issue with this technique is it relies on the UI5 CSS being stable which is not guaranteed unlike the JavaScript API.
Note here that when the header toolbar is used on the panel its not perfect. You need to actually click on the toolbar text - the logic to skip the buttons is also ugly.

The next two examples show the ClickPanel in action. One is created declarativey in the XML view and the other dynamically in application.js. The benefit of using a custom control is that it is self-contained and we don't need to pollute the calling application with code to trap events, etc.
The control still uses UI5 CSS however. There is no way to escape this, particularly because I want it to render exactly as the standard sap.m.Panel does. *To remove the dependency on UI5 CSS would mean writing the control from scratch. This is just intended as a helper/enhancer on the standard Panel*.

The ClickPanel control falls back to working as a standard sap.m.Panel if you use it with a headerToolbar. You can however use the info toolbar which is only rendered when the panel is expanded and still get the features of the ClickPanel.

![image](https://cloud.githubusercontent.com/assets/1317161/16406095/8d2321c0-3d3e-11e6-818c-4b2880de72c7.png)

## OpenUI5 version
This has been tested up to OpenUI5/SAPUI5 version 1.38.4 (stable release as of Jun 2016) and back to version 1.34.12. It does not work on 1.28.35 (the control runtime seems to have changed since then).

## How did ClickPanel come about?
Simply from chatting with a colleague [@mattieharding](https://github.com/mattieharding) about the sap.m.Panel control and how to get it to open by clicking anywhere in the header for better usability. Then just whacked it on here...

## How to use?
+ To test ClickPanel you can simply git clone this repo and launch index.html from your favourite web server. Else, if you have Node.js and npm (why wouldn't you?) then run `$ npm install connect serve-static` followed by `$ node server.js` and you'll have a basic server to run the sample application with: `https://localhost:8080/`.
+ To use ClickPanel in your own app just copy the ClickPanel.js file to your project. I've used the 'progamic' namespace so adjust your bootstrap tag's resource roots to add: "programic": "./" (specify whatever directory you placed ClickPanel.js in). See the sample app: Application.js for how this is done.

## What next
+ Add tests?
+ Wrap in library (probably not worth it unless bundling with other controls)
+ ...

## Contributions
Contributions are most welcome if you can see better ways to do this or enhancements... Please send a pull-request.  ;-)
