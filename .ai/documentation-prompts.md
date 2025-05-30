# Инструкции для ИИ-агентов по автоматическому документированию

## Автоматическое предложение обновления документации

Когда ты работаешь над проектом, проверяй наличие файла `.ai/pending-documentation-updates.md`. Если он существует, прочитай его и предложи пользователю обновить документацию.

Пример сообщения для пользователя:

```
Я обнаружил, что проект достиг важного этапа разработки (или сработали триггеры обновления документации):
- [Причина 1 из pending-documentation-updates.md]
- [Причина 2 из pending-documentation-updates.md]

Предлагаю обновить документацию проекта. Хотите, чтобы я выполнил следующие обновления:
1. [Действие 1 из pending-documentation-updates.md]
2. [Действие 2 из pending-documentation-updates.md]
3. [Действие 3 из pending-documentation-updates.md]

Я могу сделать это прямо сейчас. Вам нужно только подтвердить изменения после их выполнения.
(Для подтверждения, скажите "да, выполнить [список действий]" или "да, выполнить все")
```

## Мониторинг важных изменений (Проактивное инициирование)

Во время работы с проектом, если ты вносишь изменения, которые соответствуют следующим критериям, проактивно предлагай обновить документацию, даже если файл `.ai/pending-documentation-updates.md` не был сгенерирован:

1.  **Новые компоненты**: Когда создается новый значимый компонент (React, модуль, сервис и т.д.), автоматически предложи создать для него документацию (`.md` файл) и метаданные (`.metadata.json`).
    *   *Промпт для себя*: "Я создал новый компонент X. Нужно ли создать для него документацию и метаданные?"
    *   *Предложение пользователю*: "Я создал новый компонент X. Предлагаю создать для него базовую документацию и файл метаданных. Это поможет в дальнейшем его использовании и поддержке. Хотите продолжить?"

2.  **Изменения API**: При изменении публичных интерфейсов API (например, в `src/app/api/`) или структур данных, которые они используют, предложи обновить соответствующую документацию API.
    *   *Промпт для себя*: "Я изменил эндпоинт Y / структуру данных Z. Нужно ли обновить документацию API?"
    *   *Предложение пользователю*: "Я внес изменения в API эндпоинт Y. Предлагаю обновить его документацию, чтобы отразить новые параметры/ответ. Продолжить?"

3.  **Архитектурные изменения**: При внесении изменений, которые могут повлиять на общую архитектуру проекта (например, добавление новой ключевой зависимости, изменение основного потока данных, реструктуризация модулей), предложи создать ADR (Architecture Decision Record).
    *   *Промпт для себя*: "Это изменение (например, добавление библиотеки X) является архитектурно значимым. Нужно ли создать ADR?"
    *   *Предложение пользователю*: "Внесенное мной изменение (описание изменения) является архитектурно значимым. Предлагаю создать ADR для его документирования. Это поможет команде понимать принятые решения в будущем. Создать шаблон ADR?"

4.  **Завершение задач**: После завершения значительной пользовательской задачи (определяется по контексту диалога или по нескольким связанным коммитам), предлагай обновить журнал прогресса.
    *   *Промпт для себя*: "Задача Z выглядит завершенной. Нужно ли обновить журнал прогресса?"
    *   *Предложение пользователю*: "Мы завершили работу над задачей Z. Предлагаю обновить журнал прогресса, чтобы зафиксировать это. Сгенерировать запись?"

## Формат предложений и обновлений

При предложении обновлений документации:

1.  Объясни, какой чекпоинт был обнаружен (если применимо) или какая причина для обновления, и почему это важно.
2.  Перечисли конкретные файлы, которые будут изменены/созданы.
3.  Опиши кратко, какая информация будет добавлена или изменена.
4.  Всегда спрашивай подтверждение пользователя перед внесением изменений в файлы документации.
5.  После выполнения одобренных действий, покажи пользователю список измененных файлов и предложи их просмотреть.

## Проактивное документирование в коде (JSDoc/TSDoc)

Во время работы над кодом, автоматически и без дополнительного запроса документируй:

1.  **Функции и методы**: Добавляй JSDoc/TSDoc комментарии ко всем новым или значительно измененным публичным функциям и методам. Описывай назначение, параметры (`@param`), возвращаемое значение (`@returns`) и приводи `@example` если это уместно.
2.  **React Компоненты**: Добавляй JSDoc/TSDoc к компонентам, описывая их назначение. Для пропсов используй TypeScript интерфейсы/типы и добавляй комментарии к каждому свойству типа/интерфейса.
3.  **Сложные участки кода**: Если реализуешь сложный алгоритм или нетривиальную логику, добавляй поясняющие комментарии непосредственно в код.

## Формат коммит-сообщений для документации

Когда ты выполняешь коммит с изменениями, затрагивающими **только** документацию (например, после запуска скриптов или ручного редактирования .md файлов), используй следующий формат:

```
docs: [тип изменения] [что именно изменено]

[Краткое описание изменений, если необходимо]

[Причина изменений или ссылка на чекпоинт/задачу, если применимо]
```

Например:
```
docs: update auth-form metadata and docs

- Added detailed props documentation for AuthForm component.
- Generated initial markdown file using code-structure-extractor.

Triggered by: new_component_added checkpoint.
```

Если изменения в документации идут вместе с изменениями кода в одном коммите, то тип коммита должен отражать основное изменение кода (например, `feat`, `fix`), а в теле коммита можно указать, что документация также была обновлена.
Например:
```
feat(auth): implement password recovery feature

- Added password recovery API endpoint and UI flow.
- Updated AuthForm component documentation and metadata.
- Created ADR for password recovery email service selection.
