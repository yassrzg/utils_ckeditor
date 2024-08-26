
import ButtonEditing from './buttonediting';
import ButtonUI from './buttonui';
import { Plugin } from 'ckeditor5/src/core';

export default class Button extends Plugin {
  static get requires() {
    return [ButtonEditing, ButtonUI];
  }
}
