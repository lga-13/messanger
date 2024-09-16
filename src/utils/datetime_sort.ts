function datetimeSort(arr: {datetime: Date}[]) {
  arr.sort((a, b) => a.datetime.getTime() - b.datetime.getTime());
}

export default datetimeSort;
