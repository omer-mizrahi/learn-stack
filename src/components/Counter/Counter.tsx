import useCounter from "../../hooks/useCounter"

export default function Counter() {
    const { value, step, inc, dec, reset, setStep, min } = useCounter({ initial: 0, step: 1, min: 0 });

    return (
        <div>
            <h1>{value}</h1>
            <div style={{ display: "flex", gap: 8 }}>
                <button onClick={inc}>+ Increase by {step}</button>
                <button onClick={dec} disabled={value === min}>- Decrease by {step}</button>
                <button onClick={reset}>reset</button>
            </div>
            <div style={{ marginTop: 12 }}>
                <label>Step:</label>
                <input
                    type="number"
                    min={1}
                    step={1}
                    value={step}
                    onChange={(e) => setStep(e.target.valueAsNumber)}
                />
            </div>
        </div>
    )
}