import DataParser from './_dateParser.ts';
import monthDict from './_month_dict.ts';

class DateString extends DataParser {
  dayMonthYear() {
    return `${this.day}.${this.month}.${this.year}`;
  }

  timeToday() {
    return `${this.hours}:${this.minutes}`;
  }

  dayMonth() {
    return `${this.day} ${monthDict[this.month]}`;
  }

  static yesterday() {
    return 'Вчера';
  }

  static dayBeforeYesterday() {
    return 'Позавчера';
  }
}
export default DateString;
