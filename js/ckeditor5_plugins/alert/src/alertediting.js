import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertAlertCommand from './insertalertcommand';

export default class AlertEditing extends Plugin {

  static get pluginName() {
    return 'AlertEditing';
  }

  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertAlert',
      new InsertAlertCommand(this.editor),
    );

  }

  _defineSchema() {
    const schema = this.editor.model.schema;



    schema.register('alert', {
      isObject: true,
      allowWhere: '$block',
      allowAttributes: ['data-type', 'data-size', 'data-title'],
    });

    schema.register('alertRow', {
      allowIn: 'alert',
      isLimit: true
    });

    schema.register('alertTitle', {
      isLimit: true,
      allowIn: 'alert',
      allowContentOf: '$block',
    });

    schema.register('alertContent', {
      isLimit: true,
      allowIn: 'alert',
      allowContentOf: '$root',
    });

    schema.addChildCheck((context, childDefinition) => {
      if (
        context.endsWith('alertContent') &&
        childDefinition.name === 'alert'
      ) {
        return false;
      }
    });
  }

  _defineConverters() {
    const { conversion } = this.editor;

    conversion.for('upcast').elementToElement({
      model: (viewElement, { writer: modelWriter }) => {
        // Capturez les attributs de l'élément view
        const attributes = {
          'data-type': viewElement.getAttribute('data-type') || 'info',
          'data-size': viewElement.getAttribute('data-size') || 'medium',
          'data-title': viewElement.getAttribute('data-title') || '',
        };


        // Créez l'élément du modèle avec les attributs capturés
        return modelWriter.createElement('alert', attributes);
      },
      view: {
        name: 'dl',
        classes: 'ckeditor-alert',
      },
    });



    conversion.for('upcast').elementToElement({
      model: 'alertTitle',
      view: {
        name: 'dt',
        classes: '',
      },
    });

    conversion.for('upcast').elementToElement({
      model: 'alertContent',
      view: {
        name: 'dd',
        classes: '',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'alert',
      view: (modelElement, { writer: viewWriter }) => {

        const dlElement = viewWriter.createContainerElement('dl', { class: 'ckeditor-alert' });

        // Appliquez les attributs un par un
        const type = modelElement.getAttribute('data-type') || 'info';
        const size = modelElement.getAttribute('data-size') || 'medium';
        const title = modelElement.getAttribute('data-title') || '';

        viewWriter.setAttribute('data-type', type, dlElement);
        viewWriter.setAttribute('data-size', size, dlElement);
        viewWriter.setAttribute('data-title', title, dlElement);



        return toWidget(dlElement, viewWriter);
      }
    });


    conversion.for('dataDowncast').elementToElement({
      model: 'alertTitle',
      view: {
        name: 'dt',
        classes: '',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'alertContent',
      view: {
        name: 'dd',
        classes: '',
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'alert',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('dl', {
          class: 'ckeditor-alert',
          'data-type': modelElement.getAttribute('data-type'),
          'data-size': modelElement.getAttribute('data-size'),
          'data-title': modelElement.getAttribute('data-title'),
        });

        return toWidget(div, viewWriter);
      }
    });


    conversion.for('editingDowncast').elementToElement({
      model: 'alertTitle',
      view: (modelElement, { writer: viewWriter }) => {
        const h2 = viewWriter.createEditableElement('dt', {
          class: 'ckeditor-alert-title',
        });

        return toWidgetEditable(h2, viewWriter);
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'alertContent',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('dd', {
          class: 'ckeditor-alert-content',
        });

        return toWidgetEditable(div, viewWriter);
      }
    });
  }
}
