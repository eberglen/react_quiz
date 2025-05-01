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

## How to use

1. Select an activity by clicking it
2. Answer true or false to the questions prompted
3. You will see the result page after answering all the questions in the activity
4. In the result page, click Home button to return to the screen
5. In the home screen, click the reload icon button to reset your progress

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

If the file gets too big, for example in quizSlice, we can extract the functions or methods and divide it into smaller
files per question type.

## Test Cases

- Clicking an activity with questions should navigate you to the question screen
- Clicking an activity with rounds should navigate you to round screen then question screen
- Answering a question should navigate you to the next question
- Answering the last question in a question type should navigate you to the result screen
- Answering the last question in a round type should navigate you to the next round
- Accessing the result screen without completing the activity should navigate you back to the home screen
- Accessing a page with invalid parameter should navigate you back to the home screen
- Accessing a non-existing page should show the 404 error page
- Exiting an unfinished activity, then going back should resume you to your current progress
- Clicking a completed activity should navigate you to the result screen
- Clicking home in the result screen should navigate you to the home screen
- Clicking refresh icon button in home screen should reset your progress on all the activities

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)
  uses [SWC](https://swc.rs/) for Fast Refresh

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

You can also
install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x)
and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom)
for React-specific lint rules:

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
