
import { Command } from 'ckeditor5/src/core';

export default class Insertcalloutbuttoncommand extends Command {

  execute() {
    const { model } = this.editor;

    model.change((writer) => {
      model.insertContent(createCalloutButton(writer));
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'calloutButton',
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createCalloutButton(writer) {
  const calloutButton = writer.createElement('calloutButton');
  const calloutButtonTitle = writer.createElement('calloutButtonTitle');
  const calloutButtonContent = writer.createElement('calloutButtonContent');
  const calloutButtonButton = writer.createElement('calloutButtonButton');

  writer.appendElement('paragraph', calloutButtonTitle);
  writer.appendElement('paragraph', calloutButtonContent);
  writer.appendElement('paragraph', calloutButtonButton);

  writer.append(calloutButtonTitle, calloutButton);
  writer.append(calloutButtonContent, calloutButton);
  writer.append(calloutButtonButton, calloutButton);

  return calloutButton;
}
