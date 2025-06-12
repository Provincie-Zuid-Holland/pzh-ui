import { useState } from 'react'
import { Option } from '../FieldSelect'

export const useCreatableHandlers = ({
    isCreatable,
    onChange,
    initialValue,
}: {
    isCreatable?: boolean
    onChange?: (...args: any[]) => void
    initialValue?: any
}) => {
    const [inputValue, setInputValue] = useState('')
    const [value, setValue] = useState<readonly Option[]>(
        Array.isArray(initialValue) ? initialValue : []
    )

    const createOption = (label: string) => ({ label, value: label })

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (!inputValue) return
        switch (event.key) {
            case 'Enter':
            case 'Tab': {
                if (value.find(v => v.value === inputValue)) return

                const newVal = [...value, createOption(inputValue)]
                setValue(newVal)

                onChange?.(newVal, {
                    action: 'create-option',
                    option: undefined,
                })

                setInputValue('')
                event.preventDefault()
                break
            }
        }
    }

    return {
        creatableProps: isCreatable
            ? {
                  isMulti: true,
                  onKeyDown: handleKeyDown,
                  onInputChange: (val: string) => setInputValue(val),
                  inputValue,
                  value,
              }
            : {},
        value,
        handleChange: (newValue: any, meta: any) => {
            setValue(newValue)
            onChange?.(newValue, meta)
        },
    }
}
