class Memory {
  private memory: Record<number, string>;

  constructor() {
    this.memory = [];
  }

  get(key: number) {
    return this.memory[key];
  }

  setMemory(key: number, value: string) {
    this.memory[key] = value;
  }

  exist(key: number) {
    return key in this.memory;
  }
}

export default Memory;
