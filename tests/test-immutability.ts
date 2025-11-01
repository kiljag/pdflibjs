/**
 * Test Case 3: Immutability Verification
 * Verifies that all tree operations are truly immutable and don't mutate the original tree
 */

import * as Tree from '../src/tree';
import { TextBlock, TableBlock } from '../src';

// Helper function for assertions
function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (actual !== expected) {
    throw new Error(`Assertion failed: ${message}\nExpected: ${expected}\nActual: ${actual}`);
  }
}

function assertNotSame(obj1: any, obj2: any, message: string) {
  if (obj1 === obj2) {
    throw new Error(`Assertion failed: ${message} - Objects should not be the same reference`);
  }
}

console.log('='.repeat(60));
console.log('TEST CASE 3: Immutability Verification');
console.log('='.repeat(60));

// Test 1: addElement doesn't mutate original
console.log('\n[Test 3.1] addElement immutability');
const original1 = Tree.createPDFTree();
const originalElementCount = original1.elements.length;

const modified1 = Tree.addElement(original1, new TextBlock({ text: 'New element', style: { fontSize: 12 } }));

assertEqual(original1.elements.length, originalElementCount, 'Original tree elements should not change');
assertEqual(modified1.elements.length, originalElementCount + 1, 'Modified tree should have one more element');
assertNotSame(original1, modified1, 'Original and modified should be different objects');
assertNotSame(original1.elements, modified1.elements, 'Elements arrays should be different objects');

console.log('✓ addElement is immutable');

// Test 2: removeElement doesn't mutate original
console.log('\n[Test 3.2] removeElement immutability');
const original2 = Tree.createPDFTree();
const text1 = new TextBlock({ text: 'Element 1', style: { fontSize: 12 } });
const text2 = new TextBlock({ text: 'Element 2', style: { fontSize: 12 } });
const treeWith2Elements = Tree.addElements(original2, [text1, text2]);

const modified2 = Tree.removeElementAt(treeWith2Elements, 0);

assertEqual(treeWith2Elements.elements.length, 2, 'Original tree should still have 2 elements');
assertEqual(modified2.elements.length, 1, 'Modified tree should have 1 element');
assertNotSame(treeWith2Elements, modified2, 'Original and modified should be different objects');

console.log('✓ removeElement is immutable');

// Test 3: updateElement doesn't mutate original
console.log('\n[Test 3.3] updateElement immutability');
const original3 = Tree.createPDFTree();
const element = new TextBlock({ id: 'test-1', text: 'Original text', style: { fontSize: 12 } });
const treeWithElement = Tree.addElement(original3, element);

const modified3 = Tree.updateElementById(
  treeWithElement,
  'test-1',
  new TextBlock({ id: 'test-1', text: 'Modified text', style: { fontSize: 14 } })
);

assertEqual((treeWithElement.elements[0] as TextBlock).text, 'Original text', 'Original tree element should not change');
assertEqual((modified3.elements[0] as TextBlock).text, 'Modified text', 'Modified tree should have updated element');
assertNotSame(treeWithElement, modified3, 'Original and modified should be different objects');
assertNotSame(treeWithElement.elements, modified3.elements, 'Elements arrays should be different objects');

console.log('✓ updateElement is immutable');

// Test 4: moveElement doesn't mutate original
console.log('\n[Test 3.4] moveElement immutability');
const original4 = Tree.createPDFTree();
const treeWith3Elements = Tree.addElements(original4, [
  new TextBlock({ text: 'A', style: { fontSize: 12 } }),
  new TextBlock({ text: 'B', style: { fontSize: 12 } }),
  new TextBlock({ text: 'C', style: { fontSize: 12 } }),
]);

const modified4 = Tree.moveElement(treeWith3Elements, 0, 2);

assertEqual((treeWith3Elements.elements[0] as TextBlock).text, 'A', 'Original tree should not change');
assertEqual((treeWith3Elements.elements[2] as TextBlock).text, 'C', 'Original tree order should not change');
assertEqual((modified4.elements[0] as TextBlock).text, 'B', 'Modified tree should have new order');
assertEqual((modified4.elements[2] as TextBlock).text, 'A', 'Modified tree should have element moved');

console.log('✓ moveElement is immutable');

// Test 5: setMetadata doesn't mutate original
console.log('\n[Test 3.5] setMetadata immutability');
const original5 = Tree.createPDFTree({ metadata: { title: 'Original Title' } });
const modified5 = Tree.setMetadata(original5, { author: 'John Doe' });

assertEqual(original5.metadata.title, 'Original Title', 'Original metadata title should not change');
assert(original5.metadata.author === undefined, 'Original metadata should not have author');
assertEqual(modified5.metadata.title, 'Original Title', 'Modified tree should keep original title');
assertEqual(modified5.metadata.author, 'John Doe', 'Modified tree should have new author');
assertNotSame(original5, modified5, 'Original and modified should be different objects');
assertNotSame(original5.metadata, modified5.metadata, 'Metadata objects should be different');

console.log('✓ setMetadata is immutable');

// Test 6: setKeywords doesn't mutate original
console.log('\n[Test 3.6] setKeywords immutability');
const original6 = Tree.createPDFTree({ metadata: { keywords: ['pdf', 'test'] } });
const modified6 = Tree.addKeyword(original6, 'immutable');

assertEqual((original6.metadata.keywords || []).length, 2, 'Original keywords should not change');
assertEqual((modified6.metadata.keywords || []).length, 3, 'Modified should have 3 keywords');
assert(!(original6.metadata.keywords || []).includes('immutable'), 'Original should not have new keyword');
assert((modified6.metadata.keywords || []).includes('immutable'), 'Modified should have new keyword');

