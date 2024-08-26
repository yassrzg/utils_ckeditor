!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.card=t())}(self,(()=>(()=>{var e={"ckeditor5/src/core.js":(e,t,r)=>{e.exports=r("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/ui.js":(e,t,r)=>{e.exports=r("dll-reference CKEditor5.dll")("./src/ui.js")},"ckeditor5/src/widget.js":(e,t,r)=>{e.exports=r("dll-reference CKEditor5.dll")("./src/widget.js")},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,r),i.exports}r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var n={};return(()=>{"use strict";r.d(n,{default:()=>p});var e=r("ckeditor5/src/core.js"),t=r("ckeditor5/src/widget.js");class o extends e.Command{execute(){const{model:e}=this.editor;e.change((t=>{e.insertContent(function(e){const t=e.createElement("card"),r=e.createElement("cardTitle"),n=e.createElement("cardContent"),o=e.createElement("cardImage");return e.append(r,t),e.append(n,t),e.append(o,t),e.appendElement("paragraph",n),e.appendElement("paragraph",o),t}(t))}))}refresh(){const{model:e}=this.editor,{selection:t}=e.document,r=e.schema.findAllowedParent(t.getFirstPosition(),"card");this.isEnabled=null!==r}}class i extends e.Command{constructor(e,t={}){super(e),this.order=t.order||"below"}execute(){const e=this.editor,t=e.model.document.selection;let r=null;t.getFirstPosition().getAncestors().forEach((e=>{"cardContent"!=e.name&&"cardTitle"!=e.name&&"cardImage"!=e.name||(r=e)})),null!=r&&e.model.change((e=>{let t;if("below"==this.order){let n="cardContent"==r.name?r.index:r.index+1;n<0&&(n=0),t=e.createPositionAfter(r.parent.getChild(n))}else{let n="cardContent"==r.name?r.index-1:r.index;n<0&&(n=0),t=e.createPositionBefore(r.parent.getChild(n))}const n=e.createElement("cardTitle"),o=e.createElement("cardContent"),i=e.createElement("cardImage");e.insertText("titre",n),e.insert(o,t),e.insert(n,t),e.insert(i,t);const a=e.createElement("paragraph"),d=e.createElement("paragraph");e.appendText("Description",a),e.insert(a,o),e.insert(d,i)}))}refresh(){this.isEnabled=!0}}class a extends e.Command{constructor(e,t={}){super(e)}execute(){const e=this.editor,t=e.model.document.selection;let r=null;t.getFirstPosition().getAncestors().forEach((e=>{"cardContent"!=e.name&&"cardTitle"!=e.name&&"cardImage"!=e.name||(r=e)})),null!=r&&e.model.change((e=>{let t,n;n="cardContent"==r.name?r.index-1:r.index+1,t=r.parent.getChild(n),e.remove(r),e.remove(t)}))}refresh(){this.isEnabled=!0}}class d extends e.Plugin{static get pluginName(){return"CardEditing"}static get requires(){return[t.Widget]}init(){this._defineSchema(),this._defineConverters(),this.editor.commands.add("insertCard",new o(this.editor)),this.editor.commands.add("insertCardRowAbove",new i(this.editor,{order:"above"})),this.editor.commands.add("insertCardRowBelow",new i(this.editor,{order:"below"})),this.editor.commands.add("deleteCardRow",new a(this.editor,{}))}_defineSchema(){const e=this.editor.model.schema;e.register("card",{isObject:!0,allowWhere:"$block"}),e.register("cardRow",{allowIn:"card",isLimit:!0}),e.register("cardTitle",{isLimit:!0,allowIn:"card",allowContentOf:"$block"}),e.register("cardContent",{isLimit:!0,allowIn:"card",allowContentOf:"$root"}),e.register("cardImage",{isLimit:!0,allowIn:"card",allowContentOf:"$root"}),e.addChildCheck(((e,t)=>{if(e.endsWith("cardContent")&&"card"===t.name)return!1}))}_defineConverters(){const{conversion:e}=this.editor;e.for("upcast").elementToElement({model:"card",view:{name:"dl",classes:"ckeditor-card"}}),e.for("upcast").elementToElement({model:"cardTitle",view:{name:"dt",classes:""}}),e.for("upcast").elementToElement({model:"cardContent",view:{name:"dd",classes:""}}),e.for("upcast").elementToElement({model:"cardImage",view:{name:"dd",classes:""}}),e.for("dataDowncast").elementToElement({model:"card",view:{name:"dl",classes:"ckeditor-card"}}),e.for("dataDowncast").elementToElement({model:"cardTitle",view:{name:"dt",classes:""}}),e.for("dataDowncast").elementToElement({model:"cardContent",view:{name:"dd",classes:""}}),e.for("dataDowncast").elementToElement({model:"cardImage",view:{name:"dd",classes:""}}),e.for("editingDowncast").elementToElement({model:"card",view:(e,{writer:r})=>{const n=r.createContainerElement("div",{class:"ckeditor-card"});return(0,t.toWidget)(n,r)}}),e.for("editingDowncast").elementToElement({model:"cardTitle",view:(e,{writer:r})=>{const n=r.createEditableElement("div",{class:"ckeditor-card-title"});return(0,t.toWidgetEditable)(n,r)}}),e.for("editingDowncast").elementToElement({model:"cardContent",view:(e,{writer:r})=>{const n=r.createEditableElement("div",{class:"ckeditor-card-content"});return(0,t.toWidgetEditable)(n,r)}}),e.for("editingDowncast").elementToElement({model:"cardImage",view:(e,{writer:r})=>{const n=r.createEditableElement("div",{class:"ckeditor-card-image"});return(0,t.toWidgetEditable)(n,r)}})}}var s=r("ckeditor5/src/ui.js");class l extends e.Plugin{static get requires(){return[s.ContextualBalloon]}init(){const e=this.editor,t=this.editor.t;e.ui.componentFactory.add("card",(r=>{const n=e.commands.get("insertCard"),o=new s.ButtonView(r);return o.set({label:t("Cartes Verticales"),icon:'<?xml version="1.0" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"\n "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">\n<svg version="1.0" xmlns="http://www.w3.org/2000/svg"\n width="24.000000pt" height="24.000000pt" viewBox="0 0 24.000000 24.000000"\n preserveAspectRatio="xMidYMid meet">\n\n<g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)"\nfill="#000000" stroke="none">\n<path d="M24 187 c-3 -8 -4 -43 -2 -78 l3 -64 95 0 95 0 0 75 0 75 -93 3 c-72\n2 -94 0 -98 -11z m176 -17 c0 -6 -33 -10 -80 -10 -47 0 -80 4 -80 10 0 6 33\n10 80 10 47 0 80 -4 80 -10z m0 -75 l0 -35 -80 0 -80 0 0 35 0 35 80 0 80 0 0\n-35z"/>\n</g>\n</svg>\n',tooltip:!0}),o.bind("isOn","isEnabled").to(n,"value","isEnabled"),this.listenTo(o,"execute",(()=>e.execute("insertCard"))),o})),e.ui.componentFactory.add("cardAddBelow",(r=>{const n=e.commands.get("insertCardRowBelow"),o=new s.ButtonView(r);return o.set({label:t("Insérer une nouvelle carte"),iconAddBelow:'<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg width="76px" height="76px" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" enable-background="new 0 0 76.00 76.00" xml:space="preserve">\n\t<path fill="currentColor" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 50,48L 50,43L 55,43L 55,38L 60,38L 60,43L 65,43L 65,48L 60,48L 60,53L 55,53L 55,48L 50,48 Z M 14,51L 14,24L 40,24L 40,40L 46,40L 46,51L 14,51 Z M 43,43L 17,43L 17,48L 43,48L 43,43 Z M 37,40L 37,35L 17,35L 17,40L 37,40 Z M 37,32L 37,27L 17,27L 17,32L 37,32 Z "/>\n</svg>\n',tooltip:!1,withText:!0}),o.bind("isOn","isEnabled").to(n,"value","isEnabled"),this.listenTo(o,"execute",(()=>e.execute("insertCardRowBelow"))),o})),e.ui.componentFactory.add("cardRemove",(r=>{const n=e.commands.get("deleteCardRow"),o=new s.ButtonView(r);return o.set({label:t("Supprimer une carte"),iconDelete:'<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <path d="M5 3H3v18h18V3H5zm14 2v14H5V5h14zm-3 6H8v2h8v-2z" fill="currentColor"/>\n</svg>\n',tooltip:!1,withText:!0}),o.bind("isOn","isEnabled").to(n,"value","isEnabled"),this.listenTo(o,"execute",(()=>e.execute("deleteCardRow"))),o}))}}function c(e){const t=e.getSelectedElement();return t&&g(t)?t:null}function m(e){const t=e.getFirstPosition();if(!t)return null;let r=t.parent;for(;r;){if(r.is("element")&&g(r))return r;r=r.parent}return null}function g(e){return!!e.hasClass("ckeditor-card")&&(0,t.isWidget)(e)}class w extends e.Plugin{static get requires(){return[t.WidgetToolbarRepository]}static get pluginName(){return"CardToolbar"}afterInit(){const e=this.editor,r=e.t,n=e.plugins.get(t.WidgetToolbarRepository),o=e.config.get("card.contentToolbar"),i=e.config.get("card.tableToolbar");o&&n.register("cardContent",{ariaLabel:r("Card toolbar"),items:o,getRelatedElement:m}),i&&n.register("card",{ariaLabel:r("Card toolbar"),items:i,getRelatedElement:c})}}class u extends e.Plugin{static get requires(){return[d,l,w]}}const p={Card:u}})(),n=n.default})()));