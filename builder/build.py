# JSBuilder http://code.google.com/p/javascript-builder/

copyright = '(C) Andrea Giammarchi, @WebReflection - Mit Style License'

import JSBuilder, string, re

# embedded DOM version for HTML tests
print ("")
print ("-----------------------")
print ("|   wru DOM version   |")
print ("-----------------------")
JSBuilder.compile(
    copyright,
    'build/wru.dom.js',
    'build/wru.min.js',
    [
        "wru.intro.js",
        "wru.DOM.functions.js",
        "wru.functions.js",
        "wru.js",
        "wru.variables.js",
        "wru.DOM.variables.js",
        "wru.shared.js",
        "wru.global.shortcuts.js",
        "wru.DOM.node.js",
        "wru.DOM.cursor.js",
        "wru.debug.js",
        "wru.outro.js"
    ]
)
print ("----------------------")
print ("")

# node.js / Rhino console version
print ("")
print ("-----------------------")
print ("| wru console version |")
print ("-----------------------")
JSBuilder.compile(
    copyright,
    'build/wru.console.max.js',
    'build/wru.console.js',
    [
        "rhinoTimers.js",
        "wru.intro.js",
        "wru.console.functions.js",
        "wru.functions.js",
        "wru.js",
        "wru.variables.js",
        "wru.console.variables.js",
        "wru.shared.js",
        "wru.export.js",
        "wru.global.shortcuts.js",
        "wru.console.cursor.js",
        "wru.debug.js",
        "wru.outro.js"
    ]
)

# YUICompressor bug fixed after build
compiled = JSBuilder.read('../build/wru.console.js')
compiled = re.sub(r'\w+=global.setInterval=', 'setInterval=global.setInterval=', compiled)
compiled = re.sub(r'\w+=global.setTimeout=', 'setTimeout=global.setTimeout=', compiled)
compiled = re.sub(r'\w+=global.clearInterval=', 'clearInterval=global.clearInterval=', compiled)
compiled = re.sub(r'\w+=global.clearTimeout=', 'clearTimeout=global.clearTimeout=', compiled)
JSBuilder.write('../build/wru.console.js', compiled)

print ("----------------------")
print ("")

# web
JSBuilder.write(
    '../build/template.html',
    JSBuilder.replace(
        JSBuilder.read('../src/template.html'),
        [
            '{{CSS}}',
            '{{JS}}',
            'var wru=',
            '}(this);'
        ],
        [
            JSBuilder.read('../src/template.css'),
            JSBuilder.read('../build/wru.min.js'),
            'wru(',
            '}(this));'
        ]
    )
)

# server
JSBuilder.write(
    '../build/template.js',
    JSBuilder.replace(
        JSBuilder.read('../src/template.js'),
        [
            '{{JS}}',
            'var wru=',
            '}(this);'
        ],
        [
            JSBuilder.read('../build/wru.console.js'),
            'wru(',
            '}(this));'
        ]
    )
)

# let me read the result ...
import time
time.sleep(2)