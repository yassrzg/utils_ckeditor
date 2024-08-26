/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module utils_ckeditor/accordiontoolbar
 */

import { Plugin } from 'ckeditor5/src/core';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import { getSelectedBadgeWidget, getBadgeWidgetAncestor } from './utils/ui/widget';

/**
 * The accordion toolbar class. It creates toolbars for the accordion feature and its content (for now only for the accordion cell content).
 *
 * @extends module:core/plugin~Plugin
 */
export default class BadgeToolbar extends Plugin {
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
    return 'BadgeToolbar';
  }

  /**
   * @inheritDoc
   */
  afterInit() {
    const editor = this.editor;
    const t = editor.t;
    const widgetToolbarRepository = editor.plugins.get( WidgetToolbarRepository );

    const badgeContentToolbarItems = editor.config.get( 'badge.contentToolbar' );

    const badgeToolbarItems = editor.config.get( 'badge.tableToolbar' );

    if ( badgeContentToolbarItems ) {
      widgetToolbarRepository.register( 'badgeContent', {
        ariaLabel: t( 'Badge toolbar' ),
        items: badgeContentToolbarItems,
        getRelatedElement: getBadgeWidgetAncestor
      } );
    }

    if ( badgeToolbarItems ) {
      widgetToolbarRepository.register( 'badge', {
        ariaLabel: t( 'Badge toolbar' ),
        items: badgeToolbarItems,
        getRelatedElement: getSelectedBadgeWidget
      } );
    }
  }
}
