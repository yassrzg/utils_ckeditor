/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module utils_ckeditor/accordiontoolbar
 */

import { Plugin } from 'ckeditor5/src/core';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import { getSelectedTabWidget, getTabWidgetAncestor } from './utils/ui/widget';

/**
 * The accordion toolbar class. It creates toolbars for the accordion feature and its content (for now only for the accordion cell content).
 *
 * @extends module:core/plugin~Plugin
 */
export default class TabToolbar extends Plugin {
  /**
   * @inheritDoc
   */
  static get requires() {
    return [ WidgetToolbarRepository ];
  }

  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'TabToolbar';
  }

  /**
   * @inheritDoc
   */
  afterInit() {
    const editor = this.editor;
    const t = editor.t;
    const widgetToolbarRepository = editor.plugins.get( WidgetToolbarRepository );

    const tabContentToolbarItems = editor.config.get( 'tab.contentToolbar' );

    const tabToolbarItems = editor.config.get( 'tab.tableToolbar' );

    if ( tabContentToolbarItems ) {
      widgetToolbarRepository.register( 'tabContent', {
        ariaLabel: t( 'Tab toolbar' ),
        items: tabContentToolbarItems,
        getRelatedElement: getTabWidgetAncestor
      } );
    }

    if ( tabToolbarItems ) {
      widgetToolbarRepository.register( 'tab', {
        ariaLabel: t( 'Tab toolbar' ),
        items: tabToolbarItems,
        getRelatedElement: getSelectedTabWidget
      } );
    }
  }
}
