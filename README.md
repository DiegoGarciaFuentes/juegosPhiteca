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

### 📝 **Crucigrama (v1 - Clásico)**
Completa las palabras cruzadas según las pistas proporcionadas.
- **Características:**
  - Grid de 10x10 con palabras entrelazadas
  - Pistas numeradas horizontales y verticales
  - Sistema de verificación
  - Opción para revelar la solución
  - Generación dinámica de crucigramas

### 🧩 **Crucigrama (v2 - Avanzado)**
Crucigrama con funcionalidades avanzadas y arquitectura modular.
- **Características Implementadas:**
  - Sistema de datos modular (JSON + schemas TypeScript)
  - Generación avanzada de crucigramas con algoritmo de cruces
  - Configuración por dificultad (Easy, Medium, Hard, Expert)
  - Navegación completa con teclado:
    - Flechas: Navegar dentro de la palabra
    - Letras: Escribir y avanzar automáticamente
    - Backspace: Borrar y retroceder
    - Enter/Tab: Cambiar de palabra
  - Entrada híbrida (teclado físico + clicks)
  - Soporte completo para Ñ y caracteres especiales
  - Grid adaptable (10x10 a 18x18 según dificultad)
  - Sistema de temas de palabras (Naturaleza, y más por venir)
  - Selector visual de palabra activa
  - Botones de control: Solución, Regenerar, Validación
- **Características en Desarrollo:**
  - Sistema de validación de letras/palabras
  - Sistema de pistas con créditos
  - Indicador de progreso
  - Exportación a PDF
  - Interfaz responsive para móvil

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
│   │   ├── crossword-v1/             # Crucigrama clásico (v1)
│   │   │   ├── CrosswordGame.tsx     # Componente del juego
│   │   │   ├── CrosswordLogic.ts     # Lógica del juego
│   │   │   ├── CrosswordGame.css     # Estilos
│   │   │   └── types.ts              # Tipos TypeScript
│   │   ├── crossword2/               # Crucigrama avanzado (v2)
│   │   │   ├── Crossword2Game.tsx    # Componente del juego
│   │   │   ├── Crossword2Logic.ts    # Lógica avanzada con algoritmo de cruces
│   │   │   └── Crossword2Game.css    # Estilos modulares
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
│   ├── data/                      # Sistema de datos modular ✨ NUEVO
│   │   ├── schemas/              # Esquemas TypeScript para validación
│   │   │   ├── hangman.schema.ts
│   │   │   ├── hangman-config.schema.ts
│   │   │   ├── mastermind.schema.ts
│   │   │   └── crossword2.schema.ts
│   │   └── games/                # Datos de cada juego
│   │       ├── hangman/
│   │       │   ├── config.json   # Configuración del juego
│   │       │   ├── words-*.json  # Bancos de palabras por tema
│   │       │   └── index.ts      # Data loader con helpers
│   │       ├── mastermind/
│   │       │   ├── config.json
│   │       │   ├── colors.json
│   │       │   └── index.ts
│   │       └── crossword2/
│   │           ├── config.json
│   │           ├── words-*.json
│   │           └── index.ts
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

### 🆕 Sistema de Datos Modular (Ahorcado, Mastermind, Crucigrama)

Arquitectura de tres capas para gestión de datos:

#### 1️⃣ **Capa de Datos** (`src/data/games/`)
- **JSON Files**: Almacenamiento de contenido del juego
  - `config.json`: Configuración y dificultades
  - `words-*.json`: Bancos de palabras/contenido por tema
- **Ventajas**: 
  - Fácil de editar sin tocar código
  - Multilingüe preparado
  - Versionable en Git

#### 2️⃣ **Capa de Esquemas** (`src/data/schemas/`)
- **TypeScript Interfaces**: Definición de tipos y validación
  - `*.schema.ts`: Interfaces para datos del juego
  - `*-config.schema.ts`: Interfaces para configuración
- **Ventajas**:
  - Type-safety en tiempo de compilación
  - Autocompletado en IDE
  - Documentación implícita

