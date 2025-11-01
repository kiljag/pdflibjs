/**
 * Add Element Operation
 * Immutably adds an element to the PDFTree
 */

import { PDFTree, AnyBlock } from '../models/PDFTree';

/**
 * Add an element to the end of the elements array
 * @param tree - Current PDFTree
 * @param element - Element to add
 * @returns New PDFTree with element added
 */
export function addElement(tree: PDFTree, element: AnyBlock): PDFTree {
  return {
    ...tree,
    elements: [...tree.elements, element],
  };
}

/**
 * Add an element at a specific index
 * @param tree - Current PDFTree
 * @param element - Element to add
 * @param index - Index to insert at
 * @returns New PDFTree with element added
 */
export function addElementAt(tree: PDFTree, element: AnyBlock, index: number): PDFTree {
  const elements = [...tree.elements];
  elements.splice(index, 0, element);

  return {
    ...tree,
    elements,
  };
}

/**
 * Add multiple elements to the tree
 * @param tree - Current PDFTree
 * @param elements - Elements to add
 * @returns New PDFTree with elements added
 */
export function addElements(tree: PDFTree, elements: AnyBlock[]): PDFTree {
  return {
    ...tree,
    elements: [...tree.elements, ...elements],
  };
}
