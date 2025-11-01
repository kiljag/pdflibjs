/**
 * Test Case 1: Element Operations
 * Tests add, remove, update, and move operations on PDFTree
 */

import * as Tree from '../src/tree';
import { TextBlock, ImageBlock, TextBlockStyle } from '../src';

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
console.log('TEST CASE 1: Element Operations');
console.log('='.repeat(60));

// Test 1: addElement and addElements
console.log('\n[Test 1.1] addElement and addElements');
let tree = Tree.createPDFTree({
  metadata: { title: 'Element Operations Test' }
});

const text1 = new TextBlock({ text: 'First element', style: { fontSize: 12 } });
const text2 = new TextBlock({ text: 'Second element', style: { fontSize: 14 } });
const text3 = new TextBlock({ text: 'Third element', style: { fontSize: 16 } });

tree = Tree.addElement(tree, text1);
assertEqual(tree.elements.length, 1, 'Should have 1 element after addElement');

tree = Tree.addElements(tree, [text2, text3]);
assertEqual(tree.elements.length, 3, 'Should have 3 elements after addElements');

console.log('✓ addElement and addElements work correctly');

// Test 2: addElementAt
console.log('\n[Test 1.2] addElementAt');
const text0 = new TextBlock({ text: 'Zeroth element', style: { fontSize: 10 } });
tree = Tree.addElementAt(tree, text0, 0);

assertEqual(tree.elements.length, 4, 'Should have 4 elements after addElementAt');
assertEqual((tree.elements[0] as TextBlock).text, 'Zeroth element', 'First element should be the one we inserted');
assertEqual((tree.elements[1] as TextBlock).text, 'First element', 'Second element should be shifted down');

console.log('✓ addElementAt works correctly');

// Test 3: removeElement, removeElementAt, removeElementById
console.log('\n[Test 1.3] removeElement, removeElementAt, removeElementById');
tree = Tree.removeElementAt(tree, 0);
assertEqual(tree.elements.length, 3, 'Should have 3 elements after removeElementAt');
assertEqual((tree.elements[0] as TextBlock).text, 'First element', 'First element should be back at index 0');

tree = Tree.removeElement(tree, text1);
assertEqual(tree.elements.length, 2, 'Should have 2 elements after removeElement');

// Add an element with ID
const textWithId = new TextBlock({ id: 'test-123', text: 'Element with ID', style: { fontSize: 12 } });
tree = Tree.addElement(tree, textWithId);
assertEqual(tree.elements.length, 3, 'Should have 3 elements after adding element with ID');

tree = Tree.removeElementById(tree, 'test-123');
assertEqual(tree.elements.length, 2, 'Should have 2 elements after removeElementById');

console.log('✓ removeElement, removeElementAt, removeElementById work correctly');

// Test 4: clearElements
console.log('\n[Test 1.4] clearElements');
tree = Tree.clearElements(tree);
assertEqual(tree.elements.length, 0, 'Should have 0 elements after clearElements');

console.log('✓ clearElements works correctly');

// Test 5: updateElementAt and updateElementById
console.log('\n[Test 1.5] updateElementAt and updateElementById');
tree = Tree.addElements(tree, [
  new TextBlock({ id: 'elem-1', text: 'Element 1', style: { fontSize: 12 } }),
  new TextBlock({ id: 'elem-2', text: 'Element 2', style: { fontSize: 14 } }),
  new TextBlock({ id: 'elem-3', text: 'Element 3', style: { fontSize: 16 } }),
]);

const updatedText = new TextBlock({ text: 'Updated Element', style: { fontSize: 20 } as TextBlockStyle });
tree = Tree.updateElementAt(tree, 1, updatedText);
assertEqual((tree.elements[1] as TextBlock).text, 'Updated Element', 'Element at index 1 should be updated');
assertEqual(((tree.elements[1] as TextBlock).style as TextBlockStyle).fontSize, 20, 'Font size should be 20');

const updatedById = new TextBlock({ id: 'elem-3', text: 'Updated by ID', style: { fontSize: 18 } });
tree = Tree.updateElementById(tree, 'elem-3', updatedById);
assertEqual((tree.elements[2] as TextBlock).text, 'Updated by ID', 'Element with ID elem-3 should be updated');

console.log('✓ updateElementAt and updateElementById work correctly');

