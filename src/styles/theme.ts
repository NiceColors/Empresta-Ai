import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools'

const styles = {
    global: () => ({
        body: {
            bg: '#1c1c1c',
            lineHeight: 'base',
        },
        '.simplebar-scrollbar::before': {
            backgroundColor: '#fff',
        },
        '.active-link': {
            color: '#fff',
            textShadow: ' 0px 0px 16px #FFFFFF23',
        },
        '.nav-link': {
            color: '#ffffff55',
        },
        '.active-icon': {
            color: '#fff',
            fontSize: '20px'
        }

    }),
}

export const theme = extendTheme({
    styles
});