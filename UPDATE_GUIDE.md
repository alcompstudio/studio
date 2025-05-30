# Руководство по обновлению веб-приложения "studio" на сервере

## Пошаговая инструкция обновления (интерактивный режим)

### Шаг 1. Подготовка

1. Откройте терминал на вашей локальной машине в директории проекта.
2. Проверьте, что все изменения закоммичены и протестированы.
3. Подключение к серверу по SSH:

   **Пошаговая инструкция для Windows:**
   1. Нажмите клавишу Win (или кнопку "Пуск") на клавиатуре.
   2. Введите `cmd` и нажмите Enter — откроется "Командная строка" (черное окно).
   3. В открывшемся окне напечатайте команду:
      ```
      ssh deployuser@157.180.87.32
      ```
      и нажмите Enter.
   4. Если появится вопрос "Are you sure you want to continue connecting (yes/no/[fingerprint])?" — напечатайте `yes` и нажмите Enter.
   5. Если всё настроено правильно, вы увидите приглашение сервера (например, `deployuser@studio-app-server:~$`).

   **Пошаговая инструкция для MacOS/Linux:**
   1. Откройте приложение "Терминал" (обычно через поиск Spotlight или меню приложений).
   2. Введите команду:
      ```
      ssh deployuser@157.180.87.32
      ```
      и нажмите Enter.
   3. Дальнейшие шаги аналогичны Windows.

4. Проверка актуальности файла .env на сервере:

   - После подключения к серверу выполните по одной команде (скопируйте каждую строку по очереди и вставьте в терминал):

   ```bash
   cd /var/www/studio_app
   ```

   ```bash
   cat .env
   ```

   - Сравните вывод с актуальными переменными вашего проекта.
   - Чтобы отредактировать файл, выполните:

   ```bash
   nano .env
   ```

   - После редактирования:
     - Для выхода из nano нажмите Ctrl+X
     - Затем Y (Yes)
     - Затем Enter

**Выполняйте команды по одной строке. Сообщите, если всё готово или возникли трудности.**

---

### Шаг 2. Проверка скрипта обновления

1. Проверьте наличие файла `scripts/deploy.sh` в проекте.
2. Сделайте скрипт исполняемым (однократно):

   ```bash
   chmod +x scripts/deploy.sh
   ```

3. Сообщите, выполнено ли это действие или возникли трудности.

---

### Шаг 3. Запуск автоматического обновления

1. Запустите скрипт обновления:

   ```bash
   ./scripts/deploy.sh
   ```

2. Следите за выводом в терминале. Если появятся ошибки — скопируйте их и сообщите.
3. После завершения скрипта убедитесь, что приложение работает на сервере.

**Пример вывода:**
- Если видите сообщения вроде `Процесс обновления приложения на сервере успешно завершен.` — обновление прошло успешно.
- Если появляются ошибки (например, `relation "users" already exists` или `Cannot stat: No such file or directory`), зафиксируйте их текст ниже и обратитесь к разделу "Возможные проблемы и решения".

**Сообщите о результате выполнения этого шага.**

---

### Шаг 4. Проверка результата

1. Откройте приложение в браузере по адресу:  
   `http://157.180.87.32:3000`
2. Проверьте, что все основные функции работают корректно.
3. Если страница не открывается — попробуйте другой браузер или устройство (иногда проблема связана с кэшем или прокси).
4. Если сайт открывается только в другом браузере — очистите кэш или используйте рабочий браузер для дальнейшей работы.
5. Если есть другие проблемы — опишите их и приложите логи.

---

### Шаг 5. Документирование

- После каждого шага фиксируйте результат (успех/ошибка, особенности) в этом файле.
- Если возникли трудности — опишите их и решения.

---

## Пример успешного обновления

- Все шаги выполнены по инструкции.
- Ошибка "Failed to fetch projects from API" устранена после добавления столбца price в таблицу orders.
- После перезапуска приложения и проверки API данные успешно возвращаются.
- В браузере страница /projects открывается и отображает проекты.
- Обновления работают как на локальной машине, так и на сервере.

---

## Важные замечания

- **.env**: Не включайте файл .env в архив! Все секреты должны храниться только на сервере.
- **Миграции**: Если миграция уже была применена вручную, удалите или переименуйте соответствующий файл миграции, чтобы избежать ошибок "column already exists".
- **Архив**: После обновления архив автоматически удаляется на сервере и локально.
- **Ошибки**: При ошибках сборки, копирования или миграций скрипт завершится с ошибкой и выведет причину.

## Возможные проблемы и решения

- **Ошибка миграции**: Если поле уже существует — удалите или отметьте миграцию как выполненную.
- **Проблемы с зависимостями**: Убедитесь, что package.json и package-lock.json актуальны.
- **Проблемы с SSH**: Проверьте настройки ключей и права доступа.

## Безопасность

- Не храните секретные данные в репозитории.
- Используйте только защищённые соединения для деплоя.

## История изменений

- Фиксируйте все изменения и особенности обновления в этом файле для будущих администраторов.
