import { Command } from 'ckeditor5/src/core';

export default class InsertAlertCommand extends Command {
  execute({ type, size, title }) {
    const { model } = this.editor;

    model.change((writer) => {
      model.insertContent(createAlert(writer, { type, size, title }));
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'alert',
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createAlert(writer, { type, size, title }) {
  // Créez l'élément 'alert' avec les attributs spécifiés
  const alert = writer.createElement('alert', {
    'data-type': type,
    'data-size': size ,
    'data-title': title,
  });

  // Si un titre est spécifié, ajoutez un élément 'alertTitle'
  if (title) {
    const alertTitle = writer.createElement('alertTitle');
    writer.appendElement('paragraph', alertTitle);
    writer.append(alertTitle, alert);
  }

  // Ajoutez l'élément 'alertContent' pour le contenu de l'alerte
  const alertContent = writer.createElement('alertContent');
  writer.appendElement('paragraph', alertContent);

  writer.append(alertContent, alert);

  return alert;
}
