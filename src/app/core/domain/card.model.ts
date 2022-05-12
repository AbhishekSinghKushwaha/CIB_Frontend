export interface CardModel {
  type: 'Regular' | 'EquityRegular' | 'EquityLong',
  text: string;
  subText?: string;
  footerText?: string;
  prefixIcon?: string;
  suffixIcon?: string;
  route?: string
}
