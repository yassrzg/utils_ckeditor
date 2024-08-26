import { Command } from 'ckeditor5/src/core';

/**
 * The delete badge row command.
 *
 * @extends module:core/command~Command
 */
export default class DeleteBadgeRowCommand extends Command {
  /**
   * Creates a new `DeleteBadgeRowCommand` instance.
   *
   * @param {module:core/editor/editor~Editor} editor The editor on which this command will be used.
   */
  constructor(editor) {
    super(editor);
  }

  execute() {
    const editor = this.editor;
    const selection = editor.model.document.selection;
    let elToDelete = null;

    // Find the nearest ancestor that is badgeContent.
    selection.getFirstPosition().getAncestors().forEach(ancestor => {
      if (ancestor.name === 'badgeContent') {
        elToDelete = ancestor;
      }
    });

    if (elToDelete) {
      // Command is being run from a correct context.
      editor.model.change(writer => {
        // Remove the badgeContent element.
        writer.remove(elToDelete);
      });
    }
  }

  refresh() {
    this.isEnabled = true;
  }
}
