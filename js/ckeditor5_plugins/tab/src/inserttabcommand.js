/**
 * @file defines InserttabCommand, which is executed when the tab
 * toolbar button is pressed.
 */
// cSpell:ignore tabediting

import { Command } from 'ckeditor5/src/core';

export default class InsertTabCommand extends Command {
  execute() {
    const { model } = this.editor;

    model.change((writer) => {
      // Insert <tab>*</tab> at the current selection position
      // in a way that will result in creating a valid model structure.
      model.insertContent(createTab(writer));
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    // Determine if the cursor (selection) is in a position where adding a
    // tab is permitted. This is based on the schema of the model(s)
    // currently containing the cursor.
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'tab',
    );

    // If the cursor is not in a location where a tab can be added, return
    // null so the addition doesn't happen.
    this.isEnabled = allowedIn !== null;
  }
}

function createTab(writer) {
  // Create an tab.
  const tab = writer.createElement('tab');
  const tabTitle = writer.createElement('tabTitle');
  const tabContent = writer.createElement('tabContent');

  writer.append(tabTitle, tab);
  writer.append(tabContent, tab);

  writer.appendElement('paragraph', tabContent);

  // Return the element to be added to the editor.
  return tab;
}
