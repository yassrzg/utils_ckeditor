import { Plugin } from 'ckeditor5/src/core';
import {
  ButtonView,
  ContextualBalloon,
} from 'ckeditor5/src/ui';
import icon from '../../../../assets/icons/c.svg';

export default class CalloutButtonUI extends Plugin {
  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    const editor = this.editor;
    const t = this.editor.t;

    editor.ui.componentFactory.add('calloutButton', (locale) => {
      const command = editor.commands.get('insertCalloutButton');
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t('Mise en avant avec bouton'),
        icon,
        tooltip: true,
      });

      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      this.listenTo(buttonView, 'execute', () => editor.execute('insertCalloutButton'));

      return buttonView;
    });
  }
}
