# Пожалуйста, прочитайте весь этот файл!

https://github.com/vitasha10/perm300-frontend/assets/45239133/8b3f68b8-dddd-4b9d-9cf8-cb76da00582f

[Видео](https://raw.githubusercontent.com/vitasha10/perm300-frontend/main/preview.mp4)

## Наша игра называется - «Пермь300 - игровое пространство»

Наша игра - концепт приложения, которое на самом деле могло быть использовано этим летом в честь трёхсотлетия города.
Оно преследует те же цели, что и большая часть мероприятий - объединять людей, приносить радость.
Это реализуется засчёт нескольких наших идей:

* В первую очередь пользователю должно быть удобно открыть наш продукт, каким бы он не был, поэтому мы решили воспользоваться vk-mini-apps, т.к. это упрощает открытие для большей часи ЦА (целевая аудитория). Альтернатива - сайт, но он потеряется. Приложение на платформе вк является конкурентноспособной альтернативой приложениям из PlayMarket или AppStore. На базе телеграм нет таких же удобных приложений.
* Пермь300 - всё реально, слоган летних событий, может,в том числе отражать связанность приложения и призов, которые в нём можно получить, с реальной жизню. Поэтому, хоть мы не договаривались юридически ни с какими компаниями, но постарались представить как бы они могли также быть интегрированы, альтернативно интегрированы, в реальное Пермь300.
* Наше приложение состоит из абсолютно разных разделов, оно многообразно и даёт сразу очень много возможностей, можно проходить именно то, что хочется.
* Игра представляет собой не только кучу 2D интерфейсов, но также трёхмерные собственные панорамы и созданный самостоятельно майнкрафт (пожалуйста, не смотрите, что он плохо доделан, к защите Вы увидите очень крутую реализацию, хотя технологически это уже очень сложно сделано)
* У нас есть маскот - Пермский Медведь, он интегрирован в приложение и взаимодействует с пользователем через промо-видео, что можно приравнять даже к сюжету, потому что именно медведь помогает не запутаться, правильно понять приложение, именно он собирает активную аудиторию.
* Приложение обещает не только фиктивные призы от каких-то компаний, предусмотрены также и фиктивные призы как будто бы от организаторов, в том числе от лица медведя (если угадать все места в которых сделаны панорамы, третья кнопка на главном экране).
* Приложение создано так, что при его коммерческом использовании необходимо лишь что-то дописывать, но почти не переписывать.

## Технологии

* Простое api на fastify (node.js) + postgres (был вариант писать на Rust или Go но в условиях ограниченности времени и ресурсов ставка была сделана в сторону node, в том числе из-за простой имплементации вебсокетов, которые нужны для мнгновенной работы онлайн события ПермьСтрой (майнкрафт).)
* cdn с файлами
* vps в digitalocean с 4 озу (билд тяжёлый из-за three.js) + полный цикл Ci/Cd (пуш в гитхаб приводит к полному обновлению сервера через GitHub Actions)
* Front (само приложение VK - сайт, без альтернатив) - React (из-за возможности пользоваться из коробки менеджерами состояний и кучей других плюшек) + Next.js поверх React для ssr, ssg и много другого. + React-three-fiber (аналог Three.js но для jsx). + TailwindCSS - увеличивает скорость написания стилей в 2 раза. Уменьшает размер итогового билда также на 50%.
* Всё очень технологичное, коммерчески продукт достаточно хороший.

## Художественное исполнение + сюжет - маскот - Пермский Медведь, именно он взаимодействует напрямую с пользователем своим промо-роликом. Также весь дизайн схож с реальным событием Пермь300. 

## Геймплей как 2D простейшие тесты, так и 3D панорамы, а также свой собственный майнкрафт.

## Пожалуйста, напишите нам если хотите посмотреть игру с айфона, мы добавим ваш ВК в список тестировщиков и Вас не будут мучать поля сверху и снизу. 
Почему так? - Ответ: Для того чтобы оно не отображалось надо отправить ODR архив, который проверяет Apple, поидее у нас всё есть но в временных рамках хакатона это невозможно, поэтому чтобы увидеть максимум нашего приложения с айфона - напишите нам. ХОТЯ В ЦЕЛОМ ОНО ИТАК ОТКРЫВАЕТСЯ И РАБОТАЕТ.

## Команда - Кофеин внутривенно

Участники:\
Виталий Сухоплечев - ученик 11В 146 школы, более года я - senior frontend во всероссийской компании [riverbook.ru](https://riverbook.ru). Общий опыт программирования почти 8 лет, около 2 крупных коммерческих проекта.\
Радик Григорян - ученик 11И 10 лицея, более двух лет опыта создания 3D моделей.



## Техническая информация для тех кто захочет запустить у себя (необязательно к просмотру):

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/pagenpm install socket.io.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```
server {
        listen 443 ssl http2;
        server_name m.perm300.tech prod.perm300.tech;

        ssl_certificate          /root/perm300.crt;
        ssl_certificate_key      /root/perm300.key;

       location / {
               proxy_set_header   X-Forwarded-For $remote_addr;
               proxy_set_header   Host $http_host;
               proxy_pass         http://127.0.0.1:3088;
       }

}

server {
        listen 443 ssl http2;
        server_name api.perm300.tech;

        ssl_certificate          /root/perm300.crt;
        ssl_certificate_key      /root/perm300.key;

       location / {
               proxy_set_header   X-Forwarded-For $remote_addr;
               proxy_set_header   Host $http_host;
               proxy_pass         http://127.0.0.1:3050;
       }

}
```
