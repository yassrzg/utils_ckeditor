
import { Command } from 'ckeditor5/src/core';

export default class InsertVideoCommand extends Command {

  execute() {
    const { model } = this.editor;

    model.change((writer) => {
      model.insertContent(createVideo(writer));
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'video',
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createVideo(writer) {
  const video = writer.createElement('video');
  const videoLink = writer.createElement('videoLink');
  const videoTitleSource = writer.createElement('videoTitleSource');
  const videoSource = writer.createElement('videoSource');

  writer.appendElement('paragraph', videoLink);
  writer.appendElement('paragraph', videoTitleSource);
  writer.appendElement('paragraph', videoSource);

  writer.append(videoLink, video);
  writer.append(videoTitleSource, video);
  writer.append(videoSource, video);


  return video;
}
