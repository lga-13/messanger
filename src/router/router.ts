/* eslint-disable no-constructor-return */
/* eslint-disable no-use-before-define */

import Block from '../components/base/block.ts';
import Route from './route.ts';

class Router {
  static __instance: Router | null;

  routes: Route<Block>[];

  history: History;

  _currentRoute: Route<Block> | null;

  _rootQuery: string;

  constructor(rootQuery: string) {
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    if (Router.__instance) {
      return Router.__instance;
    }
    Router.__instance = this;
    this.init();
  }

  init() {
    // При обработке события изменения истории будет вызываться _onRoute()

    // - нажатие кнгопки назад,
    // - вперед,
    // - вызов window.history.back()
    // - window.history.forward()
    window.addEventListener('popstate', () => {
      // Добавим в роутер текущий путь
      this._onRoute(window.location.pathname);
    });
  }

  use(pathname: string, block: Block) {
    // Регистрация нового роута
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    // Запуск роутера и запуск ренедера первого адреса
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    // Подгружаем роут
    const route = this.getRoute(pathname);

    // Еслм такой роут НЕ найден
    if (!route) {
      // Метод ничего не сделет
      return;
    }

    // ---------------- Тут начинается обновление страницы-------

    // Только в случаях если
    // - удалось найти соответствующий роутер И
    // - этот роут не текущий
    if (this._currentRoute && this._currentRoute !== route) {
      // Скроем его
      this._currentRoute.leave();
    }

    // Устаовим текущий роутер и отреднерим роут
    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    // Внешний метод загрузки пути
    // Добавляем в историю
    // Вызов pushState не повлечет к событию popsState
    this.history.pushState({}, '', pathname);
    // Вызов внутренненго метода загрузки пути
    this._onRoute(pathname);
  }

  back() {
    // Переход назад
    this.history.back();
  }

  forward() {
    // Переход вперед
    this.history.forward();
  }

  getRoute(pathname: string) {
    // Проверка существования пути pathname
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
