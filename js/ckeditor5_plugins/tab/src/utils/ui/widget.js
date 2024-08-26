/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module utils_ckeditor/utils/ui/widget
 */

import { isWidget } from 'ckeditor5/src/widget';

/**
 * Returns a ckeditor_tab widget editing view element if one is selected.
 *
 * @param {module:engine/view/selection~Selection|module:engine/view/documentselection~DocumentSelection} selection
 * @returns {module:engine/view/element~Element|null}
 */
export function getSelectedTabWidget( selection ) {
  const viewElement = selection.getSelectedElement();

  if ( viewElement && isTabWidget( viewElement ) ) {
    return viewElement;
  }

  return null;
}

/**
 * Returns a ckeditor_tab widget editing view element if one is among the selection's ancestors.
 *
 * @param {module:engine/view/selection~Selection|module:engine/view/documentselection~DocumentSelection} selection
 * @returns {module:engine/view/element~Element|null}
 */
export function getTabWidgetAncestor( selection ) {
  const selectionPosition = selection.getFirstPosition();

  if ( !selectionPosition ) {
    return null;
  }

  let parent = selectionPosition.parent;
  while ( parent ) {
    if ( parent.is( 'element' ) && isTabWidget( parent ) ) {

      return parent;
    }

    parent = parent.parent;
  }

  return null;
}

// Checks if a given view element is a ckeditor_tab widget.
//
// @param {module:engine/view/element~Element} viewElement
// @returns {Boolean}
function isTabWidget( viewElement ) {
  return !!viewElement.hasClass( 'ckeditor-tab' ) && isWidget( viewElement );
}
