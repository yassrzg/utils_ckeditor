/**
 * @file This is what CKEditor refers to as a master (glue) plugin. Its role is
 * just to load the “editing” and “UI” components of this Plugin. Those
 * components could be included in this file, but
 *
 * I.e, this file's purpose is to integrate all the separate parts of the plugin
 * before it's made discoverable via index.js.
 */
// cSpell:ignore accordionediting accordion

// The contents of AccordionUI and AccordionEditing could be included in this
// file, but it is recommended to separate these concerns in different files.
import CardEditing from './cardediting';
import CardUi from './cardui';
import CardToolbar from './cardtoolbar';
import { Plugin } from 'ckeditor5/src/core';

export default class Card extends Plugin {
  static get requires() {
    return [CardEditing, CardUi, CardToolbar];
  }
}
