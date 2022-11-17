# rss-tracker-client

For full info on the project and documentation, see the [server side repo](https://github.com/ShlomoCode/rss-tracker-server).

this is the client side of the project, it is a Vue.js and Vuetify app.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Git hooks

-  `pre-commit` - runs lint on staged files

### Env variables

-  `VITE_API_URL` - the url of the server side of the project. if not set, defaults the relative path `/api` on root of the domain.