# Calculadora React
Calculadora web construida con React y CSS, con una interfaz oscura y adaptable a pantallas pequeñas. Permite escribir expresiones directamente en la pantalla o construirlas usando los botones.

# Características
- Operaciones de suma, resta, multiplicación y división.
- Operador de módulo (%).
- Uso de paréntesis y números decimales en las expresiones escritas.
- Botón DEL para borrar el último carácter y AC para limpiar la expresión.
- Botón ANS para reutilizar el último resultado calculado.
- Vista previa del resultado mientras se escribe una expresión válida.
- Edición directa de la expresión desde la pantalla de la calculadora.
- Diseño adaptable a móviles y escritorio.
- Validación de expresiones y mensaje de error cuando la sintaxis no es válida.

# Tecnologías
- React
- JavaScript (ES Modules y JSX)
- CSS
- Hooks de React: useState, useEffect y useRef
  
# Estructura de los archivos
calculadora-react/
 - calculadora.jsx   # Componente principal y lógica de cálculo
 -  calculadora.css   # Estilos y adaptación a pantallas pequeñas
 -  input.jsx         # Pantalla editable y vista del resultado
 - README.md
 - package.json
 - index.html

# Cómo funciona
La aplicación está dividida en dos componentes principales:
- Calculadora administra la expresión escrita, el último resultado y los mensajes de error. También define los botones y procesa sus acciones.
- Input muestra la expresión y el resultado. Al pulsar la pantalla, permite editar la expresión directamente y utiliza useEffect junto con useRef para enfocar el campo de texto.
- La función evaluarExpresion() normaliza los símbolos visuales de multiplicación, división y resta. Después analiza los tokens y calcula la expresión mediante funciones que respetan la precedencia de los operadores. No utiliza eval() ni Function() para ejecutar la expresión.

# Instalación y ejecución:
 Para este proceso debe usted ingresar en su terminal:
 - 'git clone https://github.com/Diego-64-hd/Calculetor-React.git'
 - cd calculadora-react
 - npm install
 - npm run dev

# Si ya tienes un proyecto creado con Vite:
1. Copia calculadora.jsx, calculadora.css e input.jsx dentro de src/.
2. Importa el componente Calculadora desde el archivo principal de tu aplicación.
3. Renderiza <Calculadora /> desde App.jsx o desde el componente que uses como raíz.
4. Instala las dependencias del proyecto si todavía no lo has hecho.
5. En la terminal, ejecuta:
npm install
npm run dev

# Estos comandos presuponen que el proyecto anfitrión ya tiene un package.json con los scripts habituales de Vite. Si no existe, primero debes crear y configurar el proyecto React. 
Uso
- Pulsa los botones para construir una expresión.
- Pulsa el área de la pantalla para escribir o modificar la expresión manualmente.
- Usa = para calcular.
- Usa ANS para insertar el último resultado calculado.
- Usa DEL para borrar un carácter o AC para limpiar la expresión.
  
# Limitaciones conocidas
- El proyecto no incluye pruebas automatizadas.
- El botón ANS reutiliza el último resultado calculado; inicialmente su valor es 0.
- La calculadora muestra Error de sintaxis cuando la expresión no se puede analizar o el resultado no es finito.
  
 # Autor
Diego Hernández
