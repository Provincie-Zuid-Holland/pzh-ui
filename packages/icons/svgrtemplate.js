function template({ template }, _opts, { componentName, jsx }) {
    const typeScriptTpl = template.smart({ plugins: ['typescript'] })

    componentName.displayName = componentName.name.slice(3)
    componentName.name = componentName.name.slice(3) + 'Icon'

    return typeScriptTpl.ast`
    import { forwardRef, SVGProps } from 'react'
  
    interface CustomIconProps extends SVGProps<SVGSVGElement> {
      size?: number
    }
  
    const SVGIcon = forwardRef<SVGSVGElement, CustomIconProps>(({ size = 14, ...props }, svgRef) => {
      if (size) {
        props.width = size
        props.height = size
      }
  
      return ${jsx}
    })
  
    const ${componentName} = SVGIcon
    ${componentName}.displayName = "${componentName.displayName}"
  
    export default ${componentName}
  `
}

module.exports = template