console.log('✓ setKeywords is immutable');

// Test 7: Page operations don't mutate original
console.log('\n[Test 3.7] Page operations immutability');
const original7 = Tree.createPDFTree();
const modified7 = Tree.addPage(original7, { size: 'Letter', margins: '48pt' });

assertEqual(original7.pages.length, 1, 'Original should still have 1 page');
assertEqual(modified7.pages.length, 2, 'Modified should have 2 pages');
assertNotSame(original7, modified7, 'Original and modified should be different objects');
assertNotSame(original7.pages, modified7.pages, 'Pages arrays should be different objects');

console.log('✓ Page operations are immutable');

// Test 8: Chained operations maintain immutability
console.log('\n[Test 3.8] Chained operations immutability');
const step0 = Tree.createPDFTree();
const step1 = Tree.setMetadata(step0, { title: 'Step 1' });
const step2 = Tree.addElement(step1, new TextBlock({ text: 'Element 1', style: { fontSize: 12 } }));
const step3 = Tree.addElement(step2, new TextBlock({ text: 'Element 2', style: { fontSize: 12 } }));
const step4 = Tree.setAuthor(step3, 'Author Name');

// Verify each step is independent
assertEqual(step0.elements.length, 0, 'Step 0 should have no elements');
assert(step0.metadata.title === undefined, 'Step 0 should have no title');

assertEqual(step1.elements.length, 0, 'Step 1 should have no elements');
assertEqual(step1.metadata.title, 'Step 1', 'Step 1 should have title');

assertEqual(step2.elements.length, 1, 'Step 2 should have 1 element');
assertEqual(step2.metadata.title, 'Step 1', 'Step 2 should still have title');

assertEqual(step3.elements.length, 2, 'Step 3 should have 2 elements');
assert(step3.metadata.author === undefined, 'Step 3 should not have author yet');

assertEqual(step4.elements.length, 2, 'Step 4 should have 2 elements');
assertEqual(step4.metadata.author, 'Author Name', 'Step 4 should have author');

// Verify all steps are different objects
assertNotSame(step0, step1, 'Step 0 and 1 should be different');
assertNotSame(step1, step2, 'Step 1 and 2 should be different');
assertNotSame(step2, step3, 'Step 2 and 3 should be different');
assertNotSame(step3, step4, 'Step 3 and 4 should be different');

console.log('✓ Chained operations maintain immutability');

// Test 9: Deep immutability - nested objects
console.log('\n[Test 3.9] Deep immutability');
const original9 = Tree.createPDFTree();
const table = new TableBlock({
  columns: [
    { key: 'item', width: '2fr' },
    { key: 'qty', width: '1fr', align: 'right' },
  ],
  rows: [
    { item: 'Notebook', qty: '2' },
    { item: 'Pencil', qty: '10' },
  ],
  tableStyle: { cellPadding: '4pt 6pt' },
});

const treeWithTable = Tree.addElement(original9, table);
const modified9 = Tree.updateElementAtWith(treeWithTable, 0, (el: any) => {
  const tbl = el as TableBlock;
  const newRows = tbl.rows.map((row, index) =>
    index === 0 ? { ...row, qty: '5' } : row
  );
  return new TableBlock({
    columns: tbl.columns,
    rows: newRows,
    tableStyle: tbl.tableStyle,
    style: tbl.style,
  });
});

// Original table should remain intact
const originalTable = treeWithTable.elements[0] as TableBlock;
assertEqual(originalTable.rows[0].qty, '2', 'Original table should retain original quantity');

// Modified table should reflect the update
const mutatedTable = modified9.elements[0] as TableBlock;
assertEqual(mutatedTable.rows[0].qty, '5', 'Modified table should have updated quantity');

console.log('✓ Deep immutability is maintained');

// Test 10: Snapshot pattern for undo/redo
console.log('\n[Test 3.10] Snapshot pattern (undo/redo simulation)');
const snapshots: typeof Tree.createPDFTree extends () => infer R ? R[] : never = [];

// Initial state
let currentTree = Tree.createPDFTree({ metadata: { title: 'Snapshot Test' } });
snapshots.push(currentTree);

// Action 1: Add element
currentTree = Tree.addElement(currentTree, new TextBlock({ text: 'Text 1', style: { fontSize: 12 } }));
snapshots.push(currentTree);

// Action 2: Add another element
currentTree = Tree.addElement(currentTree, new TextBlock({ text: 'Text 2', style: { fontSize: 12 } }));
snapshots.push(currentTree);

// Action 3: Update metadata
currentTree = Tree.setAuthor(currentTree, 'Author');
snapshots.push(currentTree);

// Verify we have 4 snapshots
assertEqual(snapshots.length, 4, 'Should have 4 snapshots');

// Undo to snapshot 2 (after first add)
currentTree = snapshots[1];
assertEqual(currentTree.elements.length, 1, 'After undo, should have 1 element');
assert(currentTree.metadata.author === undefined, 'After undo, should not have author');

// Undo to snapshot 0 (initial)
currentTree = snapshots[0];
assertEqual(currentTree.elements.length, 0, 'After undo to start, should have 0 elements');

// Redo to snapshot 3 (final)
currentTree = snapshots[3];
assertEqual(currentTree.elements.length, 2, 'After redo, should have 2 elements');
assertEqual(currentTree.metadata.author, 'Author', 'After redo, should have author');

console.log('✓ Snapshot pattern (undo/redo) works correctly');

console.log('\n' + '='.repeat(60));
console.log('✓ ALL IMMUTABILITY TESTS PASSED!');
console.log('✓ Tree operations are truly immutable');
console.log('✓ Perfect for Redux, time-travel debugging, and undo/redo');
console.log('='.repeat(60));
