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
                viewBox="0 0 256 512"
                ref={svgRef}
                {...props}>
                <path d="M48.4 90.6c2.8-15.9 12.5-27.3 29-34.6 17.6-7.7 42.8-10.5 73.1-5.6l3.2-20.4-3.3 20.5c9.7 1.6 39.9 7.6 49.1 10.1 12.8 3.5 26-4 29.5-16.8s-4-26-16.8-29.5c-11.5-3.2-43.5-9.5-54.1-11.3C121.8-2.8 86.5-.5 58 12.1 28.6 25.1 6.7 49 1 83.3c-.1.4-.1.8-.2 1.2-2.2 19.5.4 37 7.9 52.3 7.4 15.2 18.8 26.6 31.4 35.3 2.4 1.7 4.9 3.3 7.4 4.8-23.3 12.9-40.7 33.8-45.8 62.5-.1.4-.1.9-.2 1.3-2.3 18.8.4 35.8 8.1 50.7 7.6 14.6 19.1 25.5 31.6 33.7 22.9 15.1 53.3 23.9 79.2 31.5l3.6 1c29 8.5 52.3 15.7 67.7 26.7 7.1 5.1 11.4 10.2 13.7 15.6 2.3 5.3 3.6 12.8 1.6 24.2-2.5 14.2-11.6 25.1-28.5 32.2-17.7 7.4-43.1 9.9-73.3 5.3-14.9-2.4-40.4-10.8-61-17.7-4.5-1.5-8.8-2.9-12.7-4.2-12.6-4.1-26.1 2.8-30.2 15.4s2.8 26.1 15.4 30.2c3 1 6.5 2.1 10.5 3.5 20.3 6.7 51.4 17.1 70.6 20.2h.1c36 5.5 70.9 3.3 99.1-8.5 29-12.1 51.4-34.8 57.3-68.1 3.4-19 1.9-36.3-4.8-51.8-6.7-15.3-17.6-26.8-29.8-35.6 17.7-13.5 30.5-32.7 34.7-58 3.3-19.7 1.8-37.5-4.7-53.4-6.5-15.8-17.3-27.9-29.6-37.2-23.2-17.5-55.1-27.4-81.8-35.6l-.7-.2c-29.3-9-53.3-16.5-69.9-28.1-7.7-5.4-12.7-11-15.7-17-2.8-5.8-4.6-13.7-3.4-25.1zm114.8 228.7c-8.6-2.8-17-5.2-25-7.6l-.8-.2c-29.1-8.5-53.2-15.6-69.8-26.5-7.8-5.1-12.6-10.3-15.4-15.7-2.6-5-4.3-11.9-3.2-22.1 2.7-13.9 11.7-24.6 28.4-31.6 13-5.4 30.2-8.3 50.5-7.5 26.9 8.4 48.6 15.8 63.1 26.8 7.1 5.4 11.6 10.9 14.1 17.1 2.5 6.1 3.9 14.7 1.8 27.2-3.3 19.4-17.2 33.8-43.7 40.1z" />
            </svg>
        )
    }
)
const SectionIcon = SVGIcon
SectionIcon.displayName = 'Section'
export default SectionIcon
