import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const colors = {
  brand: {
    50: '#f5f9ff',
    100: '#dbe8ff',
    200: '#b4ccff',
    300: '#8db0ff',
    400: '#648eff',
    500: '#3e6dff',
    600: '#2f55db',
    700: '#223fad',
    800: '#182a80',
    900: '#0e1954',
  },
}

const styles = {
  global: (props) => ({
    body: {
      backgroundColor: props.colorMode === 'dark' ? '#05060a' : '#f7f9fc',
      color: props.colorMode === 'dark' ? 'gray.100' : 'gray.900',
    },
  }),
}

const fonts = {
  heading: 'Space Grotesk, Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  body: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
}

const theme = extendTheme({ config, colors, styles, fonts })

export default theme
