wru :: unit tests have ever been that easy
==========================================

wru is an essential unit test framework compatible with web environment, [node.js](http://nodejs.org/) and [Rhino](http://www.mozilla.org/rhino/) as well.


features
--------

  * **runs in both client and server environments**, compatible with html files, node.js, and Rhino
  * **both synchronous and asynchronous tests** in an absolutely intuitive way
  * **ES5 and JS.next ready**, compatible with `"use strict"` directive which means no `with` statements, `eval`, or misused `this` references
  * **easy**, probably the easiest way to test JS code out there thanks to its simplified API: `test`, `assert`, and `async` ... you already remember "*all of them*", isn't it?
  * **unobtrusive** and **self defensive**, since everything that could possibly change in such dynamic environment as JS is, is "*sandboxed*" inside the *wru closure*. This means no matter how "*nasty*" your code is, *wru* won't pollute or change the global environment, neither it will rely in native *constructor.prototypes* changes (`Array.prototype.push = ...` ? not a problem!)
  * **cursor included in both web and console** ... you gonna realize how much "[THE CURSOR](http://www.3site.eu/cursor/)" is important, specially to understand if your test is **stuck** or simply "*waiting for*" ... cursor is working in both Unix and OSX consoles
  * **tiny**, even if it's not important in Unit Tests world, *wru* fits into about 2Kb (1.2Kb *minzpped*) which means not much to fix or change here, just a simple, reliable, and essential framework for your tests
  * **under your control**, since there is absolutely **no magic behind the *wru* scene**. You assert what you want, you async what you need, you describe what's needed, and you are *ready to go* in less than 5 minutes

If you can't believe it check [html](https://github.com/WebReflection/wru/blob/master/test/test.html), [node.js](https://github.com/WebReflection/wru/blob/master/test/testnode.js), or [Rhino](https://github.com/WebReflection/wru/blob/master/test/testrhino.js) test and see how *wru* does work ;-)


compatibility
-------------

*wru* is compatible with basically all possible browsers out there included IE5.5, IE6, IE7, IE8, IE9, IE10, Chrome, Firefox, Safari, Webkit based, and Opera.

On server side *wru* is compatible with latest *Rhino* and *node.js* versions. I swear if **I find an easy way to** easily **test Spider/Iron/JagerMonkey I will** include **support them** too.


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

After the build process is finished, no more than 3 seconds with forced waiting time included to read stats if build has been *double-clicked*, you should be able to run again the test for your own environment.

Please bear in mind **JSbuilder.py** works with **Python < 3** (2.6 or 2.7 are fine) so be sure you have it (you should by default on Mac or Linux).


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
  * `assert("description", truishOrFalsyValue)` to manually assert whatever you want where **description is optional** (but suggested) and the assertion is compatible with *truish* or *falsy* values. You are in charge of strictly compared results if necessary by *===* operator, nothing new to learn here
  * `async("description", callback, timeout)` to tell *wru* that a test will be executed at some point later and where **both description and timeout are optionals**


properties
----------

  * `random`, as `true` or `false`, to make tests order execution random (by default `false`)
  * `node` on **web version only** to set a different node from the default one (which is an element with `id == "wru"`or the `document.body` or the `document.documentElement` if `body` is not present yet)


how does wru work
=================

following a list of explained tasks that are possible with *wru*


synchronous tests and wru.assert()
----------------------------------
Every test **may** have one or more `wru.assert()` calls inside. The method itself accepts one or two arguments. Following a sequence of valid operations.

    // the test object ...
    {
        name: "existance test",
        test: function () {
            
            // example only: if next property is not
            // null, undefined, 0, false, "", or NaN
            // the assertion will pass the test
            wru.assert("callback exists", window.onload);
            
            // if necessary, assertion can be strict without problems
            wru.assert(
                "it is a callback",
                typeof window.onload === "function"
            );
            
            // the description is visually useful
            // if the test fails but it's not mandatory
            // next example is still valid, no description
            wru.assert("isArray" in Array);
            
            // if a condition supposes to be truish
            // wru.assert can make test life easier
            // returning the asserted value
            if (wru.assert("defineProperty" in Object)) {
                wru.assert(
                    Object.defineProperty({}, "_", {value: true})._
                );
            }
            
        }
    }


asynchronous tests and wru.async()
----------------------------------
Every test is performed synchronously unless there is one or more `wru.async()` calls. In latter case all tests after the current one will be waiting for the asynchronous call to be executed.
When it happens, if the asynchronous call performed one or more assertions, the framework keep going without requiring any extra step: **is that easy!**

    // the test object ...
    {
        name: "load content",
        test: function () {
            // asynchronous test example
            
            // this will be synchronous
            wru.assert("condition accepted", true);
            
            // this will be asynchronous
            var xhr = new XMLHttpRequest;
            xhr.open("get", "file.txt", true);
            xhr.onreadystatechange = wru.async(function () {
                if (this.readyState === 4) {
                    
                    // only on readyState 4 there is an assertion
                    wru.assert("text is not empty", this.responseText.length);
                    
                    // if necessary, async call can be nested
                    setTimeout(wru.async(function () {
                        wru.assert(
                            "DOM changed in the meanwhile",
                            docment.body.innerHTML != storedLayout
                        );
                    }, 500));
                }
            });
            xhr.send(null);
            
            // this will be performed regardless
            wru.assert("something else to check", 1);
        }
    }

In above example, the `onreadystatechange` function may be executed many times on different `readyState`. The *wru* logic cannot care less about it since an asynchronous callback is considered *done* when **at least one assertion has been performed**.
If this does not happen the internal `TIMEOUT` constant, by default 10 seconds, will kill the procedure.
You have to admit there is no reason to create an asynchronous test without performing some assertion inside the callback ... and this is where *wru* is smart.
If many assertions have been defined and one of them is not reached is most likely because there was an error or a failure in the test.
*wru* tracks all tests without problems so forget things such `lib.expectedAssertions(3)` and "*friends*" ... you really may not need that!


the temporary object
--------------------

If needed, every `setup`, `test`, or `teardown` function will receive a "*freshly new backed*" object for the current test.
This can be handy to store some reference or value on `setup`, use them during the `test`, and drop them during the `teardown` if necessary.

    // the test object ...
    {
        name: "tmp object all over",
        setup: function (tmp) {
            tmp.global = window;
            tmp.global.random = Math.random();
        },
        test: function (tmp) {
            wru.assert(
                tmp.global === window // true
            );
            wru.assert(
                typeof tmp.global.random == "number" // true again
            );
        },
        teardown: function (tmp) {
            delete tmp.global.random;
            delete tmp.global;
        }
    }


the build process
=================

*wru* is based on [javascript-builder](http://code.google.com/p/javascript-builder/) which is able to aggregate distributed files in order to produce the final library/framework even if the source/JS logic is split in more files.

This is the *wru* case, where some file is dedicated for web environment rather than console/shell one.
If you fork the project and you make some change/improvement, first of all let me know :-), secondly remember to re-build the script.
This is the list of files actually created by *wru build process* inside the *build* folder:

  * **wru.console.max.js** is the full script console/shell related, suitable for *node.js* or *rhino* tests
  * **wru.console.js** is the minified version of the precedent one with `wru.debug()` stripped out
  * **wru.dom.js** is the full script DOM related, suitable for *web* and *browsers*
  * **wru.min.js** is the minified version of the precedent one with `wru.debug()` stripped out

`wru.debug()` is a method used to export, track, test, or change internals. You should never use this method unless strictly necessary but it's there for debugging purpose.
`wru.debug()` is automatically removed from built versions so that no evaluation of internals can be possible.


wru against others
==================

Other UT frameworks may offer more than what *wru* does but this rarely comes for free.
Some of them may have such complicated/articulated logic that it may happens is the UT framework itself that's failing rather than your code.
Also you need to read a lot of documentation and most likely to obtain something already possible with *wru*.
I am not saying *wru* is the best UT framework out there, I am just saying you should consider your requirements before you chose an UT framework ;-)
In any case, *wru* aim is to make any sort of test simplified and under control.

