# Instagram Profile Overlay Disable

A small Chrome extension that gets rid of Instagram's "Sign up / Log in" popups, so you can browse profiles without logging in.

## What it does

On `www.instagram.com` pages:

- **Login popup with a close (X) button** (for example "See photos, videos and more from…"): clicks the X, so the popup closes properly and the page scrolls again.
- **Login popup without an X** (for example "Continue watching", which appears after you scroll for a while): hides it.
- **Other popups**, like the list that opens from "and N more" under the bio links: left alone, so they keep working.

It keeps watching the page, so popups that appear later are handled too.

## Install

1. Get the code:

   ```bash
   git clone https://github.com/PraveenKoranga/Instagram-Profile-Overlay-Disable.git
   ```

   Or on GitHub, click **Code → Download ZIP** and unzip it.

2. Open `chrome://extensions` in Chrome.
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and select the folder that contains `manifest.json`.

## Use

Open any Instagram profile, for example <https://www.instagram.com/instagram/>. There's nothing to click; the popups are handled automatically.

To turn it off, switch the extension off in `chrome://extensions`.

## Update

1. Get the latest code with `git pull` (or download the ZIP again).
2. In `chrome://extensions`, click the reload icon on the extension's card.
3. Refresh Instagram.

## How it works

[`content.js`](content.js) runs on every `www.instagram.com` page (see [`manifest.json`](manifest.json)):

1. If a login popup (a dialog with "Sign up" / "Log In" buttons) has a close button, it clicks it.
2. Otherwise, it hides the `<div>`s after the last `<script>` tag, which is where Instagram puts its popups. It skips Instagram's main page container and any popup that isn't a login popup.
3. A `MutationObserver` repeats this whenever the page changes.

## Limitations

- Works only when Instagram is in English, because it looks for the "Close", "Sign up" and "Log In" labels.
- Instagram changes its page often. If the popups come back, `content.js` probably needs updating.
- It's meant for browsing while logged out. When you're logged in, it may hide some of Instagram's other pop-up elements, so turn it off.

Not affiliated with Instagram or Meta.
