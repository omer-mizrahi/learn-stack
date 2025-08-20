import { useEffect, useState } from "react"

type Options = {
    initial: number,
    step: number,
    min: number,
    id?: string
}

export default function useCounter({ initial, step, min, id = "default" }: Options) {
    const [value, setValue] = useState<number>(() => {
        const saved = localStorage.getItem(`counter:${id}:value`)
        return Math.max(min, saved !== null ? Number(saved) : initial)
    });
    const [s, setS] = useState(() => {
        const saved = localStorage.getItem(`counter:${id}:step`)
        const v = saved !== null ? Number(saved) : step
        return Number.isFinite(v) && v > 0 ? v : 1
    });

    function inc() { setValue(v => Math.max(min, v + s)) }
    function dec() { setValue(v => Math.max(min, v - s)) }
    function setValueTo(n: number) { setValue(Math.max(min, n)) }
    function setStep(n: number) { setS(Number.isFinite(n) && n > 0 ? n : 1) }
    function reset() {
        setValue(initial);
        setS(step);
        localStorage.removeItem(`counter:${id}:value`)
        localStorage.removeItem(`counter:${id}:step`)
    }

    useEffect(() => {
        localStorage.setItem(`counter:${id}:value`, String(value))
    }, [value, id])

    useEffect(() => {
        localStorage.setItem(`counter:${id}:step`, String(s))
    }, [s, id])

    return { value, step: s, inc, dec, setValueTo, setStep, reset, min }
}