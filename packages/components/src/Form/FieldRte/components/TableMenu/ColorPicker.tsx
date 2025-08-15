import { useEffect, useRef, useState } from 'react'
import { ColorState, SketchPicker } from 'react-color'

interface ColorPickerProps {
    initialColor?: string
    onApply: (color: string) => void
}

const ColorPicker = ({
    initialColor = '#FFFFFF',
    onApply,
}: ColorPickerProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [color, setColor] = useState(initialColor)
    const pickerRef = useRef<HTMLDivElement>(null)

    // Close picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleChangeComplete = (newColor: ColorState) => {
        setColor(newColor.hex)
        onApply(newColor.hex) // apply while editor is still focused
    }

    return (
        <div className="relative" ref={pickerRef}>
            <button
                type="button"
                className="h-8 w-8 rounded border"
                style={{ backgroundColor: color }}
                onClick={() => setIsOpen(prev => !prev)}
            />
            {isOpen && (
                <div className="absolute z-50 mt-2">
                    <SketchPicker
                        color={color}
                        onChangeComplete={handleChangeComplete}
                    />
                </div>
            )}
        </div>
    )
}

export default ColorPicker