#### 3️⃣ **Capa de Loaders** (`src/data/games/*/index.ts`)
- **Data Loaders**: Importación y helpers
  - Importa JSON con `with { type: 'json' }`
  - Exporta funciones helper (getters, filters)
  - Valida datos contra schemas
- **Ventajas**:
  - Acceso centralizado a datos
  - Funciones de utilidad reutilizables
  - Abstracción de fuente de datos

**Ejemplo de Flujo:**
```typescript
// 1. JSON Data
words-animals.json → Banco de palabras

// 2. Schema
hangman.schema.ts → Valida estructura

// 3. Loader
index.ts → getThemeWords('animals')

// 4. Component
HangmanGame.tsx → const words = getThemeWords('animals')
```

### Ventajas de la Arquitectura
✅ Código testeable y mantenible  
✅ Lógica reutilizable  
✅ Fácil de extender con nuevos juegos  
✅ TypeScript para mayor seguridad  
✅ **Datos separados del código** ✨ NUEVO  
✅ **Escalable y multilingüe** ✨ NUEVO  

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

## 📋 Planificación de Mejoras UX - Crucigrama

### ✅ Fase 1: Correcciones Críticas (COMPLETADA)

#### 1. ✅ Configuración Oculta Durante el Juego
- **Estado**: ✅ **COMPLETADO**
- **Problema**: El panel de configuración se muestra encima del juego en estado "playing"
- **Solución**: Solo mostrar configuración cuando `gameState === 'config'`
- **Impacto**: Evita confusión visual e interfaz desordenada
- **Implementación**: Verificado que la configuración ya estaba correctamente condicionada

#### 2. ✅ Resaltado de Pista Activa
- **Estado**: ✅ **COMPLETADO**
- **Problema**: Las pistas no se resaltan al hacer click o al seleccionar palabra
- **Solución**: Agregar clase CSS `.active` a la pista correspondiente cuando `activeSlot` cambia
- **Impacto**: Usuario sabe qué palabra está trabajando
- **Implementación**: Mejorado el resaltado en CSS con colores más visibles

#### 3. ✅ Botones de Validación Implementados
- **Estado**: ✅ **COMPLETADO**
- **Problema**: "Comprobar letra", "Comprobar palabra", "🔎 Letra", "💡 Palabra" no funcionan
- **Solución**: Implementados métodos en `Crossword2Logic.ts` y handlers en `Crossword2Game.tsx`
- **Implementación**: 
  - `checkCurrentLetter()`, `checkCurrentWord()`, `hintCurrentLetter()`, `hintCurrentWord()` en lógica
  - `handleCheckLetter`, `handleCheckWord`, `handleHintLetter`, `handleHintWord` en UI

#### 4. ✅ Leyenda/Instrucciones Restaurada
- **Estado**: ✅ **COMPLETADO**
- **Problema**: Falta bloque de leyenda con instrucciones
- **Solución**: Restaurada sección de ayuda en formato acordeón debajo de las definiciones
- **Implementación**: 
  - Acordeón con instrucciones de navegación, escritura y herramientas
  - Posicionado debajo de las definiciones como solicitado
  - Estilos CSS para el acordeón implementados

#### 5. ✅ Correcciones Visuales Adicionales
- **Estado**: ✅ **COMPLETADO**
- **Fondo de página**: Cambiado de azul oscuro a gris claro (`#f8fafc`)
- **Centrado del crucigrama**: Implementado centrado horizontal y vertical
- **Celdas no usadas**: Mantenido fondo oscuro (`#111827`) como solicitado
- **Overflow**: Prevenido desbordamiento del contenido

**📊 Resumen de Fase 1 Completada:**
- ✅ 5 tareas críticas implementadas
- ✅ Todas las funcionalidades del código original restauradas
- ✅ Interfaz visual mejorada y centrada
- ✅ Instrucciones accesibles en formato acordeón
- ✅ Botones de validación y pistas funcionales
- ✅ Navegación por teclado completamente operativa

### 🟢 Fase 2: Mejoras de Usabilidad - **COMPLETADA** ✅

