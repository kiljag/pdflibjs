/**
 * Element Operations Tests
 * Tests add, remove, update, and move operations on PDFTree elements
 */

import * as Tree from '../../src/tree';
import { createTextBlock } from '../../src/blocks/ops/textBlockOps';
import { TextBlock } from '../../src/blocks/models/TextBlock';

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

console.log('='.repeat(60));
console.log('TEST: Element Operations');
console.log('='.repeat(60));

// Test 1: addElement and addElements
console.log('\n[Test 1] addElement and addElements');
let tree = Tree.createPDFTree({
  metadata: { title: 'Element Operations Test' }
});

const text1 = createTextBlock({ text: 'First element', style: { fontSize: 12 } });
const text2 = createTextBlock({ text: 'Second element', style: { fontSize: 14 } });
const text3 = createTextBlock({ text: 'Third element', style: { fontSize: 16 } });

tree = Tree.addElement(tree, text1);
assertEqual(tree.elements.length, 1, 'Should have 1 element after addElement');

tree = Tree.addElements(tree, [text2, text3]);
assertEqual(tree.elements.length, 3, 'Should have 3 elements after addElements');

console.log('✓ addElement and addElements work correctly');

// Test 2: addElementAt
console.log('\n[Test 2] addElementAt');
const text0 = createTextBlock({ text: 'Zeroth element', style: { fontSize: 10 } });
tree = Tree.addElementAt(tree, text0, 0);

assertEqual(tree.elements.length, 4, 'Should have 4 elements after addElementAt');
assertEqual((tree.elements[0] as TextBlock).text, 'Zeroth element', 'First element should be the one we inserted');
assertEqual((tree.elements[1] as TextBlock).text, 'First element', 'Second element should be shifted down');

console.log('✓ addElementAt works correctly');

// Test 3: removeElement, removeElementAt, removeElementById
console.log('\n[Test 3] removeElement, removeElementAt, removeElementById');
tree = Tree.removeElementAt(tree, 0);
assertEqual(tree.elements.length, 3, 'Should have 3 elements after removeElementAt');
assertEqual((tree.elements[0] as TextBlock).text, 'First element', 'First element should be back at index 0');

tree = Tree.removeElement(tree, text1);
assertEqual(tree.elements.length, 2, 'Should have 2 elements after removeElement');

// Add an element with ID
const textWithId = createTextBlock({ id: 'test-123', text: 'Element with ID', style: { fontSize: 12 } });
tree = Tree.addElement(tree, textWithId);
assertEqual(tree.elements.length, 3, 'Should have 3 elements after adding element with ID');

tree = Tree.removeElementById(tree, 'test-123');
assertEqual(tree.elements.length, 2, 'Should have 2 elements after removeElementById');

console.log('✓ removeElement, removeElementAt, removeElementById work correctly');

// Test 4: clearElements
console.log('\n[Test 4] clearElements');
tree = Tree.clearElements(tree);
assertEqual(tree.elements.length, 0, 'Should have 0 elements after clearElements');

console.log('✓ clearElements works correctly');

// Test 5: updateElementAt and updateElementById
console.log('\n[Test 5] updateElementAt and updateElementById');
tree = Tree.addElements(tree, [
  createTextBlock({ id: 'elem-1', text: 'Element 1', style: { fontSize: 12 } }),
  createTextBlock({ id: 'elem-2', text: 'Element 2', style: { fontSize: 14 } }),
  createTextBlock({ id: 'elem-3', text: 'Element 3', style: { fontSize: 16 } }),
]);

const updatedText = createTextBlock({ text: 'Updated Element', style: { fontSize: 20 } });
tree = Tree.updateElementAt(tree, 1, updatedText);
assertEqual((tree.elements[1] as TextBlock).text, 'Updated Element', 'Element at index 1 should be updated');
assertEqual((tree.elements[1] as TextBlock).style?.fontSize, 20, 'Font size should be 20');

const updatedById = createTextBlock({ id: 'elem-3', text: 'Updated by ID', style: { fontSize: 18 } });
tree = Tree.updateElementById(tree, 'elem-3', updatedById);
assertEqual((tree.elements[2] as TextBlock).text, 'Updated by ID', 'Element with ID elem-3 should be updated');

console.log('✓ updateElementAt and updateElementById work correctly');

// Test 6: updateElementAtWith and updateElementByIdWith
console.log('\n[Test 6] updateElementAtWith and updateElementByIdWith');
tree = Tree.updateElementAtWith(tree, 0, (elem) => {
  return { ...elem, text: 'Modified with function' } as TextBlock;
});
assertEqual((tree.elements[0] as TextBlock).text, 'Modified with function', 'Element should be updated with function');

tree = Tree.updateElementByIdWith(tree, 'elem-3', (elem) => {
  const textElem = elem as TextBlock;
  return { ...textElem, text: 'Modified by ID with function' };
});
assertEqual((tree.elements[2] as TextBlock).text, 'Modified by ID with function', 'Element should be updated by ID with function');

console.log('✓ updateElementAtWith and updateElementByIdWith work correctly');

// Test 7: moveElement
console.log('\n[Test 7] moveElement');
const elemAtZero = tree.elements[0];
tree = Tree.moveElement(tree, 0, 2);
assertEqual(tree.elements[2], elemAtZero, 'Element should be moved from index 0 to 2');

console.log('✓ moveElement works correctly');

console.log('\n' + '='.repeat(60));
console.log('✓ All element operation tests passed!');
console.log('='.repeat(60));
