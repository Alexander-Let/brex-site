export type Locale = 'en' | 'ru'

type Capability = { title: string; detail: string }

type Messages = {
  metaDescription: string
  nav: {
    why: string
    language: string
    examples: string
    install: string
    docs: string
    github: string
    openMenu: string
    closeMenu: string
    primary: string
  }
  langToggle: {
    toRu: string
    toEn: string
    aria: string
  }
  hero: {
    brand: string
    headline: string
    sub: string
    install: string
    docs: string
    mascotAlt: string
  }
  why: {
    title: string
    intro: string
    problem: string
    capabilitiesTitle: string
    capabilities: Capability[]
    namingTitle: string
    naming: string
    goalTitle: string
    goal: string
    mascotAlt: string
  }
  language: {
    title: string
    lead: string
    keywordsAria: string
    selectHint: string
    guide: string
    grammar: string
    defs: Record<string, string>
  }
  examples: {
    title: string
    lead: string
    tabsAria: string
    simple: string
    block: string
    runBuild: string
    building: string
    waiting: string
    steps: string[]
  }
  install: {
    title: string
    lead: string
    fromSource: string
    quickStart: string
    releases: string
  }
  github: {
    title: string
    lead: string
    viewRepo: string
    license: string
  }
  footer: {
    tagline: string
    docs: string
    project: string
    legal: string
    english: string
    russian: string
    releases: string
  }
  code: {
    copy: string
    copied: string
  }
}

