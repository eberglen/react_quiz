# React + TypeScript + Vite

## Setup

1. Install dependencies

```
npm install
```

2. Run

```
npm run dev
```

## Tech Stack

- **React** - UI Library
- **TypeScript** - Language
- **Redux Toolkit** - State Management
- **Tailwind** - Styling

## Features

- Currently supportes 2 types of activity: _Questions_ and _Rounds with Questions_
- Vertically scalable to support a varying number of activities
- Persists data in cases of unstable connection
- Protected routes and route validation

## Folder

`app` contains hooks and store from redux.

`components` contains React elements for reusability.

`features` contains the redux slices, API, and the component to display the fetched data.

`screens` contains whole pages that is visible to the user.

## User Flow

1. User lands in Home Page which displays the list of Activities. `screens\Home.tsx`
2. User clicks an activity. Check which flow should be used. `features\quiz\Quiz.tsx`
3. User goes through the rounds or questions. `screens\Question.tsx` `screens\Round.tsx`
4. User finishes and sees the result. `screens\Result.tsx`

## Scaling the Project

For a new type of question that needs to be added, we mainly want to add parsing of the data and defining the flow:

- `features/quiz/quizAPI.ts`
  - Add the new type structure
- `features/quiz/quizSlice.ts`
  - Update `extraReducers` to handle the parsing of the new type
  - Add selectors to retrieve properties from the new type
- `features/quiz/Quiz.tsx`
  - Add the initial flow of the new type
- `screens`
  - Add new screens if needed for the flow
  - Add conditions to dictate the flow

If the file gets too big, for example in quizSlice, we can extract the functions or methods and divide it into smaller files per question type.

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
