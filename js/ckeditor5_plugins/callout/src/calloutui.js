import { Plugin } from 'ckeditor5/src/core';
import {
  ButtonView,
  ContextualBalloon,
} from 'ckeditor5/src/ui';
import icon from '../../../../assets/icons/c.svg';

export default class CalloutUi extends Plugin {
  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    const editor = this.editor;
    const t = this.editor.t;

    editor.ui.componentFactory.add('callout', (locale) => {
      const command = editor.commands.get('insertCallout');
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t('Mise en avant'),
        icon,
        tooltip: true,
      });

      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      this.listenTo(buttonView, 'execute', () => editor.execute('insertCallout'));

      return buttonView;
    });
  }
}
