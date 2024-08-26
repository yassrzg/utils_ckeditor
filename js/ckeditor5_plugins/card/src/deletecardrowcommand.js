/**
 * @file defines DeleteCardRowCommand.
 */
// cSpell:ignore cardediting

import { Command } from 'ckeditor5/src/core';

/**
 * The delete card row command.
 *
 * @extends module:core/command~Command
 */
export default class DeleteCardRowCommand extends Command {
  /**
   * Creates a new `DeleteCardRowCommand` instance.
   *
   * @param {module:core/editor/editor~Editor} editor The editor on which this command will be used.
   * @param {Object} options
   */
  constructor( editor, options = {} ) {
    super( editor );
  }

  execute() {
    const editor = this.editor;
    const selection = editor.model.document.selection;
    let elToDelete = null;

    selection.getFirstPosition().getAncestors().forEach(ancestor => {
      if(ancestor.name == 'cardContent' || ancestor.name == 'cardTitle' || ancestor.name == 'cardImage' ) {
        elToDelete = ancestor;
      }
    });

    if(elToDelete != null) {
      // Command is being run from a correct context.
      editor.model.change((writer) => {
        let siblingElToDelete, siblingIndex;
        if(elToDelete.name == 'cardContent') {
          // Sibling is cardTitle.
          siblingIndex = elToDelete.index - 1;
        }
        else {
          // Sibling is cardContent.
          siblingIndex = elToDelete.index + 1;
        }
        siblingElToDelete = elToDelete.parent.getChild(siblingIndex);

        // Remove elements.
        writer.remove(elToDelete);
        writer.remove(siblingElToDelete);
      });
    }
  }

  refresh() {
    this.isEnabled = true;
  }

}
