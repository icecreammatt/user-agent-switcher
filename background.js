"use strict";

let enabled = false;

/*
Map browser names to UA strings.
*/

let uaStrings = {
  "Edge": "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62",
  "Firefox 41": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:41.0) Gecko/20100101 Firefox/41.0",
  "Chrome 41": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
  "IE 11": "Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0;  rv:11.0) like Gecko"
};

/*
Initialize the UA to Firefox 41.
*/
let ua = uaStrings["Firefox 41"];

/*
Rewrite the User-Agent header to "ua".
*/
function rewriteUserAgentHeader(e) {
  if (enabled) {
    for (let header of e.requestHeaders) {
      if (header.name.toLowerCase() === "user-agent") {
        header.value = ua;
      }
    }
  }
  return {requestHeaders: e.requestHeaders};
}

/*
Add rewriteUserAgentHeader as a listener to onBeforeSendHeaders,
only for the target page.

Make it "blocking" so we can modify the headers.
*/
browser.webRequest.onBeforeSendHeaders.addListener(rewriteUserAgentHeader,
                                          {urls: ['<all_urls>']},
                                          ["blocking", "requestHeaders"]);

/*
Update ua to a new value, mapped from the uaString parameter.
*/
function setUaString(uaString) {
  ua = uaStrings[uaString];
  console.log(`UA String ${ua}`);
}

function toggleActive(isEnabled) {
  enabled = isEnabled;
  console.log(`Enabled = ${enabled}`);
}

function getEnabled() {
  return enabled;
}

