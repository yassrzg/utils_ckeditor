import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertCalloutCommand from './insertcalloutcommand';

export default class CalloutEditing extends Plugin {

  static get pluginName() {
    return 'CalloutEditing';
  }

  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertCallout',
      new InsertCalloutCommand(this.editor),
    );
  }

  _defineSchema() {

    const schema = this.editor.model.schema;

    schema.register('callout', {
      isObject: true,
      allowWhere: '$block',
    });

    schema.register('calloutRow', {
      allowIn: 'callout',
      isLimit: true
    });

    schema.register('calloutTitle', {
      isLimit: true,
      allowIn: 'callout',
      allowContentOf: '$block',
    });

    schema.register('calloutContent', {
      isLimit: true,
      allowIn: 'callout',
      allowContentOf: '$root',
    });

    schema.addChildCheck((context, childDefinition) => {
      if (
        context.endsWith('calloutContent') &&
        childDefinition.name === 'callout'
      ) {
        return false;
      }
    });
  }

  _defineConverters() {
    const { conversion } = this.editor;

    conversion.for('upcast').elementToElement({
      model: 'callout',
      view: {
        name: 'dl',
        classes: 'ckeditor-callout',
      },
    });

    conversion.for('upcast').elementToElement({
      model: 'calloutTitle',
      view: {
        name: 'dt',
        classes: '',
      },
    });

    conversion.for('upcast').elementToElement({
      model: 'calloutContent',
      view: {
        name: 'dd',
        classes: '',
      },
    });


    conversion.for('dataDowncast').elementToElement({
      model: 'callout',
      view: {
        name: 'dl',
        classes: 'ckeditor-callout',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'calloutTitle',
      view: {
        name: 'dt',
        classes: '',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'calloutContent',
      view: {
        name: 'dd',
        classes: '',
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'callout',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', {
          class: 'ckeditor-callout',
        });

        return toWidget(div, viewWriter);
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'calloutTitle',
      view: (modelElement, { writer: viewWriter }) => {
        const h2 = viewWriter.createEditableElement('dt', {
          class: 'ckeditor-callout-title',
        });

        return toWidgetEditable(h2, viewWriter);
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'calloutContent',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('dd', {
          class: 'ckeditor-callout-content',
        });

        return toWidgetEditable(div, viewWriter);
      }
    });

  }
}
