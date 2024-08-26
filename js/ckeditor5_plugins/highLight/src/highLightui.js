import { Plugin } from 'ckeditor5/src/core';
import {
  ButtonView,
  ContextualBalloon,
} from 'ckeditor5/src/ui';
import icon from '../../../../assets/icons/highlight.svg';

export default class HighLightUi extends Plugin {
  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    const editor = this.editor;
    const t = this.editor.t;

    editor.ui.componentFactory.add('highLight', (locale) => {
      const command = editor.commands.get('insertHighLight');
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t('Mise en Exergue'),
        icon,
        tooltip: true,
      });

      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      this.listenTo(buttonView, 'execute', () => editor.execute('insertHighLight'));

      return buttonView;
    });
  }
}
