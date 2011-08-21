    // "THE CURSOR" http://3site.eu/cursor
    window.setInterval(function () {
        waitForIt && log(EMPTY + charAt.call(cursor, ci++%4) + "\033[<1>A");
    }, TIMEOUT);
    