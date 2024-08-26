import { isWidget } from 'ckeditor5/src/widget';

/**
 * Returns a ckeditor_badge widget editing view element if one is selected.
 *
 * @param {module:engine/view/selection~Selection|module:engine/view/documentselection~DocumentSelection} selection
 * @returns {module:engine/view/element~Element|null}
 */
export function getSelectedBadgeWidget(selection) {
  const viewElement = selection.getSelectedElement();

  if (viewElement && isBadgeWidget(viewElement)) {
    return viewElement;
  }

  return null;
}

/**
 * Returns a ckeditor_badge widget editing view element if one is among the selection's ancestors.
 *
 * @param {module:engine/view/selection~Selection|module:engine/view/documentselection~DocumentSelection} selection
 * @returns {module:engine/view/element~Element|null}
 */
export function getBadgeWidgetAncestor(selection) {
  const selectionPosition = selection.getFirstPosition();

  if (!selectionPosition) {
    return null;
  }

  let parent = selectionPosition.parent;
  while (parent) {
    if (parent.is('element') && isBadgeWidget(parent)) {
      return parent;
    }
    parent = parent.parent;
  }

  return null;
}

/**
 * Checks if a given view element is a ckeditor_badge widget.
 *
 * @param {module:engine/view/element~Element} viewElement
 * @returns {Boolean}
 */
function isBadgeWidget(viewElement) {
  return !!viewElement.hasClass('ckeditor-badge') && isWidget(viewElement);
}
