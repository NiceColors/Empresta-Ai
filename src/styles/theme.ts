import { extendTheme } from '@chakra-ui/react';

const styles = {
    global: () => ({
        body: {
            bg: '#1c1c1c',
            lineHeight: 'base',
            color: 'gray.50'
        },
        '*': {
            boxSizing: 'border-box',
        },
        'html, body': {
            height: '100%',
        },
        ...scrollbarStyle,
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
    styles,
    colors: {
        gray: {
            "200": "#B3B5C6",
            "100": "#D1D2DC",
            "50": "#EEEEF2",
        }
    },
});
const scrollbarStyle = {


    '::-webkit-scrollbar': {
        width: '0.4em',
    },
    '::-webkit-scrollbar-track': {
        background: '#1c1c1c',
    },
    '::-webkit-scrollbar-thumb': {
        background: '#f5f5f5',
        borderRadius: '0.25em',
    },
    '::-webkit-scrollbar-thumb:hover': {
        background: '#f5f5f5',
    },
    '::-webkit-scrollbar-thumb:active': {
        background: '#f5f5f5',
    },
    '::-webkit-scrollbar-corner': {
        background: '#1c1c1c',
    },
    '::-webkit-resizer': {
        background: '#1c1c1c',
    },
    '::-webkit-scrollbar-button': {
        background: '#1c1c1c',
    },
    '::-webkit-scrollbar-button:hover': {
        background: '#1c1c1c',
    },
    '::-webkit-scrollbar-button:active': {
        background: '#1c1c1c',
    },
}
