import BaseData from './_base_data.ts';
import DataParser from './_dateParser.ts';

class DateTerminator extends BaseData {
  private todayParsedData: DataParser = new DataParser(new Date());

  private parsedData(): DataParser { return new DataParser(this.preparingDate); }

  isToday() {
    return (
      this.parsedData().day === this.todayParsedData.day
            && this.parsedData().month === this.todayParsedData.month
            && this.parsedData().year === this.todayParsedData.year
    );
  }

  inThisYear() {
    return this.parsedData().year === this.todayParsedData.year;
  }

  inThisMonths() {
    return this.parsedData().month === this.todayParsedData.month;
  }

  isYesterday() {
    return this.parsedData().day === this.todayParsedData.day - 1;
  }

  isDayBeforeYesterday() {
    return this.parsedData().day === this.todayParsedData.day - 2;
  }
}

export default DateTerminator;
