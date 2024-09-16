class DataParser {
  day: number;

  month: number;

  year: number;

  hours: number;

  minutes: number;

  constructor(date: Date) {
    this.day = date.getDate();
    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
  }
}

export default DataParser;
