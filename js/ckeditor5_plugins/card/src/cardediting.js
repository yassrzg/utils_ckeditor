import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertCardCommand from './insertcardcommand';
import InsertCardRowCommand from './insertcardrowcommand';
import DeleteCardRowCommand from './deletecardrowcommand';

// cSpell:ignore card insertsimpleboxcommand

/**
 * CKEditor 5 plugins do not work directly with the DOM. They are defined as
 * plugin-specific data models that are then converted to markup that
 * is inserted in the DOM.
 *
 *
 * Which is converted for the browser/user as this markup
 * <section class="simple-box">
 *   <h2 class="simple-box-title"></h1>
 *   <div class="simple-box-description"></div>
 * </section>
 *
 * This file has the logic for defining the card model, and for how it is
 * converted to standard DOM markup.
 */
export default class CardEditing extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'CardEditing';
  }

  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertCard',
      new InsertCardCommand(this.editor),
    );

    this.editor.commands.add(
      'insertCardRowAbove',
      new InsertCardRowCommand(this.editor, { order: 'above' })
    );
    this.editor.commands.add(
      'insertCardRowBelow',
      new InsertCardRowCommand( this.editor, { order: 'below' } )
    );
    this.editor.commands.add(
      'deleteCardRow',
      new DeleteCardRowCommand( this.editor, {} )
    );

  }

  /*
   *
   * The logic in _defineConverters() will determine how this is converted to
   * markup.
   */
  _defineSchema() {
    // Schemas are registered via the central `editor` object.
    const schema = this.editor.model.schema;

    schema.register('card', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,
      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block',
    });

    schema.register( 'cardRow', {
      allowIn: 'card',
      isLimit: true
    } );

    schema.register('cardTitle', {
      // This creates a boundary for external actions such as clicking and
      // and keypress. For example, when the cursor is inside this box, the
      // keyboard shortcut for "select all" will be limited to the contents of
      // the box.
      isLimit: true,
      allowIn: 'card',
      // Allow content that is allowed in blocks (e.g. text with attributes).
      allowContentOf: '$block',
    });

    schema.register('cardContent', {
      isLimit: true,
      allowIn: 'card',
      allowContentOf: '$root',
    });

    schema.register('cardImage', {
      isLimit: true,
      allowIn: 'card',
      allowContentOf: '$root',
    });


    schema.addChildCheck((context, childDefinition) => {

      if (
        context.endsWith('cardContent') &&
        childDefinition.name === 'card'
      ) {
        return false;
      }
    });
  }

  /**
   * Converters determine how CKEditor 5 models are converted into markup and
   * vice-versa.
   */
  _defineConverters() {
    // Converters are registered via the central editor object.
    const { conversion } = this.editor;

    conversion.for('upcast').elementToElement({
      model: 'card',
      view: {
        name: 'dl',
        classes: 'ckeditor-card',
      },
    });


    conversion.for('upcast').elementToElement({
      model: 'cardTitle',
      view: {
        name: 'dt',
        classes: '',
      },
    });


    conversion.for('upcast').elementToElement({
      model: 'cardContent',
      view: {
        name: 'dd',
        classes: '',
      },
    });

    conversion.for('upcast').elementToElement({
      model: 'cardImage',
      view: {
        name: 'dd',
        classes: '',
      },
    });


    conversion.for('dataDowncast').elementToElement({
      model: 'card',
      view: {
        name: 'dl',
        classes: 'ckeditor-card',
      },
    });

    // Instances of <card> are saved as
    // <dt>{{inner content}}</dt>.
    conversion.for('dataDowncast').elementToElement({
      model: 'cardTitle',
      view: {
        name: 'dt',
        classes: '',
      },
    });

    // Instances of <cardContent> are saved as
    // <dd>{{inner content}}</dd>.
    conversion.for('dataDowncast').elementToElement({
      model: 'cardContent',
      view: {
        name: 'dd',
        classes: '',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'cardImage',
      view: {
        name: 'dd',
        classes: '',
      },
    });

    // Editing Downcast Converters. These render the content to the user for
    // editing, i.e. this determines what gets seen in the editor. These trigger
    // after the Data Upcast Converters, and are re-triggered any time there
    // are changes to any of the models' properties.
    //
    // Convert the <card> model into a container widget in the editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'card',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', {
          class: 'ckeditor-card',
        });

        return toWidget(div, viewWriter);
      },
    });

    // Convert the <cardTitle> model into an editable <h2> widget.
    conversion.for('editingDowncast').elementToElement({
      model: 'cardTitle',
      view: (modelElement, { writer: viewWriter }) => {
        const h2 = viewWriter.createEditableElement('div', {
          class: 'ckeditor-card-title',
        });
        return toWidgetEditable(h2, viewWriter);
      },
    });

    // Convert the <cardContent> model into an editable <div> widget.
    conversion.for('editingDowncast').elementToElement({
      model: 'cardContent',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'ckeditor-card-content',
        });
        return toWidgetEditable(div, viewWriter);
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'cardImage',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'ckeditor-card-image',
        });
        return toWidgetEditable(div, viewWriter);
      },
    });
  }
}
