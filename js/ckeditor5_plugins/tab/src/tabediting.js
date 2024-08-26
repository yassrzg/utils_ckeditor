import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertTabCommand from './inserttabcommand';
import InsertTabRowCommand from './inserttabrowcommand';
import DeleteTabRowCommand from './deletetabrowcommand';

// cSpell:ignore tab insertsimpleboxcommand

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
 * This file has the logic for defining the tab model, and for how it is
 * converted to standard DOM markup.
 */
export default class TabEditing extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'TabEditing';
  }

  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertTab',
      new InsertTabCommand(this.editor),
    );

    this.editor.commands.add(
      'insertTabRowAbove',
      new InsertTabRowCommand(this.editor, { order: 'above' })
    );
    this.editor.commands.add(
      'insertTabRowBelow',
      new InsertTabRowCommand( this.editor, { order: 'below' } )
    );
    this.editor.commands.add(
      'deleteTabRow',
      new DeleteTabRowCommand( this.editor, {} )
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

    schema.register('tab', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,
      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block',
    });

    schema.register( 'tabRow', {
      allowIn: 'tab',
      isLimit: true
    } );

    schema.register('tabTitle', {
      // This creates a boundary for external actions such as clicking and
      // and keypress. For example, when the cursor is inside this box, the
      // keyboard shortcut for "select all" will be limited to the contents of
      // the box.
      isLimit: true,
      allowIn: 'tab',
      // Allow content that is allowed in blocks (e.g. text with attributes).
      allowContentOf: '$block',
    });

    schema.register('tabContent', {
      isLimit: true,
      allowIn: 'tab',
      allowContentOf: '$root',
    });

    schema.addChildCheck((context, childDefinition) => {

      if (
        context.endsWith('tabContent') &&
        childDefinition.name === 'tab'
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
      model: 'tab',
      view: {
        name: 'dl',
        classes: 'ckeditor-tab',
      },
    });


    conversion.for('upcast').elementToElement({
      model: 'tabTitle',
      view: {
        name: 'dt',
        classes: '',
      },
    });


    conversion.for('upcast').elementToElement({
      model: 'tabContent',
      view: {
        name: 'dd',
        classes: '',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'tab',
      view: {
        name: 'dl',
        classes: 'ckeditor-tab',
      },
    });

    // Instances of <tab> are saved as
    // <dt>{{inner content}}</dt>.
    conversion.for('dataDowncast').elementToElement({
      model: 'tabTitle',
      view: {
        name: 'dt',
        classes: '',
      },
    });

    // Instances of <tabContent> are saved as
    // <dd>{{inner content}}</dd>.
    conversion.for('dataDowncast').elementToElement({
      model: 'tabContent',
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
    // Convert the <tab> model into a container widget in the editor UI.
    conversion.for('editingDowncast').elementToElement({
      model: 'tab',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', {
          class: 'ckeditor-tab',
        });

        return toWidget(div, viewWriter);
      },
    });

    // Convert the <tabTitle> model into an editable <h2> widget.
    conversion.for('editingDowncast').elementToElement({
      model: 'tabTitle',
      view: (modelElement, { writer: viewWriter }) => {
        const h2 = viewWriter.createEditableElement('div', {
          class: 'ckeditor-tab-title',
        });
        return toWidgetEditable(h2, viewWriter);
      },
    });

    // Convert the <tabContent> model into an editable <div> widget.
    conversion.for('editingDowncast').elementToElement({
      model: 'tabContent',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'ckeditor-tab-content',
        });
        return toWidgetEditable(div, viewWriter);
      },
    });
  }
}
