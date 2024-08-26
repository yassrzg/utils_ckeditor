
import HighLightEditing from './highlightediting';
import HighLightUi from './highLightui';
import { Plugin } from 'ckeditor5/src/core';

export default class HighLight extends Plugin {
  static get requires() {
    return [HighLightEditing, HighLightUi];
  }
}
