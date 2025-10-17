// ==UserScript==
// @name         Songsterr Popup Annihilator
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Relentlessly watches for and destroys the annoying Songsterr popup using a hyper-realistic click simulation. It never stops watching. This is the result of the website upping it's anti-anti-popup measures.
// @author       LemonBarsXD
// @match        https://www.songsterr.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const linkTextToFind = 'continue with pauses';
    let clickInterval = null;
    let mainObserver = null;

    // realistic sequence of mouse events
    const phantomClick = (element) => {
        const eventSequence = ['mouseover', 'mousedown', 'mouseup', 'click'];
        eventSequence.forEach(eventType => {
            const event = new MouseEvent(eventType, {
                view: window,
                bubbles: true,
                cancelable: true
            });
            element.dispatchEvent(event);
        });
    };

    const attemptPhantomClick = () => {
        let targetLink = null;
        // find the link by its text content
        const allLinks = document.getElementsByTagName('a');
        for (const link of allLinks) {
            if (link.textContent.trim() === linkTextToFind) {
                targetLink = link;
                break;
            }
        }

        // if link still exists, attack it.
        if (targetLink) {
            console.log('Annihilator Core: ...dispatching phantom click sequence.');
            phantomClick(targetLink);
        } else {
            // if link is gone, the click worked.
            // disarm the clicker but REMAIN VIGILANT >:)
            console.log('Annihilator Core: Target destroyed! Disarming the clicker, but remaining vigilant.');
            clearInterval(clickInterval);
            clickInterval = null;
        }
    };

    // look for the popup
    const initialFind = () => {
        // if clicker running, do nothing
        if (clickInterval) return;

        // check if the link has appeared
        const allLinks = document.getElementsByTagName('a');
        for (const link of allLinks) {
            if (link.textContent.trim() === linkTextToFind) {
                console.log(`Annihilator Sentry: Target acquired ("${linkTextToFind}"). Engaging clicker core.`);
                // Target found! Activate the Annihilator Core! >:D
                clickInterval = setInterval(attemptPhantomClick, 100); // 100 ms
                return;
            }
        }
    };

    // create the master observer that watches for any changes on the page
    mainObserver = new MutationObserver(initialFind);

    // start observing the entire page for as long as it's alive
    mainObserver.observe(document.body, { childList: true, subtree: true });

    console.log('The Songsterr Annihilator is active and eternally vigilant.');
})();
