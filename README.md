# Librería API

Este proyecto representa una prueba técnica para el consumo de sus servicios API Rest.

Cuenta con un pequeño módulo de autenticacion `stateless` usando JWT.
En primera instancia decidí rápido y eficiente, aunque cuenta con algunos pros y contras pero para este caso, está bien.

Hay un archivo llamado `routes.json` los cuales se llaman desde la app para crear las rutas y al _"vuelo"_ en base a una variable se decide si la ruta está protegida por autenticación o no.

## Usuario
```
username: admin
password: master
```


## Variables
Crear archivo `.env` si es que no está, basado en el `.env.example`
```
cp -rfv .env.example .env
```

## Base de datos

La estructura de la base de datos está en un archivo `.sql`, el cual se puede ejecutar
usando la línea de comandos de SQLite.

Se debe de tener instalado en el path del sistema el ejecutable de `sqlite3`.

## Crear estructura de base de datos
Dentro de la carpeta `database`, en una terminal, ejecutar el siguiente comando:
```
sqlite3 mydb.sqlite < db.sql
```

## Instalar las dependencias
```
npm install
```

## Ejecutar servidor
```
npm run dev
```