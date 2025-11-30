# AI EXPERT CUSTOM CHAT UI

Interfaz web moderna para un chat conversacional ya conectada a la API de OpenAI. Incluye modo oscuro/claro, selector de modelo, composición fluida y estados visuales preparados para enlazarse con nuevas capacidades.

## Stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/) para el shell SPA
- [Chakra UI 2.x](https://chakra-ui.com/) + [Framer Motion](https://www.framer.com/motion/) para layout, theming y animaciones
- [react-icons](https://react-icons.github.io/react-icons/) para los pictogramas del header, avatares y botones
- [OpenAI SDK](https://www.npmjs.com/package/openai) para consumir `chat.completions`

## Scripts

```bash
npm install      # instala dependencias
npm run dev      # levanta el entorno con Vite + HMR
npm run build    # genera la build de producción en dist/
npm run preview  # sirve la build generada

## Configuración de OpenAI

1. Renombra `.env.example` a `.env` y añade tu clave:
	```bash
	VITE_OPENAI_API_KEY=sk-...
	VITE_OPENAI_MODEL=gpt-4.1-mini   # opcional, puedes escoger otro en la UI
	```
2. Guarda el archivo (ya está incluido en `.gitignore`).
3. Reinicia `npm run dev` para que Vite cargue las variables.
```

## Qué incluye la UI

- Encabezado con branding, selector de tema, botón "Nueva conversación" y dropdown de modelos soportados (GPT-4o, GPT-4.1, o4-mini, etc.).
- Historial con burbujas diferenciadas para usuario/asistente, avatares icónicos y estado "escribiendo" animado.
- Área de composición con textarea expandible, envío con `Enter` y manejo de bloqueos mientras se obtiene la respuesta.
- Integración real con `chat.completions`: se envía el histórico completo y se renderiza la respuesta del modelo seleccionado.
- Auto-scroll, contador contextual (mensajes + modelo activo) y layout responsive con efecto glassmorphism.

## Próximos pasos sugeridos

1. Mover las llamadas a OpenAI a un backend o edge function para no exponer la clave en el navegador.
2. Persistir el historial (localStorage o backend) y habilitar múltiples hilos/conversaciones.
3. Añadir streaming token a token, contador de tokens y controles adicionales (regenerar, detener, adjuntar archivos).
