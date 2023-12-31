# Progress-Taxation

Simple blog created using React.js & Node.js

### Prerequisites

Make sure you have these installed on your machine

- [Node.js](https://nodejs.org/en/download/)
- [Python](https://www.python.org/about/gettingstarted/)
- **npm**, **python** This comes with Node.js, but make sure you check if you have it anyway

### Installing packages

Install backend packages

```
cd backend/
python -m venv env
activate
pip install -r packages.txt
```

Install frontend packages

```
cd frontend/
yarn install
```

### Running the app

To run the app (dev. mode)

```
cd backend
python manage.py makemigrations
python manage.py migrate
python mange.py runserver

cd frontend
yarn start
```

## Attaching the db.sqlite for your reference

```
for signin you can also use
username: digb,
password: Mypass@123

OR

you can register on you own by creating your account
```

## Built With

- [Django Rest Framework](https://www.django-rest-framework.org/tutorial/quickstart/) - The backend framework used
- [React Typescript](https://create-react-app.dev/docs/adding-typescript/) - The frontend framework used
<!-- * [MySql](https://www.mysql.com/) - Database platform used -->
