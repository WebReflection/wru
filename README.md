wru :: unit tests have ever been that easy
==========================================

wru is an essential unit test framework compatible with web environment, [node.js](http://nodejs.org/) and [Rhino](http://www.mozilla.org/rhino/) as well.

features
--------

  * **runs in both client and server environments**, compatible with html files, node.js, and Rhino
  * **both synchronous and asynchronous** tests in an absolutely intuitive way
  * **ES5 and JS.next ready**, compatible with `"use strict"` directive which means no `with` statements, `eval`, misused `this` references
  * **easy**, probably the easiest way to test JS code out there thanks to its simplified API: `test`, `assert`, and `async` ... you already remember "*all of them*", isn't it?
  * **unobtrusive**, everything that could possibly change in such dynamic environment as JS is, is *sandboxed* inside the *wru closure*. This means no matter how "*nasty*" your code is, *wru* won't pollute or change the global environment, neither it will rely in native *constructor.prototypes* changes (`Array.prototype.push = ...` ? not a problem!)
  * **cursor included in both web and console** ... you gonna realize how much "[THE CURSOR](http://www.3site.eu/cursor/)" is important, specially to understand if your test is **stuck** or simply "*waiting for*" ... cursor is working in both Unix and OSX consoles
  * **tiny**, even if it's not important in Unit Tests world, *wru* fits into about 2Kb (1.2Kb *minzpped*) which means not much to fix or change here, just a simple and reliable framework for your tests
  * **under your control**, since there is absolutely *no magic* behind *wru* code. You assert what you want, you async what you need, you describe what's needed, and you are *ready to go* in less than 5 minutes