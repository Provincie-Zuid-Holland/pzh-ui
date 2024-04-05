import { useWindowSize } from '@react-hookz/web'
import classNames from 'clsx'
import { useEffect, useState } from 'react'

import detailPatterns from '../assets/detail-patterns.svg'
import primaryPatterns from '../assets/primary-patterns.svg'
import { cn } from '../utils'

export const useDnaBarWidth = () => {
    const windowSize = useWindowSize()
    const [dnaBarWidth, setDnaBarWidth] = useState(96)

    useEffect(() => {
        setDnaBarWidth(windowSize.width < 768 ? 40 : 96)
    }, [windowSize])

    return dnaBarWidth
}

export interface DNABarProps {
    blocks?: 2 | 5 | 6
    className?: string
}

export function DNABar({ blocks = 5, className }: DNABarProps) {
    const windowSize = useWindowSize()

    return (
        <div
            className={cn(
                'pointer-events-none absolute right-0 z-10',
                {
                    hidden: windowSize.width <= 640,
                    'top-0': !className,
                },
                className
            )}>
            {blocks !== 2 && (
                <img
                    src={primaryPatterns}
                    className="absolute top-[192px] w-[96px]"
                    alt=""
                />
            )}
            {blocks === 2 && (
                <img
                    src={detailPatterns}
                    className="absolute top-[288px] w-[96px]"
                    alt=""
                />
            )}
            <div
                className={classNames('bg-pzh-red h-[96px] w-[96px]', {
                    'opacity-0': blocks === 2,
                })}
            />
            <div
                className={classNames('bg-pzh-yellow h-[96px] w-[96px]', {
                    'opacity-0': blocks === 2,
                })}
            />
            <div
                className={classNames('h-[96px] w-[96px]', {
                    'opacity-0': blocks === 2,
                })}
            />

            <div
                className={classNames('h-[96px] w-[96px]', {
                    'bg-pzh-red': blocks === 2,
                })}
            />
            <div
                className={classNames('h-[96px] w-[96px]', {
                    'bg-pzh-red': blocks !== 2,
                })}
            />
            {blocks === 6 && <div className="bg-pzh-blue h-[96px] w-[96px]" />}
        </div>
    )
}
