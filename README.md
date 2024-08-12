## Description

This is a repository which has APIs ready for CRUD operations with MongoDB as database

## Installation

```bash
$ npm install
```

## Create .env file at root folder
Add DB_URI variable and provide mongoDB connection string (DB-Name: nest-product)

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Folder Structure
.
├── src                    
  ├── product                 
    ├── dto             
      ├── create-product.dto     
      ├── update-product.dto                   
    ├── schemas 
      ├── product.schema                   
    ├── product.controller    
    ├── product.module    
    ├── product.service   

## License

Nest is [MIT licensed](LICENSE).
