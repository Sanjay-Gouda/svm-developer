export const numberToWords = (num: number) => {
  const ones = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  const tens = [
    '',
    'ten',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];
  const teens = [
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];

  if (num === 0) return 'zero';

  let words = '';

  if (num >= 1000) {
    words += numberToWords(Math.floor(num / 1000)) + ' thousand ';
    num %= 1000;
  }

  if (num >= 100) {
    words += ones[Math.floor(num / 100)] + ' hundred ';
    num %= 100;
  }

  if (num >= 20) {
    words += tens[Math.floor(num / 10)] + ' ';
    num %= 10;
  }

  if (num > 0 && num < 10) {
    words += ones[num];
  } else if (num >= 11 && num <= 19) {
    words += teens[num - 11];
  }

  return words.trim(); // Remove any trailing spaces
};
