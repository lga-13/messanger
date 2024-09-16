## messenger
## Разработка веб-приложения "Чат"
### Описание
Пользователь может:
* общаться с другими пользователями
* добавлять и удалять пользователей
* изменять личные данные пользователя

### Ссылка на макеты в Figma:
https://www.figma.com/file/xdOf7R3w9O2uHnrRnHNGn7/Messanger?type=design&node-id=14-19&mode=design&t=tD5iXXichfjmjg6f-0

### Ссылка на задеплоенную страницу:
https://messenger-praktikum-glazarev.netlify.app/

### Технологии
HTML, CSS, Vite, Handlebars(plugin Vite), Node.js, TS

### Команды для запуска проекта в dev-режиме
``` npm install ```
``` npm run dev ```
### Команды для запуска prod-версии
``` npm run start ```


### Установка линтера в проект
```bash

npm install --save-dev @typescript-eslint/parser
npm install @typescript-eslint/eslint-plugin@latest --save-dev
npm install --save-dev eslint-config-airbnb
```


Добавить в `.eslintrc.json`
```json
{
  "extends": [
    "airbnb",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "rules": {
    "max-len": [2, 100],
    "max-params": [2, 3]
  },
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```
Запуск
```
node_modules/.bin/eslint . --fix 
```

### Установка линтера для css


```bash
npm install --save-dev stylelint 
npm install --save-dev stylelint-config-standard
```

Добавить в `.stylelintrc.json`
```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "color-hex-case": "lower"
  },
  "ignoreFiles": [
    "build/*"
  ]
} 
```

Запуск
```bash
npx stylelint "**/*.css"
```
