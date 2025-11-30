import { useState } from 'react'
import {
  Box,
  FormControl,
  HStack,
  IconButton,
  Textarea,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiSend } from 'react-icons/fi'

const Composer = ({ onSend = () => {}, isTyping }) => {
  const [value, setValue] = useState('')
  const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.300')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onSend(trimmed)
    setValue('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit} w="full">
      <FormControl isDisabled={isTyping}>
        <HStack
          spacing={3}
          border="1px solid"
          borderColor={borderColor}
          rounded="2xl"
          p={3}
          bg={useColorModeValue('white', 'blackAlpha.300')}
        >
          <Textarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isTyping ? 'Esperando respuesta...' : 'Escribe tu mensaje...'}
            resize="none"
            border="none"
            focusBorderColor="transparent"
            minH="64px"
            maxH="160px"
            fontSize="sm"
          />
          <Tooltip label="Enviar" hasArrow>
            <IconButton
              aria-label="Enviar mensaje"
              type="submit"
              icon={<FiSend />}
              colorScheme="brand"
              isDisabled={!value.trim()}
            />
          </Tooltip>
        </HStack>
      </FormControl>
    </Box>
  )
}

export default Composer
