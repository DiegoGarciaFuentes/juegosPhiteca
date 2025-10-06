# Logos de PHITECA

Este directorio está preparado para recibir los logos originales de PHITECA.

## 📋 INSTRUCCIONES PARA SUBIR LOGOS:

### 1. Sube tus archivos de logo aquí:
```
src/assets/images/logos/
```

### 2. Nombres sugeridos (puedes usar los que prefieras):
- `phiteca-logo-primary.svg` - Logo principal
- `phiteca-logo-white.svg` - Logo en blanco
- `phiteca-logo-dark.svg` - Logo en azul marino
- `phiteca-icon.svg` - Solo el icono/símbolo
- `phiteca-favicon.svg` - Favicon

### 3. Formatos soportados:
- ✅ SVG (recomendado)
- ✅ PNG
- ✅ JPG
- ✅ ICO (para favicon)

## 🔧 Uso en React:

Una vez subidos, el componente Logo los importará automáticamente:

```tsx
// El componente Logo ya está configurado para usar:
<Logo variant="primary" size="md" />  // Logo principal
<Logo variant="white" size="lg" />    // Logo blanco
<Logo variant="dark" size="sm" />     // Logo oscuro
<Logo variant="icon" size="md" />     // Solo icono
```

## 🎨 Colores de la paleta phiteca.es:
- **Primario**: #00303f (azul marino corporativo)
- **Acento**: #ffb41e (naranja dorado)
- **Secundario**: #cae4db (verde menta claro)
- **Terciario**: #bd7e00 (marrón dorado)
- **Complemento**: #7a9e96 (verde azulado)
- **Neutral**: #66868c (gris azulado)

## ⚠️ IMPORTANTE:
- Sube los logos originales tal como los tienes
- No los modifiques, el componente Logo se adaptará automáticamente
- Mantén la calidad original de los archivos
