/**
 * @file registers the accordion toolbar button and binds functionality to it.
 */

import { Plugin } from 'ckeditor5/src/core';
import {
  ButtonView,
  ContextualBalloon,
} from 'ckeditor5/src/ui';
import icon from '../../../../assets/icons/card.svg';
import iconAddAbove from '../../../../assets/icons/ckeditor-accordion-add-above.svg';
import iconAddBelow from '../../../../assets/icons/ckeditor-accordion-add-below.svg';
import iconDelete from '../../../../assets/icons/ckeditor-accordion-remove.svg';

export default class CardUi extends Plugin {
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
    editor.ui.componentFactory.add('card', (locale) => {
      const command = editor.commands.get('insertCard');
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: t('Cartes Verticales'),
        icon,
        tooltip: true,
      });

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () =>
        editor.execute('insertCard'),
      );

      return buttonView;
    });


    editor.ui.componentFactory.add( 'cardAddBelow', (locale) => {
      const command = editor.commands.get('insertCardRowBelow');
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: t('Insérer une nouvelle carte'),
        iconAddBelow,
        tooltip: false,
        withText: true,
      });

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () =>
        editor.execute( 'insertCardRowBelow' ),
      );

      return buttonView;
    } );

    editor.ui.componentFactory.add( 'cardRemove', (locale) => {
      const command = editor.commands.get('deleteCardRow');
      const buttonView = new ButtonView(locale);

      // Create the toolbar button.
      buttonView.set({
        label: t('Supprimer une carte'),
        iconDelete,
        tooltip: false,
        withText: true,
      });

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () =>
        editor.execute('deleteCardRow'),
      );

      return buttonView;
    } );

  }

}
