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


how to test wru
---------------

From *wru* root directory, simply run these commands accordingly with what you want to test:

    // node.js test
    node test/testnode.js
    
    // Rhino
    java -jar builder/jar/js.jar test/testrhino.js
    
    // web (through Mac OSX but you can open test.html with any browser)
    open test/test.html

If you forked the project, you made some change, and you want to **rebuild wru**, this is all you have to do:

    // still inside wru folder
    python builder/build.py

After the build process is finished, no more than 3 seconds, you should be able to run again the test for your own environment.


wru basics
----------

    // probably all you need as "one shot" test
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
            // async test example
            setTimeout(wru.async(function () {
                wru.assert("executed", true);
            }), 1000);
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

To know more about *wru* possibilities ... please keep reading ;-)


wru API
=======

There are truly few things you need to know, and even less properties you need to configure!


methods
-------

  * `test(object)` or `test([object, ..., object])` to execute one or more tests. A generic test object may have one or more properties:
      * `test` property, as **function**, to execute the test with one or more `wru.assert()` or `wru.async()` calls. **optional** but recommended
      * `name` or `description` property, as **string**, to have visual knowledge of the current test **optional**
      * `setup` property, as **function**, that will be executed right before the test: **optional**
      * `teardown` property, as **function**, that will be executed right after the test: **optopnal**
  * `assert("description", truishOrFalsyValue)` to manually assert whatever you want where **description is optional** (but suggested)
  * `async("description", callback, timeout)` to tell *wru* that a test will be executed at some point later and where **both description and timeout are optionals**


properties
----------

  * `random`, as `true` or `false`, to make tests order execution random (by default `false`)
  * `node` on **web version only** to set a different node from the default one (which is an element with `id == "wru"`or the `document.body` or the `document.documentElement` if `body` is not present yet)


how does wru work
-----------------

Every test is performed synchronously unless there is no `wru.async()` call. In latter case all tests after the current will be waiting for the asynchronous call to be executed.
When it happens, if the asynchronous call performed one or more assertions, the framework keep going without requiring any extra step: is that easy!

    // asynchronous test example
    
    // this will be synchronous
    wru.assert("condition accepted", true);
    
    // this will be asynchronous
    var xhr = new XMLHttpRequest;
    xhr.open("get", "file.txt", true);
    xhr.onreadystatechange = wru.async(function () {
        if (this.readyState === 4) {
            wru.assert("text is not empty", this.responseText.length);
        }
    });
    xhr.send(null);
    
    // this will be performed regardless
    wru.assert("something else to check", 1);

In above example, the `onreadystatechange` function may be executed many times on different `readyState`. The *wru* logic cannot care less about it since an asynchronous callback is considered *done* when **at least one assertion has been performed**.
If this does not happen the internal `TIMEOUT` constant, by default 10 seconds, will kill the procedure.
You have to admit there is no reason to create an asynchronous test without performing some assertion inside the callback ... and this is where *wru* is smart.
If many assertions have been defined and one of them is not reached is most likely because there was an error or a failure in the test.
*wru* tracks all tests without problems so forget things such `lib.expectedAssertions(3)` and *friends* ... you really may not need that!