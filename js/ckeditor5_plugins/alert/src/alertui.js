import { Plugin } from 'ckeditor5/src/core';
import {
  Model,
  createDropdown,
  addListToDropdown,
  ButtonView,
  addToolbarToDropdown,
  ContextualBalloon,
} from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';
import icon from '../../../../assets/icons/alert.svg';

export default class AlertUi extends Plugin {
  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    const editor = this.editor;
    const componentFactory = editor.ui.componentFactory;
    const t = this.editor.t;
    const options = editor.config.get('alert.options');

    // Prepare alert buttons
    options.forEach(optionGroup => {
      this._addButton(optionGroup);
    });

    componentFactory.add('alert', locale => {
      const dropdownView = createDropdown(locale);
      const insertAlertCommand = editor.commands.get('insertAlert');

      // The entire dropdown will be disabled together with the command
      dropdownView.bind('isEnabled').to(insertAlertCommand);

      // Add existing alert buttons to dropdown's toolbar
      const buttons = [];
      options.forEach(optionGroup => {
        buttons.push(componentFactory.create(`Alert:${optionGroup.id}`));
      });

      addToolbarToDropdown(dropdownView, buttons, {
        enableActiveItemFocusOnDropdownOpen: false,
        isVertical: true,
        ariaLabel: t('Alert options')
      });

      // Configure dropdown properties and behavior
      dropdownView.buttonView.set({
        label: t('Alert'),
        icon,
        withText: true,
        tooltip: true,
      });

      // Apply custom class styling based on command state
      dropdownView.bind('class').to(insertAlertCommand, 'value', value => {
        const classes = ['ck-alert-dropdown'];
        if (value) {
          classes.push('ck-alert-dropdown-active');
        }
        return classes.join(' ');
      });

      // Execute command when an option is selected
      this.listenTo(dropdownView, 'execute', evt => {
        editor.execute(evt.source.commandName, evt.source.commandParam);
        editor.editing.view.focus();
      });

      return dropdownView;
    });
  }

  _addButton(optionGroup) {
    const editor = this.editor;
    const componentFactory = editor.ui.componentFactory;

    componentFactory.add(`Alert:${optionGroup.id}`, locale => {
      const itemDefinitions = new Collection();
      const insertAlertCommand = editor.commands.get('insertAlert');

      // Loop on each option within the group
      optionGroup.options.forEach(option => {
        const itemModel = new Model({
          commandName: 'insertAlert',
          commandParam: {
            type: option.type,
            size: option.size,
            title: option.title,
          },
          label: option.name,
          withText: true,
        });

        // Bind the isOn state to the command value
        itemModel.bind('isOn').to(insertAlertCommand, 'value', value => {
          return value && value.type === option.type && value.size === option.size;
        });

        itemDefinitions.add({
          type: 'button',
          model: itemModel,
        });
      });

      // Create dropdown for each option group
      const dropdownView = createDropdown(locale);
      addListToDropdown(dropdownView, itemDefinitions);

      dropdownView.buttonView.set({
        label: optionGroup.label,
        withText: true,
      });

      // Apply custom class styling
      dropdownView.bind('class').to(insertAlertCommand, 'value', value => {
        const classes = ['ck-alert-option-group-dropdown'];
        if (value && value.type === optionGroup.id) {
          classes.push('ck-alert-option-group-dropdown-active');
        }
        return classes.join(' ');
      });

      return dropdownView;
    });
  }
}
