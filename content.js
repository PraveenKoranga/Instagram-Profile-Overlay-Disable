// Login popups have "Sign up" / "Log In" buttons. Other popups, like the
// bio "Links" list, don't, so they are left alone.
const isLoginPopup = (dialog) =>
  [...dialog.querySelectorAll('[role="button"], button, a')].some((el) =>
    /^(log in|sign up)$/i.test(el.textContent.trim())
  );

// Divs after the last script that must stay visible
const shouldKeep = (div) =>
  // Instagram's main page container, which sometimes comes after the last script
  div.id.startsWith("mount_") ||
  // A popup the user opened, e.g. the bio "Links" list
  [...div.querySelectorAll('[role="dialog"]')].some(
    (dialog) => !isLoginPopup(dialog)
  );

const disableDivsAfterLastScript = () => {
  const scripts = document.querySelectorAll("script");
  const lastScript = scripts[scripts.length - 1];

  if (!lastScript) return;

  let element = lastScript.nextElementSibling;

  while (element) {
    if (element.tagName === "DIV" && !shouldKeep(element)) {
      element.style.display = "none";
      element.style.pointerEvents = "none";
    }

    element = element.nextElementSibling;
  }
};

// Clicks the login popup's close (X) button. Returns true if it was clicked.
const clickLoginCloseButton = () => {
  for (const dialog of document.querySelectorAll('[role="dialog"]')) {
    const closeIcon = dialog.querySelector('svg[aria-label="Close"]');
    // The <svg> itself has no .click(), so click the button wrapping it
    const closeButton = closeIcon?.closest('[role="button"], button');

    if (closeButton && isLoginPopup(dialog)) {
      closeButton.click();
      return true;
    }
  }

  return false;
};

const handlePage = () => {
  // If the login popup has a close button, click it first.
  // Only hide the divs when there is no close button.
  if (clickLoginCloseButton()) return;

  disableDivsAfterLastScript();
};

// Run immediately
handlePage();

// Watch for dynamically added elements
const observer = new MutationObserver(() => {
  handlePage();
});

observer.observe(document.body, {
  childList: true,
  // The popup's close button can appear inside an already-added div
  subtree: true,
});
