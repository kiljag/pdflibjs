/**
 * Move Element Operation
 * Immutably moves elements within the PDFTree
 */

import { PDFTree } from '../models/PDFTree';

/**
 * Move an element from one index to another
 * @param tree - Current PDFTree
 * @param fromIndex - Current index of element
 * @param toIndex - Target index
 * @returns New PDFTree with element moved
 */
export function moveElement(tree: PDFTree, fromIndex: number, toIndex: number): PDFTree {
  if (
    fromIndex < 0 ||
    fromIndex >= tree.elements.length ||
    toIndex < 0 ||
    toIndex >= tree.elements.length ||
    fromIndex === toIndex
  ) {
    return tree;
  }

  const elements = [...tree.elements];
  const [element] = elements.splice(fromIndex, 1);
  elements.splice(toIndex, 0, element);

  return {
    ...tree,
    elements,
  };
}

/**
 * Move an element up by one position
 * @param tree - Current PDFTree
 * @param index - Current index of element
 * @returns New PDFTree with element moved up
 */
export function moveElementUp(tree: PDFTree, index: number): PDFTree {
  if (index <= 0) {
    return tree;
  }

  return moveElement(tree, index, index - 1);
}

/**
 * Move an element down by one position
 * @param tree - Current PDFTree
 * @param index - Current index of element
 * @returns New PDFTree with element moved down
 */
export function moveElementDown(tree: PDFTree, index: number): PDFTree {
  if (index >= tree.elements.length - 1) {
    return tree;
  }

  return moveElement(tree, index, index + 1);
}

/**
 * Move an element to the beginning
 * @param tree - Current PDFTree
 * @param index - Current index of element
 * @returns New PDFTree with element moved to start
 */
export function moveElementToStart(tree: PDFTree, index: number): PDFTree {
  return moveElement(tree, index, 0);
}

/**
 * Move an element to the end
 * @param tree - Current PDFTree
 * @param index - Current index of element
 * @returns New PDFTree with element moved to end
 */
export function moveElementToEnd(tree: PDFTree, index: number): PDFTree {
  return moveElement(tree, index, tree.elements.length - 1);
}
