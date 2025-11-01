/**
 * Remove Element Operation
 * Immutably removes an element from the PDFTree
 */

import { PDFTree } from '../models/PDFTree';
import { Block } from '../../blocks/models/Block';

/**
 * Remove an element by index
 * @param tree - Current PDFTree
 * @param index - Index of element to remove
 * @returns New PDFTree with element removed
 */
export function removeElementAt(tree: PDFTree, index: number): PDFTree {
  if (index < 0 || index >= tree.elements.length) {
    return tree;
  }

  return {
    ...tree,
    elements: tree.elements.filter((_, i) => i !== index),
  };
}

/**
 * Remove an element by reference
 * @param tree - Current PDFTree
 * @param element - Element to remove
 * @returns New PDFTree with element removed
 */
export function removeElement(tree: PDFTree, element: Block): PDFTree {
  return {
    ...tree,
    elements: tree.elements.filter(el => el !== element),
  };
}

/**
 * Remove an element by ID
 * @param tree - Current PDFTree
 * @param id - ID of element to remove
 * @returns New PDFTree with element removed
 */
export function removeElementById(tree: PDFTree, id: string): PDFTree {
  return {
    ...tree,
    elements: tree.elements.filter(el => el.id !== id),
  };
}

/**
 * Remove all elements
 * @param tree - Current PDFTree
 * @returns New PDFTree with all elements removed
 */
export function clearElements(tree: PDFTree): PDFTree {
  return {
    ...tree,
    elements: [],
  };
}
