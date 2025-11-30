import {
  Badge,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiMoon, FiSun, FiRotateCcw } from 'react-icons/fi'

const ChatHeader = ({ onNewChat = () => {} }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const accent = useColorModeValue('brand.600', 'brand.200')

  return (
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

      <HStack spacing={2} align="center">
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
  )
}

export default ChatHeader
