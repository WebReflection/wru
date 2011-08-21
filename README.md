wru :: unit tests have ever been that easy
==========================================

wru is an essential unit test framework compatible with web environment, [node.js](http://nodejs.org/) and [Rhino](http://www.mozilla.org/rhino/) as well.

features
--------

  * **runs in both client and server environments**, compatible with html files, node.js, and Rhino
  * **both synchronous and asynchronous** tests in an absolutely intuitive way
  * **ES5 and JS.next ready**, compatible with `"use strict"` directive which means no `with` statement, `eval`, misused `this` references
  * **easy**, probably the easiest way to test JS code out there thanks to its simplified API: `test`, `assert`, and `async` ... you already remember "*all of them*", isn't it?
  * **unobtrusive**, everything that could possibly change in such dynamic environment as JS is, is *sandboxed* inside the *wru closure*. This means no matter how "*nasty*" is your code is, *wru* won't pollute or change the global environment, neither it will rely in native *constructor.prototypes* changes (`Array.prototype.push = ...` ? not a problem!)
  * **tiny**, even if it's not important in Unit Tests world, *wru* fits into about 1.2Kb minified and gzipped which means not much to fix or change here, just a simple and reliable framework for your tests