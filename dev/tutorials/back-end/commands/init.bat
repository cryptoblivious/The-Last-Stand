yarn
yarn init -y
tsc --init
yarn add mongodb express mongoose
yarn add -D ts-node typescript nodemon dotenv eslint cors eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-prettier eslint-plugin-import prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser @types/cors @types/express @types/node@*
./node_modules/.bin/ ts-node src/server.ts
./node_modules/.bin/ nodemon src/server.ts