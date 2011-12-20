    // node.js exports
    if (typeof global != "function") {

        window.wru = wru;

        // re-assign window to make it global
        window = global;
    }
    