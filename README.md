# trends-architecture
Repositorio para el curso de Tendencias de Arquitectura

## Docker
Ejecutar el contenedor de desarrollo con: `docker compose up`

## Credenciales de Firebase
Para acceder a Firebase, los miembros del equipo deben **descargar las credenciales desde el proyecto Firebase** en un archivo con extensión `.json`.  
Posteriormente, deben renombrarlo como `firebase.json` y colocarlo en la raíz del proyecto.

## Variable de entorno
En lo que respecta a la gestión de variables de entorno, es necesario que los miembros del equipo **creen un archivo** denominado `.env` en la raíz del proyecto.  
Dentro de este archivo, se debe definir la variable `GOOGLE_APPLICATION_CREDENTIALS` y asignarle la **ruta absoluta** al archivo `firebase.json` si se está trabajando en un entorno local.  
En caso de estar trabajando desde un contenedor, se debe asignar la ruta `/app/firebase.json` a esta variable.

`import sys`  
`import os`  
`proyecto_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))`  
`sys.path.append(proyecto_dir)`  
`from hola.hola import hola`  
`from mundo.mundo import mundo`  
`hola()`  
`mundo()`
