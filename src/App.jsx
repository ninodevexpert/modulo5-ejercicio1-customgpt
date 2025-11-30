import { useEffect, useMemo, useRef, useState } from 'react'
import { Box, Container, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import ChatHeader from './components/ChatHeader'
import MessageList from './components/MessageList'
import Composer from './components/Composer'

const createId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 10)

const getTimestamp = () =>
  new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date())

const createGreetingMessage = () => ({
  id: createId(),
  role: 'assistant',
  content:
    'Hola, soy AI EXPERT CUSTOM CHAT. Comparte contexto sobre tu reto y prepararé la mejor respuesta cuando la integración esté lista.',
  timestamp: getTimestamp(),
})

const initialMessages = [
  createGreetingMessage(),
  {
    id: 'user-1',
    role: 'user',
    content: 'Necesito una interfaz moderna para mi chat con modo oscuro y claro.',
    timestamp: getTimestamp(),
  },
  {
    id: 'assistant-1',
    role: 'assistant',
    content:
      'Perfecto. Puedo mostrarte un layout con el historial, el editor de mensajes y un botón de envío, listo para conectar a la API pronto.',
    timestamp: getTimestamp(),
  },
]

function App() {
  const [messages, setMessages] = useState(() => initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef(null)
  const panelBg = useColorModeValue('rgba(255,255,255,0.8)', 'rgba(15,23,42,0.75)')
  const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
  const pageGradient = useColorModeValue(
    'linear(to-br, #eef2ff, #dbeafe)',
    'linear(to-br, #020617, #0f172a)'
  )

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = (text) => {
    const userMessage = {
      id: createId(),
      role: 'user',
      content: text,
      timestamp: getTimestamp(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: 'assistant',
          content:
            'Estoy listo para integrarme con la API de GPT. Mientras tanto, esta es una respuesta simulada para mantener la experiencia visual.',
          timestamp: getTimestamp(),
        },
      ])
      setIsTyping(false)
    }, 900)
  }

  const handleNewChat = () => {
    setIsTyping(false)
    setMessages([createGreetingMessage()])
  }

  const messageCountLabel = useMemo(() => `${messages.length} mensajes en esta sesión`, [messages.length])

  return (
    <Box
      bgGradient={pageGradient}
      minH="100vh"
      py={{ base: 8, md: 12 }}
      px={{ base: 4, md: 8 }}
      transition="background 0.4s ease"
    >
      <Container maxW="5xl" px={{ base: 0, md: 4 }}>
        <Stack
          spacing={6}
          bg={panelBg}
          backdropFilter="blur(18px)"
          border="1px solid"
          borderColor={borderColor}
          rounded="3xl"
          boxShadow="2xl"
          p={{ base: 6, md: 10 }}
        >
          <ChatHeader onNewChat={handleNewChat} />
          <Text fontSize="sm" color="gray.500">
            {messageCountLabel}
          </Text>
          <MessageList messages={messages} isTyping={isTyping} scrollRef={scrollRef} />
          <Composer onSend={handleSend} isTyping={isTyping} />
        </Stack>
      </Container>
    </Box>
  )
}

export default App
