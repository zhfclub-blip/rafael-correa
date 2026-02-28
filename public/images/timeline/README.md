# Imágenes de la línea de tiempo

Coloca aquí las imágenes de cada evento (JPG, PNG o WebP).

## Cómo asignar una imagen a un evento

1. **Guarda la imagen** en esta carpeta, por ejemplo: `eleccion-2006.jpg`.

2. **Edita** `data/timeline.json` y en el evento correspondiente pon la ruta en el campo `"imagen"`:

   ```json
   {
     "id": "1",
     "titulo": "Elección presidencial 2006",
     "fecha": "2006-11-26",
     "descripcion": "...",
     "tipo": "politico",
     "imagen": "/images/timeline/eleccion-2006.jpg"
   }
   ```

   La ruta debe empezar por `/` y es relativa a la carpeta `public`.

3. **URL externa:** también puedes usar una URL completa:

   ```json
   "imagen": "https://ejemplo.com/foto.jpg"
   ```

Si `"imagen"` está vacío (`""`), se mostrará un icono de placeholder.
