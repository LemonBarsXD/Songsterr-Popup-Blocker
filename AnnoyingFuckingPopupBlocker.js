// ==UserScript==
// @name         Songsterr Popup & Blur Blocker (Modular)
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Removes upgrade popup and blur overlays on Songsterr for uninterrupted playback and visible controls.
// @author       You
// @include      https://www.songsterr.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Remove blur-like styles from all elements
    function removeBlurStyles() {
    document.querySelectorAll('*').forEach(el => {
        const style = getComputedStyle(el);

        const hasBlur =
            (style.backdropFilter && style.backdropFilter.includes('blur')) ||
            (style.webkitBackdropFilter && style.webkitBackdropFilter.includes('blur')) ||
            (style.filter && style.filter.includes('blur'));

        if (hasBlur) {
            el.style.backdropFilter = 'none';
            el.style.webkitBackdropFilter = 'none';
            el.style.filter = 'none';
            el.style.pointerEvents = 'auto';
            console.log(`Removed blur style from element:`, el);
        }
    });

    document.body.style.overflow = 'auto';
    }


    // remove all elements by class name
    function removeElementsByClass(className) {
        const elements = document.getElementsByClassName(className);
        for (let i = elements.length - 1; i >= 0; i--) {
            elements[i].remove();
            console.log(`Removed element with class: ${className}`);
        }
    }

    // remove known popup and overlay classes
    function cleanupAll() {
        ['rq25k', 'Cip2pk', 'Cto1rx', 'D5an6'].forEach(removeElementsByClass);
        document.body.style.overflow = 'auto';
    }

    // initial cleanup
    removeBlurStyles();
    cleanupAll();

    // observe DOM for future blur or popup elements
    const observer = new MutationObserver(() => {
        removeBlurStyles();
        cleanupAll();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
