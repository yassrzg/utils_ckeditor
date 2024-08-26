import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertBadgeCommand from './insertbadgecommand';
import InsertBadgeRowCommand from './insertbadgerowcommand';
import DeleteBadgeRowCommand from './deletebadgerowcommand';

export default class BadgeEditing extends Plugin {

  static get pluginName() {
    return 'BadgeEditing';
  }

  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertBadge',
      new InsertBadgeCommand(this.editor),
    );


    this.editor.commands.add(
      'insertBadgeRowBelow',
      new InsertBadgeRowCommand( this.editor, { order: 'below' } )
    );

    this.editor.commands.add(
      'deleteBadgeRow',
      new DeleteBadgeRowCommand( this.editor, {} )
    );
  }


  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('badge', {
      isObject: true,
      allowWhere: '$block',
      allowAttributes: ['data-type', 'data-size', 'data-icon'],
    });

    schema.register('badgeRow', {
      allowIn: 'badge',
      isLimit: true
    });

    schema.register('badgeContent', {
      isLimit: true,
      allowIn: 'badge',
      allowContentOf: '$root',
    });

    schema.addChildCheck((context, childDefinition) => {
      if (
        context.endsWith('badgeContent') &&
        childDefinition.name === 'badge'
      ) {
        return false;
      }
    });
  }

  _defineConverters() {
    const { conversion } = this.editor;

    conversion.for('upcast').elementToElement({
      model: (viewElement, { writer: modelWriter }) => {
        const attributes = {
          'data-type': viewElement.getAttribute('data-type') || 'default',
          'data-size': viewElement.getAttribute('data-size') || 'medium',
          'data-icon': viewElement.getAttribute('data-icon') || '',
        };

        return modelWriter.createElement('badge', attributes);
      },
      view: {
        name: 'dl',
        classes: 'ckeditor-badge',
      },
    });

    conversion.for('upcast').elementToElement({
      model: 'badgeContent',
      view: {
        name: 'dd',
        classes: 'ckeditor-badge-content',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'badge',
      view: (modelElement, { writer: viewWriter }) => {
        const dlElement = viewWriter.createContainerElement('dl', { class: 'ckeditor-badge' });

        const type = modelElement.getAttribute('data-type') || 'default';
        const size = modelElement.getAttribute('data-size') || 'medium';
        const icon = modelElement.getAttribute('data-icon') || '';

        viewWriter.setAttribute('data-type', type, dlElement);
        viewWriter.setAttribute('data-size', size, dlElement);
        viewWriter.setAttribute('data-icon', icon, dlElement);

        return toWidget(dlElement, viewWriter);
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'badgeContent',
      view: {
        name: 'dd',
        classes: 'ckeditor-badge-content',
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'badge',
      view: (modelElement, { writer: viewWriter }) => {
        const dlElement = viewWriter.createContainerElement('dl', {
          class: 'ckeditor-badge',
          'data-type': modelElement.getAttribute('data-type'),
          'data-size': modelElement.getAttribute('data-size'),
          'data-icon': modelElement.getAttribute('data-icon'),
        });

        return toWidget(dlElement, viewWriter);
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'badgeContent',
      view: (modelElement, { writer: viewWriter }) => {
        const ddElement = viewWriter.createEditableElement('dd', {
          class: 'ckeditor-badge-content',
        });

        return toWidgetEditable(ddElement, viewWriter);
      }
    });
  }
}