#### 1. ✅ Campo de Definición Actual
- **Estado**: ✅ **COMPLETADO**
- **Problema**: Usuario no entiende el problema del scroll en pistas
- **Solución Implementada**: Campo de definición actual activa arriba del crucigrama
- **Resultado**: Usuario puede ver la definición de la palabra seleccionada sin scroll
- **Implementación**: 
  - `div.current-clue-display` con definición activa
  - Actualización automática al cambiar de palabra
  - Estilos CSS para centrado y legibilidad

#### 2. ✅ Feedback Visual al Seleccionar Palabra
- **Estado**: ✅ **COMPLETADO**
- **Problema**: Usuario no entiende qué significa "feedback visual al seleccionar"
- **Solución Implementada**: Cursor visual y definición actual se actualizan automáticamente
- **Resultado**: Feedback visual claro al seleccionar cualquier palabra
- **Implementación**: 
  - Cursor visual sincronizado con posición real
  - Definición actual se actualiza automáticamente
  - Sincronización entre estado React y lógica del juego

#### 3. ✅ Sistema de Validación y Pistas Mejorado
- **Estado**: ✅ **COMPLETADO**
- **Problema**: Sistema de pistas y validaciones con mensajes molestos
- **Solución Implementada**: 
  - Validación visual con colores (verde/rojo) sin mensajes
  - Pistas que rellenan directamente las celdas
  - Sistema de créditos (10 iniciales)
  - Celdas descubiertas bloqueadas (no editables)
- **Resultado**: Sistema de ayuda más intuitivo y visual
- **Implementación**:
  - Clases CSS `.validation-correct` y `.validation-incorrect`
  - Métodos `checkCurrentLetter()` y `checkCurrentWord()` con feedback visual
  - Métodos `hintCurrentLetter()` y `hintCurrentWord()` que rellenan celdas
  - Sistema de créditos con costos: letra (-1), palabra (-3), descubrir letra (-3), descubrir palabra (-5)
  - Celdas descubiertas con clase `.discovered` y bloqueo completo

#### 4. ✅ Reorganización de Controles
- **Estado**: ✅ **COMPLETADO**
- **Problema**: Muchos botones en el toolbar, sobrecarga cognitiva
- **Solución Implementada**:
  - Botones "En blanco" y "Solución" como toggle con color `#00303f`
  - Botones de control movidos debajo del crucigrama
  - Acordeón "Comprobar y pistas" en el aside derecho
  - Tooltips con costos de créditos
- **Resultado**: Interfaz más limpia y organizada
- **Implementación**:
  - `div.control-buttons` centrado debajo del crucigrama
  - Toggle group con estilos `.toggle-active` y `.toggle-inactive`
  - Acordeón con `details` y `summary` para "Comprobar y pistas"
  - Tooltips con información de costos de créditos

#### 5. ✅ Bloqueo Completo de Celdas Descubiertas
- **Estado**: ✅ **COMPLETADO**
- **Problema**: Celdas descubiertas se podían modificar
- **Solución Implementada**: Bloqueo completo de celdas descubiertas
- **Resultado**: Celdas descubiertas completamente ineditables
- **Implementación**:
  - Verificación en `handleKeyDown` para escritura y navegación
  - Verificación en `handleKeyDown` para borrado (Backspace)
  - Estilos CSS `.discovered` con cursor `not-allowed`
  - Icono de candado 🔒 en celdas bloqueadas
  - Sincronización completa entre estado React y lógica del juego

**📊 Resumen de Fase 2 Completada:**
- ✅ 5 tareas de usabilidad implementadas
- ✅ Sistema de créditos funcional con costos específicos
- ✅ Validación visual sin mensajes molestos
- ✅ Pistas que rellenan directamente las celdas
- ✅ Celdas descubiertas completamente bloqueadas
- ✅ Interfaz reorganizada y más limpia
- ✅ Sincronización perfecta entre cursor visual y lógica

### 🎯 Mejoras Implementadas Hoy (Sesión Actual)

