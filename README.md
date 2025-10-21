# 🎮 JuegosPhiteca

Una colección de juegos educativos desarrollados con las tecnologías más modernas del desarrollo web. Plataforma educativa de PHITECA diseñada para aprender mientras te diviertes.

## 🚀 Tecnologías Utilizadas

- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS 3.4** - Framework de CSS utility-first
- **Vite 7** - Herramienta de construcción ultrarrápida
- **React Router DOM** - Navegación entre páginas

## 🎯 Características

- ✨ **Diseño Responsivo** - Se adapta perfectamente a todos los dispositivos
- 🎨 **UI Moderna** - Interfaz atractiva con gradientes y animaciones suaves
- ⚡ **Rendimiento Optimizado** - Carga instantánea con Vite
- 🔧 **TypeScript** - Código más seguro, escalable y mantenible
- 📱 **Mobile First** - Experiencia optimizada para dispositivos móviles
- 🎓 **Enfoque Educativo** - Cada juego desarrolla habilidades cognitivas específicas
- 🧠 **Desarrollo Cognitivo** - Mejora la memoria, lógica y resolución de problemas

## 🎮 Juegos Incluidos

### 🧠 **Mastermind**
Juego de lógica y deducción donde debes adivinar la combinación secreta de colores.
- **Características:**
  - Configurable: 4 posiciones con 6-8 colores disponibles
  - Modo con/sin colores duplicados
  - Sistema de pistas (correctos/posición correcta)
  - Hasta 10 intentos personalizables
  - Feedback visual inmediato

### 📝 **Crucigrama**
Completa las palabras cruzadas según las pistas proporcionadas.
- **Características:**
  - Grid de 10x10 con palabras entrelazadas
  - Pistas numeradas horizontales y verticales
  - Sistema de verificación
  - Opción para revelar la solución
  - Generación dinámica de crucigramas

### 🎯 **Ahorcado**
Adivina la palabra antes de que se complete el dibujo del ahorcado.
- **Características:**
  - Banco de palabras organizado por temas (Animales, Ciencia, Geografía, Verbos)
  - Lista personalizada de palabras con pistas
  - Sistema de pistas inteligente (3 disponibles por partida)
  - Configuración de dificultad (4-10 fallos permitidos)
  - Teclado virtual y soporte para teclado físico
  - Dibujo SVG animado del ahorcado
  - Normalización de caracteres con acentos

## 🛠️ Instalación

### Requisitos Previos
- **Node.js** 16.0 o superior
- **npm** o **yarn**

### Pasos de Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/juegosPhiteca.git
   cd juegosPhiteca
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador**
   Visita `http://localhost:5173` y ¡empieza a jugar!

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con hot reload
- `npm run build` - Construye la aplicación optimizada para producción
- `npm run preview` - Vista previa de la build de producción
- `npm run lint` - Ejecuta el linter para verificar el código

## 🔧 Dependencias Principales

### Producción
- `react: ^19.1.1` - Biblioteca de UI con las últimas características
- `react-dom: ^19.1.1` - Renderizado de React en el DOM
- `react-router-dom: ^7.8.2` - Enrutamiento y navegación

### Desarrollo
- `typescript: ~5.8.3` - Tipado estático
- `vite: ^7.1.2` - Build tool ultrarrápido
- `tailwindcss: ^3.4.0` - Framework CSS utility-first
- `eslint: ^9.33.0` - Linter para mantener código limpio
- `@vitejs/plugin-react: ^5.0.0` - Plugin de Vite para React

## 🏗️ Estructura del Proyecto

```
juegosPhiteca/
├── src/
│   ├── App.tsx                    # Componente principal con rutas
│   ├── main.tsx                   # Punto de entrada
│   ├── index.css                  # Estilos globales con Tailwind
│   ├── pages/                     # Páginas de la aplicación
│   │   ├── Home.tsx              # Página principal
│   │   ├── Games.tsx             # Lista de juegos
│   │   ├── About.tsx             # Acerca de
│   │   ├── Contact.tsx           # Contacto
│   │   ├── Mastermind.tsx        # Página del juego Mastermind
│   │   ├── Crossword.tsx         # Página del juego Crucigrama
│   │   └── Hangman.tsx           # Página del juego Ahorcado
│   ├── games/                     # Lógica de los juegos
│   │   ├── mastermind/
│   │   │   ├── MastermindGame.tsx    # Componente del juego
│   │   │   ├── MastermindLogic.ts    # Lógica del juego
│   │   │   ├── MastermindGame.css    # Estilos
│   │   │   └── types.ts              # Tipos TypeScript
│   │   ├── crossword/
│   │   │   ├── CrosswordGame.tsx     # Componente del juego
│   │   │   ├── CrosswordLogic.ts     # Lógica del juego
│   │   │   ├── CrosswordGame.css     # Estilos
│   │   │   └── types.ts              # Tipos TypeScript
│   │   └── hangman/
│   │       ├── HangmanGame.tsx       # Componente del juego
│   │       ├── HangmanLogic.ts       # Lógica del juego
│   │       ├── HangmanGame.css       # Estilos
│   │       └── types.ts              # Tipos TypeScript
│   ├── components/                # Componentes reutilizables
│   │   ├── Button.tsx            # Componente de botón
│   │   ├── Card.tsx              # Componente de tarjeta
│   │   ├── Logo.tsx              # Componente del logo
│   │   └── Navigation.tsx        # Navegación
│   ├── constants/                 # Constantes y configuración
│   │   └── colors.ts             # Paleta de colores de PHITECA
│   └── assets/                    # Recursos estáticos
│       └── images/
│           └── logos/            # Logos de PHITECA
├── public/                        # Archivos públicos
│   ├── favicon.png
│   └── images/
├── tailwind.config.js            # Configuración de Tailwind
├── vite.config.ts                # Configuración de Vite
└── package.json                  # Dependencias y scripts
```

