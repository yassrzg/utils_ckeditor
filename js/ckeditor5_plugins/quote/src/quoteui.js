import { Plugin } from 'ckeditor5/src/core';
import {
  ButtonView,
  ContextualBalloon,
} from 'ckeditor5/src/ui';
import icon from '../../../../assets/icons/quote.svg';

export default class QuoteUi extends Plugin {
  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    const editor = this.editor;
    const t = this.editor.t;

    editor.ui.componentFactory.add('quote', (locale) => {
      const command = editor.commands.get('insertQuote');
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t('Quote Sans Image'),
        icon,
        tooltip: true,
      });

      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      this.listenTo(buttonView, 'execute', () => editor.execute('insertQuote'));

      return buttonView;
    });
  }
}
