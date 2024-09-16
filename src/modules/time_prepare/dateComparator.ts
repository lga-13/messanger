import DataParser from './_dateParser.ts';

class DateComparator {
  static inOneDay(oneDate: Date, twoDate: Date) {
    const parsedOneDate = new DataParser(oneDate);
    const parsedTwoDate = new DataParser(twoDate);
    return parsedOneDate.year === parsedTwoDate.year
            && parsedOneDate.month === parsedTwoDate.month
            && parsedOneDate.day === parsedTwoDate.day;
  }
}

export default DateComparator;
