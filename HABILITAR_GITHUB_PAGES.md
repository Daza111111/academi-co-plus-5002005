# 🚀 Cómo Habilitar GitHub Pages - Guía Paso a Paso

## ⚠️ Error Actual

Estás viendo este error en GitHub Actions:
```
Error: Get Pages site failed. Please verify that the repository has Pages 
enabled and configured to build using GitHub Actions
```

**Causa:** GitHub Pages no está habilitado en tu repositorio.

---

## ✅ Solución en 6 Pasos

### PASO 1: Ir a tu repositorio
Ve a: https://github.com/Daza111111/academi-co-plus-50020

### PASO 2: Click en "Settings"
- Está en la barra superior del repositorio
- Entre "Insights" y el ícono de engranaje

### PASO 3: Ir a "Pages"
- En el menú lateral izquierdo
- Sección "Code and automation"
- Click en **"Pages"**

### PASO 4: Configurar "Build and deployment"
Esta es la parte MÁS IMPORTANTE:

1. Busca la sección **"Build and deployment"**
2. En **"Source"**, verás un dropdown
3. **SELECCIONA: "GitHub Actions"** ✅
4. **NO** selecciones "Deploy from a branch"

Debe quedar así:
```
Source: [GitHub Actions ▼]
```

### PASO 5: Verificar que se guardó
- La configuración se guarda automáticamente
- Deberías ver un mensaje de confirmación verde
- La página puede mostrar: "Your site is being built from the workflow"

### PASO 6: Re-ejecutar el workflow

**Opción A - Hacer un nuevo push:**
```bash
git commit --allow-empty -m "🔄 Reintentar deploy con Pages habilitado"
git push origin main
```

**Opción B - Re-ejecutar manualmente:**
1. Ve a la pestaña **"Actions"** en tu repositorio
2. Click en el workflow que falló (el más reciente)
3. Click en el botón **"Re-run all jobs"** (esquina superior derecha)
4. Confirma

---

## 🎯 Qué esperar después

1. **Inmediatamente:** El workflow comenzará a ejecutarse de nuevo
2. **En ~2-3 minutos:** El build debería completarse ✅
3. **Después del deploy:** Tu sitio estará disponible en:
   ```
   https://daza111111.github.io/academi-co-plus-50020/
   ```

---

## 🔍 Verificar que está habilitado correctamente

Vuelve a **Settings → Pages**. Deberías ver:

✅ **Correcto:**
```
Build and deployment
Source: GitHub Actions

✓ Your site is live at https://daza111111.github.io/academi-co-plus-50020/
```

❌ **Incorrecto:**
```
Build and deployment
Source: Deploy from a branch
Branch: main  /docs
```

Si ves lo incorrecto, cambia a "GitHub Actions".

---

## 🐛 Solución de Problemas

### Si el botón "GitHub Actions" no aparece:
1. Verifica que tengas permisos de administrador en el repositorio
2. Asegúrate de estar en la sección correcta (Settings → Pages)
3. Intenta refrescar la página

### Si sigue fallando después de habilitar Pages:
1. Espera 1-2 minutos después de habilitar Pages
2. Verifica que los **Secrets** estén configurados (Settings → Secrets and variables → Actions)
3. Verifica los permisos de Actions (Settings → Actions → General → Workflow permissions: "Read and write permissions")

### Si el sitio no carga después del deploy exitoso:
1. Espera 5 minutos (GitHub Pages puede tardar en propagar)
2. Limpia el caché del navegador (Ctrl+Shift+R o Cmd+Shift+R)
3. Verifica la URL completa: `https://daza111111.github.io/academi-co-plus-50020/`

---

## 📝 Checklist Final

Antes de reintentar, verifica:

- [ ] GitHub Pages está habilitado en Settings → Pages
- [ ] Source está configurado como "GitHub Actions"
- [ ] Los 3 secrets están configurados (VITE_FIREBASE_*)
- [ ] Workflow permissions están en "Read and write permissions"
- [ ] Has esperado al menos 30 segundos después de habilitar Pages

Si todos los checks están ✅, procede con el Paso 6 (re-ejecutar workflow).

---

## 🎉 Después del Deploy Exitoso

Una vez que el workflow termine exitosamente:

1. Ve a **Settings → Pages** - verás la URL de tu sitio
2. Click en "Visit site" o copia la URL
3. Tu web estará funcionando al 100% 🚀

¡Listo! 🎊
