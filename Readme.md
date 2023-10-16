# Backend

Create API in Node.js

## Copy .env.example to .env
```bash
cp .env.example .env
```

Add the database configuration to the .env file
```bash
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=
DB_DIALECT=mysql

SENSIBULL_API_URL=
```


## Installation

Install the Node packages.

```bash
npm install
```

Migrate Database
```bash
npx sequelize-cli db:migrate
```

Start Server
```bash
npm run start:dev
```

## License

Copyright by [Sanket Jariwala](https://github.com/sanketJariwala9464) 2023. [MIT](https://choosealicense.com/licenses/mit/)
