import React, { useEffect, useState } from 'react'


type TDebounceValue = string | number | boolean

export function useDebounce(value: TDebounceValue, delay = 250) {

    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => {
            clearTimeout(timer)
        }

    }, [value, delay])

    return debounceValue

}




