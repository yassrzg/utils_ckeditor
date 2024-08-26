import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertVideoCommand from './insertvideocommand';

export default class VideoEditing extends Plugin {

  static get pluginName() {
    return 'VideoEditing';
  }

  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertVideo',
      new InsertVideoCommand(this.editor),
    );
  }

  _defineSchema() {

    const schema = this.editor.model.schema;

    schema.register('video', {
      isObject: true,
      allowWhere: '$block',
    });

    schema.register('videoRow', {
      allowIn: 'video',
      isLimit: true
    });

    schema.register('videoLink', {
      isLimit: true,
      allowIn: 'video',
      allowContentOf: '$block',
    });

    schema.register('videoTitleSource', {
      isLimit: true,
      allowIn: 'video',
      allowContentOf: '$block',
    });

    schema.register('videoSource', {
      isLimit: true,
      allowIn: 'video',
      allowContentOf: '$root',
    });

    schema.addChildCheck((context, childDefinition) => {
      if (
        context.endsWith('videoSource') &&
        childDefinition.name === 'video'
      ) {
        return false;
      }
    });
  }

  _defineConverters() {
    const { conversion } = this.editor;

    conversion.for('upcast').elementToElement({
      model: 'video',
      view: {
        name: 'dl',
        classes: 'ckeditor-video',
      },
    });

    conversion.for('upcast').elementToElement({
      model: 'videoLink',
      view: {
        name: 'dt',
        classes: '',
      },
    });

    conversion.for('upcast').elementToElement({
      model: 'videoTitleSource',
      view: {
        name: 'dd',
        classes: '',
      },
    });

    conversion.for('upcast').elementToElement({
      model: 'videoSource',
      view: {
        name: 'dd',
        classes: '',
      },
    });


    conversion.for('dataDowncast').elementToElement({
      model: 'video',
      view: {
        name: 'dl',
        classes: 'ckeditor-video',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'videoLink',
      view: {
        name: 'dt',
        classes: '',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'videoTitleSource',
      view: {
        name: 'dd',
        classes: '',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'videoSource',
      view: {
        name: 'dd',
        classes: '',
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'video',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', {
          class: 'ckeditor-video',
        });

        return toWidget(div, viewWriter);
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'videoLink',
      view: (modelElement, { writer: viewWriter }) => {
        const h2 = viewWriter.createEditableElement('dt', {
          class: 'ckeditor-video-link',
        });

        return toWidgetEditable(h2, viewWriter);
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'videoTitleSource',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('dd', {
          class: 'ckeditor-video-title-source',
        });

        return toWidgetEditable(div, viewWriter);
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'videoSource',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('dd', {
          class: 'ckeditor-video-source',
        });

        return toWidgetEditable(div, viewWriter);
      }
    });

  }
}
