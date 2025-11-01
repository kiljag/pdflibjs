import { Block, BlockStyle, Color } from './Block';

export interface TextBlockStyle extends BlockStyle {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number | 'bold';
  color?: Color;
  lineHeight?: number;
  letterSpacing?: number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
}

export interface TextBlock extends Block<TextBlockStyle> {
  type: 'text';
  text: string;
  overflow?: 'clip' | 'ellipsis' | 'shrinkToFit' | 'expand';
}
