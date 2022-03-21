import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'

import detailPatterns from '../assets/detail-patterns.svg'
import primaryPatterns from '../assets/primary-patterns.svg'

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
    classes?: string
}

export function DNABar({ blocks = 5, classes }: DNABarProps) {
    const windowSize = useWindowSize()

    return (
        <div
            className={classNames(
                'absolute pointer-events-none right-0 top-0 z-10',
                { hidden: windowSize.width <= 640 },
                classes
            )}>
            {blocks !== 2 && (
                <img
                    src={primaryPatterns}
                    className="w-[96px] absolute top-[192px]"
                    alt=""
                />
            )}
            {blocks === 2 && (
                <img
                    src={detailPatterns}
                    className="w-[96px] absolute top-[288px]"
                    alt=""
                />
            )}
            <div
                className={classNames('w-[96px] h-[96px] bg-pzh-red', {
                    'opacity-0': blocks === 2,
                })}
            />
            <div
                className={classNames('w-[96px] h-[96px] bg-pzh-yellow', {
                    'opacity-0': blocks === 2,
                })}
            />
            <div
                className={classNames('w-[96px] h-[96px]', {
                    'opacity-0': blocks === 2,
                })}
            />

            <div
                className={classNames('w-[96px] h-[96px]', {
                    'bg-pzh-red': blocks === 2,
                })}
            />
            <div
                className={classNames('w-[96px] h-[96px]', {
                    'bg-pzh-red': blocks !== 2,
                })}
            />
            {blocks === 6 && <div className="w-[96px] h-[96px] bg-pzh-blue" />}
        </div>
    )
}
