(()=>{"use strict";var n={705:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",i=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),i&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),i&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,i,o,r){"string"==typeof n&&(n=[[null,n,void 0]]);var a={};if(i)for(var l=0;l<this.length;l++){var s=this[l][0];null!=s&&(a[s]=!0)}for(var c=0;c<n.length;c++){var d=[].concat(n[c]);i&&a[d[0]]||(void 0!==r&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=r),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),o&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=o):d[4]="".concat(o)),e.push(d))}},e}},738:n=>{n.exports=function(n){return n[1]}},769:(n,e,t)=>{t.d(e,{Z:()=>l});var i=t(738),o=t.n(i),r=t(705),a=t.n(r)()(o());a.push([n.id,"body {\n    font-family: Roboto-Light;\n    margin: 0px;\n    width: 100%;\n    min-height: 100vh;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n            user-select: none;\n    -o-object-fit: contain;\n       object-fit: contain;\n    text-align: center;\n    /* background-color: brown; */\n}\n\n#loading {\n    font-family: 'Courier New', Courier, monospace;\n    font-size: 40px;\n    position: absolute;\n    top: 40%;\n    left: 0;\n    right: 0;\n}\n\n#container {\n    display: none;\n    max-height: 95vh;\n    overflow: hidden;\n    max-width: 95%;\n    aspect-ratio: 1 / 1.45;\n    position: relative;\n    text-align: center;\n    /* outline: 1px solid red; */\n    outline-offset: -5px;\n}\n\n#header {\n    /* outline: 1px solid orange; */\n    /* height: 35px; */\n    /* margin-bottom: 5px; */\n    /* margin-left: 2px; */\n    margin-top: 5px;\n    text-align: left;\n    width: calc( 100% - 10px );\n    display: inline-flex;\n    white-space: nowrap;\n    color: #50504e;\n    /* background-color: #f55252; */\n}\n\n#header * {\n    /* height: 100%; */\n    display: inline-block;\n    background-size: contain !important;\n    /* outline: 1px solid red; */\n}\n\n#menu-icon {\n    aspect-ratio: 1 / 1;\n    width: calc(100% / 12);\n    z-index: 2;\n}\n\n#logo {\n    aspect-ratio: 2.8 / 1;\n    /* outline: 1px solid orange; */\n    width: calc(100% / 4.3)\n}\n\n.empty {\n    flex-grow: 1;\n}\n\n#help-icon {\n    aspect-ratio: 1 / 1;\n    /* float: right; */\n    width: calc(100% / 12)\n}\n\n#board {\n    display: inline-block;\n    min-width: 100%;\n    aspect-ratio: 1 / 1;\n}\n\n#board-canvas {\n    height: 100%;\n    width: 100%;\n    display: none;\n    aspect-ratio: 1 / 1;\n}\n\n#controls {\n    /* font-family: \"Comfortaa\"; */\n    display: inline-block;\n    width: calc( 100% - 10px );\n    /* outline: 1px solid red; */\n    margin-top: 10px;\n    /* background-color: #d25151; */\n}\n\n#numpad {\n    text-align: left;\n    width: 100%;\n    display: flex;\n    justify-content: space-between;\n    /* vertical-align: middle; */\n    /* outline: 2px solid #db2a2a; */\n}\n\n#painting-pad {\n    width: 100%;\n    display: none;\n    justify-content: space-between;\n    /* outline: 2px solid #db2a2a; */\n}\n\n\n\n\n\n.num {\n    display: inline-block;\n    position: relative;\n    background-size: contain !important;\n    background-position: center !important;\n    width: calc( 100% / 17);\n    vertical-align: middle;\n    text-align: center;\n    color: white;\n    aspect-ratio: 1 / 1;\n    /* line-height: 100%; */\n    /* outline: 2px solid #d30707; */\n}\n\n#painting-pad .num {\n    width: calc( 100% / 12);\n    /* outline: 1px solid #969696; */\n    /* outline-offset: -1px; */\n}\n\n#pp-num1 {\n    background-color: #7fea83;\n}\n\n#pp-num2 {\n    background-color: #ff7575;\n}\n\n#pp-num3 {\n    background-color: #91c1f4;\n}\n\n#pp-num4 {\n    background-color: #eef872;\n}\n\n#pp-num5 {\n    background-color: #f2ad61;\n}\n\n#pp-num6 {\n    background-color: #ffaefb;\n}\n\n#pp-num7 {\n    background-color: #a2f2d6;\n}\n\n#pp-num8 {\n    background-color: #c3b0a4;\n}\n\n#pp-num9 {\n    background-color: #afe66c;\n}\n\n#remove-color {\n    background-color: white;\n    outline: 1px solid #969696;\n    outline-offset: -1px;\n}\n\n#num-zero {\n    background-size: contain;\n    display: inline-block;\n    width: calc( 100% / 12);\n}\n\n#num-all {\n    background-size: contain;\n    display: inline-block;\n    width: calc( 100% / 12);\n}\n\n#controls-row-1 {\n    display: inline-block;\n    width: 100%;\n    margin-bottom: 20px;\n    white-space: nowrap;\n    /* outline: 3px solid green; */\n}\n\n#controls-row-2 {\n    display: inline-flex;\n    justify-content: space-between;\n    width: calc( 100% - 10px);\n    white-space: nowrap;\n    margin-bottom: 10px;\n    /* outline: 1px solid #4942c9; */\n}\n\n.select-mode-elem {\n    width: 30%;\n    background-size: cover !important;\n    display: inline-block;\n    aspect-ratio: 1 / 1 !important;\n}\n\n.select-mode-elem-active {\n    outline: 3px solid #ff8d00;\n    z-index: 1;\n}\n\n.writing-mode-elem {\n    width: 23%;\n    background-size: cover !important;\n    display: inline-block;\n    aspect-ratio: 1 / 1;\n}\n\n.writing-mode-elem-active {\n    outline: 3px solid #00ffd0;\n    z-index: 1;\n}\n\n#undo-button, #redo-button {\n    width: 45%;\n    background-size: contain !important;\n    display: inline-block;\n    aspect-ratio: 1 / 1;\n    /* margin: 0px -1px; */\n}\n\n#solving-mode-types {\n    display: inline-flex;\n    justify-content: space-between;\n    width: calc( 100% / 11 * 3.4);\n    white-space: nowrap;\n    /* border-bottom: 2px solid #78f7e0; */\n    outline: 1px solid #8f8f8c;\n    outline-offset: 5px;\n}\n\n#select-modes {\n    display: inline-flex;\n    justify-content: space-between;\n    width: calc( 100% / 11 * 2.5);\n    white-space: nowrap;\n    /* border-bottom: 2px solid #fcaf50; */\n    outline: 1px solid #8f8f8c;\n    outline-offset: 5px;\n}\n\n#undo-redo-panel {\n    display: inline-flex;\n    justify-content: space-between;\n    width: calc( 100% / 11 * 1.6);\n    /* text-align: right; */\n    white-space: nowrap;\n    /* outline: 1px solid #4942c9; */\n}\n\n#menu, #help, #final-screen {\n    /* display: none; */\n    background: rgb(252 202 240 / 80%);\n    z-index: 2;\n    position: absolute;\n    height: 93%;\n    top: 7%;\n    width: 100%;\n    text-align: left;\n    font-size: 16px;\n}\n\n#menu {\n    display: none;\n}\n\n#help {\n    display: block;\n    background: rgb(153 241 199 / 80%);\n    text-align: center;\n}\n\n#final-screen {\n    display: none;\n    background: rgba(107, 245, 65, 0.8);\n    text-align: center;\n}\n\n#site-menu {\n    display: inline-block;\n    width: 35%;\n    margin: 5%;\n    /* outline: 3px solid #ff8d00; */\n    vertical-align: top;\n}\n\n#puzzle-menu {\n    display: inline-block;\n    width: 45%;\n    margin: 5% 0%;\n    /* outline: 3px solid #ff8d00; */\n}\n\n#site-menu > * > * {\n    display: block;\n    background-color: #50504e;\n    color: white;\n    padding: 10px;\n    margin: 0px 0px 10px;\n}\n\n#puzzle-menu > * > * {\n    display: block;\n    background-color: #50504e;\n    color: white;\n    padding: 10px;\n    margin: 0px 0px 10px;\n}\n\n#help-description, #final-description {\n    background-color: #50504e;\n    color: white;\n    width: 70%;\n    display: inline-block;\n    margin-top: 20px;\n    text-align: left;\n    padding: 10px;\n}\n\n#help-ok, #final-ok {\n    display: inline-block;\n    background-color: #50504e;\n    color: white;\n    padding: 10px 20px;\n    margin: 20px 0px;\n}\n",""]);const l=a},379:n=>{var e=[];function t(n){for(var t=-1,i=0;i<e.length;i++)if(e[i].identifier===n){t=i;break}return t}function i(n,i){for(var r={},a=[],l=0;l<n.length;l++){var s=n[l],c=i.base?s[0]+i.base:s[0],d=r[c]||0,u="".concat(c," ").concat(d);r[c]=d+1;var f=t(u),v={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==f)e[f].references++,e[f].updater(v);else{var p=o(v,i);i.byIndex=l,e.splice(l,0,{identifier:u,updater:p,references:1})}a.push(u)}return a}function o(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,o){var r=i(n=n||[],o=o||{});return function(n){n=n||[];for(var a=0;a<r.length;a++){var l=t(r[a]);e[l].references--}for(var s=i(n,o),c=0;c<r.length;c++){var d=t(r[c]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}r=s}}},569:n=>{var e={};n.exports=function(n,t){var i=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(t)}},216:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},565:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},795:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var i="";t.supports&&(i+="@supports (".concat(t.supports,") {")),t.media&&(i+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(i+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),i+=t.css,o&&(i+="}"),t.media&&(i+="}"),t.supports&&(i+="}");var r=t.sourceMap;r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(i,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},589:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(i){var o=e[i];if(void 0!==o)return o.exports;var r=e[i]={id:i,exports:{}};return n[i](r,r.exports,t),r.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var i in e)t.o(e,i)&&!t.o(n,i)&&Object.defineProperty(n,i,{enumerable:!0,get:e[i]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.nc=void 0,(()=>{var n={getPoints:function(n){return this.pointsByAmount[n]},colors:{1:"#7fea83",2:"#ff7575",3:"#91c1f4",4:"#eef872",5:"#f2ad61",6:"#ffaefb",7:"#a2f2d6",8:"#c3b0a4",9:"#afe66c"},pointsByAmount:{1:[[[1,1],[0,1],[0,0],[1,0],[1,1]]],2:[[[.66,1],[0,1],[0,0],[.33,0],[.66,1]],[[.66,1],[1,1],[1,0],[.33,0],[.66,1]]],3:[[[.66,1],[0,1],[0,.33],[.5,.5],[.66,1]],[[0,.33],[0,0],[1,0],[.5,.5],[0,.33]],[[1,0],[1,1],[.66,1],[.5,.5],[1,0]]],4:[[[.66,1],[0,1],[0,.66],[.5,.5],[.66,1]],[[0,.66],[0,0],[.33,0],[.5,.5],[0,.66]],[[.33,0],[1,0],[1,.33],[.5,.5],[.33,0]],[[1,.33],[1,1],[.66,1],[.5,.5],[1,.33]]],5:[[[.66,1],[0,1],[0,.8],[.5,.5],[.66,1]],[[0,.8],[0,0],[.5,.5],[0,.8]],[[0,0],[.8,0],[.5,.5],[0,0]],[[.8,0],[1,0],[1,.5],[.5,.5],[.8,0]],[[1,.5],[1,1],[.66,1],[.5,.5],[1,.5]]],6:[[[.66,1],[0,1],[.5,.5],[.66,1]],[[0,1],[0,.33],[.5,.5],[.1]],[[0,.33],[0,0],[.33,0],[.5,.5],[0,.33]],[[.33,0],[1,0],[.5,.5],[.33,0]],[[1,0],[1,.66],[.5,.5],[1,0]],[[1,.66],[1,1],[.66,1],[.5,.5],[1,.66]]],7:[[[.66,1],[.1,1],[.5,.5],[.66,1]],[[.1,1],[0,1],[0,.53],[.5,.5],[.1,1]],[[0,.53],[0,0],[.5,.5],[0,.53]],[[0,0],[.66,0],[.5,.5],[0,0]],[[.66,0],[1,0],[1,.2],[.5,.5],[.66,0]],[[1,.2],[1,.77],[.5,.5],[1,.2]],[[1,.77],[1,1],[.66,1],[.5,.5],[1,.77]]],8:[[[.66,1],[.16,1],[.5,.5],[.66,1]],[[.16,1],[0,1],[0,.66],[.5,.5],[.16,1]],[[0,.66],[0,.16],[.5,.5],[0,.66]],[[0,.16],[0,0],[.33,0],[.5,.5],[0,.16]],[[.33,0],[.83,0],[.5,.5],[.33,0]],[[.83,0],[1,0],[1,.33],[.5,.5],[.83,0]],[[1,.33],[1,.83],[.5,.5],[1,.33]],[[1,.83],[1,1],[.66,1],[.5,.5],[1,.83]]],9:[[[.66,1],[.15,1],[.5,.5],[.66,1]],[[.15,1],[0,1],[0,.7],[.5,.5],[.15,1]],[[0,.7],[0,.26],[.5,.5],[0,.7]],[[0,.26],[0,0],[.18,0],[.5,.5],[0,.26]],[[.18,0],[.64,0],[.5,.5],[.18,0]],[[.64,0],[1,0],[.5,.5],[.64,0]],[[1,0],[1,.4],[.5,.5],[1,0]],[[1,.4],[1,.85],[.5,.5],[1,.4]],[[1,.85],[1,1],[.66,1],[.5,.5],[1,.85]]]}},e=function(n){for(var e=JSON.stringify(n),t=0,i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i),t&=t;return t},i=t(379),o=t.n(i),r=t(795),a=t.n(r),l=t(569),s=t.n(l),c=t(565),d=t.n(c),u=t(216),f=t.n(u),v=t(589),p=t.n(v),g=t(769),m={};function h(n,e){var t="undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(!t){if(Array.isArray(n)||(t=function(n,e){if(n){if("string"==typeof n)return y(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?y(n,e):void 0}}(n))||e&&n&&"number"==typeof n.length){t&&(n=t);var i=0,o=function(){};return{s:o,n:function(){return i>=n.length?{done:!0}:{done:!1,value:n[i++]}},e:function(n){throw n},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a=!0,l=!1;return{s:function(){t=t.call(n)},n:function(){var n=t.next();return a=n.done,n},e:function(n){l=!0,r=n},f:function(){try{a||null==t.return||t.return()}finally{if(l)throw r}}}}function y(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,i=new Array(e);t<e;t++)i[t]=n[t];return i}m.styleTagTransform=p(),m.setAttributes=d(),m.insert=s().bind(null,"head"),m.domAPI=a(),m.insertStyleElement=f(),o()(g.Z,m),g.Z&&g.Z.locals&&g.Z.locals;var b={elem:{},color:"",solvingColor:"",cellSize:0,padding:0,data:{},selection:[],isCtrlPressed:!1,thinLineThickness:0,fatLineThickness:0,problemNumbers:[],init:function(){this.elem=document.getElementById("board-canvas"),this.color="#50504e",this.solvingColor="#3369b1";var n=this.elem;this.cellSize=100,this.padding=10,n.height=0,n.width=0,b.thinLineThickness=2,b.fatLineThickness=5,this.data=JSON.parse('{"rows":9,"columns":9,"borders":{"verticalArray":[[2,1,1,2,1,1,2,1,1,2],[2,1,1,2,1,1,2,1,1,2],[2,1,1,2,1,1,2,1,1,2],[2,1,1,2,1,1,2,1,1,2],[2,1,1,2,1,1,2,1,1,2],[2,1,1,2,1,1,2,1,1,2],[2,1,1,2,1,1,2,1,1,2],[2,1,1,2,1,1,2,1,1,2],[2,1,1,2,1,1,2,1,1,2],[2,1,1,2,1,1,2,1,1,2]],"horizontalArray":[[2,2,2,2,2,2,2,2,2,2],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[2,2,2,2,2,2,2,2,2,2],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[2,2,2,2,2,2,2,2,2,2],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[2,2,2,2,2,2,2,2,2,2]]},"values":[[4,8,2,1,5,3,6,9,7],[7,5,9,2,4,6,1,3,8],[1,3,0,0,0,0,0,5,2],[2,6,0,0,0,0,0,7,4],[3,4,0,0,0,0,0,8,1],[8,9,0,0,0,0,0,2,6],[6,7,0,0,0,0,0,4,3],[5,1,3,8,2,4,7,6,9],[9,2,4,3,6,7,8,1,5]],"solving":[[[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]]],[[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]]],[[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]]],[[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]]],[[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]]],[[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]]],[[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]]],[[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]]],[[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]],[0,[],[]]]],"twins":[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]],"inequals":{"horizontal":[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],"vertical":[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]},"cross":0,"chains":[],"blockOutlines":[{"text":"23+","stepsArray":[[2,2,1],[2,2,2],[3,2,1],[3,2,2],[3,2,4],[3,3,2],[3,3,4],[3,3,3],[2,3,4],[2,3,3],[2,3,1],[2,2,3],[2,2,1]],"isSelected":false},{"text":"20+","stepsArray":[[5,2,1],[5,2,2],[6,2,1],[6,2,2],[6,2,4],[6,3,2],[6,3,4],[6,3,3],[5,3,4],[5,3,3],[5,3,1],[5,2,3],[5,2,1]],"isSelected":false},{"text":"17+","stepsArray":[[5,5,1],[5,5,2],[6,5,1],[6,5,2],[6,5,4],[6,6,2],[6,6,4],[6,6,3],[5,6,4],[5,6,3],[5,6,1],[5,5,3],[5,5,1]],"isSelected":false},{"text":"24+","stepsArray":[[2,5,1],[2,5,2],[3,5,1],[3,5,2],[3,5,4],[3,6,2],[3,6,4],[3,6,3],[2,6,4],[2,6,3],[2,6,1],[2,5,3],[2,5,1]],"isSelected":false}],"solvingHashSum":1098609157,"name":"104"}'),b.selection=b.createSimpleArray(this.data.rows,this.data.columns,!1),this.data.painting=this.createPaintingArray(this.data.rows,this.data.columns),this.setClearProblemNumbers(),this.solvingStack.step()},createSimpleArray:function(n,e,t){for(var i=[],o=0;o<n;o++){for(var r=[],a=0;a<e;a++)r.push(t);i.push(r)}return i},createPaintingArray:function(n,e){for(var t=[],i=0;i<n;i++){for(var o=[],r=0;r<e;r++)o.push([]);t.push(o)}return t},updateProblemNumbers:function(n){var e=function(n){var e=n.reduce((function(n,e){return n[e]=(n[e]||0)+1,n}),[0,0,0,0,0,0,0,0,0]),t=[];e.forEach((function(n,e){n>1&&e>0&&t.push(e)}));var i=[];return n.forEach((function(n,e){-1!=t.indexOf(n)&&i.push(e)})),i};n.setClearProblemNumbers();var t=function(n){for(var e=JSON.parse(JSON.stringify(n.data.values)),t=0;t<n.data.rows;t++)for(var i=0;i<n.data.rows;i++){var o=n.data.values[t][i],r=n.data.solving[t][i][0];e[t][i]=o||r}return e}(n);!function(e,t){e.forEach((function(e,i){t(e).forEach((function(e,t){n.problemNumbers[i][e]=!0}))}))}(t,e),function(e,t){for(var i=function(i){for(var o=[],r=0;r<e.length;r++)o.push(e[r][i]);t(o).forEach((function(e,t){n.problemNumbers[e][i]=!0}))},o=0;o<e.length;o++)i(o)}(t,e),function(e,t){for(var i=[[],[],[],[],[],[],[],[],[]],o=function(n,e){return n<3&&e<3?1:n>=3&&n<6&&e<3?2:n>=6&&e<3?3:n<3&&e>=3&&e<6?4:n>=3&&n<6&&e>=3&&e<6?5:n>=6&&e>=3&&e<6?6:n<3&&e>=6?7:n>=3&&n<6&&e>=6?8:n>=6&&e>=6?9:void 0},r=0;r<e.length;r++)for(var a=0;a<e.length;a++)i[o(a,r)-1].push(e[r][a]);i.forEach((function(e,i){t(e).forEach((function(e,t){var o=function(n,e){var t={1:[0,0],2:[3,0],3:[6,0],4:[0,3],5:[3,3],6:[6,3],7:[0,6],8:[3,6],9:[6,6]}[n+1],i={1:[0,0],2:[1,0],3:[2,0],4:[0,1],5:[1,1],6:[2,1],7:[0,2],8:[1,2],9:[2,2]}[e+1];return[t[0]+i[0],t[1]+i[1]]}(i,e),r=o[0],a=o[1];n.problemNumbers[a][r]=!0}))}))}(t,e)},setClearProblemNumbers:function(){this.problemNumbers=this.createSimpleArray(this.data.rows,this.data.columns,!1)},checkSolving:function(n){for(var e=JSON.parse(JSON.stringify(this.data.values)),t=0;t<this.data.rows;t++)for(var i=0;i<this.data.rows;i++){var o=this.data.values[t][i],r=this.data.solving[t][i][0];if(e[t][i]=o||r,0==o&&0==r)return}n(e)==this.data.solvingHashSum&&(document.getElementById("final-screen").style.display="block")},solvingStack:{array:[],maxLength:50,currentIndex:0,maxIndex:0,step:function(){this.removeTail(),this.pushSolving();var n=this.array.length;n>this.maxLength&&this.array.shift(),n=this.array.length,this.currentIndex=this.maxIndex=n-1},back:function(){this.currentIndex<=0||(this.currentIndex-=1,this.useSolving(),b.updateProblemNumbers(b),b.draw())},forward:function(){this.currentIndex>=this.maxIndex||(this.currentIndex+=1,this.useSolving(),b.updateProblemNumbers(b),b.draw())},removeTail:function(){this.array.splice(this.currentIndex+1)},pushSolving:function(){var n=JSON.parse(JSON.stringify(b.data.solving));this.array.push(n)},useSolving:function(){var n=JSON.parse(JSON.stringify(this.array[this.currentIndex]));b.data.solving=n}},moveSelection:function(n){var e=0,t=0,i=0,o=0;n:for(t in b.selection)for(e in b.selection[t])if(1==b.selection[t][e]){e=+e,t=+t;break n}if("ArrowUp"==n){if(0==t)return;i=e,o=t-1}else if("ArrowDown"==n){if(t==b.data.rows-1)return;i=e,o=t+1}else if("ArrowLeft"==n){if(0==e)return;i=e-1,o=t}else if("ArrowRight"==n){if(e==b.data.columns-1)return;i=e+1,o=t}b.selection[t][e]=!1,b.selection[o][i]=!0,b.draw()},deSelectAll:function(){for(var n in this.selection)for(var e in this.selection[n])this.selection[n][e]=!1},selectAll:function(){for(var n in this.selection)for(var e in this.selection[n])this.selection[n][e]=!0},getSelected:function(){var n=b.selection;selectedArray=[];for(var e=0;e<n.length;e++)for(var t=0;t<n[e].length;t++)1==n[e][t]&&selectedArray.push([t,e]);return selectedArray},getCoordsByIndexes:function(n,e){var t=b.padding,i=b.cellSize,o=[0,0];return o[0]=t+n*i,o[1]=t+e*i,o},draw:function(){var e=this.elem,t=b.cellSize,i=b.padding;e.height=this.data.rows*t+2*i,e.width=this.data.columns*t+2*i;var o,r,a=e.getContext("2d"),l=function(n,e,t,i,o){var r=b.elem.getContext("2d");r.beginPath(),r.setLineDash([2,5]),r.moveTo(n,e),r.lineTo(t,i),r.strokeStyle=b.color,o&&(r.strokeStyle="#3fe94d"),r.lineWidth=b.thinLineThickness,r.stroke()},s=function(n,e,t){var i=b.elem.getContext("2d");i.beginPath(),i.fillStyle="#ffffff",i.rect(n+20,e+5,60,20),i.fill(),i.font="".concat(20,"px Roboto-Medium-numbers-only"),i.textAlign="center",i.fillStyle=b.color,i.fillText(t,n+50,e+20),i.textAlign="left"},c=function(n,e){var t,i,o=90,r=b.cellSize,a=n[0],l=n[1];return 1==e?(t=a+r-o,i=l+r-o):2==e?(t=a+o,i=l+r-o):3==e?(t=a+r-o,i=l+o):4==e&&(t=a+o,i=l+o),[t,i]};!function(){var e=b.elem.getContext("2d");for(var t in b.data.painting)for(var i in b.data.painting[t]){var o=b.data.painting[t][i],r=o.length;if(0!=o.length){var a=n.getPoints(r);for(var l in a){var s=n.colors[o[l]];for(var c in e.fillStyle=s,e.beginPath(),a[l]){var d=a[l][c],u=b.getCoordsByIndexes(i,t),f=u[0]+d[0]*b.cellSize,v=u[1]+d[1]*b.cellSize;(c=0)?e.moveTo(f,v):e.lineTo(f,v)}e.fill()}}}}(),function(){a.lineCap="round";for(var n=0;n<b.data.rows;n++)for(var e=0;e<=b.data.columns;e++){a.beginPath();var o=b.data.borders.verticalArray[n][e];if(0!=o){if(1==o){var r=b.thinLineThickness;a.lineWidth=r}else if(2==o){var l=b.fatLineThickness;a.lineWidth=l}var s=0+i+e*t,c=0+i+n*t,d=0+i+e*t,u=0+i+n*t+t;a.moveTo(s,c),a.lineTo(d,u),a.strokeStyle=b.color,a.stroke()}}for(var f=0;f<=b.data.rows;f++)for(var v=0;v<b.data.columns;v++){a.beginPath();var p=b.data.borders.horizontalArray[f][v];if(0!=p){if(1==p){var g=b.thinLineThickness;a.lineWidth=g}else if(2==p){var m=b.fatLineThickness;a.lineWidth=m}var h=0+i+v*t,y=0+i+f*t,w=0+i+v*t+t,x=0+i+f*t;a.moveTo(h,y),a.lineTo(w,x),a.strokeStyle=b.color,a.stroke()}}}(),function(){var n=b.elem,e=(n.getContext("2d"),b.padding),t=b.data.cross;if(0!=t)if(1==t){var i=0+e,o=n.height-e,r=n.width-e;l(i,o,r,0+e,!1)}else if(2==t){var a=0+e,s=0+e,c=n.width-e,d=n.height-e;l(a,s,c,d,!1)}else if(3==t){var u=0+e,f=n.height-e,v=n.width-e;l(u,f,v,0+e,!1);var p=0+e,g=0+e,m=n.width-e,h=n.height-e;l(p,g,m,h,!1)}}(),function(){var n,e=h(b.data.chains);try{for(e.s();!(n=e.n()).done;)for(var t=n.value,i=0;i<t.length-1;i++){var o=t[i][0],r=t[i][1],a=t[i+1][0],s=t[i+1][1],c=b.getCoordsByIndexes(o,r),d=b.getCoordsByIndexes(a,s);c[0]=c[0]+Math.round(b.cellSize/2),c[1]=c[1]+Math.round(b.cellSize/2),d[0]=d[0]+Math.round(b.cellSize/2),d[1]=d[1]+Math.round(b.cellSize/2),l(c[0],c[1],d[0],d[1],!1)}}catch(n){e.e(n)}finally{e.f()}}(),function(){if(0!=Object.keys(b.data.blockOutlines).length){var n,e=h(b.data.blockOutlines);try{for(e.s();!(n=e.n()).done;){for(var t=n.value,i=t.text,o=t.stepsArray,r=t.isSelected,a=0;a<o.length-1;a++){var d=o[a][2],u=o[a+1][2],f=o[a][0],v=o[a][1],p=o[a+1][0],g=o[a+1][1],m=c(b.getCoordsByIndexes(f,v),d),y=c(b.getCoordsByIndexes(p,g),u);l(m[0],m[1],y[0],y[1],r)}if(""!=i){var w=b.getCoordsByIndexes(o[0][0],o[0][1]);s(w[0],w[1],i)}}}catch(n){e.e(n)}finally{e.f()}}}(),function(){var n=b.elem.getContext("2d"),e=function(e,t,i,o){n.beginPath(),n.setLineDash([]),n.lineWidth=b.fatLineThickness,n.moveTo(e,t),n.lineTo(i,o),n.strokeStyle=b.color,n.stroke()};for(var t in b.data.twins)for(var i in b.data.twins[t]){i=+i,t=+t;var o=b.data.twins[t][i],r=b.getCoordsByIndexes(i+1,t+1),a=b.cellSize/5;0!=o&&(1==o?e(r[0]-a,r[1]+a,r[0]+a,r[1]-a):2==o?e(r[0]-a,r[1]-a,r[0]+a,r[1]+a):3==o&&(e(r[0]-a,r[1]+a,r[0]+a,r[1]-a),e(r[0]-a,r[1]-a,r[0]+a,r[1]+a)))}}(),function(){var n=b.elem.getContext("2d"),e=function(e,t,i,o){n.beginPath(),n.setLineDash([]),n.lineWidth=b.fatLineThickness,n.moveTo(e,t),n.lineTo(i,o),n.strokeStyle=b.color,n.stroke()};for(var t in b.data.inequals.horizontal)for(var i in b.data.inequals.horizontal[t]){i=+i,t=+t;var o=b.data.inequals.horizontal[t][i],r=b.getCoordsByIndexes(i+1,t);r[1]=r[1]+b.cellSize/2;var a=b.cellSize/6,l=b.cellSize/6;if(0!=o)if(1==o){var s=r[0]-a,c=r[1],d=r[0]+a,u=r[1]+l;e(s,c,d,u),e(s=r[0]-a,c=r[1],d=r[0]+a,u=r[1]-l)}else if(2==o){var f=r[0]+a,v=r[1],p=r[0]-a,g=r[1]+l;e(f,v,p,g),e(f=r[0]+a,v=r[1],p=r[0]-a,g=r[1]-l)}}for(var m in b.data.inequals.vertical)for(var h in b.data.inequals.vertical[m]){h=+h,m=+m;var y=b.data.inequals.vertical[m][h],w=b.getCoordsByIndexes(h,m+1);w[0]=w[0]+b.cellSize/2;var x=b.cellSize/6,k=b.cellSize/6;if(0!=y)if(3==y){var S=w[0],C=w[1]-k,I=w[0]+x,L=w[1]+k;e(S,C,I,L),e(S=w[0],C=w[1]-k,I=w[0]-x,L=w[1]+k)}else if(4==y){var A=w[0],z=w[1]+k,T=w[0]+x,E=w[1]-k;e(A,z,T,E),e(A=w[0],z=w[1]+k,T=w[0]-x,E=w[1]-k)}}}(),function(){var n=b.elem.getContext("2d");for(var e in b.data.values)for(var t in b.data.values[e])if(0!=b.data.values[e][t]){var i=b.getCoordsByIndexes(t,e),o=i[0]+28,r=i[1]+80,a=b.data.values[e][t];1==String(a).length?(o=i[0]+28,r=i[1]+80,n.font="80px Roboto-Medium-numbers-only"):2==String(a).length&&(o=i[0]+28,r=i[1]+88,n.font="36px Roboto-Medium-numbers-only"),n.fillStyle=b.color,n.fillText(a,o,r)}}(),b.problemNumbers.forEach((function(n,e){n.forEach((function(n,t){n&&function(n,e){var t=b.elem.getContext("2d"),i=b.getCoordsByIndexes(n,e),o=b.cellSize;t.beginPath(),t.strokeStyle="rgba(238, 81, 121, 0.5)",t.lineWidth=b.fatLineThickness,t.setLineDash([0,1]),t.arc(i[0]+o/2,i[1]+o/2,.4*o,0,2*Math.PI),t.stroke()}(t,e)}))})),function(){if(0!=x.visible){var n=function(n){var e=function(e){if(0!=b.data.values[n][e]&&1==b.data.values[n][e].toString().length)return 1;if(0!=b.data.solving[n][e][0]){var t=b.data.solving[n][e][0],i=b.getCoordsByIndexes(e,n),o=i[0]+b.cellSize/2,r=i[1]+80;a.font="80px Roboto-Medium-numbers-only",a.textAlign="center",a.fillStyle=b.solvingColor,a.fillText(t,o,r)}else{var l=function(t,i,o,r){var a=function(n,e,t,i,o,r){n.font="".concat(e,"px Roboto-Medium-numbers-only"),n.textAlign="center",n.fillStyle=t,n.fillText(i,o,r)},l=o.getCoordsByIndexes(e,n),s=l[0]+o.cellSize/2;if("one-row"==t){var c=l[1]+62;a(i,32,o.solvingColor,r,s,c)}else{var d=l[1]+45,u=l[1]+75,f=Math.ceil(r.length/2),v=r.split("").slice(0,f).join(""),p=r.split("").slice(f).join("");a(i,32,o.solvingColor,v,s,d),a(i,32,o.solvingColor,p,s,u)}},s=b.data.solving[n][e][1].join("");0!=s.length&&(s.length<=5?l("one-row",a,b,s):l("two-rows",a,b,s));var c=b.data.solving[n][e][2],d=0,u=0;for(var f in c){var v=c[f];if(0==f&&(d=-35,u=-25),1==f&&(d=35,u=-25),2==f&&(d=-35,u=45),3==f&&(d=35,u=45),4==f)break;var p=b.getCoordsByIndexes(e,n),g=p[0]+b.cellSize/2+d,m=p[1]+b.cellSize/2+u;a.font="30px Roboto-Medium-numbers-only",a.textAlign="center",a.fillStyle=b.solvingColor,a.fillText(v,g,m)}}};for(var t in b.data.solving[n])e(t)};for(var e in b.data.solving)n(e)}}(),o=function(n,e){var t=b.elem.getContext("2d"),i=b.getCoordsByIndexes(n,e),o=i[0],r=i[1];t.fillStyle="rgba(108, 189, 244, 0.2)",t.fillRect(o,r,b.cellSize,b.cellSize)},r=function(n,e,t){var i=function(n,e,t,i){var o=b.getCoordsByIndexes(t,i),r=o[0],a=o[1];e.globalAlpha=.4,e.strokeStyle="rgb(108, 189, 244)",e.lineWidth=20;var l={upLeft:[r,a],upRight:[r+b.cellSize,a],downLeft:[r,a+b.cellSize],downRight:[r+b.cellSize,a+b.cellSize]};if("up"==n){var s=l.upLeft,c=l.upRight;e.moveTo(s[0],s[1]),e.lineTo(c[0],c[1])}if("down"==n){var d=l.downLeft,u=l.downRight;e.moveTo(d[0],d[1]),e.lineTo(u[0],u[1])}if("left"==n){var f=l.upLeft,v=l.downLeft;e.moveTo(f[0],f[1]),e.lineTo(v[0],v[1])}if("right"==n){var p=l.upRight,g=l.downRight;e.moveTo(p[0],p[1]),e.lineTo(g[0],g[1])}},o=function(n,e){var t=function(n,e,t){return"up"==n?0!=t&&b.selection[t-1][e]:"down"==n?t!=b.data.rows-1&&b.selection[t+1][e]:"left"==n?0!=e&&b.selection[t][e-1]:"right"==n?e!=b.data.rows-1&&b.selection[t][e+1]:void 0};return{up:t("up",n,e),down:t("down",n,e),left:t("left",n,e),right:t("right",n,e)}}(n,e);o.up||i("up",t,n,e),o.down||i("down",t,n,e),o.left||i("left",t,n,e),o.right||i("right",t,n,e)},function(){var n=b.selection;for(var e in n)for(var t in n[e])1==n[e][t]&&o(t,e)}(),function(){var n=b.elem.getContext("2d");n.beginPath();var e=b.selection;for(var t in e)for(var i in e[t])1==e[t][i]&&r(+i,+t,n);n.lineCap="round",n.stroke()}()}},w={writing:{mode:"solving",insertMode:"number",solvingMode:"number"},selectMode:"one"},x={visible:!0,showHide:function(){var n=!this.visible;return this.visible=n,b.draw(),this.visible},remove:function(){b.data.solving=createMatrixSolvingArray(b.data.rows,b.data.columns),b.draw()},apply:function(){for(var n in b.data.solving)for(var e in b.data.solving[n]){var t=b.data.solving[n][e][0],i=b.data.solving[n][e][1];0!=t?(b.data.solving[n][e]=[0,[],[]],b.data.values[n][e]=t):1==i.length&&(b.data.solving[n][e]=[0,[],[]],b.data.values[n][e]=i[0])}b.draw()}},k=function(n,e){var t=document.querySelector("*:focus");if(null==t||"INPUT"!=t.tagName){var i=function(n,e,t,i){var o=w.writing.mode,r=w.writing.insertMode,a=w.writing.solvingMode;if(0!=n)if(999!=n){if("insert"==o){if("number"==r)b.data.values[t][e]=n,b.data.solving[t][e]=[0,[],[]];else if("pair"==r){var l=b.data.values[t][e],s=String(l).length;0==s?b.data.values[t][e]=String(n):1==s?b.data.values[t][e]=l+""+String(n):2==s&&(b.data.values[t][e]=String(l)[1]+String(n))}}else if("solving"==o){var c=b.data.values[t][e];if(0!=c&&1==c.toString().length&&"painting"!=a)return;if("number"==a)b.data.solving[t][e][0]=n;else if("central"==a){var d=b.data.solving[t][e][1];if(0!=b.data.solving[t][e][0])return;if(0==d.length)b.data.solving[t][e][1].push(n);else{var u=b.data.solving[t][e][1].indexOf(n);if(-1==u){b.data.solving[t][e][1].push(n);var f=b.data.solving[t][e][1].sort((function(n,e){return n-e}));b.data.solving[t][e][1]=f}else i||b.data.solving[t][e][1].splice(u,1)}}else if("corner"==a){var v=b.data.solving[t][e][2];if(0!=b.data.solving[t][e][0])return;if(0==v.length)b.data.solving[t][e][2].push(n);else{var p=b.data.solving[t][e][2].indexOf(n);if(-1==p){b.data.solving[t][e][2].push(n);var g=b.data.solving[t][e][2].sort((function(n,e){return n-e}));b.data.solving[t][e][2]=g}else i||b.data.solving[t][e][2].splice(p,1)}}else if("painting"==a)if(0==b.data.solving[t][e].length)b.data.painting[t][e].push(n);else{var m=b.data.painting[t][e].indexOf(n);if(-1==m){b.data.painting[t][e].push(n);var h=b.data.painting[t][e].sort((function(n,e){return n-e}));b.data.painting[t][e]=h}else i||b.data.painting[t][e].splice(m,1)}}}else{if(0!=b.data.values[t][e])return;for(var y=[],x=1;x<=b.data.rows&&x<=9;x++)y.push(x);b.data.solving[t][e][1]=y}else"painting"==a?b.data.painting[t][e]=[]:b.data.solving[t][e]=[0,[],[]]},o=function(){var e=w.writing.mode,t=w.writing.solvingMode;if("insert"==e)return!1;var i=!1,o=!1;for(var r in b.selection)for(var a in b.selection[r])if((0==b.data.values[r][a]||"painting"==t)&&1==b.selection[r][a]&&("number"==t?b.data.solving[r][a][0]==n?i=!0:o=!0:"central"==t?-1!=b.data.solving[r][a][1].indexOf(n)?i=!0:o=!0:"corner"==t?-1!=b.data.solving[r][a][2].indexOf(n)?i=!0:o=!0:"painting"==t&&(-1!=b.data.painting[r][a].indexOf(n)?i=!0:o=!0),i&&o))return!0;return!1}();for(var r in b.selection)for(var a in b.selection[r])1==b.selection[r][a]&&i(n,a,r,o);var l=w.writing.mode,s=w.writing.solvingMode;"solving"==l&&"number"==s&&b.checkSolving(e),b.updateProblemNumbers(b)}},S=function(n){b.deSelectAll(),999!=n&&0!=n&&function(n){!function(){for(var e in b.data.values)for(var t in b.data.values[e])b.data.values[e][t]==n&&(b.selection[e][t]=!0)}(),function(){for(var e in b.data.solving)for(var t in b.data.solving[e]){var i=b.data.solving[e][t],o=i[0]==n,r=-1!=i[1].indexOf(n),a=-1!=i[2].indexOf(n);(o||r||a)&&(b.selection[e][t]=!0)}}(),b.draw()}(n)},C=function(n,e,t,i,o){var r,a,l,s,c,d,u,f;!function(n,e,t,i,o){n("numbers",e,t,i,o),n("color",e,t,i,o)}((function(n,e,t,i,o){var r;r="color"==n?document.querySelectorAll("#painting-pad .num"):document.querySelectorAll("#numpad .num");var a,l={isLongPress:!1,longPressHappened:!1},s=h(r);try{var c=function(){var r=a.value,s=+r.getAttribute("data-key"),c=function(n,e,t,i,o){t.isLongPress=!0,t.longPressHappened=!1,setTimeout((function(){1==t.isLongPress&&"color"!=i&&(t.longPressHappened=!0,o(n))}),600)},d=function(n,e,t,i,r,a){r.isLongPress=!1,r.longPressHappened||(e(t,o),n.draw(),"color"!=a&&n.solvingStack.step())};r.onmousedown=function(t){return c(s,0,l,n,e)},r.onmouseup=function(e){return d(t,i,s,0,l,n)},r.addEventListener("touchstart",(function(t){return function(n,e,t,i,o,r){n.preventDefault(),e(t,n,i,o,r)}(t,c,s,l,n,e)}),{passive:!1}),r.addEventListener("touchend",(function(e){return d(t,i,s,0,l,n)}))};for(s.s();!(a=s.n()).done;)c()}catch(n){s.e(n)}finally{s.f()}}),n,e,t,o),r=document.getElementById("numpad"),a=document.getElementById("painting-pad"),l=function(n,e){n.style.display="none",e.style.display="flex"},s=function(n,e){e.style.display="none",n.style.display="flex"},c=document.getElementById("solving-mode-number"),d=document.getElementById("solving-mode-central"),u=document.getElementById("solving-mode-corner"),f=document.getElementById("solving-mode-painting"),c.onclick=function(){return function(n,e,t,i,o,r,a,l){n(e,t),i.classList.remove("writing-mode-elem-active"),o.classList.remove("writing-mode-elem-active"),r.classList.add("writing-mode-elem-active"),a.classList.remove("writing-mode-elem-active"),l.writing.solvingMode="number"}(l,a,r,d,u,c,f,i)},d.onclick=function(){return function(n,e,t,i,o,r,a,l){n(e,t),i.classList.add("writing-mode-elem-active"),o.classList.remove("writing-mode-elem-active"),r.classList.remove("writing-mode-elem-active"),a.classList.remove("writing-mode-elem-active"),l.writing.solvingMode="central"}(l,a,r,d,u,c,f,i)},u.onclick=function(){return function(n,e,t,i,o,r,a,l){n(e,t),i.classList.remove("writing-mode-elem-active"),o.classList.add("writing-mode-elem-active"),r.classList.remove("writing-mode-elem-active"),a.classList.remove("writing-mode-elem-active"),l.writing.solvingMode="corner"}(l,a,r,d,u,c,f,i)},f.onclick=function(){return function(n,e,t,i,o,r,a,l){n(e,t),i.classList.remove("writing-mode-elem-active"),a.classList.add("writing-mode-elem-active"),o.classList.remove("writing-mode-elem-active"),r.classList.remove("writing-mode-elem-active"),l.writing.solvingMode="painting"}(s,a,r,d,u,c,f,i)}},I=function(n,e){var t=document.getElementById("select-mode-one"),i=document.getElementById("select-mode-multi"),o=document.getElementById("select-mode-all");t.onclick=function(){return function(n,e,t){t.classList.remove("select-mode-elem-active"),e.classList.add("select-mode-elem-active"),n.selectMode="one"}(e,t,i)},i.onclick=function(){return function(n,e,t){e.classList.remove("select-mode-elem-active"),t.classList.add("select-mode-elem-active"),n.selectMode="multi"}(e,t,i)},o.onclick=function(){return function(n){n.selectAll(),n.draw()}(n)}},L=function(n){var e=document.getElementById("menu-icon"),t=document.getElementById("menu"),i=document.getElementById("final-screen"),o=document.getElementById("help-icon"),r=document.getElementById("help"),a=document.getElementById("help-ok"),l=document.getElementById("final-ok");!function(n,e,i){e.onclick=function(){return function(n,e,t){"block"==n.style.display?n.style.display="none":(e.style.display="none",t.style.display="none",n.style.display="block")}(t,n,i)}}(r,e,i),function(n,e,t,i,o){n.onclick=e.onclick=function(){return function(n,e,t){"none"==n.style.display?(n.style.display="block",e.style.display="none",t.style.display="none"):n.style.display="none"}(t,i,o)}}(o,a,r,t,i),function(n,e){n.onclick=function(){return function(n){n.style.display="none"}(e)}}(l,i)},A=function(n){var e=document.getElementById("undo-button"),t=document.getElementById("redo-button");e.onclick=function(){return n.solvingStack.back()},t.onclick=function(){return n.solvingStack.forward()}},z=function(n,e,t,i,o,r){new FontFace("Roboto-Medium-numbers-only-numbers-only","url(assets/Roboto-Medium-numbers-only.ttf)").load().then((function(){return function(n,t,o,r){performance.mark("start"),n.init(),n.draw(),L(),function(n,e){var t=function(n,e,t){for(var i=t.cellSize,o=t.padding,r=[0,0],a=0;a<t.data.columns;a++)if(n<=o+i*(a+1)){r[0]=a;break}for(var l=0;l<t.data.rows;l++)if(e<=o+i*(l+1)){r[1]=l;break}return r},i=function(n,e,t){var i=t.padding,o=t.elem;return n<i||e<i||n>o.width-i||e>o.height-i},o=function(n,e,t){var i,o,r=t.elem,a=0,l=0;if("desktop"==e)i=n.offsetX,o=n.offsetY;else{var s=r.getBoundingClientRect();i=n.targetTouches[0].clientX-s.left,o=n.targetTouches[0].clientY-s.top}var c=r.clientWidth,d=r.clientHeight;return 0!=i&&(a=Math.round(r.width*i/c)),0!=o&&(l=Math.round(r.height*o/d)),[a,l]},r={setOfCells:new Set,activity:!1},a=function(n,e,t,i,o,r,a,l){n.preventDefault(),e.setOfCells.clear(),e.activity=!0;var s=r(n,t,o),c=s[0],d=s[1];if(i(c,d,o))return!1;var u=a(c,d,o),f=o.selection[u[1]][u[0]];0==o.isCtrlPressed&&"one"==l.selectMode&&o.deSelectAll(),o.selection[u[1]][u[0]]=!f,o.draw()},l=function(n,e,t,i,o,r,a){if(n.preventDefault(),e.activity){var l=r(n,t,i),s=l[0],c=l[1],d=a(s,c,i);if(o(s,c,i))return!1;i.selection[d[1]][d[0]]=!0,i.draw()}},s=function(n){n.activity=!1},c=n.elem;c.onmousedown=function(l){return a(l,r,"desktop",i,n,o,t,e)},c.addEventListener("touchstart",(function(l){return a(l,r,"mobile",i,n,o,t,e)}),{passive:!1}),c.onmouseup=c.onmouseleave=function(){return s(r)},c.addEventListener("touchend",(function(){return s(r)})),c.onmousemove=function(e){return l(e,r,"desktop",n,i,o,t)},c.addEventListener("touchmove",(function(e){return l(e,r,"mobile",n,i,o,t)}),{passive:!1}),function(n){n.elem.style.display="block"}(n)}(n,t),C(i,n,e,t,r),I(n,t),A(n),function(n,e,t,i){t.body.onkeydown=function(t){return function(n,e,t,o,r,a,l){if("Escape"==n)return r.call(o),void a.call(o);if("Control"!=n){if("Delete"==n||"Backspace"==n)return l(0,i),o.draw(),void o.solvingStack.step();if("a"!=n)if("ArrowRight"!=n&&"ArrowLeft"!=n&&"ArrowUp"!=n&&"ArrowDown"!=n);else{var s=0;for(var c in o.selection)for(var d in o.selection[c])1==o.selection[c][d]&&s++;1==s&&(o.moveSelection(n),e.call(t))}else 1==o.isCtrlPressed&&(o.selectAll(),o.draw())}else o.isCtrlPressed=!0}(t.key,t.preventDefault,t,n,n.deSelectAll,n.draw,e)},t.body.onkeyup=function(t){return function(n,e,t,i){var o=n.key;"Control"==o&&(e.isCtrlPressed=!1),-1!=["1","2","3","4","5","6","7","8","9","0"].indexOf(o)&&(t(+o,i),e.draw(),e.solvingStack.step())}(t,n,e,i)}}(n,e,o,r),function(n,e){e.body.onclick=function(t){return function(n,e,t,i,o){(n==e||n.classList.contains("empty")||"container"==n.id||"controls-row-2"==n.id)&&(t.call(o),i.call(o))}(t.target,e.body,n.deSelectAll,n.draw,n)}}(n,o),function(n){n.getElementById("container").style.display="inline-block"}(o),function(n){n.getElementById("loading").style.display="none"}(o),performance.mark("end"),console.log("загрузка интерфейса: "+performance.measure("time","start","end").duration+" мс")}(n,t,o,r)}))};window.onload=function(){return z(b,k,w,S,document,e)}})()})();