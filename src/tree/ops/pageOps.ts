/**
 * Page Operations
 * Immutably manages pages in the PDFTree
 */

import { PDFTree, PageConfig } from '../models/PDFTree';

/**
 * Add a page to the document
 * @param tree - Current PDFTree
 * @param page - Page configuration
 * @returns New PDFTree with page added
 */
export function addPage(tree: PDFTree, page: PageConfig): PDFTree {
  return {
    ...tree,
    pages: [...tree.pages, page],
  };
}

/**
 * Add a page at a specific index
 * @param tree - Current PDFTree
 * @param page - Page configuration
 * @param index - Index to insert at
 * @returns New PDFTree with page added
 */
export function addPageAt(tree: PDFTree, page: PageConfig, index: number): PDFTree {
  const pages = [...tree.pages];
  pages.splice(index, 0, page);

  return {
    ...tree,
    pages,
  };
}

/**
 * Remove a page by index
 * @param tree - Current PDFTree
 * @param index - Index of page to remove
 * @returns New PDFTree with page removed
 */
export function removePageAt(tree: PDFTree, index: number): PDFTree {
  if (index < 0 || index >= tree.pages.length) {
    return tree;
  }

  return {
    ...tree,
    pages: tree.pages.filter((_, i) => i !== index),
  };
}

/**
 * Update a page configuration
 * @param tree - Current PDFTree
 * @param index - Index of page to update
 * @param page - New page configuration
 * @returns New PDFTree with page updated
 */
export function updatePageAt(tree: PDFTree, index: number, page: PageConfig): PDFTree {
  if (index < 0 || index >= tree.pages.length) {
    return tree;
  }

  const pages = [...tree.pages];
  pages[index] = page;

  return {
    ...tree,
    pages,
  };
}

/**
 * Update a page configuration using a function
 * @param tree - Current PDFTree
 * @param index - Index of page to update
 * @param updateFn - Function that receives current page and returns updated page
 * @returns New PDFTree with page updated
 */
export function updatePageAtWith(
  tree: PDFTree,
  index: number,
  updateFn: (page: PageConfig) => PageConfig
): PDFTree {
  if (index < 0 || index >= tree.pages.length) {
    return tree;
  }

  const pages = [...tree.pages];
  pages[index] = updateFn(pages[index]);

  return {
    ...tree,
    pages,
  };
}

/**
 * Set all pages (replace all existing pages)
 * @param tree - Current PDFTree
 * @param pages - New pages array
 * @returns New PDFTree with pages replaced
 */
export function setPages(tree: PDFTree, pages: PageConfig[]): PDFTree {
  return {
    ...tree,
    pages,
  };
}
