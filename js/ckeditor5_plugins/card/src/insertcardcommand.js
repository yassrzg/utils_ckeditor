/**
 * @file defines InsertcardCommand, which is executed when the card
 * toolbar button is pressed.
 */
// cSpell:ignore cardediting

import { Command } from 'ckeditor5/src/core';

export default class InsertCardCommand extends Command {
  execute() {
    const { model } = this.editor;

    model.change((writer) => {
      // Insert <card>*</card> at the current selection position
      // in a way that will result in creating a valid model structure.
      model.insertContent(createCard(writer));
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    // Determine if the cursor (selection) is in a position where adding a
    // card is permitted. This is based on the schema of the model(s)
    // currently containing the cursor.
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'card',
    );

    // If the cursor is not in a location where a card can be added, return
    // null so the addition doesn't happen.
    this.isEnabled = allowedIn !== null;
  }
}

function createCard(writer) {
  // Create an card.
  const card = writer.createElement('card');
  const cardTitle = writer.createElement('cardTitle');
  const cardContent = writer.createElement('cardContent');
  const cardImage = writer.createElement('cardImage');

  writer.append(cardTitle, card);
  writer.append(cardContent, card);
  writer.append(cardImage, card);

  writer.appendElement('paragraph', cardContent);
  writer.appendElement('paragraph', cardImage);


  // Return the element to be added to the editor.
  return card;
}
