import { Command } from 'ckeditor5/src/core';

/**
 * The insert badge row command.
 *
 * @extends module:core/command~Command
 */
export default class InsertBadgeRowCommand extends Command {
  /**
   * Creates a new `InsertBadgeRowCommand` instance.
   *
   * @param {module:core/editor/editor~Editor} editor The editor on which this command will be used.
   */
  constructor(editor) {
    super(editor);
  }

  execute() {
    const editor = this.editor;
    const selection = editor.model.document.selection;
    let commandEl = null;

    selection.getFirstPosition().getAncestors().forEach(ancestor => {
      if (ancestor.name === 'badgeContent') {
        commandEl = ancestor;
      }
    });

    if (commandEl) {
      // Command is being run from a correct context.
      editor.model.change((writer) => {
        const position = writer.createPositionAfter(commandEl);

        // Create the badgeContent element.
        const badgeContent = writer.createElement('badgeContent');

        // Insert the badgeContent element.
        writer.insert(badgeContent, position);

        // Create and insert default content.
        const badgeContentParagraph = writer.createElement('paragraph');
        writer.insertText('Contenu du badge', badgeContentParagraph);
        writer.insert(badgeContentParagraph, badgeContent);
      });
    }
  }

  refresh() {
    this.isEnabled = true;
  }
}
