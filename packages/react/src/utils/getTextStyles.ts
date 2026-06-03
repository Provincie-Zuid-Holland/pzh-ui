import { TextProps } from '../Text'

export const getTextStyles = (size: TextProps['size']): string => {
    switch (size) {
        case 'l':
            return 'text-l'
        case 'm':
            return 'text-m'
        case 's':
            return 'text-s'
        case 'xs':
            return 'text-xs'
        default:
            return ''
    }
}
