/**
 * Business Report Example
 * Demonstrates creating a professional quarterly business report PDF
 */

import * as Tree from '../src/tree';
import { createTextBlock } from '../src/blocks/ops/textBlockOps';
import { generatePDFFile } from '../src/pdf/generator';

async function createReport() {
  console.log('Creating business report...');

  // Initialize PDF tree
  let tree = Tree.createPDFTree();

  // Set document metadata
  tree = Tree.setTitle(tree, 'Q3 2025 Business Performance Report');
  tree = Tree.setAuthor(tree, 'Global Tech Industries');
  tree = Tree.setSubject(tree, 'Quarterly Business Report');
  tree = Tree.setCreator(tree, 'PDFLibJS Example');
  tree = Tree.setKeywords(tree, ['report', 'quarterly', 'business', 'performance', 'Q3']);

  // Configure page with margins
  tree = Tree.addPage(tree, {
    size: 'A4',
    margins: '50pt'
  });

  // Report Header
  tree = Tree.addElement(tree, createTextBlock({
    id: 'report-type',
    text: 'QUARTERLY BUSINESS REPORT',
    style: {
      fontSize: 11,
      color: '#666666',
      textAlign: 'center',
      y: 0
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'report-title',
    text: 'Q3 2025 Performance Analysis',
    style: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#0a3d62',
      textAlign: 'center',
      y: 18
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'company-name',
    text: 'GLOBAL TECH INDUSTRIES',
    style: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#1e3a8a',
      textAlign: 'center',
      y: 50
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'report-date',
    text: 'Report Date: October 15, 2025',
    style: {
      fontSize: 9,
      color: '#666666',
      textAlign: 'center',
      y: 68
    }
  }));

  // Decorative separator
  tree = Tree.addElement(tree, createTextBlock({
    id: 'separator-1',
    text: '='.repeat(85),
    style: {
      fontSize: 10,
      color: '#cbd5e0',
      textAlign: 'center',
      y: 88
    }
  }));

  // Executive Summary
  tree = Tree.addElement(tree, createTextBlock({
    id: 'exec-summary-title',
    text: '# EXECUTIVE SUMMARY',
    style: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#0a3d62',
      y: 110
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'exec-summary-content',
    text: 'Q3 2025 demonstrated exceptional performance across all key business units. Revenue\n' +
          'increased by 23% year-over-year, driven by strong product launches and market expansion.\n' +
          'Customer satisfaction scores reached an all-time high of 94%, while operational\n' +
          'efficiency improved by 18%. The company maintains a solid financial position with\n' +
          'healthy cash reserves and continued investment in innovation.',
    style: {
      fontSize: 10,
      y: 132,
      lineHeight: 1.6,
      color: '#1f2937'
    }
  }));

  // Key Highlights
  tree = Tree.addElement(tree, createTextBlock({
    id: 'highlights-title',
    text: '# KEY HIGHLIGHTS',
    style: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#0a3d62',
      y: 220
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'highlights-content',
    text: '+ Revenue Growth:           $45.2M (+23% YoY)\n' +
          '+ Net Profit Margin:        18.5% (+2.3 percentage points)\n' +
          '+ Customer Acquisition:     12,400 new customers (+31%)\n' +
          '+ Product Launch Success:   3 major releases, 95% adoption rate\n' +
          '+ Employee Satisfaction:    87% positive rating (+5%)\n' +
          '+ Market Share:             Expanded to 15.7% in core segment',
    style: {
      fontSize: 10,
      fontFamily: 'Courier',
      y: 242,
      lineHeight: 1.7,
      color: '#1f2937'
    }
  }));

  // Financial Performance
  tree = Tree.addElement(tree, createTextBlock({
    id: 'financial-title',
    text: '# FINANCIAL PERFORMANCE',
    style: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#0a3d62',
      y: 360
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'financial-table-header',
    text: 'METRIC                          Q3 2025        Q3 2024        CHANGE',
    style: {
      fontSize: 9,
      fontWeight: 'bold',
      fontFamily: 'Courier',
      backgroundColor: '#e5e7eb',
      y: 382,
      padding: '6pt'
    }
  }));

  const financialData = [
    { metric: 'Total Revenue', q3_2025: '$45.2M', q3_2024: '$36.7M', change: '+23.2%' },
    { metric: 'Gross Profit', q3_2025: '$28.8M', q3_2024: '$22.1M', change: '+30.3%' },
    { metric: 'Operating Income', q3_2025: '$9.5M', q3_2024: '$7.2M', change: '+31.9%' },
    { metric: 'Net Income', q3_2025: '$8.4M', q3_2024: '$6.1M', change: '+37.7%' },
    { metric: 'EBITDA', q3_2025: '$11.2M', q3_2024: '$8.8M', change: '+27.3%' }
  ];

  let currentY = 404;
  financialData.forEach((row, index) => {
    const line = `${row.metric.padEnd(32)}${row.q3_2025.padStart(10)}     ${row.q3_2024.padStart(10)}     ${row.change.padStart(8)}`;
    tree = Tree.addElement(tree, createTextBlock({
      id: `financial-row-${index}`,
      text: line,
      style: {
        fontSize: 9,
        fontFamily: 'Courier',
        y: currentY,
        color: '#374151'
      }
    }));
    currentY += 16;
  });

  // Market Analysis
  tree = Tree.addElement(tree, createTextBlock({
    id: 'market-title',
    text: '# MARKET ANALYSIS',
    style: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#0a3d62',
      y: currentY + 20
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'market-content',
    text: 'Market Expansion: Successfully entered 3 new geographic regions (APAC, EMEA expansion)\n' +
          '\n' +
          'Competitive Position: Maintained #2 position in enterprise software segment with\n' +
          'market share increasing from 13.2% to 15.7%. Key competitors include TechGiant Corp\n' +
          'and InnovateSoft, both experiencing slower growth rates this quarter.\n' +
          '\n' +
          'Customer Segments: Enterprise customers now represent 68% of revenue (up from 62%),\n' +
          'with SMB segment showing promising 41% growth rate.',
    style: {
      fontSize: 10,
      y: currentY + 42,
      lineHeight: 1.6,
      color: '#1f2937'
    }
  }));

  // Operational Metrics
  currentY += 160;
  tree = Tree.addElement(tree, createTextBlock({
    id: 'operations-title',
    text: '# OPERATIONAL METRICS',
    style: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#0a3d62',
      y: currentY
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'operations-content',
    text: 'Customer Retention Rate:      96.2% (Industry avg: 89%)\n' +
          'Avg. Response Time:           < 2 hours (Target: 4 hours)\n' +
          'Product Uptime:               99.97% (+0.12%)\n' +
          'Employee Productivity:        +18% through automation initiatives\n' +
          'Cost per Acquisition:         $847 (-12% from Q2)',
    style: {
      fontSize: 10,
      fontFamily: 'Courier',
      y: currentY + 22,
      lineHeight: 1.7,
      color: '#1f2937'
    }
  }));

  // Strategic Initiatives
  currentY += 120;
  tree = Tree.addElement(tree, createTextBlock({
    id: 'strategic-title',
    text: '# STRATEGIC INITIATIVES',
    style: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#0a3d62',
      y: currentY
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'strategic-content',
    text: '1. AI Integration Project: Phase 1 completed on schedule. AI-powered features now\n' +
          '   live for 40% of customer base, showing 35% improvement in user engagement.\n' +
          '\n' +
          '2. Cloud Migration: 75% complete. Expect full migration by Q4 2025, projected to\n' +
          '   reduce infrastructure costs by $2.1M annually.\n' +
          '\n' +
          '3. Partnership Program: Launched strategic partnerships with 5 industry leaders,\n' +
          '   expanding distribution channels and market reach.',
    style: {
      fontSize: 10,
      y: currentY + 22,
      lineHeight: 1.6,
      color: '#1f2937'
    }
  }));

  // Outlook
  currentY += 120;
  tree = Tree.addElement(tree, createTextBlock({
    id: 'outlook-title',
    text: '# Q4 2025 OUTLOOK',
    style: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#0a3d62',
      y: currentY
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'outlook-content',
    text: 'Looking ahead to Q4, we anticipate continued strong performance with projected revenue\n' +
          'growth of 18-22% YoY. Key focus areas include completing the cloud migration,\n' +
          'expanding our AI capabilities, and preparing for the FY2026 product roadmap. We remain\n' +
          'committed to sustainable growth while maintaining operational excellence and customer\n' +
          'satisfaction.',
    style: {
      fontSize: 10,
      y: currentY + 22,
      lineHeight: 1.6,
      color: '#1f2937'
    }
  }));

  // Footer section
  currentY += 110;
  tree = Tree.addElement(tree, createTextBlock({
    id: 'separator-2',
    text: '='.repeat(85),
    style: {
      fontSize: 10,
      color: '#cbd5e0',
      textAlign: 'center',
      y: currentY
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'approval',
    text: 'Report Prepared by: Finance Department | Approved by: John Smith, CEO',
    style: {
      fontSize: 8,
      textAlign: 'center',
      y: currentY + 18,
      color: '#6b7280'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'confidential',
    text: 'CONFIDENTIAL - FOR INTERNAL USE ONLY',
    style: {
      fontSize: 8,
      fontWeight: 'bold',
      textAlign: 'center',
      y: currentY + 32,
      color: '#991b1b'
    }
  }));

  // Generate PDF
  const outputPath = './files/business-report.pdf';
  await generatePDFFile(tree, outputPath);
  console.log(`✓ Business report created successfully: ${outputPath}`);
}

// Run the example
createReport().catch(console.error);
