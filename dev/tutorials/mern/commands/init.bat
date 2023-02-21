yarn
yarn init -y
tsc --init
yarn add express
yarn add -D ts-node typescript nodemon eslint eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-prettier eslint-plugin-import prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser @types/express @types/node@* 
npx ts-node src/server.ts
npx nodemon src/server.ts