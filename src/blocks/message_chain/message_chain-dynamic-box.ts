/* eslint-disable func-names */

const dynamicBox: HTMLElement | null = document.getElementById('dynamicBox');

if (dynamicBox) {
  dynamicBox.addEventListener('input', function (this: HTMLElement) {
    this.style.height = 'auto';
    this.style.height = `${this.scrollHeight}px`;
  });
}
