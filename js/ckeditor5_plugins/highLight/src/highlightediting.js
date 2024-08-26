import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertHighLightCommand from './inserthighlightcommand';

export default class HighLightEditing extends Plugin {

  static get pluginName() {
    return 'HighLightEditing';
  }

  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertHighLight',
      new InsertHighLightCommand(this.editor),
    );
  }

  _defineSchema() {

    const schema = this.editor.model.schema;

    schema.register('highLight', {
      isObject: true,
      allowWhere: '$block',
    });

    schema.register('highLightRow', {
      allowIn: 'highLight',
      isLimit: true
    });

    schema.register('highLightContent', {
      isLimit: true,
      allowIn: 'highLight',
      allowContentOf: '$root',
    });

    schema.addChildCheck((context, childDefinition) => {
      if (
        context.endsWith('highLightContent') &&
        childDefinition.name === 'highLight'
      ) {
        return false;
      }
    });
  }

  _defineConverters() {
    const { conversion } = this.editor;

    conversion.for('upcast').elementToElement({
      model: 'highLight',
      view: {
        name: 'dl',
        classes: 'ckeditor-highLight',
      },
    });

    conversion.for('upcast').elementToElement({
      model: 'highLightContent',
      view: {
        name: 'dd',
        classes: '',
      },
    });


    conversion.for('dataDowncast').elementToElement({
      model: 'highLight',
      view: {
        name: 'dl',
        classes: 'ckeditor-highLight',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'highLightContent',
      view: {
        name: 'dd',
        classes: '',
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'highLight',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', {
          class: 'ckeditor-highLight',
        });

        return toWidget(div, viewWriter);
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'highLightContent',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('dd', {
          class: 'ckeditor-highLight-content',
        });

        return toWidgetEditable(div, viewWriter);
      }
    });

  }
}
