/**
 * @file defines InsertCardRowCommand.
 */
// cSpell:ignore cardediting

import { Command } from 'ckeditor5/src/core';

/**
 * The insert card row command.
 *
 * @extends module:core/command~Command
 */
export default class InsertCardRowCommand extends Command {
  /**
   * Creates a new `InsertcardRowCommand` instance.
   *
   * @param {module:core/editor/editor~Editor} editor The editor on which this command will be used.
   * @param {Object} options
   * @param {String} [options.order="below"] The order of insertion relative to the row in which the caret is located.
   * Possible values: `"above"` and `"below"`.
   */
  constructor( editor, options = {} ) {
    super( editor );

    /**
     * The order of insertion relative to the row in which the caret is located.
     *
     * @readonly
     * @member {String} module:utils_ckeditor/commands/insertcardrowcommand~Insertcardrowcommand#order
     */
    this.order = options.order || 'below';
  }

  execute() {
    const editor = this.editor;
    const selection = editor.model.document.selection;
    let commandEl = null;

    selection.getFirstPosition().getAncestors().forEach(ancestor => {
      if(ancestor.name == 'cardContent' || ancestor.name == 'cardTitle' || ancestor.name == 'cardImage' ) {
        commandEl = ancestor;
      }
    });

    if(commandEl != null) {
      // Command is being run from a correct context.
      editor.model.change((writer) => {
        let position;
        if(this.order == 'below') {
          let insertAfterIndex = (commandEl.name == 'cardContent') ? commandEl.index : commandEl.index + 1;
          if(insertAfterIndex < 0) {
            insertAfterIndex = 0;
          }
          // Add row below this row's cardTitle.
          position = writer.createPositionAfter(commandEl.parent.getChild(insertAfterIndex));
        }
        else {
          let insertBeforeIndex = (commandEl.name == 'cardContent') ? commandEl.index - 1 : commandEl.index;

          if(insertBeforeIndex < 0) {
            insertBeforeIndex = 0;
          }
          // Add row above this row's cardTitle.
          position = writer.createPositionBefore(commandEl.parent.getChild(insertBeforeIndex));
        }

        // Create the card title and content and add em.
        const cardTitle = writer.createElement('cardTitle');
        const cardContent = writer.createElement('cardContent');
        const cardImage = writer.createElement('cardImage');

        // Create some default title.
        writer.insertText('titre', cardTitle);

        // Do the insert.
        writer.insert(cardContent, position);
        writer.insert(cardTitle, position);
        writer.insert(cardImage, position);

        // Create some default content.
        const cardContentParagraph = writer.createElement('paragraph');
        const cardImageParagraph = writer.createElement('paragraph');
        writer.appendText('Description', cardContentParagraph);
        writer.insert(cardContentParagraph, cardContent);
        writer.insert(cardImageParagraph, cardImage);
      });
    }
  }

  refresh() {
    this.isEnabled = true;
  }

}
