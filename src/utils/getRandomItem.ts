class NewRandomValue {
  static get<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
}

export default NewRandomValue;
