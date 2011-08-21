    // DOM specific version
    function isGonnaBeLegen() {
        current = shift.call(queue);
        if (current) {
            (node = putItThereAndGimmeBack(
                putItThereAndGimmeBack(wru.node, "div"),
                "span"
            )).innerHTML = (
                (iHasIt(current, NAME) && current[NAME])
                ||
                (iHasIt(current, DESCRIPTION) && current[DESCRIPTION])
                ||
                UNKNOWN
            ) + EMPTY + EMPTY;
            pass = [];
            fail = [];
            fatal = [];
            tmp = {};
            giveItATry("setup");
            fatal[LENGTH] || giveItATry("test");
            giveItATry("teardown");
            waitForIt || Dary();
        } else {
            showSummary();
        }
    }
    
    function create(nodeName) {
        return createElement.call(document, nodeName);
    }
    
    function putItThereAndGimmeBack(node, nodeName) {
        return node.appendChild(create(nodeName));
    }
    
    function passTheInfo(info) {
        node[INNERHTML] = slice.call(node[INNERHTML], 0, -2) + EMPTY + info;
    }
    
    function showSummary() {
        var
            node = wru.node.insertBefore(
                create("div"),
                wru.node.firstChild
            ),
            innerHTML,
            className
        ;
        if (overallFatal) {
            className = "error";
            innerHTML = "There Are Errors: " + overallFatal;
        } else if(overallFail) {
            className = "fail";
            innerHTML = overallFail + " Tests Failed";
        } else {
            className = "pass";
            innerHTML = "Passed " + overallPass + " Tests";
        }
        node.innerHTML = "<strong>" + innerHTML + "</strong>";
        node.className = className;
    }
    
    function showTheProblem() {
        var style = this.lastChild.style;
        style.display = style.display == "none" ? "block" : "none";
    }
    
    function writeItOrdered(fail) {
        node.innerHTML += "<ul>" + LISTART + join.call(fail, LIEND + LISTART) + LIEND + "</ul>";
        (node.onclick = showTheProblem).call(node);
    }
    
    function Dary() {
        overallPass += pass[LENGTH];
        overallFail += fail[LENGTH];
        overallFatal += fatal[LENGTH];
        passTheInfo("(" + join.call([
            pass[LENGTH],
            fail[LENGTH],
            fatal[LENGTH]
        ], ", ") + ")");
        node = node.parentNode;
        fatal.length ?
            writeItOrdered(fatal, prefix = "error")
            : (
                ci ?
                    writeItOrdered(fail, prefix = "fail")
                    :
                    prefix = "pass"
            )
        ;
        node.className = prefix;
        ci = 0;
        prefix = EMPTY;
        isGonnaBeLegen();
    }
    