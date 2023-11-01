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
                viewBox="0 0 448 512"
                ref={svgRef}
                {...props}>
                <path d="M96 96a32 32 0 10-64 0 32 32 0 1064 0zm-16 62v196c22.5 5.8 40.2 23.5 46 46h196c2.9-11.1 8.6-21 16.4-28.9l-32.2-53.7c-5.8 1.7-11.9 2.6-18.2 2.6-35.3 0-64-28.7-64-64s28.7-64 64-64c6.3 0 12.4.9 18.2 2.6l32.2-53.7c-7.8-7.9-13.5-17.8-16.4-28.9H126c-5.8 22.5-23.5 40.2-46 46zm285.8 196.6c5.8-1.7 11.9-2.6 18.2-2.6 35.3 0 64 28.7 64 64s-28.7 64-64 64c-29.8 0-54.9-20.4-62-48H126c-7.1 27.6-32.2 48-62 48-35.3 0-64-28.7-64-64 0-29.8 20.4-54.9 48-62V158c-27.6-7.1-48-32.2-48-62 0-35.3 28.7-64 64-64 29.8 0 54.9 20.4 62 48h196c7.1-27.6 32.2-48 62-48 35.3 0 64 28.7 64 64s-28.7 64-64 64c-6.3 0-12.4-.9-18.2-2.6l-32.2 53.7C345 222.6 352 238.5 352 256s-7 33.4-18.4 44.9l32.2 53.7zM64 384a32 32 0 100 64 32 32 0 100-64zM352 96a32 32 0 1064 0 32 32 0 10-64 0zm32 352a32 32 0 100-64 32 32 0 100 64zm-96-160a32 32 0 100-64 32 32 0 100 64z" />
            </svg>
        )
    }
)
const DrawPolygonIcon = SVGIcon
DrawPolygonIcon.displayName = 'DrawPolygon'
export default DrawPolygonIcon
