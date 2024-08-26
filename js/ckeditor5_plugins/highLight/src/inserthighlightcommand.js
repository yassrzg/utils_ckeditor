
import { Command } from 'ckeditor5/src/core';

export default class InsertHighLightCommand extends Command {

  execute() {
    const { model } = this.editor;

    model.change((writer) => {
      model.insertContent(createHighLight(writer));
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'highLight',
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createHighLight(writer) {
  const highLight = writer.createElement('highLight');

  const highLightContent = writer.createElement('highLightContent');

  writer.appendElement('paragraph', highLightContent);

  writer.append(highLightContent, highLight);


  return highLight;
}
