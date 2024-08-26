
import QuoteEditing from './quoteediting';
import QuoteUi from './quoteui';
import { Plugin } from 'ckeditor5/src/core';

export default class Quote extends Plugin {
  static get requires() {
    return [QuoteEditing, QuoteUi];
  }
}
