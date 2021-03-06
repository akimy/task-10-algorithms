### Домашняя работа по алгоритмам и структурам данных
###### Условие выполнения
Необходимо было создать интерфейс который бы находил 10 улиц из большого массива данных (причем искал и по совпадению по подстроке в том числе)

> В качестве данных для работы использовался список улиц москвы продублированный трижды
###### Инструкция по установке
1. Склонируйте репозиторий
2. ```npm install```
3. ```npm run dev```  
Приложение будет доступно на localhost:8080  

###### Ссылка на демо
https://akimy.github.io/task-10-algorithms/

###### Emitter
Лежит в папке emitter, создан на базе двух хеш-таблиц, в коде есть комментарии к каждому методу

###### Оценка сложности алгоритма и процесс написания
Первый алгоритм - брутфорс. С каждым вводом символа в поисковую строку совершается обход массива и поиск в нем подстроки, что в сумме дает нам квадратичную сложность.  
Для решения проблемы со скоростью поиска был написан алгоритм создания хешкарты в которой ключами будут являтся все возможные варианты подстрок, а значениями - 10 элементов полных строк. Получилась примерно следующая структура данных.  
<img src="https://i.imgur.com/OdtEFJ3.jpg" width="380px">  
У алгоритма создания хешкарты сложность кубическая (n^3), но он может быть выполнен всего один раз и поставляться вместе с массивом данных (например с сервера). Из недостатков - нужно будет обновлять хеш-таблицу при добавлении новых улиц. Алгоритм поиска по улице с использованием хеш-таблицы (Map в javascript) дает нам амортизированное O(1) или O(log(n)) сложности;  
  
Для удобства взаимодействия с интерфейсом тяжелые операции по созданию хеш-таблиц и чистки строк были вынесены в сервис-воркеры. Первый алгоритм с квадратичной сложностью может работать сразу после загрузки страницы. Второй после того - как второй воркер отработает и сообщит об этом.
