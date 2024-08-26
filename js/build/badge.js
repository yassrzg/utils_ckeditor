!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.badge=t())}(self,(()=>(()=>{var e={"ckeditor5/src/core.js":(e,t,o)=>{e.exports=o("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/ui.js":(e,t,o)=>{e.exports=o("dll-reference CKEditor5.dll")("./src/ui.js")},"ckeditor5/src/utils.js":(e,t,o)=>{e.exports=o("dll-reference CKEditor5.dll")("./src/utils.js")},"ckeditor5/src/widget.js":(e,t,o)=>{e.exports=o("dll-reference CKEditor5.dll")("./src/widget.js")},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},t={};function o(n){var i=t[n];if(void 0!==i)return i.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,o),r.exports}o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var n={};return(()=>{"use strict";o.d(n,{default:()=>w});var e=o("ckeditor5/src/core.js"),t=o("ckeditor5/src/widget.js");class i extends e.Command{execute({type:e,size:t,haveIcon:o}){const{model:n}=this.editor;n.change((i=>{n.insertContent(function(e,{type:t,size:o,haveIcon:n}){const i=e.createElement("badge",{"data-type":t,"data-size":o,"data-icon":n}),r=e.createElement("badgeContent");return e.appendElement("paragraph",r),e.append(r,i),i}(i,{type:e,size:t,haveIcon:o}))}))}refresh(){const{model:e}=this.editor,{selection:t}=e.document,o=e.schema.findAllowedParent(t.getFirstPosition(),"badge");this.isEnabled=null!==o}}class r extends e.Command{constructor(e){super(e)}execute(){const e=this.editor,t=e.model.document.selection;let o=null;t.getFirstPosition().getAncestors().forEach((e=>{"badgeContent"===e.name&&(o=e)})),o&&e.model.change((e=>{const t=e.createPositionAfter(o),n=e.createElement("badgeContent");e.insert(n,t);const i=e.createElement("paragraph");e.insertText("Contenu du badge",i),e.insert(i,n)}))}refresh(){this.isEnabled=!0}}class d extends e.Command{constructor(e){super(e)}execute(){const e=this.editor,t=e.model.document.selection;let o=null;t.getFirstPosition().getAncestors().forEach((e=>{"badgeContent"===e.name&&(o=e)})),o&&e.model.change((e=>{e.remove(o)}))}refresh(){this.isEnabled=!0}}class a extends e.Plugin{static get pluginName(){return"BadgeEditing"}static get requires(){return[t.Widget]}init(){this._defineSchema(),this._defineConverters(),this.editor.commands.add("insertBadge",new i(this.editor)),this.editor.commands.add("insertBadgeRowBelow",new r(this.editor,{order:"below"})),this.editor.commands.add("deleteBadgeRow",new d(this.editor,{}))}_defineSchema(){const e=this.editor.model.schema;e.register("badge",{isObject:!0,allowWhere:"$block",allowAttributes:["data-type","data-size","data-icon"]}),e.register("badgeRow",{allowIn:"badge",isLimit:!0}),e.register("badgeContent",{isLimit:!0,allowIn:"badge",allowContentOf:"$root"}),e.addChildCheck(((e,t)=>{if(e.endsWith("badgeContent")&&"badge"===t.name)return!1}))}_defineConverters(){const{conversion:e}=this.editor;e.for("upcast").elementToElement({model:(e,{writer:t})=>{const o={"data-type":e.getAttribute("data-type")||"default","data-size":e.getAttribute("data-size")||"medium","data-icon":e.getAttribute("data-icon")||""};return t.createElement("badge",o)},view:{name:"dl",classes:"ckeditor-badge"}}),e.for("upcast").elementToElement({model:"badgeContent",view:{name:"dd",classes:"ckeditor-badge-content"}}),e.for("dataDowncast").elementToElement({model:"badge",view:(e,{writer:o})=>{const n=o.createContainerElement("dl",{class:"ckeditor-badge"}),i=e.getAttribute("data-type")||"default",r=e.getAttribute("data-size")||"medium",d=e.getAttribute("data-icon")||"";return o.setAttribute("data-type",i,n),o.setAttribute("data-size",r,n),o.setAttribute("data-icon",d,n),(0,t.toWidget)(n,o)}}),e.for("dataDowncast").elementToElement({model:"badgeContent",view:{name:"dd",classes:"ckeditor-badge-content"}}),e.for("editingDowncast").elementToElement({model:"badge",view:(e,{writer:o})=>{const n=o.createContainerElement("dl",{class:"ckeditor-badge","data-type":e.getAttribute("data-type"),"data-size":e.getAttribute("data-size"),"data-icon":e.getAttribute("data-icon")});return(0,t.toWidget)(n,o)}}),e.for("editingDowncast").elementToElement({model:"badgeContent",view:(e,{writer:o})=>{const n=o.createEditableElement("dd",{class:"ckeditor-badge-content"});return(0,t.toWidgetEditable)(n,o)}})}}var s=o("ckeditor5/src/ui.js"),l=o("ckeditor5/src/utils.js");class c extends e.Plugin{static get requires(){return[s.ContextualBalloon]}init(){const e=this.editor,t=e.ui.componentFactory,o=this.editor.t,n=e.config.get("badge.options");n.forEach((e=>{this._addButton(e)})),t.add("badge",(i=>{const r=(0,s.createDropdown)(i),d=e.commands.get("insertBadge");r.bind("isEnabled").to(d);const a=[];return n.forEach((e=>{a.push(t.create(`Badge:${e.id}`))})),(0,s.addToolbarToDropdown)(r,a,{enableActiveItemFocusOnDropdownOpen:!1,isVertical:!0,ariaLabel:o("Badge options")}),r.buttonView.set({label:o("Badge"),icon:'<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24px" height="24px" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" xmlns:xlink="http://www.w3.org/1999/xlink">\n<g><path style="opacity:0.486" fill="#000000" d="M 23.5,17.5 C 23.5,18.5 23.5,19.5 23.5,20.5C 22.5,20.5 21.5,20.5 20.5,20.5C 20.5,21.5 20.5,22.5 20.5,23.5C 19.5,23.5 18.5,23.5 17.5,23.5C 16.5423,22.0384 15.3756,20.7051 14,19.5C 12.3333,20.8333 10.6667,20.8333 9,19.5C 7.62439,20.7051 6.45773,22.0384 5.5,23.5C 4.5,23.5 3.5,23.5 2.5,23.5C 2.5,22.5 2.5,21.5 2.5,20.5C 1.5,20.5 0.5,20.5 -0.5,20.5C -0.5,19.5 -0.5,18.5 -0.5,17.5C 0.458367,17.0472 1.2917,16.3805 2,15.5C 0.724185,7.44783 3.89085,2.44783 11.5,0.5C 19.1091,2.44783 22.2758,7.44783 21,15.5C 21.7083,16.3805 22.5416,17.0472 23.5,17.5 Z M 10.5,2.5 C 18.6902,4.59565 20.5235,9.26232 16,16.5C 9.639,19.5384 5.80567,17.5384 4.5,10.5C 5.08215,6.62916 7.08215,3.96249 10.5,2.5 Z M 3.5,16.5 C 6.04539,17.4376 6.54539,18.7709 5,20.5C 2.98801,19.4335 2.48801,18.1002 3.5,16.5 Z M 18.5,16.5 C 20.8918,17.7421 20.7251,19.0755 18,20.5C 16.4132,19.154 16.5798,17.8206 18.5,16.5 Z"/></g>\n</svg>\n',withText:!0,tooltip:!0}),r.bind("class").to(d,"value",(e=>{const t=["ck-badge-dropdown"];return e&&t.push("ck-badge-dropdown-active"),t.join(" ")})),this.listenTo(r,"execute",(t=>{e.execute(t.source.commandName,t.source.commandParam),e.editing.view.focus()})),r})),t.add("badgeAddBelow",(t=>{const n=e.commands.get("insertBadgeRowBelow"),i=new s.ButtonView(t);return i.set({label:o("Ajouter un badge en-dessous"),icon:'<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg width="76px" height="76px" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" enable-background="new 0 0 76.00 76.00" xml:space="preserve">\n\t<path fill="currentColor" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 50,48L 50,43L 55,43L 55,38L 60,38L 60,43L 65,43L 65,48L 60,48L 60,53L 55,53L 55,48L 50,48 Z M 14,51L 14,24L 40,24L 40,40L 46,40L 46,51L 14,51 Z M 43,43L 17,43L 17,48L 43,48L 43,43 Z M 37,40L 37,35L 17,35L 17,40L 37,40 Z M 37,32L 37,27L 17,27L 17,32L 37,32 Z "/>\n</svg>\n',tooltip:!1,withText:!0}),i.bind("isOn","isEnabled").to(n,"value","isEnabled"),this.listenTo(i,"execute",(()=>{e.execute("insertBadgeRowBelow")})),i})),t.add("badgeRemove",(t=>{const n=e.commands.get("deleteBadgeRow"),i=new s.ButtonView(t);return i.set({label:o("Supprimer le badge"),icon:'<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <path d="M5 3H3v18h18V3H5zm14 2v14H5V5h14zm-3 6H8v2h8v-2z" fill="currentColor"/>\n</svg>\n',tooltip:!1,withText:!0}),i.bind("isOn","isEnabled").to(n,"value","isEnabled"),this.listenTo(i,"execute",(()=>{e.execute("deleteBadgeRow")})),i}))}_addButton(e){const t=this.editor;t.ui.componentFactory.add(`Badge:${e.id}`,(o=>{const n=new l.Collection,i=t.commands.get("insertBadge");e.options.forEach((e=>{const t=new s.Model({commandName:"insertBadge",commandParam:{type:e.type,size:e.size,haveIcon:e.haveIcon},label:e.name,withText:!0});t.bind("isOn").to(i,"value",(t=>t&&t.type===e.type&&t.size===e.size)),n.add({type:"button",model:t})}));const r=(0,s.createDropdown)(o);return(0,s.addListToDropdown)(r,n),r.buttonView.set({label:e.label,withText:!0}),r.bind("class").to(i,"value",(t=>{const o=["ck-badge-option-group-dropdown"];return t&&t.type===e.id&&o.push("ck-badge-option-group-dropdown-active"),o.join(" ")})),r}))}}function g(e){const t=e.getSelectedElement();return t&&m(t)?t:null}function u(e){const t=e.getFirstPosition();if(!t)return null;let o=t.parent;for(;o;){if(o.is("element")&&m(o))return o;o=o.parent}return null}function m(e){return!!e.hasClass("ckeditor-badge")&&(0,t.isWidget)(e)}class p extends e.Plugin{static get requires(){return[t.WidgetToolbarRepository]}static get pluginName(){return"BadgeToolbar"}afterInit(){const e=this.editor,o=e.t,n=e.plugins.get(t.WidgetToolbarRepository),i=e.config.get("badge.contentToolbar"),r=e.config.get("badge.tableToolbar");i&&n.register("badgeContent",{ariaLabel:o("Badge toolbar"),items:i,getRelatedElement:u}),r&&n.register("badge",{ariaLabel:o("Badge toolbar"),items:r,getRelatedElement:g})}}class b extends e.Plugin{static get requires(){return[a,c,p]}}const w={Badge:b}})(),n=n.default})()));