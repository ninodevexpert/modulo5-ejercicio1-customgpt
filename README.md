# AI EXPERT CUSTOM CHAT UI

Interfaz web moderna para un chat conversacional listo para integrarse con la API de ChatGPT. El foco actual es 100 % visual: modo oscuro por defecto, alternativa clara, tipografía cuidada y componentes reutilizables construidos sobre Chakra UI.

## Stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/) para el shell SPA
- [Chakra UI 2.x](https://chakra-ui.com/) + [Framer Motion](https://www.framer.com/motion/) para layout, theming y animaciones
- [react-icons](https://react-icons.github.io/react-icons/) para los pictogramas del header, avatares y botones

## Scripts

```bash
npm install      # instala dependencias
npm run dev      # levanta el entorno con Vite + HMR
npm run build    # genera la build de producción en dist/
npm run preview  # sirve la build generada
```

## Qué incluye la UI

- Encabezado con branding "AI EXPERT CUSTOM CHAT", selector de tema dark/light y acción de "Nueva conversación".
- Historial con burbujas diferenciadas para usuario/asistente, avatares icónicos y estado "escribiendo" animado.
- Área de composición con textarea expandible, envío con `Enter` y respuesta simulada para mantener la conversación viva mientras llega la integración real.
- Auto-scroll, contador de mensajes y layout responsive (mobile-first) con efecto glassmorphism.

## Próximos pasos sugeridos

1. Sustituir la respuesta simulada (`handleSend`) por llamadas reales a la API de ChatGPT/Responses.
2. Persistir el historial (localStorage o backend) y habilitar múltiples hilos.
3. Añadir controles adicionales (regenerar, detener, adjuntar archivos) cuando el backend esté listo.
