/**
 * Query Operations
 * Non-mutating operations for querying the PDFTree
 */

import { PDFTree, AnyBlock } from '../models/PDFTree';

/**
 * Find an element by ID
 * @param tree - PDFTree to query
 * @param id - Element ID
 * @returns Element if found, undefined otherwise
 */
export function findElementById(tree: PDFTree, id: string): AnyBlock | undefined {
  return tree.elements.find(el => el.id === id);
}

/**
 * Find element index by ID
 * @param tree - PDFTree to query
 * @param id - Element ID
 * @returns Element index if found, -1 otherwise
 */
export function findElementIndexById(tree: PDFTree, id: string): number {
  return tree.elements.findIndex(el => el.id === id);
}

/**
 * Find element index by reference
 * @param tree - PDFTree to query
 * @param element - Element to find
 * @returns Element index if found, -1 otherwise
 */
export function findElementIndex(tree: PDFTree, element: AnyBlock): number {
  return tree.elements.indexOf(element);
}

/**
 * Find all elements of a specific type
 * @param tree - PDFTree to query
 * @param type - Element type
 * @returns Array of matching elements
 */
export function findElementsByType(tree: PDFTree, type: string): AnyBlock[] {
  return tree.elements.filter(el => el.type === type);
}

/**
 * Find elements matching a predicate
 * @param tree - PDFTree to query
 * @param predicate - Function to test elements
 * @returns Array of matching elements
 */
export function findElements(
  tree: PDFTree,
  predicate: (element: AnyBlock) => boolean
): AnyBlock[] {
  return tree.elements.filter(predicate);
}

/**
 * Get element at index
 * @param tree - PDFTree to query
 * @param index - Element index
 * @returns Element at index if exists, undefined otherwise
 */
export function getElementAt(tree: PDFTree, index: number): AnyBlock | undefined {
  return tree.elements[index];
}

/**
 * Get total number of elements
 * @param tree - PDFTree to query
 * @returns Number of elements
 */
export function getElementCount(tree: PDFTree): number {
  return tree.elements.length;
}

/**
 * Get total number of pages
 * @param tree - PDFTree to query
 * @returns Number of pages
 */
export function getPageCount(tree: PDFTree): number {
  return tree.pages.length;
}

/**
 * Get page at index
 * @param tree - PDFTree to query
 * @param index - Page index
 * @returns Page configuration if exists, undefined otherwise
 */
export function getPageAt(tree: PDFTree, index: number) {
  return tree.pages[index];
}

/**
 * Check if tree has elements
 * @param tree - PDFTree to query
 * @returns True if tree has elements, false otherwise
 */
export function hasElements(tree: PDFTree): boolean {
  return tree.elements.length > 0;
}

/**
 * Check if element exists by ID
 * @param tree - PDFTree to query
 * @param id - Element ID
 * @returns True if element exists, false otherwise
 */
export function hasElementById(tree: PDFTree, id: string): boolean {
  return tree.elements.some(el => el.id === id);
}
