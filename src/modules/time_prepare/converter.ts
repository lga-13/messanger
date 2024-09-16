import BaseData from './_base_data.ts';
import DateString from './_date_string.ts';
import DateTerminator from './_date_terminator.ts';

class TimeConverter extends BaseData {
  toChain(): string {
    return new DateString(this.preparingDate).timeToday();
  }

  toChainTitles() {
    return new DateString(this.preparingDate).dayMonth();
  }

  toChatList() {
    if (new DateTerminator(this.preparingDate).isToday()) {
      return new DateString(this.preparingDate).timeToday();
    } if (new DateTerminator(this.preparingDate).inThisYear()) {
      if (new DateTerminator(this.preparingDate).inThisMonths()) {
        if (new DateTerminator(this.preparingDate).isYesterday()) {
          return DateString.yesterday();
        }
        if (new DateTerminator(this.preparingDate).isDayBeforeYesterday()) {
          return DateString.dayBeforeYesterday();
        }
      }
      return new DateString(this.preparingDate).dayMonth();
    }
    return new DateString(this.preparingDate).dayMonthYear();
  }
}

export default TimeConverter;
