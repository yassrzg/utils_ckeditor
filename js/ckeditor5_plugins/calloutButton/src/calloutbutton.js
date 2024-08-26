
import CalloutButtonEditing from './calloutbuttonediting';
import CalloutButtonUI from './calloutbuttonui';
import { Plugin } from 'ckeditor5/src/core';

export default class CalloutButton extends Plugin {
  static get requires() {
    return [CalloutButtonEditing, CalloutButtonUI];
  }
}
