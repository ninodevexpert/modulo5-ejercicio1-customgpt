# Integración de OpenAI en AI EXPERT CUSTOM CHAT

Este documento resume (y sirve como checklist futuro de) los pasos necesarios para dotar a la UI de soporte real para la API de OpenAI (`chat.completions`) y añadir un selector de modelos conversacionales. El flujo descrito ya está implementado en la rama principal del proyecto; usa esta guía para reproducirlo en otros entornos o ampliarlo.

## 1. Dependencias y configuración

1. **Instala el SDK oficial**:
   ```bash
   npm install openai
   ```
2. **Crea un `.env`** (y añade la clave en `.gitignore` si no lo está) con tu token:
   ```bash
   VITE_OPENAI_API_KEY=sk-...
   ```
   > Vite expone variables con prefijo `VITE_` en el cliente. Si prefieres aislar la clave, crea un backend (ver sección 5).
3. **Opcional**: define `VITE_OPENAI_MODEL=gpt-4.1-mini` para tener un modelo por defecto configurable sin tocar código.

## 2. Selector de modelos

1. Crea una lista con los modelos soportados/válidos para tu cuenta (por ejemplo `gpt-4o-mini`, `gpt-4.1`, `o4-mini`, etc.).
2. Añade un componente de selector (Dropdown o Segmented Control) cerca del encabezado (`ChatHeader`) o sobre el compositor. Chakra UI ya tiene `Select`, `Menu` o `SegmentedControl` para ello.
3. Eleva el estado del modelo seleccionado hasta `App.jsx` para que sea accesible al momento de enviar mensajes. Ejemplo rápido:
   ```jsx
   const [model, setModel] = useState(import.meta.env.VITE_OPENAI_MODEL ?? 'gpt-4.1-mini')
   ```
4. Muestra el modelo activo en el UI (badge o texto informativo) para dar contexto al usuario.

## 3. Llamadas a la API de chat

1. **Instancia del cliente** (lado cliente, si decides llamar directo):
   ```js
   import OpenAI from 'openai'
   const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true })
   ```
   > `dangerouslyAllowBrowser` es obligatorio en apps puramente client-side; ten en cuenta los riesgos de exponer la clave.
2. Dentro de `handleSend`, reemplaza la respuesta simulada por:
   ```js
   await openai.chat.completions.create({
     model,
     messages: messages.map(({ role, content }) => ({ role, content })).concat({ role: 'user', content: text }),
   })
   ```
3. Parsear la respuesta (`choices[0].message`) y añadirla al estado como nuevo mensaje de rol `assistant`.
4. Manejar estados: loading (bloquear textarea), errores (mostrar Toast) y cancelaciones si el usuario regenera.

## 4. Consideraciones de cuota y UX

- Añade un contador de tokens aproximado o un aviso cuando se acerque al límite (opcional).
- Implementa un botón "Detener" que cancele la petición usando `AbortController`.
- Usa `stream: true` si quieres respuestas token a token; requerirá websockets o fetch streaming.

## 5. Alternativa recomendada: backend proxy

Como exponer la clave en el cliente no es ideal para producción:
1. Crea un pequeño servidor (Node/Express, Next.js API route, Cloudflare Worker, etc.).
2. El frontend envía `{ model, messages }` al backend.
3. El backend añade la API key desde variables seguras y reenvía la respuesta de OpenAI.
4. Beneficios: rotación de claves, logging, límites personalizados, caching.

## 6. Checklist de integración

- [ ] Variable `VITE_OPENAI_API_KEY` configurada.
- [ ] Estado `model` y selector en UI.
- [ ] Manejo de envío (loading/error/cancel).
- [ ] Persistencia de mensajes con la estructura `[{ id, role, content, timestamp }]`.
- [ ] Documentación de modelos soportados y coste aproximado.

## 7. Recursos

- Docs API chat: https://platform.openai.com/docs/api-reference/chat
- Lista de modelos actualizada: https://platform.openai.com/docs/models
- Guía de mejores prácticas: https://platform.openai.com/docs/guides/text-generation

Con estos pasos tendrás la base para integrar conversaciones reales y permitir que cada sesión se ejecute sobre el modelo OpenAI escogido por el usuario.
