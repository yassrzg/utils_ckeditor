/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module utils_ckeditor/accordiontoolbar
 */

import { Plugin } from 'ckeditor5/src/core';
import { WidgetToolbarRepository } from 'ckeditor5/src/widget';
import { getSelectedCardWidget, getCardWidgetAncestor } from './utils/ui/widget';

/**
 * The accordion toolbar class. It creates toolbars for the accordion feature and its content (for now only for the accordion cell content).
 *
 * @extends module:core/plugin~Plugin
 */
export default class CardToolbar extends Plugin {
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
    return 'CardToolbar';
  }

  /**
   * @inheritDoc
   */
  afterInit() {
    const editor = this.editor;
    const t = editor.t;
    const widgetToolbarRepository = editor.plugins.get( WidgetToolbarRepository );

    const cardContentToolbarItems = editor.config.get( 'card.contentToolbar' );

    const cardToolbarItems = editor.config.get( 'card.tableToolbar' );

    if ( cardContentToolbarItems ) {
      widgetToolbarRepository.register( 'cardContent', {
        ariaLabel: t( 'Card toolbar' ),
        items: cardContentToolbarItems,
        getRelatedElement: getCardWidgetAncestor
      } );
    }

    if ( cardToolbarItems ) {
      widgetToolbarRepository.register( 'card', {
        ariaLabel: t( 'Card toolbar' ),
        items: cardToolbarItems,
        getRelatedElement: getSelectedCardWidget
      } );
    }
  }
}
