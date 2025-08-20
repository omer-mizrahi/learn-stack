import { useEffect, useState } from "react"

export default function Dashboard() {
    const [count, setCount] = useState<number>(() => {
        const saved = localStorage.getItem("count")
        return saved !== null ? Number(saved) : 0
    })
    const [step, setStep] = useState(() => {
        const saved = localStorage.getItem("step")
        return saved !== null ? Number(saved) : 1
    })

    useEffect(() => {
        localStorage.setItem("count", count.toString())
    }, [count])

    useEffect(() => {
        localStorage.setItem("step", step.toString())
    }, [step])

    const increase = () => setCount((c) => c + step);
    const decrease = () => setCount((c) => Math.max(0, c - step));
    const reset = () => {
        setCount(0)
        setStep(1)
        localStorage.removeItem("count")
        localStorage.removeItem("step")
    }

    const onChangeStep = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e?.target?.value)
        setStep(val)
    }

    return (
        <div>
            <h1>{count}</h1>
            <div style={{ display: "flex", gap: 8 }}>
                <button onClick={increase}>increase by {step}</button>
                <button onClick={decrease}>decrease by {step}</button>
                <button onClick={reset}>reset</button>
            </div>
            <div style={{ marginTop: 12 }}>
                <label >Step:</label>
                <input
                    type="number"
                    min={1}
                    step={1}
                    value={step}
                    onChange={onChangeStep}
                />
            </div>
        </div>
    )
}