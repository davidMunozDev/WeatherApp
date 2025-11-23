const fs = require('fs');
const path = require('path');

const envDir = path.join(__dirname, '../src/environments');
const envFile = path.join(envDir, 'environment.ts');

// Crear el directorio si no existe
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Obtener la API key de las variables de entorno
const apiKey = process.env.NG_APP_OPENWEATHER_API_KEY || '';

// Contenido del archivo environment.ts
const envContent = `export const environment = {
  production: true,
  openWeatherApiKey: '${apiKey}'
};
`;

// Escribir el archivo
fs.writeFileSync(envFile, envContent);
console.log('✅ Environment file generated successfully');
