import { Command } from 'ckeditor5/src/core';

export default class InsertBadgeCommand extends Command {
  execute({ type, size, haveIcon }) {
    const { model } = this.editor;

    model.change((writer) => {
      model.insertContent(createBadge(writer, { type, size, haveIcon }));
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'badge',
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createBadge(writer, { type, size, haveIcon }) {

  const badge = writer.createElement('badge', {
    'data-type': type,
    'data-size': size,
    'data-icon': haveIcon,
  });


  const badgeContent = writer.createElement('badgeContent');
  writer.appendElement('paragraph', badgeContent);

  writer.append(badgeContent, badge);

  return badge;
}