As example: "*do you really need so much 'magic' to perform these tasks?*"

    // rather than specify expected arguments
    // via magic/complicated operations
    function (a, b, c) {
        wru.assert("received numbers",
            typeof a == "number"
            &&
            typeof b == "number"
            &&
            typeof c == "number"
        );
    }
    
    // rather than specify returned values
    // via magic/complicated operations
    wru.assert(typeof callbac() != "undefined");
    
    // did you know the console object
    // may have already an assert() method
    // since that's basically all you need?
    wru.assert(
        "if true, I can get rid of wru since all I need is 'assert'",
        "assert" in console
    );
    
    // the only reason wru may be handy is the
    // cross platform/environment compatibility
    // and its async method interlaced with
    // current enironment layout (HTML/Shell)
    wru.assert("oh come on but this is so easy!", 1);

Just give it a try ;-)


wrap it if you want
===================

If you think *wru* is too simple, you still have a chance to improve it wrapping its basic methods and create something wonderful out of it.
Arguments automations? Returned values? Expected number of calls per callback?

The *wru* cross environment core is easy to hack for anybody, check [wru.js](https://github.com/WebReflection/wru/blob/master/src/wru.js) and your are already half way through ;-)


license
=======

*wru* unit test framework and the rest of the project is under Mit Style License

    Copyright (C) 2011 by Andrea Giammarchi, @WebReflection
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.