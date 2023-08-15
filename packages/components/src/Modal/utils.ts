import { AriaLabelingProps, DOMProps } from '@react-types/shared'
import {
    CSSProperties,
    ReactNode,
    RefObject,
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { flushSync } from 'react-dom'

export function useEnterAnimation(
    ref: RefObject<HTMLElement>,
    isReady: boolean = true
) {
    let [isEntering, setEntering] = useState(true)
    useAnimation(
        ref,
        isEntering && isReady,
        useCallback(() => setEntering(false), [])
    )
    return isEntering && isReady
}

export function useExitAnimation(ref: RefObject<HTMLElement>, isOpen: boolean) {
    // State to trigger a re-render after animation is complete, which causes the element to be removed from the DOM.
    // Ref to track the state we're in, so we don't immediately reset isExiting to true after the animation.
    let [isExiting, setExiting] = useState(false)
    let [exitState, setExitState] = useState('idle')

    // If isOpen becomes false, set isExiting to true.
    if (!isOpen && ref.current && exitState === 'idle') {
        isExiting = true
        setExiting(true)
        setExitState('exiting')
    }

    // If we exited, and the element has been removed, reset exit state to idle.
    if (!ref.current && exitState === 'exited') {
        setExitState('idle')
    }

    useAnimation(
        ref,
        isExiting,
        useCallback(() => {
            setExitState('exited')
            setExiting(false)
        }, [])
    )

    return isExiting
}

function useAnimation(
    ref: RefObject<HTMLElement>,
    isActive: boolean,
    onEnd: () => void
) {
    let prevAnimation = useRef<string | null>(null)
    if (isActive && ref.current) {
        // This is ok because we only read it in the layout effect below, immediately after the commit phase.
        // We could move this to another effect that runs every render, but this would be unnecessarily slow.
        // We only need the computed style right before the animation becomes active.
        // eslint-disable-next-line rulesdir/pure-render
        prevAnimation.current = window.getComputedStyle(ref.current).animation
    }

    useLayoutEffect(() => {
        if (isActive && ref.current) {
            // Make sure there's actually an animation, and it wasn't there before we triggered the update.
            let computedStyle = window.getComputedStyle(ref.current)

            if (
                computedStyle.animationName !== 'none' &&
                computedStyle.animation !== prevAnimation.current
            ) {
                let onAnimationEnd = (e: AnimationEvent) => {
                    if (e.target === ref.current) {
                        element.removeEventListener(
                            'animationend',
                            onAnimationEnd
                        )
                        flushSync(() => {
                            onEnd()
                        })
                    }
                }

                let element = ref.current
                element.addEventListener('animationend', onAnimationEnd)
                return () => {
                    element.removeEventListener('animationend', onAnimationEnd)
                }
            } else {
                onEnd()
            }
        }
    }, [ref, isActive, onEnd])
}

export interface StyleRenderProps<T> {
    /** The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. */
    className?: string | ((values: T) => string)
    /** The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. */
    style?: CSSProperties | ((values: T) => CSSProperties)
}

export interface RenderProps<T> extends StyleRenderProps<T> {
    /** The children of the component. A function may be provided to alter the children based on component state. */
    children?: ReactNode | ((values: T) => ReactNode)
}

interface RenderPropsHookOptions<T>
    extends RenderProps<T>,
        DOMProps,
        AriaLabelingProps {
    values: T
    defaultChildren?: ReactNode
    defaultClassName?: string
}

export function useRenderProps<T>(props: RenderPropsHookOptions<T>) {
    let {
        className,
        style,
        children,
        defaultClassName,
        defaultChildren,
        values,
    } = props

    return useMemo(() => {
        let computedClassName: string | undefined
        let computedStyle: React.CSSProperties | undefined
        let computedChildren: React.ReactNode | undefined

        if (typeof className === 'function') {
            computedClassName = className(values)
        } else {
            computedClassName = className
        }

        if (typeof style === 'function') {
            computedStyle = style(values)
        } else {
            computedStyle = style
        }

        if (typeof children === 'function') {
            computedChildren = children(values)
        } else if (children == null) {
            computedChildren = defaultChildren
        } else {
            computedChildren = children
        }

        return {
            className: computedClassName ?? defaultClassName,
            style: computedStyle,
            children: computedChildren,
        }
    }, [className, style, children, defaultClassName, defaultChildren, values])
}
