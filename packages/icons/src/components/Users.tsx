import { SVGProps, forwardRef } from 'react'

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
                viewBox="0 0 640 512"
                ref={svgRef}
                {...props}>
                <path d="M96 80a48 48 0 1196 0 48 48 0 11-96 0zm128 0a80 80 0 10-160 0 80 80 0 10160 0zm96 80a64 64 0 110 128 64 64 0 110-128zm0 160a96 96 0 100-192 96 96 0 100 192zm-58.7 64h117.4c54.2 0 98.4 42.5 101.2 96H160.1c2.8-53.5 47-96 101.2-96zm0-32C187.7 352 128 411.7 128 485.3c0 14.7 11.9 26.7 26.7 26.7h330.6c14.7 0 26.7-11.9 26.7-26.7 0-73.6-59.7-133.3-133.3-133.3H261.3zM512 32a48 48 0 110 96 48 48 0 110-96zm0 128a80 80 0 100-160 80 80 0 100 160zm16 64c44.2 0 80 35.8 80 80 0 8.8 7.2 16 16 16s16-7.2 16-16c0-61.9-50.1-112-112-112h-84c2.6 10.2 4 21 4 32h80zm-336 0c0-11 1.4-21.8 4-32h-84C50.1 192 0 242.1 0 304c0 8.8 7.2 16 16 16s16-7.2 16-16c0-44.2 35.8-80 80-80h80z" />
            </svg>
        )
    }
)
const UsersIcon = SVGIcon
UsersIcon.displayName = 'Users'
export default UsersIcon
