    // node.js exports
    if (typeof global != "function") {
        // the "this" reference was the module, not the global
        // export wru
        window.wru = wru;
        // and re-assign window
        window = global;
    }