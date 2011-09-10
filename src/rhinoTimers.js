// revisited by Andrea Giammarchi, @WebReflection
// @link http://stackoverflow.com/questions/2261705/how-to-run-a-javascript-function-asynchronously-without-using-settimeout
// glory and fortune to to Weston C for the inital hint
// but it's also RIDICULOUS Rhino does not implement in core timers properly!

var
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval
;

(function (timer, ids, slice, counter) {
    
    // did you know?
    //  all browsers but IE accept one or more arguments
    //  to pass to the callbacl after the timer/delay number
    //  ... so does Rhino now!
    
    setInterval = function setInterval(fn, delay) {
        return schedule(fn, delay, slice.call(arguments, 2), 1);
    };
    
    setTimeout = function setTimeout(fn, delay) {
        return schedule(fn, delay, slice.call(arguments, 2));
    };
    
    clearInterval = clearTimeout = function clearInterval(id) {
        ids[id].cancel();
        timer.purge();
        delete ids[id];
    };
    
    function schedule(fn, delay, args, interval) {
        var id = ++counter;
        ids[id] = new JavaAdapter(java.util.TimerTask,{run: function () {
            fn.apply(null, args);
        }});
        interval ?
            timer.schedule(ids[id], delay, delay)
            :
            timer.schedule(ids[id], delay)
        ;
        return id;
    }
    
})(new java.util.Timer(), {}, [].slice, 0);