#### 🔧 Correcciones Técnicas Críticas
- **✅ Sincronización de Cursor**: Corregido problema donde el cursor visual no coincidía con la posición real de escritura
- **✅ Método `setIndexInWord`**: Agregado método en `Crossword2Logic.ts` para sincronizar posición
- **✅ Bloqueo Completo**: Implementado bloqueo total de celdas descubiertas (escritura, borrado, navegación)
- **✅ Referencias Corregidas**: Eliminada referencia a `setHintsLeft` obsoleta

#### 🎨 Mejoras de UX Implementadas
- **✅ Sistema de Créditos**: 10 créditos iniciales con costos específicos por acción
- **✅ Validación Visual**: Colores verde/rojo sin mensajes molestos
- **✅ Pistas Directas**: Relleno automático de celdas con letras correctas
- **✅ Celdas Bloqueadas**: Descubiertas no editables con icono 🔒
- **✅ Interfaz Reorganizada**: Controles mejor distribuidos y más intuitivos

#### 🚀 Funcionalidades Nuevas
- **✅ Campo de Definición Actual**: Muestra la definición de la palabra seleccionada
- **✅ Toggle de Modo**: "En blanco" y "Solución" como botones toggle
- **✅ Acordeón de Herramientas**: "Comprobar y pistas" organizado en acordeón
- **✅ Tooltips Informativos**: Costos de créditos en hover de botones
- **✅ Navegación Mejorada**: Cursor sincronizado perfectamente con lógica del juego

### 🟢 Fase 3: Mejoras Futuras (Baja Prioridad)

#### 8. 📊 Indicador de Progreso
- **Estado**: ⏸️ En Evaluación
- **Descripción**: Mostrar cuántas letras/palabras están completadas
- **Nota del Usuario**: "Este no estoy seguro de estar de acuerdo, ya lo valoraremos más adelante"
- **Acción**: Evaluar en futuras iteraciones

#### 9. 📱 Responsive Design Móvil
- **Estado**: 🔶 Fase Específica Futura
- **Problema**: "Este es un gran problema, creo que debemos abordarlo en una fase específica"
- **Acción**: Planificar fase dedicada exclusivamente a móvil
- **Prioridad**: Alta, pero en fase separada

#### 10. 🎨 Transiciones Suaves
- **Estado**: ⏸️ No Relevante Ahora
- **Descripción**: Agregar transiciones CSS para cambios de celda
- **Nota del Usuario**: "No lo veo relevante ahora mismo"

#### 11. 🌈 Temas Visuales y Modo Oscuro
- **Estado**: ⏸️ Futuro
- **Nota del Usuario**: "Por ahora no lo veo relevante, lo podemos dejar para futuro"

#### 12. 🎉 Animaciones de Éxito
- **Estado**: ⏸️ Futuro
- **Nota del Usuario**: "También para futuro"

### 🚀 Mejoras Futuras Planificadas

#### Control de Juego Mejorado
- **🔄 Auto-guardado**: Guardar progreso automáticamente cada 30 segundos
- **⏸️ Pausa/Reanudar**: Botón para pausar el juego y reanudar después
- **📊 Progreso visual**: Barra de progreso mostrando % completado

### 📝 Notas de Implementación

**Puntos a Aclarar con el Usuario:**
1. **Feedback visual al seleccionar palabra**: ¿Se refiere a animación, color, borde, zoom?
2. **Scroll en pistas**: ¿Cuál es el problema específico que observa?
3. **Agrupación de botones**: ¿Prefiere acordeón, menú desplegable, o toolbar colapsable?

**Prioridades Acordadas:**
- ✅ **Fase 1**: ✅ **COMPLETADA** - Arreglar bugs críticos y restaurar funcionalidades perdidas
- 🟡 **Fase 2**: Mejorar UX sin cambios estructurales grandes (SIGUIENTE)
- 🟢 **Fase 3**: Nuevas características y mejoras cosméticas
- 📱 **Fase Móvil**: Dedicación exclusiva al responsive design

**Criterios de Aceptación:**
- Todas las funcionalidades del código original deben estar presentes
- La interfaz debe ser clara y no confusa
- Los botones que se muestran deben funcionar
- Las instrucciones deben ser visibles y claras

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
