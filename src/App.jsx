import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import OpenAI from 'openai'
import ChatHeader from './components/ChatHeader'
import MessageList from './components/MessageList'
import Composer from './components/Composer'
import { OPENAI_MODEL_OPTIONS } from './constants/openaiModels'

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const DEFAULT_MODEL = import.meta.env.VITE_OPENAI_MODEL ?? OPENAI_MODEL_OPTIONS[0].value
const openaiClient = OPENAI_API_KEY
  ? new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true })
  : null

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
    'Hola, soy AI EXPERT CUSTOM CHAT. Selecciona un modelo de OpenAI y dime qué necesitas; me encargaré de generar la mejor respuesta posible.',
  timestamp: getTimestamp(),
})

const initialMessages = [createGreetingMessage()]

function App() {
  const [messages, setMessages] = useState(() => initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const [model, setModel] = useState(DEFAULT_MODEL)
  const scrollRef = useRef(null)
  const toast = useToast()
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

  const handleSend = async (text) => {
    if (isTyping) return
    const userMessage = {
      id: createId(),
      role: 'user',
      content: text,
      timestamp: getTimestamp(),
    }

    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)

    if (!openaiClient) {
      toast({
        title: 'Configura tu API Key',
        description: 'Define VITE_OPENAI_API_KEY en tu entorno para contactar OpenAI.',
        status: 'warning',
      })
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: 'assistant',
          content:
            'Necesito una API key válida para OpenAI. Añádela en el archivo .env (VITE_OPENAI_API_KEY) y vuelve a intentarlo.',
          timestamp: getTimestamp(),
        },
      ])
      return
    }

    setIsTyping(true)

    try {
      const completion = await openaiClient.chat.completions.create({
        model,
        messages: nextMessages.map(({ role, content }) => ({ role, content })),
      })

      const assistantContent = completion.choices?.[0]?.message?.content?.trim()

      if (assistantContent) {
        setMessages((prev) => [
          ...prev,
          {
            id: createId(),
            role: 'assistant',
            content: assistantContent,
            timestamp: getTimestamp(),
          },
        ])
      } else {
        throw new Error('Respuesta vacía del modelo.')
      }
    } catch (error) {
      console.error('OpenAI error', error)
      toast({
        title: 'No pude obtener respuesta',
        description: error?.message ?? 'Revisa tus créditos o el modelo seleccionado.',
        status: 'error',
      })
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: 'assistant',
          content:
            'Hubo un problema al contactar OpenAI. Revisa la consola o tu clave y vuelve a intentarlo.',
          timestamp: getTimestamp(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleNewChat = () => {
    setIsTyping(false)
    setMessages([createGreetingMessage()])
  }

  const activeModelLabel = useMemo(() => {
    const selected = OPENAI_MODEL_OPTIONS.find((option) => option.value === model)
    return selected?.label ?? model
  }, [model])

  const messageCountLabel = useMemo(
    () => `${messages.length} mensajes · Modelo ${activeModelLabel}`,
    [messages.length, activeModelLabel]
  )

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
          <ChatHeader
            onNewChat={handleNewChat}
            models={OPENAI_MODEL_OPTIONS}
            model={model}
            onModelChange={setModel}
          />
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
