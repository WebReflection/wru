    // node.js exports
    if (typeof global != "function") {

        window.wru = wru;
        window.assert = wru.assert;
        window.async = wru.async;
        window.test = wru.test;

        // re-assign window to make it global
        window = global;
    }
    