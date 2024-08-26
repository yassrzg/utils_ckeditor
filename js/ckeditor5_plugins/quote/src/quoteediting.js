import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertQuoteCommand from './insertquotecommand';

export default class QuoteEditing extends Plugin {

  static get pluginName() {
    return 'QuoteEditing';
  }

  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertQuote',
      new InsertQuoteCommand(this.editor),
    );
  }

  _defineSchema() {

    const schema = this.editor.model.schema;

    schema.register('quote', {
      isObject: true,
      allowWhere: '$block',
    });

    schema.register('quoteRow', {
      allowIn: 'quote',
      isLimit: true
    });

    schema.register('quoteTitle', {
      isLimit: true,
      allowIn: 'quote',
      allowContentOf: '$block',
    });


    schema.addChildCheck((context, childDefinition) => {
      if (
        context.endsWith('quoteTitle') &&
        childDefinition.name === 'quote'
      ) {
        return false;
      }
    });
  }

  _defineConverters() {
    const { conversion } = this.editor;

    conversion.for('upcast').elementToElement({
      model: 'quote',
      view: {
        name: 'dl',
        classes: 'ckeditor-quote',
      },
    });

    conversion.for('upcast').elementToElement({
      model: 'quoteTitle',
      view: {
        name: 'dt',
        classes: '',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'quote',
      view: {
        name: 'dl',
        classes: 'ckeditor-quote',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'quoteTitle',
      view: {
        name: 'dt',
        classes: '',
      },
    });


    conversion.for('editingDowncast').elementToElement({
      model: 'quote',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', {
          class: 'ckeditor-quote',
        });

        return toWidget(div, viewWriter);
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'quoteTitle',
      view: (modelElement, { writer: viewWriter }) => {
        const h2 = viewWriter.createEditableElement('dt', {
          class: 'ckeditor-quote-title',
        });

        return toWidgetEditable(h2, viewWriter);
      }
    });


  }
}
