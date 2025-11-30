import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiCpu, FiUser } from 'react-icons/fi'

const MessageBubble = ({ message }) => {
  const isAssistant = message.role === 'assistant'
  const bubbleBg = useColorModeValue(
    isAssistant ? 'white' : 'brand.100',
    isAssistant ? 'gray.800' : 'brand.500'
  )
  const bubbleColor = useColorModeValue(
    isAssistant ? 'gray.900' : 'gray.900',
    'white'
  )
  const metaColor = useColorModeValue('gray.500', 'gray.400')

  return (
    <Flex justify={isAssistant ? 'flex-start' : 'flex-end'} w="full">
      <HStack
        spacing={3}
        align="flex-start"
        flexDir={isAssistant ? 'row' : 'row-reverse'}
        maxW="32rem"
        w="full"
      >
        <Avatar
          size="sm"
          bg={isAssistant ? 'brand.500' : 'gray.500'}
          color="white"
          icon={<Icon as={isAssistant ? FiCpu : FiUser} fontSize="1rem" />}
        />
        <Box
          bg={bubbleBg}
          color={bubbleColor}
          px={4}
          py={3}
          rounded="2xl"
          borderTopLeftRadius={isAssistant ? '0.5rem' : '2xl'}
          borderTopRightRadius={isAssistant ? '2xl' : '0.5rem'}
          boxShadow={useColorModeValue(
            '0 8px 24px rgba(15, 23, 42, 0.08)',
            '0 8px 32px rgba(0, 0, 0, 0.35)'
          )}
          w="full"
        >
          <Text fontSize="sm" lineHeight="tall">
            {message.content}
          </Text>
          {message.timestamp && (
            <Text fontSize="xs" mt={2} color={metaColor} textAlign="right">
              {message.timestamp}
            </Text>
          )}
        </Box>
      </HStack>
    </Flex>
  )
}

export default MessageBubble
