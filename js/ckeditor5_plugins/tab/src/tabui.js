/**
 * @file registers the accordion toolbar button and binds functionality to it.
 */

import { Plugin } from 'ckeditor5/src/core';
import {
  ButtonView,
  ContextualBalloon,
} from 'ckeditor5/src/ui';
import icon from '../../../../assets/icons/tab.svg';
import iconAddAbove from '../../../../assets/icons/ckeditor-accordion-add-above.svg';
import iconAddBelow from '../../../../assets/icons/ckeditor-accordion-add-below.svg';
import iconDelete from '../../../../assets/icons/ckeditor-accordion-remove.svg';

export default class TabUi extends Plugin {
  /**
   * @inheritdoc
   */
  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    const editor = this.editor;
    const t = this.editor.t;

    // This will register the accordion toolbar button.
    editor.ui.componentFactory.add('tab', (locale) => {
      const command = editor.commands.get('insertTab');
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: t('Onglet'),
        icon,
        tooltip: true,
      });

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () =>
        editor.execute('insertTab'),
      );

      return buttonView;
    });


    editor.ui.componentFactory.add( 'tabAddBelow', (locale) => {
      const command = editor.commands.get('insertTabRowBelow');
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: t('Insérer un nouvel onglet '),
        iconAddBelow,
        tooltip: false,
        withText: true,
      });

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () =>
        editor.execute( 'insertTabRowBelow' ),
      );

      return buttonView;
    } );

    editor.ui.componentFactory.add( 'tabRemove', (locale) => {
      const command = editor.commands.get('deleteTabRow');
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: t('Supprimer un onglet'),
        iconDelete,
        tooltip: false,
        withText: true,
      });

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () =>
        editor.execute('deleteTabRow'),
      );

      return buttonView;
    } );

  }

}
