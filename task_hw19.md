Task_1 Реализовать business и core слои во фреймворке для логин функциональности:
1. Написать Page Object класс для страницы Sign In:
  - email input
  - password input
  - login button
  - fillCredentials method
  - click on login button method

2. Написать PageService класс для SignIn, реализующий следующие методы:
  - login() (fillCredentials, click on login button, wait for spinner to hide)
  - loginAsAdmin(), который логинит используя учетные данные aqacourse@gmail.com / password

3. Сделать Core и Business классы для Home page

Task_2 Разработать е2е тест со следующими шагами:
 - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
 - Войти в приложения используя учетные данные aqacourse@gmail.com / password 
 - Создать продукт (модуль Products)
 - Верифицировать текст нотификации и закрыть кликнув на крестик
 - Открыть модалку Details для созданного продукта
 - Верифицировать данные в модалке
 - Закрыть модалку
 - Удалить продукт через ui

Рекоммендации:
 - Создайте Page Objects для модалок
 - Добавьте бизнес методы взаимодействия с модалками в ProductsService
 - Создайте метод(-ы) для работы с нотификациями (получить текст успешной нотификации, заверифицировать его с ожидаемым, закрыть нотификацию)
 
 Дополнительно: 
 Обратите внимание на схожесть модалок между собой,
   и, если найдете схожее, вынесите эти вещи на уровень выше, в класс от которого будут наследоваться конечные ПО модалок
