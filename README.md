wru :: unit tests have ever been that easy
==========================================

wru is an essential unit test framework compatible with web environment, [node.js](http://nodejs.org/) and [Rhino](http://www.mozilla.org/rhino/) as well.


features
--------

  * **runs in both client and server environments**, compatible with html files, node.js, and Rhino
  * **both synchronous and asynchronous tests** in an absolutely intuitive way
  * **ES5 and JS.next ready**, compatible with `"use strict"` directive which means no `with` statements, `eval`, or misused `this` references
  * **easy**, probably the easiest way to test JS code out there thanks to its simplified API: `test`, `assert`, and `async` ... you already remember "*all of them*", isn't it?
  * **unobtrusive**, everything that could possibly change in such dynamic environment as JS is, is "*sandboxed*" inside the *wru closure*. This means no matter how "*nasty*" your code is, *wru* won't pollute or change the global environment, neither it will rely in native *constructor.prototypes* changes (`Array.prototype.push = ...` ? not a problem!)
  * **cursor included in both web and console** ... you gonna realize how much "[THE CURSOR](http://www.3site.eu/cursor/)" is important, specially to understand if your test is **stuck** or simply "*waiting for*" ... cursor is working in both Unix and OSX consoles
  * **tiny**, even if it's not important in Unit Tests world, *wru* fits into about 2Kb (1.2Kb *minzpped*) which means not much to fix or change here, just a simple and reliable framework for your tests
  * **under your control**, since there is absolutely *no magic* behind *wru* code. You assert what you want, you async what you need, you describe what's needed, and you are *ready to go* in less than 5 minutes

If you can't believe it check [html](https://github.com/WebReflection/wru/blob/master/test/test.html), [node.js](https://github.com/WebReflection/wru/blob/master/test/testnode.js), or [Rhino](https://github.com/WebReflection/wru/blob/master/test/testrhino.js) test and see how *wru* does work ;-)


wru basics
----------

    // probably all you need in a "one shot" test
    wru.test({
        name: "Hello wru!",
        test: function () {
            wru.assert("it works!", 1);
        }
    });
    
    // for multiple tests ... pass an Array
    wru.test([{
        name: "test #1",
        setup: function () {
            // setup before the test
        },
        test: function () {
            // do stuf here
        },
        teardown: function () {
            // clean up after the test
        }
    },{
        name: "test #2",
        test: function () {
            // do other stuf here
        }
    }]);


test wru
--------

From *wru* root directory, simply run these commands accordingly with what you want to test:

    // node.js test
    node test/testnode.js
    
    // Rhino
    java -jar builder/jar/js.jar test/testrhino.js
    
    // web, through Mac OSX
    open test/test.html

If you forked the project, you made some change, and you want to **recompile wru**, this is all you have to do:

    // still inside wru folder
    python builder/build.py

After the build process is finished, no more than 3 seconds, you should be able to run again the test for your own environment.


wru API
-------

There are truly few things you need to know, and even less properties you need to configure