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
                <path d="M223.3 37.8c.4-1.5 1.3-2.8 2.4-3.8 9.9-1.3 20-2 30.3-2s20.4.7 30.3 2c1.1 1 1.9 2.3 2.4 3.8l13.7 47.7c3.5 12.1 12.2 21.1 22.5 26.1 7.6 3.6 14.8 7.8 21.7 12.5 9.4 6.5 21.7 9.5 33.9 6.5l48.2-12c1.5-.4 3-.3 4.4.2 5.4 6.9 10.4 14.2 14.9 21.8l4.3 7.4c4.2 7.5 7.9 15.3 11.2 23.3-.3 1.5-1 2.9-2.1 4L426.8 211c-8.7 9-12.2 21.1-11.3 32.5.3 4.1.5 8.3.5 12.5s-.2 8.4-.5 12.5c-.9 11.4 2.6 23.5 11.3 32.5l34.5 35.7c1.1 1.1 1.8 2.5 2.1 4-3.3 8-7 15.8-11.2 23.4l-4.2 7.3c-4.6 7.6-9.6 14.8-14.9 21.8-1.4.5-2.9.5-4.4.2l-48.2-12c-12.2-3-24.4 0-33.9 6.5-6.9 4.7-14.1 8.9-21.7 12.5-10.3 4.9-19.1 14-22.5 26.1l-13.7 47.7c-.4 1.5-1.3 2.8-2.4 3.8-9.9 1.3-20 2-30.3 2s-20.4-.7-30.3-2c-1.1-1-1.9-2.3-2.4-3.8l-13.7-47.7c-3.5-12.1-12.2-21.1-22.5-26.1-7.6-3.6-14.8-7.8-21.7-12.5-9.4-6.5-21.7-9.5-33.9-6.5l-48.2 12c-1.5.4-3 .3-4.4-.2-5.4-7-10.4-14.2-15-21.8l-4.2-7.3c-4.2-7.5-7.9-15.3-11.2-23.4.3-1.5 1-2.9 2.1-4L85.2 301c8.7-9 12.2-21.1 11.3-32.5-.3-4.1-.5-8.3-.5-12.5s.2-8.4.5-12.5c.9-11.4-2.6-23.5-11.3-32.5l-34.5-35.8c-1.1-1.1-1.8-2.5-2.1-4 3.3-8 7-15.8 11.2-23.4l4.2-7.3c4.6-7.6 9.6-14.8 15-21.8 1.4-.5 2.9-.5 4.4-.2l48.2 12c12.2 3 24.4 0 33.9-6.5 6.9-4.7 14.1-8.9 21.7-12.5 10.3-4.9 19.1-14 22.5-26.1l13.7-47.7zM256 0c-13 0-25.9 1-38.4 2.9-1.7.3-3.4.8-5 1.6-9.5 4.9-16.9 13.6-20 24.5l-13.7 47.7c-.6 2.2-2.5 4.5-5.6 6-9.1 4.3-17.8 9.4-26 15-2.8 1.9-5.8 2.4-8 1.8l-48.2-12C80.2 84.8 69 86.9 60 92.6c-1.5.9-2.8 2.1-3.9 3.5-7.1 8.9-13.7 18.2-19.6 28l-.1.3L32 132l-.1.3c-5.4 9.8-10.2 19.9-14.3 30.4-.6 1.6-1 3.3-1.1 5-.5 10.8 3.3 21.6 11.2 29.8l34.5 35.7c1.6 1.7 2.7 4.4 2.4 7.8-.4 5-.6 10-.6 15s.2 10.1.6 15c.3 3.4-.8 6.2-2.4 7.8l-34.5 35.8c-7.9 8.2-11.7 19-11.2 29.8.1 1.7.5 3.4 1.1 5 4.1 10.5 8.9 20.6 14.3 30.4l.1.3 4.4 7.6.1.3c5.9 9.8 12.4 19.2 19.6 28.1 1.1 1.4 2.4 2.6 3.9 3.5 9 5.7 20.2 7.8 31.1 5.1l48.2-12c2.2-.6 5.2-.1 8 1.8 8.2 5.7 16.9 10.7 26 15 3.1 1.5 4.9 3.8 5.6 6l13.7 47.5c3.1 10.8 10.5 19.5 20 24.5 1.6.8 3.2 1.4 5 1.6C230.1 511 243 512 256 512s25.9-1 38.4-2.9c1.7-.3 3.4-.8 5-1.6 9.5-4.9 16.9-13.6 20-24.5l13.7-47.7c.6-2.2 2.5-4.5 5.6-6 9.1-4.3 17.8-9.4 26-15 2.8-1.9 5.8-2.4 8-1.8l48.2 12c10.9 2.7 22.1.7 31.1-5.1 1.5-.9 2.8-2.1 3.9-3.5 7.1-8.9 13.6-18.2 19.5-28l.1-.3 4.5-7.6.1-.3c5.4-9.7 10.2-19.9 14.3-30.4.6-1.6 1-3.3 1.1-5 .5-10.8-3.3-21.6-11.2-29.8l-34.5-35.7c-1.6-1.7-2.7-4.4-2.4-7.8a188.025 188.025 0 000-30c-.3-3.4.8-6.2 2.4-7.8l34.5-35.7c7.9-8.2 11.7-19 11.2-29.8-.1-1.7-.5-3.4-1.1-5-4.1-10.5-8.9-20.6-14.3-30.4l-.1-.3-4.4-7.6-.1-.3c-5.9-9.8-12.4-19.2-19.5-28-1.1-1.4-2.4-2.6-3.9-3.5-9-5.7-20.2-7.8-31.1-5.1l-48.2 12c-2.2.6-5.2.1-8-1.8-8.2-5.7-16.9-10.7-26-15-3.1-1.5-4.9-3.8-5.6-6L319.4 29c-3.1-10.8-10.5-19.5-20-24.5-1.6-.8-3.2-1.4-5-1.6C281.9 1 269 0 256 0zm-56 256a56 56 0 11112 0 56 56 0 11-112 0zm144 0a88 88 0 10-176 0 88 88 0 10176 0z" />
            </svg>
        )
    }
)
const GearIcon = SVGIcon
GearIcon.displayName = 'Gear'
export default GearIcon
