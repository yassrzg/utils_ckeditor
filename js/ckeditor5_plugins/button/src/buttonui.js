import { Plugin } from 'ckeditor5/src/core';
import {
  ButtonView,
  ContextualBalloon,
} from 'ckeditor5/src/ui';
import icon from '../../../../assets/icons/bouton.svg';

export default class ButtonUi extends Plugin {
  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    const editor = this.editor;
    const t = this.editor.t;

    editor.ui.componentFactory.add('button', (locale) => {
      const command = editor.commands.get('insertButton');
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t('Bouton'),
        icon,
        tooltip: true,
      });

      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      this.listenTo(buttonView, 'execute', () => editor.execute('insertButton'));

      return buttonView;
    });
  }
}
