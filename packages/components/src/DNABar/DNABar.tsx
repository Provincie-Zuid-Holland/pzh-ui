import { useWindowSize } from '@react-hookz/web'
import classNames from 'clsx'
import { useEffect, useMemo, useState } from 'react'

import detailPatterns from '../assets/detail-patterns.svg'
import primaryPatterns from '../assets/primary-patterns.svg'
import { cn } from '../utils'

type BarConfig = {
    size: number
    primaryTop: number
    detailTop: number
}

export const useDnaBarConfig = (): BarConfig => {
    const { width } = useWindowSize()
    const [config, setConfig] = useState<BarConfig>({
        size: 96,
        primaryTop: 192,
        detailTop: 288,
    })

    useEffect(() => {
        if (width < 768) {
            setConfig({ size: 40, primaryTop: 80, detailTop: 120 })
        } else if (width < 1600) {
            setConfig({ size: 80, primaryTop: 160, detailTop: 240 })
        } else {
            setConfig({ size: 96, primaryTop: 192, detailTop: 288 })
        }
    }, [width])

    return config
}

export interface DNABarProps {
    blocks?: 2 | 5 | 6
    className?: string
}

export function DNABar({ blocks = 5, className }: DNABarProps) {
    const { width } = useWindowSize()
    const { size, primaryTop, detailTop } = useDnaBarConfig()

    const blockStyle = useMemo(() => ({ width: size, height: size }), [size])

    return (
        <div
            className={cn(
                'pointer-events-none absolute right-0 z-10',
                {
                    hidden: width <= 640,
                    'top-0': !className,
                },
                className
            )}>
            {blocks !== 2 && (
                <img
                    src={primaryPatterns}
                    className="absolute"
                    style={{ width: size, top: primaryTop }}
                    alt=""
                />
            )}

            {blocks === 2 && (
                <img
                    src={detailPatterns}
                    className="absolute"
                    style={{ width: size, top: detailTop }}
                    alt=""
                />
            )}

            <div
                className={classNames('bg-pzh-red-500', {
                    'opacity-0': blocks === 2,
                })}
                style={blockStyle}
            />
            <div
                className={classNames('bg-pzh-yellow-500', {
                    'opacity-0': blocks === 2,
                })}
                style={blockStyle}
            />
            <div
                className={classNames({ 'opacity-0': blocks === 2 })}
                style={blockStyle}
            />

            <div
                className={classNames({ 'bg-pzh-red-500': blocks === 2 })}
                style={blockStyle}
            />
            <div
                className={classNames({ 'bg-pzh-red-500': blocks !== 2 })}
                style={blockStyle}
            />

            {blocks === 6 && (
                <div className="bg-pzh-blue-500" style={blockStyle} />
            )}
        </div>
    )
}
