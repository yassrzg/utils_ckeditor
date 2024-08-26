import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertButtonCommand from './insertbuttoncommand';

export default class ButtonEditing extends Plugin {

  static get pluginName() {
    return 'ButtonEditing';
  }

  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertButton',
      new InsertButtonCommand(this.editor),
    );
  }

  _defineSchema() {

    const schema = this.editor.model.schema;

    schema.register('button', {
      isObject: true,
      allowWhere: '$block',
    });

    schema.register('buttonRow', {
      allowIn: 'button',
      isLimit: true
    });

    schema.register('buttonTitle', {
      isLimit: true,
      allowIn: 'button',
      allowContentOf: '$block',
    });

    schema.register('buttonContent', {
      isLimit: true,
      allowIn: 'button',
      allowContentOf: '$root',
    });

    schema.addChildCheck((context, childDefinition) => {
      if (
        context.endsWith('buttonContent') &&
        childDefinition.name === 'button'
      ) {
        return false;
      }
    });
  }

  _defineConverters() {
    const { conversion } = this.editor;

    conversion.for('upcast').elementToElement({
      model: 'button',
      view: {
        name: 'dl',
        classes: 'ckeditor-button',
      },
    });

    conversion.for('upcast').elementToElement({
      model: 'buttonTitle',
      view: {
        name: 'dt',
        classes: '',
      },
    });

    conversion.for('upcast').elementToElement({
      model: 'buttonContent',
      view: {
        name: 'dd',
        classes: '',
      },
    });


    conversion.for('dataDowncast').elementToElement({
      model: 'button',
      view: {
        name: 'dl',
        classes: 'ckeditor-button',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'buttonTitle',
      view: {
        name: 'dt',
        classes: '',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'buttonContent',
      view: {
        name: 'dd',
        classes: '',
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'button',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', {
          class: 'ckeditor-button',
        });

        return toWidget(div, viewWriter);
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'buttonTitle',
      view: (modelElement, { writer: viewWriter }) => {
        const h2 = viewWriter.createEditableElement('dt', {
          class: 'ckeditor-button-title',
        });

        return toWidgetEditable(h2, viewWriter);
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'buttonContent',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('dd', {
          class: 'ckeditor-button-content',
        });

        return toWidgetEditable(div, viewWriter);
      }
    });

  }
}
