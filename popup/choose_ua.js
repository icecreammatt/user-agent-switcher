
/*
If the user clicks on an element which has the class "ua-choice":
* fetch the element's textContent: for example, "IE 11"
* pass it into the background page's setUaString() function
*/
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("ua-choice")) {
    let backgroundPage = browser.extension.getBackgroundPage();
    let chosenUa = e.target.textContent;
    backgroundPage.setUaString(chosenUa);
    return;
  }
  if (e.target.id === 'ua-toggle') {
    let backgroundPage = browser.extension.getBackgroundPage();
    let isEnabled = e.target.checked
    backgroundPage.toggleActive(isEnabled);
    return;
  }

});
let backgroundPage = browser.extension.getBackgroundPage();
let enabled = backgroundPage.getEnabled();
document.getElementById('ua-toggle').checked = enabled;
