import { forwardRef, SVGProps } from 'react'
interface CustomIconProps extends SVGProps<SVGSVGElement> {
    size?: number
}
const SVGIcon = forwardRef<SVGSVGElement, CustomIconProps>(
    ({ size = 14, ...props }, svgRef) => {
        if (size) {
            props.width = size
            props.height = size
        }
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 512 512"
                ref={svgRef}
                {...props}>
                <path d="M490.3 40.4c21.9 21.87 21.9 57.33 0 79.2l-30 30.1-98-97.98 30.1-30.06c21.9-21.873 57.3-21.873 79.2 0l18.7 18.74zM172.4 241.7L339.7 74.34l98 97.96-167.4 167.3c-6.1 6.2-13.6 10.8-21.9 13.6l-88.8 29.6c-9.5 2.8-18.1.6-24.6-6.7-6.4-5.6-8.6-15.1-5.8-23.7l29.6-88.8c2.8-8.3 7.4-15.8 13.6-21.9zM192 63.1c17.7 0 32 15.23 32 32 0 18.6-14.3 32-32 32H96c-17.67 0-32 15.2-32 32V416c0 17.7 14.33 32 32 32h256c17.7 0 32-14.3 32-32v-96.9c0-16.8 14.3-32 32-32s32 15.2 32 32V416c0 53-43 96-96 96H96c-53.02 0-96-43-96-96V159.1c0-53 42.98-96 96-96h96z" />
            </svg>
        )
    }
)
const PenToSquareIcon = SVGIcon
PenToSquareIcon.displayName = 'PenToSquare'
export default PenToSquareIcon
