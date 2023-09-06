import { forwardRef as forwardRefReact } from 'react'

type DataProps = {
    [key: `data-${string}`]: string | number | undefined | boolean
}

type PolymorphicRef<C extends React.ElementType> =
    React.ComponentPropsWithRef<C>['ref']

export type As = React.ElementType

type AsProp<Component extends As> = {
    as?: Component
}

type PropsToOmit<Component extends As, Props> = keyof (AsProp<Component> &
    Props)

export type PolymorphicComponentProp<
    Component extends As,
    Props = object,
> = React.PropsWithChildren<Props & AsProp<Component>> &
    Omit<
        React.ComponentPropsWithoutRef<Component>,
        PropsToOmit<Component, Props>
    > &
    DataProps

export type PolymorphicComponentPropWithRef<
    Component extends As,
    Props = object,
> = PolymorphicComponentProp<Component, Props> & {
    ref?: PolymorphicRef<Component>
} & DataProps

export function forwardRef<Props extends object, Component extends As = As>(
    component: React.ForwardRefRenderFunction<
        any,
        PolymorphicComponentProp<Component, Props>
    >
) {
    return forwardRefReact(component) as unknown as <Component extends As>(
        props: PolymorphicComponentPropWithRef<Component, Props>
    ) => React.ReactElement | null
}

export const polyComponent = <Props extends object, Component extends As = As>(
    component: React.FC<PolymorphicComponentProp<Component, Props>>
) => {
    return component
}

/**

Usage with ref:

interface TestPropsBase {
  title: string;
}

export type TestProps<Component extends As = "div"> = PolyMorphicComponentPropWithRef<TestPropsBase, Component>;

export const Test = forwardRef<TestPropsBase, As = "div">(
  ({ as, title, ...props }, ref) => {
    const Component = as || "button";

    return (
      <Component ref={ref} {...props}>
        {title}
      </Component>
    )
  }
);

*/

/*
Usage without ref:

interface TestProps {
  icon?: IconDefinition;
}

export const Test = <C extends React.ElementType>({
  as,
  icon,
  children,
  ...props
}: PolymorphicComponentProp<C, TestProps>) => {
  const Component = as || "button";

  return (
    <Component {...props}>
      {icon && (
        <FontAwesomeIcon icon={icon} />
      )}

      {children}
    </Component>
  );
};

*/
