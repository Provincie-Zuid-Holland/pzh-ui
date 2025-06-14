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
                viewBox="0 0 384 512"
                ref={svgRef}
                {...props}>
                <path d="M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7l.128-39.2H112l.1 39.2zM192 0C90.02.32 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8 16.53 18.84 42.34 58.23 52.22 91.45.031.25.094.517.125.782h160.2c.031-.265.094-.516.125-.782 9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1 368 78.8 289.2.004 192 0zm96.4 260.1c-15.66 17.85-35.04 46.3-49.05 75.89h-94.61c-14.01-29.59-33.39-58.04-49.04-75.88C75.24 236.8 64 206.1 64 175.1 64 113.3 112.1 48.25 191.1 48 262.6 48 320 105.4 320 175.1c0 31-11.2 61.7-31.6 85zM176 80c-44.1 0-80 35.9-80 80 0 8.844 7.156 16 16 16s16-7.2 16-16c0-26.47 21.53-48 48-48 8.844 0 16-7.148 16-15.99S184.8 80 176 80z" />
            </svg>
        )
    }
)
const LightbulbIcon = SVGIcon
LightbulbIcon.displayName = 'Lightbulb'
export default LightbulbIcon
