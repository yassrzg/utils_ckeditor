
import { Command } from 'ckeditor5/src/core';

export default class InsertCalloutCommand extends Command {

  execute() {
    const { model } = this.editor;

    model.change((writer) => {
      model.insertContent(createCallout(writer));
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'callout',
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createCallout(writer) {
  const callout = writer.createElement('callout');
  const calloutTitle = writer.createElement('calloutTitle');
  const calloutContent = writer.createElement('calloutContent');

  writer.appendElement('paragraph', calloutTitle);
  writer.appendElement('paragraph', calloutContent);

  writer.append(calloutTitle, callout);
  writer.append(calloutContent, callout);


  return callout;
}
