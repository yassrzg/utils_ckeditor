/**
 * @file defines DeletetabRowCommand.
 */
// cSpell:ignore tabediting

import { Command } from 'ckeditor5/src/core';

/**
 * The delete tab row command.
 *
 * @extends module:core/command~Command
 */
export default class DeleteTabRowCommand extends Command {
  /**
   * Creates a new `DeletetabRowCommand` instance.
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
      if(ancestor.name == 'tabContent' || ancestor.name == 'tabTitle') {
        elToDelete = ancestor;
      }
    });

    if(elToDelete != null) {
      // Command is being run from a correct context.
      editor.model.change((writer) => {
        let siblingElToDelete, siblingIndex;
        if(elToDelete.name == 'tabContent') {
          // Sibling is tabTitle.
          siblingIndex = elToDelete.index - 1;
        }
        else {
          // Sibling is tabContent.
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
