# WeatherApp 🌤️

Una aplicación web moderna para consultar el clima de ciudades de todo el mundo, construida con Angular 21.

## 🚀 Características

- 🔍 Búsqueda de ciudades en tiempo real
- 🌡️ Información meteorológica detallada (temperatura, humedad, viento, etc.)
- ⭐ Sistema de favoritos con persistencia en LocalStorage
- 📱 Diseño responsive con Tailwind CSS
- 🌍 Soporte multiidioma (español)

## 🔧 Instalación

1. **Clona el repositorio**

```bash
git clone https://github.com/davidMunozDev/WeatherApp.git
cd WeatherApp
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Configura tu API Key**

   a. Copia el archivo de ejemplo de environment:

   ```bash
   cp src/environments/environment.example.ts src/environments/environment.ts
   cp src/environments/environment.example.ts src/environments/environment.prod.ts
   ```

   b. Obtén tu API Key gratuita:

   - Ve a [OpenWeatherMap](https://openweathermap.org/api)
   - Crea una cuenta o inicia sesión
   - Ve a "API Keys" y genera una nueva key

   c. Abre `src/environments/environment.ts` y reemplaza `TU_API_KEY_AQUI` con tu API key:

   ```typescript
   export const environment = {
     production: false,
     openWeatherApiKey: 'tu_api_key_real_aqui',
   };
   ```

   d. Haz lo mismo en `src/environments/environment.prod.ts` para producción.

## ▶️ Ejecutar la aplicación

### Modo desarrollo

```bash
npm start
# o también
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

### Build para producción

```bash
npm run build
# o también
ng build
```
