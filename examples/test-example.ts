import * as Tree from '../src/tree';
import { createTextBlock } from '../src/blocks/ops/textBlockOps';
import type { BlockLayout } from '../src/blocks/models/Block';
import { generatePDFFile } from '../src/pdf/generator';

async function createTestPDFTree() {
  console.log('Creating test...');

  // Initialize PDF tree
  let tree = Tree.createPDFTree();

  // Set document metadata
  tree = Tree.setTitle(tree, 'Test PDF');
  tree = Tree.setAuthor(tree, 'Kiljag')
  tree = Tree.setSubject(tree, 'Test PDF');
  tree = Tree.setCreator(tree, 'PDFLibJS Example');

  // Configure an additional page (optional customization)
  tree = Tree.addPage(tree, {
    width: 595.28,
    height: 841.89,
    unit: 'pt'
  });

  const headerLayout: BlockLayout = {
    x: 0,
    y: 100,
    width: 520,
    height: 48,
  };

  // company header
  tree = Tree.addElement(tree, createTextBlock({
    id: 'company-name', 
    text: 'ACME Corporation',
    layout: headerLayout,
    style: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
    }
  }));

  return tree;
}

async function createTestPDF() {
    const tree = await createTestPDFTree();
    const outputPath = './files/test.pdf';
    await generatePDFFile(tree, outputPath);
    console.log(`✓ Test PDF created successfully: ${outputPath}`);
}

createTestPDF().catch(console.error);
