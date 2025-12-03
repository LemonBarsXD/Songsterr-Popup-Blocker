// ==UserScript==
// @name         Songsterr Popup Glitcher
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Interrupts the popup by simulating the Alt+1 keyboard shortcut twice with configurable delays.
// @author       LemonBarsXD
// @match        https://www.songsterr.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const linkTextToFind = 'continue playback';
    const initialDelay = 300; // time (ms) to wait AFTER finding popup but BEFORE pressing Alt+1
    const pressDelay = 200;   // time (ms) to wait between the first and second Alt+1

    let isResolving = false; // lock
    let mainObserver = null;

    // keyboard press sequence
    const triggerAltOne = () => {
        const eventProps = {
            key: '1',
            code: 'Digit1',
            keyCode: 49,
            which: 49,
            altKey: true,
            bubbles: true,
            cancelable: true,
            view: window
        };

        document.body.dispatchEvent(new KeyboardEvent('keydown', eventProps));
        document.body.dispatchEvent(new KeyboardEvent('keyup', eventProps));
    };

    const performGlitchSequence = () => {
        if (isResolving) return;
        isResolving = true;

        console.log(`Glitcher: Popup detected. Waiting ${initialDelay}ms before engaging...`);

        setTimeout(() => {
            console.log('Glitcher: Firing first Alt+1...');

            triggerAltOne();

            setTimeout(() => {
                console.log('Glitcher: Firing second Alt+1 (Closing menu)...');

                triggerAltOne();

                setTimeout(() => {
                    isResolving = false;
                    console.log('Glitcher: Sequence complete. Standing by.');
                }, 1000);

            }, pressDelay);
        }, initialDelay);
    };

    // look for popup text
    const checkForPopup = () => {
        if (isResolving) return;

        // super advanced xpath detections hackerino pasterino ;-)
        const textFound = document.evaluate(
            `//a[contains(text(), "${linkTextToFind}")]`,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;

        if (textFound) {
            performGlitchSequence();
        }
    };

    // master observer
    mainObserver = new MutationObserver(checkForPopup);

    // start:
    mainObserver.observe(document.body, { childList: true, subtree: true });

    console.log('Songsterr Popup Glitcher (Alt+1) v2.2 is active.');
})();
