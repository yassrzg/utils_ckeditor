!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.CKEditor5=e():(t.CKEditor5=t.CKEditor5||{},t.CKEditor5.button=e())}(self,(()=>(()=>{var t={"ckeditor5/src/core.js":(t,e,n)=>{t.exports=n("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/ui.js":(t,e,n)=>{t.exports=n("dll-reference CKEditor5.dll")("./src/ui.js")},"ckeditor5/src/widget.js":(t,e,n)=>{t.exports=n("dll-reference CKEditor5.dll")("./src/widget.js")},"dll-reference CKEditor5.dll":t=>{"use strict";t.exports=CKEditor5.dll}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var i=e[o]={exports:{}};return t[o](i,i.exports,n),i.exports}n.d=(t,e)=>{for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var o={};return(()=>{"use strict";n.d(o,{default:()=>a});var t=n("ckeditor5/src/core.js"),e=n("ckeditor5/src/widget.js");class r extends t.Command{execute(){const{model:t}=this.editor;t.change((e=>{t.insertContent(function(t){const e=t.createElement("button"),n=t.createElement("buttonTitle"),o=t.createElement("buttonContent");return t.appendElement("paragraph",n),t.appendElement("paragraph",o),t.append(n,e),t.append(o,e),e}(e))}))}refresh(){const{model:t}=this.editor,{selection:e}=t.document,n=t.schema.findAllowedParent(e.getFirstPosition(),"button");this.isEnabled=null!==n}}class i extends t.Plugin{static get pluginName(){return"ButtonEditing"}static get requires(){return[e.Widget]}init(){this._defineSchema(),this._defineConverters(),this.editor.commands.add("insertButton",new r(this.editor))}_defineSchema(){const t=this.editor.model.schema;t.register("button",{isObject:!0,allowWhere:"$block"}),t.register("buttonRow",{allowIn:"button",isLimit:!0}),t.register("buttonTitle",{isLimit:!0,allowIn:"button",allowContentOf:"$block"}),t.register("buttonContent",{isLimit:!0,allowIn:"button",allowContentOf:"$root"}),t.addChildCheck(((t,e)=>{if(t.endsWith("buttonContent")&&"button"===e.name)return!1}))}_defineConverters(){const{conversion:t}=this.editor;t.for("upcast").elementToElement({model:"button",view:{name:"dl",classes:"ckeditor-button"}}),t.for("upcast").elementToElement({model:"buttonTitle",view:{name:"dt",classes:""}}),t.for("upcast").elementToElement({model:"buttonContent",view:{name:"dd",classes:""}}),t.for("dataDowncast").elementToElement({model:"button",view:{name:"dl",classes:"ckeditor-button"}}),t.for("dataDowncast").elementToElement({model:"buttonTitle",view:{name:"dt",classes:""}}),t.for("dataDowncast").elementToElement({model:"buttonContent",view:{name:"dd",classes:""}}),t.for("editingDowncast").elementToElement({model:"button",view:(t,{writer:n})=>{const o=n.createContainerElement("div",{class:"ckeditor-button"});return(0,e.toWidget)(o,n)}}),t.for("editingDowncast").elementToElement({model:"buttonTitle",view:(t,{writer:n})=>{const o=n.createEditableElement("dt",{class:"ckeditor-button-title"});return(0,e.toWidgetEditable)(o,n)}}),t.for("editingDowncast").elementToElement({model:"buttonContent",view:(t,{writer:n})=>{const o=n.createEditableElement("dd",{class:"ckeditor-button-content"});return(0,e.toWidgetEditable)(o,n)}})}}var s=n("ckeditor5/src/ui.js");class d extends t.Plugin{static get requires(){return[s.ContextualBalloon]}init(){const t=this.editor,e=this.editor.t;t.ui.componentFactory.add("button",(n=>{const o=t.commands.get("insertButton"),r=new s.ButtonView(n);return r.set({label:e("Bouton"),icon:'<?xml version="1.0" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"\n "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">\n<svg version="1.0" xmlns="http://www.w3.org/2000/svg"\n width="50.000000pt" height="50.000000pt" viewBox="0 0 50.000000 50.000000"\n preserveAspectRatio="xMidYMid meet">\n\n<g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"\nfill="#000000" stroke="none">\n<path d="M12 368 c-16 -16 -16 -220 0 -236 17 -17 459 -17 476 0 16 16 16 220\n0 236 -17 17 -459 17 -476 0z m463 -118 l0 -105 -225 0 -225 0 -3 94 c-1 52 0\n101 2 108 5 11 49 13 228 11 l223 -3 0 -105z"/>\n<path d="M70 250 c0 -23 5 -30 19 -30 26 0 31 10 20 38 -13 33 -39 28 -39 -8z"/>\n<path d="M133 255 c2 -23 7 -30 22 -30 13 0 21 8 23 23 2 12 -1 22 -7 22 -6 0\n-11 -10 -11 -22 0 -25 -15 -14 -23 17 -3 12 -5 8 -4 -10z"/>\n<path d="M206 253 c9 -36 14 -42 14 -15 0 12 5 22 10 22 6 0 10 5 10 10 0 6\n-9 10 -20 10 -17 0 -19 -4 -14 -27z"/>\n<path d="M255 270 c-3 -5 -1 -10 4 -10 6 0 11 -10 11 -22 0 -27 5 -21 14 15 5\n20 3 27 -8 27 -8 0 -18 -4 -21 -10z"/>\n<path d="M321 270 c-19 -11 -9 -45 14 -45 13 0 21 8 23 21 3 23 -17 37 -37 24z\nm27 -21 c-2 -6 -8 -10 -13 -10 -5 0 -11 4 -13 10 -2 6 4 11 13 11 9 0 15 -5\n13 -11z"/>\n<path d="M381 250 c0 -33 1 -34 10 -11 6 16 6 28 -1 35 -7 7 -10 -1 -9 -24z"/>\n<path d="M406 254 c-7 -18 0 -34 15 -34 5 0 9 11 9 25 0 28 -15 34 -24 9z"/>\n</g>\n</svg>\n',tooltip:!0}),r.bind("isOn","isEnabled").to(o,"value","isEnabled"),this.listenTo(r,"execute",(()=>t.execute("insertButton"))),r}))}}class l extends t.Plugin{static get requires(){return[i,d]}}const a={Button:l}})(),o=o.default})()));