export const messages: Record<Locale, Messages> = {
  en: {
    metaDescription:
      'Brex is a compilable instruction language for AI coding agents. Write a spec, get IR, Markdown prompts, and policy.',
    nav: {
      why: 'Why',
      language: 'Language',
      examples: 'Examples',
      install: 'Install',
      docs: 'Docs',
      github: 'GitHub',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      primary: 'Primary',
    },
    langToggle: {
      toRu: 'RU',
      toEn: 'EN',
      aria: 'Switch site language',
    },
    hero: {
      brand: 'Brex',
      headline: 'Write structured prompts like code for AI agents.',
      sub: 'Write prompts like code. Execute ideas with AI.',
      install: 'Install',
      docs: 'Docs',
      mascotAlt:
        'Brex mascot: a shoebill stork at a desk with a laptop, lamp, and books, in a vintage cartoon style',
    },
    why: {
      title: 'Why Brex?',
      intro:
        'Brex is a language for writing structured, detailed, and unambiguous prompts for AI agents. Instead of free-form chat, you describe the job as a program: structure, logic, context, limits, and the expected result.',
      problem:
        'Ordinary prompts turn into long text walls that are hard to maintain, reuse, or analyze. Brex offers a declarative syntax for how an agent should behave, so work with LLMs stays more predictable and easier to automate.',
      capabilitiesTitle: 'What you get',
      capabilities: [
        {
          title: 'Clear structure instead of chaotic prose',
          detail:
            'Specs break work into roles, rules, tasks, and gates so nothing important hides in a paragraph.',
        },
        {
          title: 'Reusable templates and components',
          detail:
            'Packs and imports let you share security rules, stacks, and workflows across projects.',
        },
        {
          title: 'Explicit constraints and rules',
          detail:
            'ALLOW, FORBID, BUDGET, and RULE! make boundaries machine-checkable before the agent runs.',
        },
        {
          title: 'Tighter interpretation by AI agents',
          detail:
            'Compiled IR and Markdown prompts reduce guesswork about order, ownership, and done criteria.',
        },
        {
          title: 'Ready for automation',
          detail:
            'The same file feeds CLI, CI hooks, drift checks, and prompt generation without rewriting chat.',
        },
      ],
      namingTitle: 'Why the name?',
      naming:
        'The name blends B (from the shoebill) and Rex (Latin for king). The shoebill is known for patience and precision: it watches, then makes one clean move. That is the language idea: less ambiguity, more accuracy.',
      goalTitle: 'The goal',
      goal:
        'Build a universal task language for AI that sits between people and language models, as natural as SQL for databases or HTML for the web.',
      mascotAlt:
        'Brex mascot: a shoebill stork standing and typing on a laptop in a 1930s cartoon style',
    },
    language: {
      title: 'The language',
      lead: 'Click a keyword to see what it does. Matching tokens light up in the sample spec.',
      keywordsAria: 'Brex keywords',
      selectHint: 'Select a keyword above to inspect it.',
      guide: 'Language guide',
      grammar: 'Grammar reference',
      defs: {
        PROJECT: 'Names the workspace and anchors the rest of the spec.',
        ROLE: 'Defines who the agent is and what it is allowed to do.',
        RULE: 'Adds a constraint the agent must follow while working.',
        GOAL: 'States success criteria the build should satisfy.',
        TASK: 'A unit of work with agent, artifacts, and gates.',
        GATE: 'A check that proves a task is done (often a command).',
        FILE: 'Declares an artifact path the agent may produce.',
        STACK: 'Lists languages and tools expected in the project.',
      },
    },
    examples: {
      title: 'Examples',
      lead: 'Pick a spec, then run a mock build to see the prompt style Brex would emit.',
      tabsAria: 'Example specs',
      simple: 'Simple syntax',
      block: 'Block form',
      runBuild: 'Run build',
      building: 'Building',
      waiting: 'Output appears here after you run build.',
      steps: ['check syntax', 'resolve refs', 'emit IR', 'write prompts'],
    },
    install: {
      title: 'Install',
      lead: 'Build the CLI from the repo, or grab binaries from GitHub Releases for linux, mac, and windows.',
      fromSource: 'From source',
      quickStart: '30-second start',
      releases: 'GitHub Releases',
    },
    github: {
      title: 'Open source',
      lead: 'Brex lives on GitHub: compiler, LSP, examples, and bilingual docs. Star the repo, open an issue, or ship a pack.',
      viewRepo: 'View repo',
      license: 'Apache-2.0 license',
    },
    footer: {
      tagline: 'Write prompts like code. Execute ideas with AI.',
      docs: 'Docs',
      project: 'Project',
      legal: 'Legal',
      english: 'English',
      russian: 'Русский',
      releases: 'Releases',
    },
    code: {
      copy: 'Copy',
      copied: 'Copied',
    },
  },
  ru: {
    metaDescription:
      'Brex - компилируемый язык инструкций для AI-агентов. Пишете спецификацию, получаете IR, Markdown-промпты и policy.',
    nav: {
      why: 'Зачем',
      language: 'Язык',
      examples: 'Примеры',
      install: 'Установка',
      docs: 'Документация',
      github: 'GitHub',
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
      primary: 'Основная',
    },
    langToggle: {
      toRu: 'RU',
      toEn: 'EN',
      aria: 'Переключить язык сайта',
    },
    hero: {
      brand: 'Brex',
      headline: 'Пишите структурированные промпты как код для AI-агентов.',
      sub: 'Пишите промпты как код. Запускайте идеи с AI.',
      install: 'Установка',
      docs: 'Документация',
      mascotAlt:
        'Маскот Brex: китоглав за столом с ноутбуком, лампой и книгами в стиле мультфильма 1930-х',
    },
    why: {
      title: 'Зачем Brex?',
      intro:
        'Brex - язык для структурированных, детальных и однозначных промптов для AI-агентов. Вместо свободного чата вы описываете задачу как программу: структура, логика, контекст, ограничения и ожидаемый результат.',
      problem:
        'Обычные промпты превращаются в длинные текстовые стены, которые сложно поддерживать, переиспользовать и анализировать. Brex даёт декларативный синтаксис поведения агента, чтобы работа с LLM была предсказуемее и удобнее для автоматизации.',
      capabilitiesTitle: 'Что вы получаете',
      capabilities: [
        {
          title: 'Ясная структура вместо хаотичного текста',
          detail:
            'Спека раскладывает работу на роли, правила, задачи и гейты, чтобы важное не тонуло в абзаце.',
        },
        {
          title: 'Повторное использование шаблонов',
          detail:
            'Пакеты и импорты позволяют делиться правилами безопасности, стеками и сценариями между проектами.',
        },
        {
          title: 'Явные ограничения и правила',
          detail:
            'ALLOW, FORBID, BUDGET и RULE! делают границы проверяемыми компилятором до запуска агента.',
        },
        {
          title: 'Более точная интерпретация агентами',
          detail:
            'IR и Markdown-промпты уменьшают угадывание порядка, ответственности и критериев готовности.',
        },
        {
          title: 'Готовность к автоматизации',
          detail:
            'Один файл кормит CLI, CI-хуки, drift-проверки и генерацию промптов без переписывания чата.',
        },
      ],
      namingTitle: 'Почему такое имя?',
      naming:
        'Название сочетает B (от shoebill, китоглава) и Rex (король на латыни). Китоглав известен терпением и точностью: он наблюдает, затем делает одно чистое движение. Так и идея языка: меньше неоднозначности, больше точности.',
      goalTitle: 'Цель',
      goal:
        'Создать универсальный язык описания задач для AI, промежуточный слой между человеком и языковыми моделями, такой же естественный, как SQL для баз данных или HTML для веба.',
      mascotAlt:
        'Маскот Brex: китоглав стоит и печатает на ноутбуке в стиле мультфильма 1930-х',
    },
    language: {
      title: 'Язык',
      lead: 'Нажмите на ключевое слово, чтобы увидеть, что оно делает. Совпадающие токены подсветятся в примере.',
      keywordsAria: 'Ключевые слова Brex',
      selectHint: 'Выберите ключевое слово выше, чтобы посмотреть описание.',
      guide: 'Руководство по языку',
      grammar: 'Справка по грамматике',
      defs: {
        PROJECT: 'Именует проект и задаёт якорь для остальной спецификации.',
        ROLE: 'Описывает, кто такой агент и что ему разрешено делать.',
        RULE: 'Добавляет ограничение, которому агент должен следовать в работе.',
        GOAL: 'Задаёт критерии успеха, которым должен удовлетворять результат.',
        TASK: 'Единица работы с агентом, артефактами и гейтами.',
        GATE: 'Проверка, что задача выполнена (часто команда).',
        FILE: 'Объявляет путь артефакта, который агент может создать.',
        STACK: 'Перечисляет языки и инструменты проекта.',
      },
    },
    examples: {
      title: 'Примеры',
      lead: 'Выберите спеку и запустите учебный build, чтобы увидеть стиль промпта, который выдаст Brex.',
      tabsAria: 'Примеры спецификаций',
      simple: 'Простой синтаксис',
      block: 'Блочная форма',
      runBuild: 'Запустить build',
      building: 'Сборка',
      waiting: 'Результат появится здесь после build.',
      steps: ['проверка синтаксиса', 'резолв ссылок', 'emit IR', 'запись промптов'],
    },
    install: {
      title: 'Установка',
      lead: 'Соберите CLI из репозитория или скачайте бинарники из GitHub Releases для linux, mac и windows.',
      fromSource: 'Из исходников',
      quickStart: 'Старт за 30 секунд',
      releases: 'GitHub Releases',
    },
    github: {
      title: 'Open source',
      lead: 'Brex живёт на GitHub: компилятор, LSP, примеры и двуязычная документация. Поставьте звезду, откройте issue или пришлите pack.',
      viewRepo: 'Репозиторий',
      license: 'Лицензия Apache-2.0',
    },
    footer: {
      tagline: 'Пишите промпты как код. Запускайте идеи с AI.',
      docs: 'Документация',
      project: 'Проект',
      legal: 'Право',
      english: 'English',
      russian: 'Русский',
      releases: 'Релизы',
    },
    code: {
      copy: 'Копировать',
      copied: 'Скопировано',
    },
  },
}

export const KEYWORDS = Object.keys(messages.en.language.defs)
