# GitHub Actions - Configuración de Despliegue

## ✅ Lo que ya está configurado

1. **Secretos en GitHub** (Ya los configuraste):
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_PUBLISHABLE_KEY`
   - `VITE_FIREBASE_URL`

2. **Workflow de GitHub Actions** (`.github/workflows/deploy.yml`):
   - Se ejecuta automáticamente cuando haces push a la rama `main`
   - También se puede ejecutar manualmente desde la pestaña "Actions"
   - Construye el proyecto con tus variables de entorno
   - Despliega automáticamente a GitHub Pages

## 🚀 Cómo usar

### Opción 1: Push automático
Simplemente haz push a la rama `main`:
```bash
git add .
git commit -m "tu mensaje"
git push origin main
```

### Opción 2: Ejecución manual
1. Ve a tu repositorio en GitHub
2. Click en la pestaña "Actions"
3. Selecciona "Deploy to GitHub Pages" en la lista de workflows
4. Click en "Run workflow"
5. Selecciona la rama y click en "Run workflow" verde

## 📋 Pasos necesarios en GitHub (si no los has hecho)

### 1. Habilitar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Click en "Settings" (Configuración)
3. En el menú lateral, click en "Pages"
4. En "Source", selecciona "GitHub Actions"
5. Guarda los cambios

### 2. Verificar permisos de Actions
1. Ve a "Settings" → "Actions" → "General"
2. En "Workflow permissions", asegúrate de que esté seleccionado:
   - "Read and write permissions" ✅
3. Marca la casilla "Allow GitHub Actions to create and approve pull requests"
4. Guarda los cambios

## 🔍 Monitoreo del despliegue

Después de hacer push o ejecutar manualmente:
1. Ve a la pestaña "Actions" en GitHub
2. Verás el workflow ejecutándose
3. Click en el workflow para ver los detalles
4. Una vez completado (✅), tu sitio estará disponible en:
   `https://tuusuario.github.io/academi-co-plus-50020/`

## 🛠️ Estructura del workflow

El workflow hace lo siguiente:
1. **Build Job**:
   - Descarga el código
   - Instala Node.js 20
   - Instala dependencias con yarn
   - Construye el proyecto con las variables de entorno secretas
   - Prepara los archivos para despliegue

2. **Deploy Job**:
   - Despliega los archivos construidos a GitHub Pages
   - Genera una URL pública

## 📝 Notas importantes

- El directorio de salida está configurado en `docs` (según tu `vite.config.ts`)
- El base path está configurado como `/academi-co-plus-50020/`
- Las variables de entorno se inyectan durante el build desde los secrets
- El archivo `.nojekyll` fue agregado para evitar problemas con GitHub Pages

## 🐛 Solución de problemas

### El workflow falla
- Verifica que los secretos estén correctamente configurados en GitHub
- Revisa los logs del workflow en la pestaña Actions
- Asegúrate de que `yarn.lock` esté en el repositorio

### El sitio no se actualiza
- Espera unos minutos después del despliegue
- Limpia el caché del navegador (Ctrl+Shift+R o Cmd+Shift+R)
- Verifica que GitHub Pages esté habilitado correctamente

### Errores de build
- Revisa que todas las dependencias estén en `package.json`
- Verifica que los nombres de las variables de entorno sean correctos
- Asegúrate de que el código compile localmente primero
