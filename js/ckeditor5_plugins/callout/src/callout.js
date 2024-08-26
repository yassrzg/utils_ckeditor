
import CalloutEditing from './calloutediting';
import CalloutUI from './calloutui';
import { Plugin } from 'ckeditor5/src/core';

export default class Callout extends Plugin {
  static get requires() {
    return [CalloutEditing, CalloutUI];
  }
}
