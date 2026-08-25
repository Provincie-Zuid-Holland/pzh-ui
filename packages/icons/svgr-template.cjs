function template(variables, { tpl }) {
    const { componentName, jsx } = variables

    return tpl`
        import { forwardRef } from 'react'
        import type { IconProps } from '../Icon.types'

        const ${componentName} = forwardRef<SVGSVGElement, IconProps>(
            ({ size = 16, ...props }, ref) => (
                ${jsx}
            )
        )

        ${componentName}.displayName = '${componentName}'

        export default ${componentName}
    `
}

module.exports = template