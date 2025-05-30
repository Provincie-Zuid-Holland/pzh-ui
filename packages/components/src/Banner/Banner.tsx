import { useCallback, useEffect, useState } from 'react'
import { cn } from '../utils'

/**
 * Displays a banner
 */

export interface BannerProps {
    text: string
    isActive: boolean
    cookieName: string
    color?: 'blue' | 'green' | 'yellow' | 'red'
    onAddCallback?: () => void
    onRemoveCallback?: () => void
    className?: string
}

export const Banner = ({
    text,
    isActive,
    cookieName,
    color,
    onAddCallback,
    onRemoveCallback,
    className,
}: BannerProps) => {
    const [showBanner, setShowBanner] = useState(isActive)

    const removeBanner = useCallback(() => {
        onAddCallback?.()
        setShowBanner(false)
    }, [])

    const addBanner = useCallback(() => {
        onRemoveCallback?.()
        setShowBanner(true)
    }, [])

    useEffect(() => {
        if (isActive) {
            addBanner()
        } else {
            removeBanner()
        }
    }, [isActive, addBanner, removeBanner])

    const setHideBannerLocalStorage = () => {
        localStorage.setItem(cookieName, new Date().toString())
    }

    if (!showBanner) return null

    return (
        <div
            className={cn(
                'relative',
                {
                    'bg-pzh-blue-500 text-pzh-white': color === 'blue',
                    'bg-pzh-red-500 text-pzh-white': color === 'red',
                    'bg-pzh-yellow-500': color === 'yellow',
                    'bg-pzh-green-500 text-pzh-white': color === 'green',
                },
                className
            )}>
            <div className="mx-auto max-w-screen-xl px-3 py-2 sm:px-6 lg:px-8">
                <div className="pr-16 sm:text-center">
                    <p className="text-s bold rounded">{text}</p>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-start pr-1 pt-1 sm:items-start sm:pr-2 sm:pt-1">
                    <button
                        type="button"
                        className="hover:bg-pzh-white/10 flex rounded-lg p-1 transition duration-150 ease-in-out focus:outline-none"
                        onClick={() => {
                            setShowBanner(!showBanner)
                            removeBanner()
                            setHideBannerLocalStorage()
                        }}
                        aria-label="sluiten">
                        <svg
                            className="h-6 w-6"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