// Test 6: updateElementAtWith and updateElementByIdWith
console.log('\n[Test 1.6] updateElementAtWith and updateElementByIdWith');
tree = Tree.updateElementAtWith(tree, 0, (el: any) => {
  const textEl = el as TextBlock;
  const textStyle = textEl.style as TextBlockStyle;
  return new TextBlock({
    ...textEl,
    text: textEl.text + ' [modified]',
    style: { ...textStyle, fontSize: (textStyle.fontSize || 12) + 2 } as TextBlockStyle
  });
});
assertEqual((tree.elements[0] as TextBlock).text, 'Element 1 [modified]', 'Text should be modified');
assertEqual(((tree.elements[0] as TextBlock).style as TextBlockStyle).fontSize, 14, 'Font size should be incremented by 2');

tree = Tree.updateElementByIdWith(tree, 'elem-3', (el: any) => {
  const textEl = el as TextBlock;
  return new TextBlock({
    ...textEl,
    text: 'Functionally updated',
  });
});
assertEqual((tree.elements[2] as TextBlock).text, 'Functionally updated', 'Element should be functionally updated');

console.log('✓ updateElementAtWith and updateElementByIdWith work correctly');

// Test 7: moveElement, moveElementUp, moveElementDown
console.log('\n[Test 1.7] moveElement, moveElementUp, moveElementDown');
// Reset tree with 3 elements
tree = Tree.clearElements(tree);
tree = Tree.addElements(tree, [
  new TextBlock({ text: 'A', style: { fontSize: 12 } }),
  new TextBlock({ text: 'B', style: { fontSize: 12 } }),
  new TextBlock({ text: 'C', style: { fontSize: 12 } }),
]);

tree = Tree.moveElement(tree, 0, 2);
assertEqual((tree.elements[0] as TextBlock).text, 'B', 'First element should be B');
assertEqual((tree.elements[2] as TextBlock).text, 'A', 'Third element should be A');

tree = Tree.moveElementUp(tree, 2);
assertEqual((tree.elements[1] as TextBlock).text, 'A', 'Second element should be A after moving up');
assertEqual((tree.elements[2] as TextBlock).text, 'C', 'Third element should be C');

tree = Tree.moveElementDown(tree, 0);
assertEqual((tree.elements[0] as TextBlock).text, 'A', 'First element should be A');
assertEqual((tree.elements[1] as TextBlock).text, 'B', 'Second element should be B after moving down');

console.log('✓ moveElement, moveElementUp, moveElementDown work correctly');

// Test 8: moveElementToStart and moveElementToEnd
console.log('\n[Test 1.8] moveElementToStart and moveElementToEnd');
tree = Tree.moveElementToEnd(tree, 0);
assertEqual((tree.elements[2] as TextBlock).text, 'A', 'Last element should be A');

tree = Tree.moveElementToStart(tree, 2);
assertEqual((tree.elements[0] as TextBlock).text, 'A', 'First element should be A again');

console.log('✓ moveElementToStart and moveElementToEnd work correctly');

// Test 9: Query operations
console.log('\n[Test 1.9] Query operations');
tree = Tree.clearElements(tree);
tree = Tree.addElements(tree, [
  new TextBlock({ id: 'text-1', text: 'Text 1', style: { fontSize: 12 } }),
  new ImageBlock({ id: 'img-1', src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2P8/5+hHgAHggJ/Peeq6QAAAABJRU5ErkJggg==', style: { width: '40pt', height: '40pt' } }),
  new TextBlock({ id: 'text-2', text: 'Text 2', style: { fontSize: 12 } }),
]);

const foundElement = Tree.findElementById(tree, 'img-1');
assert(foundElement !== undefined, 'Should find element by ID');
assertEqual(foundElement!.getType(), 'image', 'Found element should be an image element');

const foundIndex = Tree.findElementIndexById(tree, 'text-2');
assertEqual(foundIndex, 2, 'Should find correct index for text-2');

const textElements = Tree.findElementsByType(tree, 'text');
assertEqual(textElements.length, 2, 'Should find 2 text elements');

const elementCount = Tree.getElementCount(tree);
assertEqual(elementCount, 3, 'Should have 3 elements');

const hasElements = Tree.hasElements(tree);
assert(hasElements, 'Tree should have elements');

const hasElementById = Tree.hasElementById(tree, 'text-1');
assert(hasElementById, 'Tree should have element with id text-1');

console.log('✓ Query operations work correctly');

console.log('\n' + '='.repeat(60));
console.log('✓ ALL ELEMENT OPERATION TESTS PASSED!');
console.log('='.repeat(60));
