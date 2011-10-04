        
        // node, rhino, and web
        try {
            // node
            var wru = require("./../build/wru.console").wru;
        } catch(wru) {
            // rhino
            try {
                load(
                    new java.io.File(".").getCanonicalPath() + 
                    "/build/wru.console.js"
                );
            } catch(wru) {
                // html (assuming test.html is used in same folders structure)
                (function(xhr){
                    xhr.open("get", "./../build/wru.min.js", false);
                    xhr.send(null);
                    Function(xhr.responseText.replace(/var wru=/,"this.wru=")).call(window);
                }(new XMLHttpRequest));
            }
        }
        
        wru.test([{
            name: "test that should pass",
            test: function () {
                wru.assert("it passes", 1);
            }
        },{
            name: "async test",
            test: function () {
                setTimeout(wru.async(function (arg) {
                    wru.assert("OK", "OK" === arg);
                }), 2000, "OK");
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
        }]);
        