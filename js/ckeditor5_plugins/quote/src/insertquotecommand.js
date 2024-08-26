
import { Command } from 'ckeditor5/src/core';

export default class InsertQuoteCommand extends Command {

  execute() {
    const { model } = this.editor;

    model.change((writer) => {
      model.insertContent(createQuote(writer));
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'quote',
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createQuote(writer) {
  const quote = writer.createElement('quote');
  const quoteTitle = writer.createElement('quoteTitle');


  writer.appendElement('paragraph', quoteTitle);

  writer.append(quoteTitle, quote);



  return quote;
}
