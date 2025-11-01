/**
 * Professional Invoice Example
 * Demonstrates creating a beautiful, professional invoice PDF
 */

import * as Tree from '../src/tree';
import { createTextBlock } from '../src/blocks/ops/textBlockOps';
import { generatePDFFile } from '../src/pdf/generator';

async function createInvoice() {
  console.log('Creating professional invoice...');

  // Initialize PDF tree
  let tree = Tree.createPDFTree();

  // Set document metadata
  tree = Tree.setTitle(tree, 'Invoice #INV-2024-001');
  tree = Tree.setAuthor(tree, 'Acme Corporation');
  tree = Tree.setSubject(tree, 'Invoice for Professional Services');
  tree = Tree.setCreator(tree, 'PDFLibJS Example');

  // Configure page with margins
  tree = Tree.addPage(tree, {
    size: 'A4',
    margins: '40pt'
  });

  // Company Header
  tree = Tree.addElement(tree, createTextBlock({
    id: 'company-name',
    text: 'ACME CORPORATION',
    style: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#1a1a1a',
      textAlign: 'center',
      y: 0
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'company-tagline',
    text: 'Professional Services & Consulting',
    style: {
      fontSize: 11,
      color: '#666666',
      textAlign: 'center',
      y: 35
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'company-address',
    text: '123 Business Street, Suite 500\nSan Francisco, CA 94105\nPhone: (555) 123-4567 | Email: billing@acme.com',
    style: {
      fontSize: 9,
      color: '#666666',
      textAlign: 'center',
      y: 52,
      lineHeight: 1.4
    }
  }));

  // Divider line (using text)
  tree = Tree.addElement(tree, createTextBlock({
    id: 'divider-1',
    text: '_'.repeat(90),
    style: {
      fontSize: 10,
      color: '#cccccc',
      textAlign: 'center',
      y: 90
    }
  }));

  // Invoice Title
  tree = Tree.addElement(tree, createTextBlock({
    id: 'invoice-title',
    text: 'INVOICE',
    style: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#1a1a1a',
      y: 110
    }
  }));

  // Invoice Details - Left Column
  tree = Tree.addElement(tree, createTextBlock({
    id: 'invoice-number',
    text: 'Invoice Number: INV-2024-001',
    style: {
      fontSize: 10,
      y: 145,
      x: 0
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'invoice-date',
    text: 'Invoice Date: November 1, 2025',
    style: {
      fontSize: 10,
      y: 160,
      x: 0
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'due-date',
    text: 'Due Date: November 30, 2025',
    style: {
      fontSize: 10,
      fontWeight: 'bold',
      y: 175,
      x: 0
    }
  }));

  // Bill To Section
  tree = Tree.addElement(tree, createTextBlock({
    id: 'bill-to-label',
    text: 'BILL TO:',
    style: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#1a1a1a',
      y: 210
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'client-info',
    text: 'Tech Innovations Inc.\n456 Startup Avenue\nAustin, TX 78701\nATTN: Finance Department',
    style: {
      fontSize: 10,
      y: 228,
      lineHeight: 1.5
    }
  }));

  // Divider
  tree = Tree.addElement(tree, createTextBlock({
    id: 'divider-2',
    text: '_'.repeat(90),
    style: {
      fontSize: 10,
      color: '#cccccc',
      textAlign: 'center',
      y: 300
    }
  }));

  // Items Header
  tree = Tree.addElement(tree, createTextBlock({
    id: 'items-header',
    text: 'DESCRIPTION                                          QTY    RATE        AMOUNT',
    style: {
      fontSize: 10,
      fontWeight: 'bold',
      fontFamily: 'Courier',
      backgroundColor: '#f5f5f5',
      y: 320,
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
      style: {
        fontSize: 9,
        fontFamily: 'Courier',
        y: currentY,
        color: '#333333'
      }
    }));
    currentY += 18;
  });

  // Divider before totals
  tree = Tree.addElement(tree, createTextBlock({
    id: 'divider-3',
    text: '_'.repeat(90),
    style: {
      fontSize: 10,
      color: '#cccccc',
      textAlign: 'center',
      y: currentY + 10
    }
  }));

  // Totals
  currentY += 35;
  tree = Tree.addElement(tree, createTextBlock({
    id: 'subtotal',
    text: 'Subtotal:                                                             $10,500.00',
    style: {
      fontSize: 10,
      fontFamily: 'Courier',
      y: currentY,
      textAlign: 'right'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'tax',
    text: 'Tax (8.5%):                                                              $892.50',
    style: {
      fontSize: 10,
      fontFamily: 'Courier',
      y: currentY + 18,
      textAlign: 'right'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'total',
    text: 'TOTAL DUE:                                                          $11,392.50',
    style: {
      fontSize: 12,
      fontWeight: 'bold',
      fontFamily: 'Courier',
      y: currentY + 40,
      textAlign: 'right',
      color: '#1a1a1a'
    }
  }));

  // Payment Terms
  tree = Tree.addElement(tree, createTextBlock({
    id: 'payment-terms-title',
    text: 'PAYMENT TERMS:',
    style: {
      fontSize: 10,
      fontWeight: 'bold',
      y: currentY + 80
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'payment-terms',
    text: 'Payment is due within 30 days of invoice date. Please make checks payable to\nAcme Corporation. Wire transfer details available upon request.\n\nBank: First National Bank | Account: 1234567890 | Routing: 987654321',
    style: {
      fontSize: 9,
      y: currentY + 98,
      lineHeight: 1.5,
      color: '#555555'
    }
  }));

  // Footer
  tree = Tree.addElement(tree, createTextBlock({
    id: 'footer',
    text: 'Thank you for your business!',
    style: {
      fontSize: 10,
      fontWeight: 'bold',
      textAlign: 'center',
      y: currentY + 160,
      color: '#1a1a1a'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'footer-note',
    text: 'For questions regarding this invoice, please contact billing@acme.com',
    style: {
      fontSize: 8,
      textAlign: 'center',
      y: currentY + 180,
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
