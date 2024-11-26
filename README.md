## Shipment Manager API

### Features

- User management (create, update, delete)
- Shipment management (create, update, delete, filter by type)
- Shipment Item management (create, update, delete, list items of a shipment)
- Task management (create, update, delete, list tasks by user)

### Requirements

- Docker engine version 27+ (proper work with other version is can not be guarantied)

- Node.js verison 22+

## Set up the project locally

1. Clone the repo

```
git clone https://github.com/s-velikov1/shipment-manager.git
```

2. Navigate to the project directory

```
cd shipment-manager
```

3. Create .env file according to the example

```
# Use editor according to your convinience
vim .env
```

Example:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=testuser
DB_PASSWORD=testpassword
DB_NAME=testdb
```

4. Install dependencies

```
npm install
```

5. Start PostreSQL db in docker

```
docker compose -f docker-compose-postgres-only.yml up --build
```

6. Run the application in dev mode

```
npm run start:dev
```

Application will be available under:
http://localhost:3000/

## Run the application

1. Clone the repo

```
git clone https://github.com/s-velikov1/shipment-manager.git
```

2. Navigate to the project directory

```
cd shipment-manager
```

3. Create .env file according to the example

```
# Use editor according to your convinience
vim .env
```

Example:

```
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=testuser
DB_PASSWORD=testpassword
DB_NAME=testdb
```

4. Run the app

```
docker compose up --build
```

## API HLD Mind Map

~[API Endpoints Mind Map](images/Shipment_manager.png)

## DB relations

~[DB relations](images/DB_relations.png)
