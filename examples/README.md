# PDFLibJS Examples

This directory contains professional examples demonstrating how to create beautiful, production-ready PDF documents using PDFLibJS.

## Available Examples

### 1. Invoice Example (`invoice-example.ts`)
**Output:** `files/invoice-professional.pdf`

A professional invoice template demonstrating:
- Company header with branding
- Client billing information
- Itemized line items with pricing
- Tax calculations and totals
- Payment terms and instructions
- Professional typography and layout

**Run:**
```bash
npx ts-node examples/invoice-example.ts
```

### 2. Resume/CV Example (`resume-example.ts`)
**Output:** `files/resume-professional.pdf`

A modern, professional resume/CV template featuring:
- Clean, professional header with contact information
- Professional summary section
- Technical skills organized by category
- Detailed work experience with achievements
- Education and certifications
- Modern typography with visual hierarchy

**Run:**
```bash
npx ts-node examples/resume-example.ts
```

### 3. Business Report Example (`report-example.ts`)
**Output:** `files/business-report.pdf`

A comprehensive quarterly business report including:
- Executive summary
- Key performance highlights
- Financial performance tables
- Market analysis
- Operational metrics
- Strategic initiatives
- Professional formatting for stakeholder presentations

**Run:**
```bash
npx ts-node examples/report-example.ts
```

## Running All Examples

To generate all example PDFs at once:

```bash
npx ts-node examples/invoice-example.ts && \
npx ts-node examples/resume-example.ts && \
npx ts-node examples/report-example.ts
```

## Output Location

All generated PDFs are saved to the `files/` directory in the project root.

## Customization Tips

### Typography
- Use `fontSize` for text size control
- Set `fontWeight: 'bold'` for emphasis
- Choose from standard fonts: Helvetica, Times, Courier
- Use `textAlign: 'left' | 'center' | 'right'` for alignment
- Control spacing with `lineHeight` (default: 1.2)

### Layout & Positioning
- Coordinates use **top-left as origin** (0,0 = top-left corner)
- Set absolute positions using `x` and `y` in the style
- Use `padding` for inner spacing and `margin` to separate blocks
- Configure page dimensions via `Tree.addPage()`

### Colors
- Use hex colors: `'#1a365d'`, `'#666666'`
- RGB format also supported: `'rgb(26, 54, 93)'`
- Named colors: `'black'`, `'white'`, etc.

### Document Metadata
Always set metadata for professional documents:
```typescript
tree = Tree.setTitle(tree, 'Document Title');
tree = Tree.setAuthor(tree, 'Author Name');
tree = Tree.setSubject(tree, 'Document Subject');
tree = Tree.setCreator(tree, 'Your Application Name');
```

## Design Best Practices

1. **Visual Hierarchy**: Use font sizes and weights to create clear visual hierarchy
2. **Whitespace**: Don't overcrowd the page - use adequate spacing between sections
3. **Alignment**: Keep text aligned consistently (left-align for body text works best)
4. **Color Scheme**: Stick to 2-3 colors maximum for professional appearance
5. **Font Pairing**: Combine fonts thoughtfully (e.g., Helvetica for headers, Courier for data)
6. **Sections**: Use clear section headers with visual separation
7. **Consistency**: Maintain consistent spacing, fonts, and colors throughout

## Single Page Limitation

These examples are designed for **single-page PDFs**. Content that exceeds one page will overflow and may not render correctly. Plan your content accordingly:

- **Invoice**: Limit to ~15 line items
- **Resume**: Keep experience to 3-4 positions
- **Report**: Focus on executive summary style

## Advanced Features Used

- **Absolute Positioning**: Fine control over element placement
- **Font Families**: Mixing Helvetica, Times, and Courier
- **Text Alignment**: Left, center, and right alignment
- **Color Theming**: Professional color schemes
- **Monospace Tables**: Using Courier for aligned data
- **Visual Separators**: Using repeated characters for visual breaks

## Need Help?

Refer to the main project README for:
- API documentation
- Tree operations reference
- Styling options
- TypeScript types

## Contributing

Feel free to create additional examples! Consider these ideas:
- Certificate template
- Letter/correspondence
- Price list
- Event flyer
- Menu card
- Business card
