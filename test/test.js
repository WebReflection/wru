
        var
            setup, teardown, jsc
        ;

        // node, rhino, and web
        try {
            // node and phantom js
            var wru = this.wru.assert ?
              this.wru :
              require("./../build/wru.console")
            ;
            go(wru);
        } catch(wru) {
            // rhino
            try {
                load(
                    new java.io.File(".").getCanonicalPath() +
                    "/build/wru.console.js"
                );
                go(wru);
            } catch(wru) {
                try {
                    // jsc test/test.js
                    load(
                        "build/wru.console.js"
                    );
                    jsc = true;
                    go(wru);
                } catch(wru) {
                    // html (assuming test.html is used in same folders structure)
                    (function(xhr){
                        try {
                        xhr.open("get", "./../build/wru.min.js", true);
                        xhr.onreadystatechange = function () {
                          if (xhr.readyState == 4) {
                            try {
                              Function(xhr.responseText.replace(/var wru=/,"this.wru=")).call(window);
                            } catch(e) {
                              alert(e);
                            }
                            go(window.wru);
                          }
                        };
                        xhr.send(null);
                        } catch(e) {
                          alert(e.message || e);
                        }
                    }(new XMLHttpRequest));
                }
            }
        }

        function go(wru) {

        wru.test([{
            name: "test that should pass",
            test: function () {
                wru.assert("it passes", 1);
            }
        },{
            name: "async test",
            test: function () {
                if (jsc) {
                    wru.log("JavaScriptCore does not support timers (yet)");
                    wru.assert("OK");
                } else {
                    setTimeout(wru.async(function (arg) {
                        wru.assert("OK", "OK" === arg);
                        wru.assert(setup === 1);
                        wru.assert(teardown == null);
                    }), 2000, "OK");
                }
            },
            setup: function () {
                setup = 1;
            },
            teardown: function () {
                teardown = 1;
            }
        },{
            name: "test that should fail",
            test: function () {
                wru.assert("this passes", true);
                wru.assert("this fails", 0);
            }
        },{
            name: "test that should throw an error",
            test: function () {
                wru.assert("it's an error", 1);
                WTF++;
            }
        },{
            name: "test that should be pass synchronously even if the callback was created via async",
            test: function () {
                function sync() {wru.assert(++executed)}
                var executed = 0;
                jsc ? sync() : wru.async(sync)();
                wru.assert(executed);
            }
        }]);
      }
