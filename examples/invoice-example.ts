/**
 * Professional Invoice Example
 * Demonstrates creating a beautiful, professional invoice PDF
 */

import * as Tree from '../src/tree';
import { createTextBlock } from '../src/blocks/ops/textBlockOps';
import type { BlockLayout } from '../src/blocks/models/Block';
import { generatePDFFile } from '../src/pdf/generator';

const PAGE_WIDTH = 595.28;
const PAGE_MARGIN = 40;
const CONTENT_WIDTH = PAGE_WIDTH - PAGE_MARGIN * 2;

const withMargin = (
  y: number,
  height: number,
  overrides: Partial<BlockLayout> = {}
): BlockLayout => ({
  x: PAGE_MARGIN,
  y: PAGE_MARGIN + y,
  width: CONTENT_WIDTH,
  height,
  ...overrides,
});

async function createInvoice() {
  console.log('Creating professional invoice...');

  // Initialize PDF tree
  let tree = Tree.createPDFTree();

  // Set document metadata
  tree = Tree.setTitle(tree, 'Invoice #INV-2024-001');
  tree = Tree.setAuthor(tree, 'Acme Corporation');
  tree = Tree.setSubject(tree, 'Invoice for Professional Services');
  tree = Tree.setCreator(tree, 'PDFLibJS Example');

  // Configure an additional page (optional customization)
  tree = Tree.addPage(tree, {
    width: 595.28,
    height: 841.89,
    unit: 'pt'
  });

  // Company Header
  tree = Tree.addElement(tree, createTextBlock({
    id: 'company-name',
    text: 'ACME CORPORATION',
    layout: withMargin(0, 60),
    style: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#1a1a1a',
      textAlign: 'center'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'company-tagline',
    text: 'Professional Services & Consulting',
    layout: withMargin(35, 24),
    style: {
      fontSize: 11,
      color: '#666666',
      textAlign: 'center'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'company-address',
    text: '123 Business Street, Suite 500\nSan Francisco, CA 94105\nPhone: (555) 123-4567 | Email: billing@acme.com',
    layout: withMargin(52, 66),
    style: {
      fontSize: 9,
      color: '#666666',
      textAlign: 'center',
      lineHeight: 1.4
    }
  }));

  // Divider line (using text)
  tree = Tree.addElement(tree, createTextBlock({
    id: 'divider-1',
    text: '_'.repeat(90),
    layout: withMargin(90, 18),
    style: {
      fontSize: 10,
      color: '#cccccc',
      textAlign: 'center'
    }
  }));

  // Invoice Title
  tree = Tree.addElement(tree, createTextBlock({
    id: 'invoice-title',
    text: 'INVOICE',
    layout: withMargin(110, 48),
    style: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#1a1a1a'
    }
  }));

  // Invoice Details - Left Column
  tree = Tree.addElement(tree, createTextBlock({
    id: 'invoice-number',
    text: 'Invoice Number: INV-2024-001',
    layout: withMargin(145, 20),
    style: {
      fontSize: 10
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'invoice-date',
    text: 'Invoice Date: November 1, 2025',
    layout: withMargin(160, 20),
    style: {
      fontSize: 10
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'due-date',
    text: 'Due Date: November 30, 2025',
    layout: withMargin(175, 20),
    style: {
      fontSize: 10,
      fontWeight: 'bold'
    }
  }));

  // Bill To Section
  tree = Tree.addElement(tree, createTextBlock({
    id: 'bill-to-label',
    text: 'BILL TO:',
    layout: withMargin(210, 22),
    style: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#1a1a1a'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'client-info',
    text: 'Tech Innovations Inc.\n456 Startup Avenue\nAustin, TX 78701\nATTN: Finance Department',
    layout: withMargin(228, 90),
    style: {
      fontSize: 10,
      lineHeight: 1.5
    }
  }));

  // Divider
  tree = Tree.addElement(tree, createTextBlock({
    id: 'divider-2',
    text: '_'.repeat(90),
    layout: withMargin(300, 18),
    style: {
      fontSize: 10,
      color: '#cccccc',
      textAlign: 'center'
    }
  }));

  // Items Header
  tree = Tree.addElement(tree, createTextBlock({
    id: 'items-header',
    text: 'DESCRIPTION                                          QTY    RATE        AMOUNT',
    layout: withMargin(320, 28),
    style: {
      fontSize: 10,
      fontWeight: 'bold',
      fontFamily: 'Courier',
      backgroundColor: '#f5f5f5',
      padding: '8pt'
    }
  }));

  // Line Items
  const items = [
    { desc: 'Software Development Services (40 hrs)', qty: '40', rate: '$150.00', amount: '$6,000.00' },
    { desc: 'UI/UX Design Consultation (10 hrs)', qty: '10', rate: '$120.00', amount: '$1,200.00' },
    { desc: 'System Architecture Planning', qty: '1', rate: '$2,500.00', amount: '$2,500.00' },
    { desc: 'Technical Documentation', qty: '1', rate: '$800.00', amount: '$800.00' }
  ];

  let currentY = 345;
  items.forEach((item, index) => {
    const line = `${item.desc.padEnd(52)} ${item.qty.padStart(3)}    ${item.rate.padStart(10)}  ${item.amount.padStart(10)}`;
    tree = Tree.addElement(tree, createTextBlock({
      id: `item-${index}`,
      text: line,
      layout: withMargin(currentY, 20),
      style: {
        fontSize: 9,
        fontFamily: 'Courier',
        color: '#333333'
      }
    }));
    currentY += 18;
  });

  // Divider before totals
  tree = Tree.addElement(tree, createTextBlock({
    id: 'divider-3',
    text: '_'.repeat(90),
    layout: withMargin(currentY + 10, 18),
    style: {
      fontSize: 10,
      color: '#cccccc',
      textAlign: 'center'
    }
  }));

  // Totals
  currentY += 35;
  tree = Tree.addElement(tree, createTextBlock({
    id: 'subtotal',
    text: 'Subtotal: $10,500.00',
    layout: withMargin(currentY, 20, { width: CONTENT_WIDTH - 10 }),
    style: {
      fontSize: 10,
      fontFamily: 'Courier',
      textAlign: 'right'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'tax',
    text: 'Tax (8.5%): $892.50',
    layout: withMargin(currentY + 18, 20, { width: CONTENT_WIDTH - 10 }),
    style: {
      fontSize: 10,
      fontFamily: 'Courier',
      textAlign: 'right'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'total',
    text: 'TOTAL DUE: $11,392.50',
    layout: withMargin(currentY + 40, 28, { width: CONTENT_WIDTH - 10 }),
    style: {
      fontSize: 12,
      fontWeight: 'bold',
      fontFamily: 'Courier',
      textAlign: 'right',
      color: '#1a1a1a'
    }
  }));

  // Payment Terms
  tree = Tree.addElement(tree, createTextBlock({
    id: 'payment-terms-title',
    text: 'PAYMENT TERMS:',
    layout: withMargin(currentY + 80, 20),
    style: {
      fontSize: 10,
      fontWeight: 'bold'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'payment-terms',
    text: 'Payment is due within 30 days of invoice date. Please make checks payable to\nAcme Corporation. Wire transfer details available upon request.\n\nBank: First National Bank | Account: 1234567890 | Routing: 987654321',
    layout: withMargin(currentY + 98, 110),
    style: {
      fontSize: 9,
      lineHeight: 1.5,
      color: '#555555'
    }
  }));

  // Footer
  tree = Tree.addElement(tree, createTextBlock({
    id: 'footer',
    text: 'Thank you for your business!',
    layout: withMargin(currentY + 160, 24),
    style: {
      fontSize: 10,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#1a1a1a'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'footer-note',
    text: 'For questions regarding this invoice, please contact billing@acme.com',
    layout: withMargin(currentY + 180, 20),
    style: {
      fontSize: 8,
      textAlign: 'center',
      color: '#888888'
    }
  }));

  // Generate PDF
  const outputPath = './files/invoice-professional.pdf';
  await generatePDFFile(tree, outputPath);
  console.log(`✓ Invoice created successfully: ${outputPath}`);
}

// Run the example
createInvoice().catch(console.error);
