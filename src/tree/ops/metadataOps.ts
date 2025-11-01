/**
 * Metadata Operations
 * Immutably manages document metadata in the PDFTree
 */

import { PDFTree, DocumentMetadata } from '../models/PDFTree';

/**
 * Set document metadata (merge with existing)
 * @param tree - Current PDFTree
 * @param metadata - Metadata to merge
 * @returns New PDFTree with metadata updated
 */
export function setMetadata(tree: PDFTree, metadata: Partial<DocumentMetadata>): PDFTree {
  return {
    ...tree,
    metadata: {
      ...tree.metadata,
      ...metadata,
    },
  };
}

/**
 * Replace all metadata
 * @param tree - Current PDFTree
 * @param metadata - New metadata
 * @returns New PDFTree with metadata replaced
 */
export function replaceMetadata(tree: PDFTree, metadata: DocumentMetadata): PDFTree {
  return {
    ...tree,
    metadata,
  };
}

/**
 * Set document title
 * @param tree - Current PDFTree
 * @param title - Document title
 * @returns New PDFTree with title set
 */
export function setTitle(tree: PDFTree, title: string): PDFTree {
  return setMetadata(tree, { title });
}

/**
 * Set document author
 * @param tree - Current PDFTree
 * @param author - Document author
 * @returns New PDFTree with author set
 */
export function setAuthor(tree: PDFTree, author: string): PDFTree {
  return setMetadata(tree, { author });
}

/**
 * Set document subject
 * @param tree - Current PDFTree
 * @param subject - Document subject
 * @returns New PDFTree with subject set
 */
export function setSubject(tree: PDFTree, subject: string): PDFTree {
  return setMetadata(tree, { subject });
}

/**
 * Set document keywords
 * @param tree - Current PDFTree
 * @param keywords - Document keywords
 * @returns New PDFTree with keywords set
 */
export function setKeywords(tree: PDFTree, keywords: string[]): PDFTree {
  return setMetadata(tree, { keywords });
}

/**
 * Add a keyword to the document
 * @param tree - Current PDFTree
 * @param keyword - Keyword to add
 * @returns New PDFTree with keyword added
 */
export function addKeyword(tree: PDFTree, keyword: string): PDFTree {
  const currentKeywords = tree.metadata.keywords || [];

  return setMetadata(tree, {
    keywords: [...currentKeywords, keyword],
  });
}

/**
 * Remove a keyword from the document
 * @param tree - Current PDFTree
 * @param keyword - Keyword to remove
 * @returns New PDFTree with keyword removed
 */
export function removeKeyword(tree: PDFTree, keyword: string): PDFTree {
  const currentKeywords = tree.metadata.keywords || [];

  return setMetadata(tree, {
    keywords: currentKeywords.filter(k => k !== keyword),
  });
}

/**
 * Set document creator
 * @param tree - Current PDFTree
 * @param creator - Document creator
 * @returns New PDFTree with creator set
 */
export function setCreator(tree: PDFTree, creator: string): PDFTree {
  return setMetadata(tree, { creator });
}

/**
 * Clear all metadata
 * @param tree - Current PDFTree
 * @returns New PDFTree with metadata cleared
 */
export function clearMetadata(tree: PDFTree): PDFTree {
  return {
    ...tree,
    metadata: {},
  };
}
