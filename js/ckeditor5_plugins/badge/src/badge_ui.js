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
import icon from '../../../../assets/icons/badge.svg';
import iconAddBelow from '../../../../assets/icons/ckeditor-accordion-add-below.svg';
import iconDelete from '../../../../assets/icons/ckeditor-accordion-remove.svg';

export default class BadgeUi extends Plugin {
  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    const editor = this.editor;
    const componentFactory = editor.ui.componentFactory;
    const t = this.editor.t;
    const options = editor.config.get('badge.options');

    // Prepare badge buttons
    options.forEach(optionGroup => {
      this._addButton(optionGroup);
    });

    componentFactory.add('badge', locale => {
      const dropdownView = createDropdown(locale);
      const insertBadgeCommand = editor.commands.get('insertBadge');

      // The entire dropdown will be disabled together with the command
      dropdownView.bind('isEnabled').to(insertBadgeCommand);

      // Add existing badge buttons to dropdown's toolbar
      const buttons = [];
      options.forEach(optionGroup => {
        buttons.push(componentFactory.create(`Badge:${optionGroup.id}`));
      });

      addToolbarToDropdown(dropdownView, buttons, {
        enableActiveItemFocusOnDropdownOpen: false,
        isVertical: true,
        ariaLabel: t('Badge options')
      });

      // Configure dropdown properties and behavior
      dropdownView.buttonView.set({
        label: t('Badge'),
        icon,
        withText: true,
        tooltip: true,
      });

      // Apply custom class styling based on command state
      dropdownView.bind('class').to(insertBadgeCommand, 'value', value => {
        const classes = ['ck-badge-dropdown'];
        if (value) {
          classes.push('ck-badge-dropdown-active');
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



    // Add button to insert a badge row below
    componentFactory.add('badgeAddBelow', locale => {
      const command = editor.commands.get('insertBadgeRowBelow');
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t('Ajouter un badge en-dessous'),
        icon: iconAddBelow,
        tooltip: false,
        withText: true,
      });

      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      this.listenTo(buttonView, 'execute', () => {
        editor.execute('insertBadgeRowBelow');
      });

      return buttonView;
    });

    // Add button to delete a badge row
    componentFactory.add('badgeRemove', locale => {
      const command = editor.commands.get('deleteBadgeRow');
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t('Supprimer le badge'),
        icon: iconDelete,
        tooltip: false,
        withText: true,
      });

      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      this.listenTo(buttonView, 'execute', () => {
        editor.execute('deleteBadgeRow');
      });

      return buttonView;
    });
  }

  _addButton(optionGroup) {
    const editor = this.editor;
    const componentFactory = editor.ui.componentFactory;

    componentFactory.add(`Badge:${optionGroup.id}`, locale => {
      const itemDefinitions = new Collection();
      const insertBadgeCommand = editor.commands.get('insertBadge');

      // Loop on each option within the group
      optionGroup.options.forEach(option => {
        const itemModel = new Model({
          commandName: 'insertBadge',
          commandParam: {
            type: option.type,
            size: option.size,
            haveIcon: option.haveIcon,
          },
          label: option.name,
          withText: true,
        });

        // Bind the isOn state to the command value
        itemModel.bind('isOn').to(insertBadgeCommand, 'value', value => {
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
      dropdownView.bind('class').to(insertBadgeCommand, 'value', value => {
        const classes = ['ck-badge-option-group-dropdown'];
        if (value && value.type === optionGroup.id) {
          classes.push('ck-badge-option-group-dropdown-active');
        }
        return classes.join(' ');
      });

      return dropdownView;
    });
  }
}
