
import { Command } from 'ckeditor5/src/core';

export default class InsertButtonCommand extends Command {

  execute() {
    const { model } = this.editor;

    model.change((writer) => {
      model.insertContent(createButton(writer));
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'button',
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createButton(writer) {
  const button = writer.createElement('button');
  const buttonTitle = writer.createElement('buttonTitle');
  const buttonContent = writer.createElement('buttonContent');

  writer.appendElement('paragraph', buttonTitle);
  writer.appendElement('paragraph', buttonContent);

  writer.append(buttonTitle, button);
  writer.append(buttonContent, button);


  return button;
}
