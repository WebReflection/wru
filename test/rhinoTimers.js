// from: http://j.mp/pV7mkC
// glory and fortune to to Weston C.
// but it's also RIDICULOUS Rhino does not implement in core timers properly

var
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval
;

(function (timer, ids, counter) {
    
    setInterval = function setInterval(fn, delay) {
        return schedule(fn, delay, 1);
    };
    
    setTimeout = function setTimeout(fn, delay) {
        return schedule(fn, delay);
    };
    
    clearInterval = clearTimeout = function clearInterval(id) {
        ids[id].cancel();
        timer.purge();
        delete ids[id];
    };
    
    function schedule(fn, delay, interval) {
        var id = counter++;
        ids[id] = new JavaAdapter(java.util.TimerTask,{run: fn});
        interval ?
            timer.schedule(ids[id], delay, delay)
            :
            timer.schedule(ids[id], delay)
        ;
        return id;
    }
    
})(new java.util.Timer(), {}, 1);