/**
 * Update Element Operation
 * Immutably updates an element in the PDFTree
 */

import { PDFTree, AnyBlock } from '../models/PDFTree';

/**
 * Update an element at a specific index
 * @param tree - Current PDFTree
 * @param index - Index of element to update
 * @param element - New element
 * @returns New PDFTree with element updated
 */
export function updateElementAt(tree: PDFTree, index: number, element: AnyBlock): PDFTree {
  if (index < 0 || index >= tree.elements.length) {
    return tree;
  }

  const elements = [...tree.elements];
  elements[index] = element;

  return {
    ...tree,
    elements,
  };
}

/**
 * Update an element by ID
 * @param tree - Current PDFTree
 * @param id - ID of element to update
 * @param element - New element
 * @returns New PDFTree with element updated
 */
export function updateElementById(tree: PDFTree, id: string, element: AnyBlock): PDFTree {
  return {
    ...tree,
    elements: tree.elements.map(el => (el.id === id ? element : el)),
  };
}

/**
 * Update an element using a function
 * @param tree - Current PDFTree
 * @param index - Index of element to update
 * @param updateFn - Function that receives current element and returns updated element
 * @returns New PDFTree with element updated
 */
export function updateElementAtWith(
  tree: PDFTree,
  index: number,
  updateFn: (element: AnyBlock) => AnyBlock
): PDFTree {
  if (index < 0 || index >= tree.elements.length) {
    return tree;
  }

  const elements = [...tree.elements];
  elements[index] = updateFn(elements[index]);

  return {
    ...tree,
    elements,
  };
}

/**
 * Update an element by ID using a function
 * @param tree - Current PDFTree
 * @param id - ID of element to update
 * @param updateFn - Function that receives current element and returns updated element
 * @returns New PDFTree with element updated
 */
export function updateElementByIdWith(
  tree: PDFTree,
  id: string,
  updateFn: (element: AnyBlock) => AnyBlock
): PDFTree {
  return {
    ...tree,
    elements: tree.elements.map(el => (el.id === id ? updateFn(el) : el)),
  };
}
