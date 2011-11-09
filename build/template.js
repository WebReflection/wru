// https://github.com/WebReflection/wru
function wru(wru){var assert=wru.assert,async=wru.async;

// enojy your tests!



wru.test([
    {
        name: "it works!",
        test: function () {
            // sync
            wru.assert(1);
            
            // async
            setTimeout(async(function () { // wru.async
                assert("called"); // wru.assert
            }), 500);
        }
    }
]);



}





// wru related code
/*!
(C) Andrea Giammarchi, @WebReflection - Mit Style License
*/
var setTimeout=global.setTimeout,setInterval=global.setInterval,clearInterval=global.clearInterval,clearTimeout=global.clearTimeout;setTimeout||(function(h,c,g,a){setInterval=global.setInterval=function b(j,i){return e(j,i,g.call(arguments,2),1)};setTimeout=global.setTimeout=function d(j,i){return e(j,i,g.call(arguments,2))};clearInterval=global.clearInterval=clearTimeout=global.clearTimeout=function f(i){c[i].cancel();h.purge();delete c[i]};function e(l,k,j,i){var m=++a;c[m]=new JavaAdapter(java.util.TimerTask,{run:function(){l.apply(null,j)}});i?h.schedule(c[m],k,k):h.schedule(c[m],k);return m}})(new java.util.Timer(),{},[].slice,0);wru(function(T){function g(){v=E.call(i);if(v){k(Y);k((ac(v,N)&&v[N])||(ac(v,e)&&v[e])||K);a=[];p=[];O=[];W={};b("setup");O[ad]||b("test");H||m()}else{o()}}function k(ag,af){ag=ag+(af?"":"\n");try{require("util").print(ag)}catch(ae){try{require("sys").print(ag)}catch(ae){java.lang.System.out.print(ag)}}}function o(){k(f);k(Y);switch(true){case !!Z:k(M+"   "+Z+" Errors");case !!y:k(I+f+y+" Failures");default:k(x+"      "+n+" Passes")}k(Y);k(f);try{process.exit()}catch(ae){quit()}}function c(ae){for(var af=0,ag=ae[ad];af<ag;k("    "+(++af)+". "+ae[af-1])){}}function m(){B(L);b("teardown");n+=a[ad];y+=p[ad];Z+=O[ad];if(O[ad]){R=M;c(O)}else{if(p[ad]){R=I;c(p)}else{R=x}}k(R+" passes: "+a[ad]+", fails: "+p[ad]+", errors: "+O[ad]);G=0;R=f;g()}function b(ae){if(ac(v,ae)){try{v[ae](W)}catch(af){V.call(O,f+af)}}}function ac(af,ae){return l.call(af,ae)}function r(){return A()<0.5?-1:1}var U={assert:function P(af,ae){if(arguments[ad]==1){ae=af;af=K}u=C;V.call(ae?a:p,R+af);return ae},async:function Q(af,ai,ag,ah){ah=++H;if(typeof af=="function"){ag=ai;ai=af;af="asynchronous test #"+ah}ag=S(function(){ah=0;V.call(p,af);--H||(L=S(m,0))},F(ag||t)||t);return function ae(){if(!ah){return}u=aa;R=af+": ";try{ai.apply(this,arguments)}catch(aj){u=C;V.call(O,R+aj)}R=f;if(u){B(ag);--H||(L=S(m,0))}}},test:function j(ae){i=D.apply(i,[ae]);U.random&&ab.call(i,r);H||g()}},C=true,aa=!C,t=100,f=" ",K="unknown",ad="length",N="name",e="description",z="<li>",d="</li>",h="\\|/-",l=U.hasOwnProperty,R=f,X=R.charAt,s=R.slice,i=[],D=i.concat,q=i.join,V=i.push,E=i.shift,ab=i.sort,H=0,G=0,n=0,y=0,Z=0,L=0,M="\033[1;31mERROR\033[0m",I="\033[0;31mFAILURE\033[0m",x="\033[0;32mOK\033[0m",Y="------------------------------",w,F,A,S,B,v,J,a,p,O,W,u;if(typeof global!="function"){T.wru=U;T=global}w=T.Math;F=w.abs;A=w.random;S=T.setTimeout;B=T.clearTimeout;T.setInterval(function(){H&&k(f+X.call(h,G++%4)+"\b\b",true)},t);t*=t;U.random=aa;return U}(this));