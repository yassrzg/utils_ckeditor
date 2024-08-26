import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import Insertcalloutbuttoncommand from './insertcalloutbuttoncommand';

export default class CalloutButtonEditing extends Plugin {

  static get pluginName() {
    return 'CalloutButtonEditing';
  }

  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertCalloutButton',
      new Insertcalloutbuttoncommand(this.editor),
    );
  }

  _defineSchema() {

    const schema = this.editor.model.schema;

    schema.register('calloutButton', {
      isObject: true,
      allowWhere: '$block',
    });

    schema.register('calloutButtonRow', {
      allowIn: 'calloutButton',
      isLimit: true
    });

    schema.register('calloutButtonTitle', {
      isLimit: true,
      allowIn: 'calloutButton',
      allowContentOf: '$block',
    });

    schema.register('calloutButtonContent', {
      isLimit: true,
      allowIn: 'calloutButton',
      allowContentOf: '$root',
    });

    schema.register('calloutButtonButton', {
      isLimit: true,
      allowIn: 'calloutButton',
      allowContentOf: '$block',
    });

    schema.addChildCheck((context, childDefinition) => {
      if (
        context.endsWith('calloutButtonContent') &&
        childDefinition.name === 'calloutButton'
      ) {
        return false;
      }
    });
  }

  _defineConverters() {
    const { conversion } = this.editor;

    conversion.for('upcast').elementToElement({
      model: 'calloutButton',
      view: {
        name: 'dl',
        classes: 'ckeditor-calloutButton',
      },
    });

    conversion.for('upcast').elementToElement({
      model: 'calloutButtonTitle',
      view: {
        name: 'dt',
        classes: '',
      },
    });

    conversion.for('upcast').elementToElement({
      model: 'calloutButtonContent',
      view: {
        name: 'dd',
        classes: '',
      },
    });

    conversion.for('upcast').elementToElement({
      model: 'calloutButtonButton',
      view: {
        name: 'dd',
        classes: '',
      },
    });


    conversion.for('dataDowncast').elementToElement({
      model: 'calloutButton',
      view: {
        name: 'dl',
        classes: 'ckeditor-calloutButton',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'calloutButtonTitle',
      view: {
        name: 'dt',
        classes: '',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'calloutButtonContent',
      view: {
        name: 'dd',
        classes: '',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'calloutButtonButton',
      view: {
        name: 'dd',
        classes: '',
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'calloutButton',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', {
          class: 'ckeditor-calloutButton',
        });

        return toWidget(div, viewWriter);
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'calloutButtonTitle',
      view: (modelElement, { writer: viewWriter }) => {
        const h2 = viewWriter.createEditableElement('dt', {
          class: 'ckeditor-calloutButton-title',
        });

        return toWidgetEditable(h2, viewWriter);
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'calloutButtonContent',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('dd', {
          class: 'ckeditor-calloutButton-content',
        });

        return toWidgetEditable(div, viewWriter);
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'calloutButtonButton',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('dd', {
          class: 'ckeditor-calloutButton-button',
        });

        return toWidgetEditable(div, viewWriter);
      }
    });

  }
}
