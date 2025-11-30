import {
  Badge,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Select,
  Stack,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiMoon, FiSun, FiRotateCcw } from 'react-icons/fi'

const ChatHeader = ({
  onNewChat = () => {},
  models = [],
  model,
  onModelChange = () => {},
}) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const accent = useColorModeValue('brand.600', 'brand.200')
  const selectedModel = models.find((option) => option.value === model)

  return (
    <Stack spacing={4} w="full">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align={{ base: 'flex-start', md: 'center' }}
        gap={4}
        w="full"
      >
        <HStack spacing={4} align="center">
          <Badge
            colorScheme="purple"
            px={3}
            py={1}
            rounded="full"
            fontSize="0.7rem"
            textTransform="uppercase"
            letterSpacing="wide"
          >
            AI EXPERT
          </Badge>
          <Heading as="h1" size="md" letterSpacing="wide">
            CUSTOM CHAT
          </Heading>
        </HStack>

        <HStack spacing={2} align="center" flexWrap="wrap">
          <Text fontSize="sm" color="gray.500">
            Modo {colorMode === 'dark' ? 'oscuro' : 'claro'}
          </Text>
          <Tooltip label="Cambiar tema" hasArrow>
            <IconButton
              aria-label="Cambiar tema"
              icon={colorMode === 'dark' ? <FiSun /> : <FiMoon />}
              onClick={toggleColorMode}
              variant="ghost"
              color={accent}
            />
          </Tooltip>
          <Button
            leftIcon={<FiRotateCcw />}
            variant="solid"
            colorScheme="brand"
            onClick={onNewChat}
          >
            Nueva conversación
          </Button>
        </HStack>
      </Flex>

      <FormControl maxW={{ base: 'full', md: '360px' }}>
        <FormLabel fontSize="sm" color="gray.500">
          Modelo de OpenAI
        </FormLabel>
        <Select
          value={model}
          onChange={(event) => onModelChange(event.target.value)}
          bg={useColorModeValue('white', 'whiteAlpha.100')}
          borderColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.300')}
          _focusVisible={{ borderColor: 'brand.400', boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)' }}
        >
          {models.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {selectedModel?.description && (
          <Text fontSize="xs" color="gray.500" mt={1}>
            {selectedModel.description}
          </Text>
        )}
      </FormControl>
    </Stack>
  )
}

export default ChatHeader
