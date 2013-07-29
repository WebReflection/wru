    // node.js exports
    if (typeof __dirname != "undefined") {

        window.wru = wru;
        window.assert = wru.assert;
        window.async = wru.async;
        window.test = wru.test;
        window.log = wru.log;
        window.random = false;
        Object.defineProperty(window, "status", {get: function () {
          return wru.status;
        }});
        Object.defineProperty(window, "timeout", {
          get: function () {
            return wru.timeout;
          },
          set: function (value) {
            wru.timeout = parseInt(value, 10) || wru.timeout;
          }
        });

        // re-assign window to make it global
        window = global;
    }
