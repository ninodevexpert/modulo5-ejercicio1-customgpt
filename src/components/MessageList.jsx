import {
  Avatar,
  Box,
  Flex,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { FiCpu } from 'react-icons/fi'
import MessageBubble from './MessageBubble'

const dots = keyframes`
  0%, 80%, 100% { opacity: 0.2; transform: translateY(0); }
  40% { opacity: 1; transform: translateY(-2px); }
`

const MessageList = ({ messages, isTyping, scrollRef }) => {
  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.200')
  const emptyColor = useColorModeValue('gray.500', 'gray.400')

  return (
    <Box
      ref={scrollRef}
      bg={useColorModeValue('whiteAlpha.900', 'blackAlpha.300')}
      border="1px solid"
      borderColor={borderColor}
      rounded="2xl"
      p={{ base: 4, md: 6 }}
      minH="60vh"
      maxH="70vh"
      overflowY="auto"
      sx={{
        '&::-webkit-scrollbar': { width: '6px' },
        '&::-webkit-scrollbar-thumb': {
          background: useColorModeValue('#c7d2fe', '#475569'),
          borderRadius: '999px',
        },
      }}
    >
      {messages.length === 0 ? (
        <Flex direction="column" align="center" justify="center" minH="48vh" gap={3}>
          <Avatar size="lg" bg="brand.500" icon={<FiCpu />} color="white" />
          <Text fontWeight="semibold">Comienza una nueva conversación</Text>
          <Text fontSize="sm" color={emptyColor} textAlign="center" maxW="sm">
            Comparte tu objetivo o pregunta y AI EXPERT CUSTOM CHAT preparará la mejor respuesta posible.
          </Text>
        </Flex>
      ) : (
        <Stack spacing={4}>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
        </Stack>
      )}
    </Box>
  )
}

const TypingIndicator = () => {
  const bubbleBg = useColorModeValue('white', 'gray.800')
  const dotColor = useColorModeValue('gray.500', 'gray.300')

  return (
    <Flex justify="flex-start">
      <HStack spacing={3} align="center">
        <Avatar size="sm" bg="brand.500" color="white" icon={<FiCpu />} />
        <Box px={4} py={3} bg={bubbleBg} rounded="full" borderRadius="999px">
          <HStack spacing={1}>
            {[0, 1, 2].map((index) => (
              <Box
                key={`typing-dot-${index}`}
                w="8px"
                h="8px"
                rounded="full"
                bg={dotColor}
                animation={`${dots} 1.4s ease-in-out ${index * 0.2}s infinite`}
              />
            ))}
          </HStack>
        </Box>
      </HStack>
    </Flex>
  )
}

export default MessageList
