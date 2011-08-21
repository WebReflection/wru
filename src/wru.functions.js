    // common functions for all versions
    function giveItATry(name) {
        if (iHasIt(current, name)) {
            try {
                current[name](tmp);
            } catch(doooodeThisIsBAD) {
                push.call(fatal, EMPTY + doooodeThisIsBAD);
            }
        }
    }
    
    function iHasIt(object, name) {
        return hasOwnProperty.call(object, name);
    }
    
    function messItUp() {
        return random() < .5 ? -1 : 1;
    }
    