
import VideoEditing from './videoediting';
import VideoUi from './videoui';
import { Plugin } from 'ckeditor5/src/core';

export default class Video extends Plugin {
  static get requires() {
    return [VideoEditing, VideoUi];
  }
}
