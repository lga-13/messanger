import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: '/index.html',
                error404: '/pages/error404/error404.html',
                error500: '/pages/error500/error500.html',
                registration_form: '/pages/registration-form/registration-form.html',
                login_form: '/pages/login-form/login-form.html',
                settings: '/pages/settings-page/settings-page.html',
                chats: '/pages/chat/chat.html'
            }
        }
    },
    plugins: [handlebars({
        context: {
            chats: [
                {
                    time: "11:05",
                    sender: "Мама",
                    your: "Вы:",
                    content: " Стикер",
                },
                {
                    time: "12:25",
                    count: 2,
                    sender: "Папа",
                    content: "Изображение",
                },
                {
                    time: "16:09",
                    count: 4,
                    sender: "Леха",
                    content: "Можно или сегодня или завтра",
                },
                {
                    time: "21:49",
                    sender: "Людмила",
                    content: " Томат (Solánum lycopérsicum) — однолетнее или многолет...",
                },
                {
                    time: "Ср",
                    sender: "Брат",
                    your: "Вы:",
                    content: " Круто!",
                },
                {
                    time: "Ср",
                    sender: "Андрей",
                    content: "не ниже +5 и не выше +43",
                },
                {
                    time: "Пт",
                    count: 2,
                    sender: "Вода ОФис",
                    content: "Акции на питьевую воду 19 литров для всех клиентов ..."
                },
                {
                    time: "Сб",
                    count: 2,
                    sender: "Алена",
                    content: "Друзья, у меня для вас особенный выпуск новостей!...",
                },
                {
                    time: "12 июня 2022",
                    sender: "Павел",
                    content: "Королевский питон (Python reg...",
                }
            ],
            registration: [
                {
                    name: "email",
                    nameru: "Почта",
                },
                {
                    name: "login",
                    nameru: "Логин",
                },
                {
                    name: "first-name",
                    nameru: "Имя",
                },
                {
                    name: "second-name",
                    nameru: "Фамилия",
                },
                {
                    name: "phone",
                    nameru: "Телефон",
                },
                {
                    name: "password",
                    nameru: "Пароль",
                },
                {
                    name: "repeat password",
                    nameru: "Повторите пароль",
                }
            ],
            setting: [
                {
                    name: "login",
                    nameru: "Логин",
                    value: "VAlerA5",
                },
                {
                    name: "first-name",
                    nameru: "Имя",
                    value: "Валерий",
                },
                {
                    name: "second-name",
                    nameru: "Фамилия",
                    value: "Чижов",
                },
                {
                    name: "email",
                    nameru: "Почта",
                    value: "valera@pa.fd",
                },
                {
                    name: "phone",
                    nameru: "Телефон",
                    value: "88-987-2898",
                }
            ],
            login: [
                {
                    name: "login",
                    nameru: "Логин",
                },
                {
                    name: "password",
                    nameru: "Пароль",
                }
            ]
        }
    })]
})
