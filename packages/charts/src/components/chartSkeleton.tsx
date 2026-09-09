// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { FC } from 'react'

type ChartSkeletonProps = {
    height: number
    loadingLabel: string
    /** Placeholder shape matching the chart type that will load. */
    variant?:
        | 'bar'
        | 'line'
        | 'gantt'
        | 'range'
        | 'scatter'
        | 'progress'
        | 'pie'
        | 'segment'
        | 'gauge'
        | 'radar'
        | 'radial'
        | 'bubble'
    /** Mirror the content that will actually load. */
    hasTitle?: boolean
    hasSubtitle?: boolean
    /** Bars to draw; falls back to 7 when the data shape is still unknown. */
    categoryCount?: number
    /** >1 draws grouped mini-bars per category. */
    seriesCount?: number
    /** Legend swatch+line pairs; 0 hides the legend row. */
    legendCount?: number
}

const FALLBACK_BARS = 7
const MAX_SKELETON_BARS = 24

/** Deterministic varied heights (40–85%) so the placeholder reads as a chart. */
const barHeight = (index: number): string => `${40 + ((index * 137) % 46)}%`

export const ChartSkeleton: FC<ChartSkeletonProps> = ({
    height,
    loadingLabel,
    variant = 'bar',
    hasTitle = true,
    hasSubtitle = true,
    categoryCount = 0,
    seriesCount = 1,
    legendCount = 2,
}) => {
    const bars = Math.min(
        categoryCount > 0 ? categoryCount : FALLBACK_BARS,
        MAX_SKELETON_BARS
    )
    const series = Math.max(1, seriesCount)

    return (
        <div>
            <span className="pzh-visually-hidden" role="status">
                {loadingLabel}
            </span>
            <div aria-hidden="true">
                {/* Header: title/subtitle left, the toggle + select placeholders right.
                    Same classes as the real header, so the placeholder wraps the same
                    way on narrow cards instead of overflowing. */}
                <header className="pzh-header">
                    <div className="pzh-header-text">
                        {hasTitle ? (
                            <div
                                className="pzh-skeleton pzh-pulse"
                                style={{
                                    width: 192,
                                    maxWidth: '100%',
                                    height: 24,
                                }}
                            />
                        ) : null}
                        {hasSubtitle ? (
                            <div
                                className="pzh-skeleton pzh-pulse"
                                style={{
                                    width: 288,
                                    maxWidth: '100%',
                                    height: 16,
                                    marginTop: 8,
                                }}
                            />
                        ) : null}
                    </div>
                    <div className="pzh-controls">
                        <div
                            className="pzh-skeleton pzh-pulse"
                            style={{
                                width: 150,
                                maxWidth: '100%',
                                height: 26,
                                borderRadius: 999,
                            }}
                        />
                        <div
                            className="pzh-skeleton pzh-pulse"
                            style={{
                                width: 110,
                                maxWidth: '100%',
                                height: 40,
                                borderRadius: 6,
                            }}
                        />
                    </div>
                </header>
                {/* Chart area: placeholder shaped like the chart type that will load */}
                {variant === 'progress' || variant === 'segment' ? (
                    <div style={{ marginTop: 24 }}>
                        <div
                            className="pzh-skeleton pzh-pulse"
                            style={{ width: 140, height: 48, marginBottom: 16 }}
                        />
                        {variant === 'progress' ? (
                            <div style={{ display: 'flex', gap: 6 }}>
                                {Array.from({ length: 28 }, (_, index) => (
                                    <div
                                        key={index}
                                        className="pzh-skeleton pzh-pulse"
                                        style={{
                                            flex: 1,
                                            maxWidth: 8,
                                            height: 56,
                                            borderRadius: 999,
                                            animationDelay: `${index * 20}ms`,
                                        }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: 6 }}>
                                {[3, 1, 2, 1.2, 0.8].map((weight, index) => (
                                    <div
                                        key={index}
                                        className="pzh-skeleton pzh-pulse"
                                        style={{
                                            flex: weight,
                                            height: 48,
                                            borderRadius: 6,
                                            animationDelay: `${index * 60}ms`,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ) : variant === 'radial' ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: Math.max(120, height - 48),
                            marginTop: 24,
                        }}>
                        {/* Two concentric tracks: the ring chart's resting shape. */}
                        <svg
                            className="pzh-pulse"
                            width={Math.max(120, height - 96)}
                            height={Math.max(120, height - 96)}
                            viewBox="0 0 200 200"
                            aria-hidden="true">
                            <circle
                                cx={100}
                                cy={100}
                                r={89}
                                fill="none"
                                stroke="var(--pzh-skeleton)"
                                strokeWidth={22}
                            />
                            <circle
                                cx={100}
                                cy={100}
                                r={59}
                                fill="none"
                                stroke="var(--pzh-skeleton)"
                                strokeWidth={22}
                            />
                        </svg>
                    </div>
                ) : variant === 'pie' || variant === 'radar' ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: Math.max(120, height - 48),
                            marginTop: 24,
                        }}>
                        <div
                            className="pzh-skeleton pzh-pulse"
                            style={{
                                width: Math.max(120, height - 96),
                                height: Math.max(120, height - 96),
                                borderRadius: variant === 'pie' ? '50%' : '24%',
                            }}
                        />
                    </div>
                ) : variant === 'bubble' ? (
                    <div
                        style={{
                            position: 'relative',
                            height: Math.max(160, height - 48),
                            marginTop: 24,
                        }}>
                        {/* A packed cluster: big center bubble with smaller ones around it. */}
                        {[
                            {
                                size: 140,
                                left: '50%',
                                top: '50%',
                                translate: '-50%, -50%',
                            },
                            {
                                size: 84,
                                left: '50%',
                                top: '50%',
                                translate: '30%, -120%',
                            },
                            {
                                size: 64,
                                left: '50%',
                                top: '50%',
                                translate: '-160%, -30%',
                            },
                            {
                                size: 48,
                                left: '50%',
                                top: '50%',
                                translate: '90%, 60%',
                            },
                        ].map((bubble, index) => (
                            <div
                                key={index}
                                className="pzh-skeleton pzh-pulse"
                                style={{
                                    position: 'absolute',
                                    left: bubble.left,
                                    top: bubble.top,
                                    width: bubble.size,
                                    height: bubble.size,
                                    borderRadius: '50%',
                                    transform: `translate(${bubble.translate})`,
                                    animationDelay: `${index * 80}ms`,
                                }}
                            />
                        ))}
                    </div>
                ) : variant === 'gauge' ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: Math.max(120, height - 48),
                            marginTop: 24,
                        }}>
                        {/* 240° arc, center (110,107) r=95: stroke edges stay inside the viewBox. */}
                        <svg
                            className="pzh-pulse"
                            width={220}
                            height={168}
                            viewBox="0 0 220 168"
                            aria-hidden="true">
                            <path
                                d="M 27.7 154.5 A 95 95 0 1 1 192.3 154.5"
                                fill="none"
                                stroke="var(--pzh-skeleton)"
                                strokeWidth={24}
                            />
                        </svg>
                    </div>
                ) : variant === 'gantt' ? (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: 14,
                            minHeight: Math.max(80, height - 48),
                            marginTop: 24,
                        }}>
                        {Array.from(
                            { length: Math.min(bars, 10) },
                            (_, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 16,
                                    }}>
                                    <div
                                        className="pzh-skeleton pzh-pulse"
                                        style={{ width: 48, height: 12 }}
                                    />
                                    <div
                                        className="pzh-skeleton pzh-pulse"
                                        style={{
                                            width: `${25 + ((index * 137) % 55)}%`,
                                            marginLeft: `${(index * 89) % 30}%`,
                                            height: 16,
                                            borderRadius: 999,
                                            animationDelay: `${index * 80}ms`,
                                        }}
                                    />
                                </div>
                            )
                        )}
                    </div>
                ) : variant === 'range' ? (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'stretch',
                            gap: 8,
                            height: Math.max(80, height - 48),
                            marginTop: 24,
                        }}>
                        {Array.from(
                            { length: Math.min(Math.max(bars, 12), 32) },
                            (_, index) => {
                                const top = 10 + ((index * 89) % 30)
                                const size = 25 + ((index * 137) % 35)
                                return (
                                    <div
                                        key={index}
                                        style={{
                                            flex: 1,
                                            position: 'relative',
                                        }}>
                                        <div
                                            className="pzh-skeleton pzh-pulse"
                                            style={{
                                                position: 'absolute',
                                                top: `${top}%`,
                                                height: `${size}%`,
                                                width: '100%',
                                                maxWidth: 14,
                                                borderRadius: 999,
                                                animationDelay: `${index * 40}ms`,
                                            }}
                                        />
                                    </div>
                                )
                            }
                        )}
                    </div>
                ) : variant === 'scatter' ? (
                    <div
                        style={{
                            position: 'relative',
                            height: Math.max(80, height - 48),
                            marginTop: 24,
                        }}>
                        {Array.from(
                            { length: Math.min(Math.max(bars, 10), 20) },
                            (_, index) => (
                                <div
                                    key={index}
                                    className="pzh-skeleton pzh-pulse"
                                    style={{
                                        position: 'absolute',
                                        left: `${(index * 100) / 20 + ((index * 53) % 8)}%`,
                                        top: `${70 - ((index * 89) % 55)}%`,
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                        animationDelay: `${index * 40}ms`,
                                    }}
                                />
                            )
                        )}
                    </div>
                ) : variant === 'line' ? (
                    <svg
                        className="pzh-pulse"
                        width="100%"
                        height={Math.max(80, height - 48)}
                        viewBox="0 0 100 40"
                        preserveAspectRatio="none"
                        style={{ display: 'block', marginTop: 24 }}
                        aria-hidden="true">
                        <path
                            d="M0,40 L0,28 C10,20 16,8 26,10 C36,12 40,26 52,24 C64,22 68,10 80,12 C90,14 96,20 100,18 L100,40 Z"
                            fill="var(--pzh-skeleton)"
                            opacity={0.5}
                        />
                        <path
                            d="M0,28 C10,20 16,8 26,10 C36,12 40,26 52,24 C64,22 68,10 80,12 C90,14 96,20 100,18"
                            fill="none"
                            stroke="var(--pzh-skeleton)"
                            strokeWidth={3}
                            vectorEffect="non-scaling-stroke"
                        />
                        <path
                            d="M0,34 C12,30 20,18 32,20 C44,22 50,32 62,30 C74,28 82,20 100,26"
                            fill="none"
                            stroke="var(--pzh-skeleton)"
                            strokeWidth={3}
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            gap: 12,
                            height: Math.max(80, height - 48),
                            marginTop: 24,
                        }}>
                        {Array.from({ length: bars }, (_, categoryIndex) => (
                            <div
                                key={categoryIndex}
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    gap: 2,
                                    height: '100%',
                                }}>
                                {Array.from(
                                    { length: series },
                                    (_, seriesIndex) => (
                                        <div
                                            key={seriesIndex}
                                            className="pzh-skeleton pzh-pulse"
                                            style={{
                                                flex: 1,
                                                height: barHeight(
                                                    categoryIndex * series +
                                                        seriesIndex
                                                ),
                                                borderRadius: '4px 4px 0 0',
                                                animationDelay: `${categoryIndex * 80}ms`,
                                            }}
                                        />
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {/* Legend, only when the loaded chart will have one */}
                {legendCount > 0 ? (
                    <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
                        {Array.from({ length: legendCount }, (_, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                }}>
                                <div
                                    className="pzh-skeleton pzh-pulse"
                                    style={{ width: 12, height: 12 }}
                                />
                                <div
                                    className="pzh-skeleton pzh-pulse"
                                    style={{ width: 80, height: 12 }}
                                />
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    )
}
