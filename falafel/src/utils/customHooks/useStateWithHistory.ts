import { useCallback, useRef, useState } from 'react'

export interface StateHistoryOptions {
    capacity?: number
}

/**
 * a wrapper hook that helps keep track of an objects history
 *
 * @param defaultValue the default value we starting the history with
 * @param options a StateHistoryOptions object
 * @returns
 */
const useStateWithHistory = <T>(defaultValue: T, options?: StateHistoryOptions) => {
    const [value, setValue] = useState(defaultValue)
    const historyRef = useRef([value])
    const pointerRef = useRef(0)
    const capacity = options?.capacity ?? 10

    const set = useCallback(
        (v) => {
            const resolvedValue = typeof v === 'function' ? v(value) : v
            if (historyRef.current[pointerRef.current] !== resolvedValue) {
                if (pointerRef.current < historyRef.current.length - 1) {
                    historyRef.current.splice(pointerRef.current + 1)
                }
                historyRef.current.push(resolvedValue)

                while (historyRef.current.length > capacity) {
                    historyRef.current.shift()
                }
                pointerRef.current = historyRef.current.length - 1
            }
            setValue(resolvedValue)
        },
        [capacity, value]
    )

    const back = useCallback(() => {
        if (pointerRef.current <= 0) return
        pointerRef.current--
        setValue(historyRef.current[pointerRef.current])
    }, [])

    const forward = useCallback(() => {
        if (pointerRef.current >= historyRef.current.length - 1) return
        pointerRef.current++
        setValue(historyRef.current[pointerRef.current])
    }, [])

    const go = useCallback((index) => {
        if (index < 0 || index >= historyRef.current.length - 1) return
        pointerRef.current = index
        setValue(historyRef.current[pointerRef.current])
    }, [])

    return [
        value,
        set,
        {
            history: historyRef.current,
            pointer: pointerRef.current,
            back,
            forward,
            go
        }
    ]
}

export default useStateWithHistory