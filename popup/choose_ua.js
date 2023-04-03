let backgroundPage = browser.extension.getBackgroundPage();

/*
If the user clicks on an element which has the class "ua-choice":
* fetch the element's textContent: for example, "IE 11"
* pass it into the background page's setUaString() function
*/
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("ua-choice")) {
    let chosenUa = e.target.textContent;
    backgroundPage.setUaString(chosenUa);
    document.getElementById('ua-choice').value = chosenUa;
    updateChoiceUI();
    return;
  }

  if (e.target.id === 'ua-toggle') {
    let isEnabled = e.target.checked
    backgroundPage.toggleActive(isEnabled);
    updateChoiceUI();
    return;
  }

});

function updateChoiceUI() {
  let enabled = backgroundPage.getEnabled();

  document.getElementById('ua-toggle').checked = enabled;

  if (!enabled) {
    document.getElementById('ua-choice').value = 'inactive';
    return;
  }

  let activeChoice = backgroundPage.getSelection();
  if (activeChoice) {
    document.getElementById('ua-choice').value = activeChoice;
  }
}

updateChoiceUI();