## 🎨 Personalización

El proyecto utiliza una arquitectura modular y configurable:

### Colores de PHITECA
Los colores de la marca están definidos en `src/constants/colors.ts` y configurados en Tailwind:
- **Primary** (`#00303f`): Azul oscuro principal
- **Secondary** (`#cae4db`): Verde claro secundario
- **Accent** (`#ffb41e`): Amarillo/naranja de acento
- **Complement** (`#7a9e96`): Verde complementario

### Tailwind CSS
Personaliza colores, fuentes y estilos editando `tailwind.config.js`. El proyecto usa clases personalizadas como:
- `bg-gradient-phiteca-primary`
- `text-phiteca-accent`
- `border-phiteca-complement`

## 📱 Responsive Design

La aplicación está optimizada para funcionar perfectamente en todos los dispositivos:
- 📱 **Móviles** (320px+): Interfaz táctil optimizada
- 📱 **Tablets** (768px+): Diseño adaptativo
- 💻 **Desktop** (1024px+): Experiencia completa con teclado físico

## 💡 Características Técnicas

### Optimizaciones de Rendimiento
- ⚡ **Vite HMR** - Hot Module Replacement para desarrollo rápido
- 🎯 **Code Splitting** - Carga optimizada por rutas
- 📦 **Tree Shaking** - Eliminación de código no utilizado
- 🖼️ **Lazy Loading** - Carga bajo demanda de componentes

### Mejores Prácticas
- ✅ **TypeScript Estricto** - Type safety en todo el código
- 🧩 **Componentes Modulares** - Reutilizables y testeables
- 🎨 **CSS Modular** - Estilos encapsulados por componente
- 📱 **Mobile-First Design** - Diseño desde dispositivos móviles
- ♿ **Accesibilidad** - Semántica HTML y navegación por teclado

### Gestión de Estado
- 🔄 **React Hooks** - useState, useEffect, useCallback, useRef
- 🎮 **Lógica Separada** - Clases TypeScript para la lógica del juego
- 💾 **Estado Local** - Sin dependencias externas de gestión de estado

## 🧪 Arquitectura del Código

Cada juego sigue una arquitectura limpia y escalable:

### Separación de Responsabilidades
- **Componente React** (`*Game.tsx`): Interfaz de usuario y estado
- **Lógica del Juego** (`*Logic.ts`): Reglas y mecánicas del juego
- **Tipos** (`types.ts`): Definiciones TypeScript
- **Estilos** (`*Game.css`): CSS modular específico del juego

### Ventajas
✅ Código testeable y mantenible  
✅ Lógica reutilizable  
✅ Fácil de extender con nuevos juegos  
✅ TypeScript para mayor seguridad  

## 🎓 Acerca de PHITECA

PHITECA es una plataforma educativa que combina diversión y aprendizaje. Cada juego está diseñado con objetivos pedagógicos específicos para desarrollar habilidades cognitivas mientras los estudiantes se divierten.

### Enfoque Educativo
- 🧠 **Mastermind**: Desarrolla el razonamiento lógico y deductivo
- 📝 **Crucigrama**: Mejora el vocabulario y la ortografía
- 🎯 **Ahorcado**: Fortalece la memoria y el reconocimiento de patrones

🎓 **[Visita la Academia Online de PHITECA](https://phiteca.es)**

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres agregar nuevos juegos o mejorar los existentes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevoJuego`)
3. Commit tus cambios (`git commit -m 'Add: Nuevo juego educativo'`)
4. Push a la rama (`git push origin feature/NuevoJuego`)
5. Abre un Pull Request

### Ideas para Contribuir
- 🎮 Agregar nuevos juegos educativos
- 🌍 Traducir a otros idiomas
- ♿ Mejorar la accesibilidad
- 🎨 Nuevos temas visuales
- 📊 Sistema de puntuaciones y estadísticas

## 🗺️ Roadmap

### En Desarrollo
- [ ] Sistema de puntuaciones y rankings
- [ ] Guardado de progreso en localStorage
- [ ] Modo multijugador local
- [ ] Estadísticas de juego detalladas

### Futuras Características
- [ ] Nuevos juegos educativos
  - Sopa de letras
  - Sudoku
  - Memoria de cartas
  - Trivia educativa
- [ ] Sistema de niveles y dificultad progresiva
- [ ] Logros y medallas
- [ ] Modo oscuro
- [ ] Internacionalización (i18n)
- [ ] PWA (Progressive Web App)
- [ ] Integración con la plataforma PHITECA

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Desarrollado por PHITECA

**PHITECA - Academia Online**
- 🌐 Web: [https://phiteca.es](https://phiteca.es)
- 📧 Contacto: A través del formulario en la aplicación

---

⭐ **Si te gusta este proyecto, ¡dale una estrella en GitHub!**  
💡 **¿Tienes ideas para nuevos juegos? ¡Abre un issue y cuéntanos!**
