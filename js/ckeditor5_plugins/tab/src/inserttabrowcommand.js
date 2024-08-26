/**
 * @file defines InsertTabRowCommand.
 */
// cSpell:ignore tabediting

import { Command } from 'ckeditor5/src/core';

/**
 * The insert tab row command.
 *
 * @extends module:core/command~Command
 */
export default class InsertTabRowCommand extends Command {
  /**
   * Creates a new `InsertTabRowCommand` instance.
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
      if (ancestor.name === 'tabContent' || ancestor.name === 'tabTitle') {
        commandEl = ancestor;
      }
    });

    if (commandEl) {
      // Command is being run from a correct context.
      editor.model.change((writer) => {
        const position = writer.createPositionAfter(commandEl.parent.getChild(commandEl.index + 1));

        // Create the tab title and content elements.
        const tabTitle = writer.createElement('tabTitle');
        const tabContent = writer.createElement('tabContent');

        // Insert default text for the title.
        writer.insertText('titre', tabTitle);

        // Insert the tabContent and tabTitle elements.
        writer.insert(tabContent, position);
        writer.insert(tabTitle, position);

        // Create and insert default content.
        const tabContentParagraph = writer.createElement('paragraph');
        writer.insertText('Contenue', tabContentParagraph);
        writer.insert(tabContentParagraph, tabContent);
      });
    }
  }

  refresh() {
    this.isEnabled = true;
  }
}
