import { useEffect, useReducer } from "react"
import counterReducer, { sanitizeStep, type State } from "../reducers/counterReducer";

type Options = {
    initial: number,
    step: number,
    min: number,
    id?: string
}

export default function useCounter({ initial, step, min, id = "default" }: Options) {
    const key = (k: "value" | "step") => `counter:${id}:${k}`;

    const init = (): State => {
        const savedV = localStorage.getItem(key("value"));
        const savedS = localStorage.getItem(key("step"));
        const value = Math.max(min, savedV !== null ? Number(savedV) : initial);
        const s = sanitizeStep(savedS !== null ? Number(savedS) : step);
        return { value, step: s };
    }

    const reducer = counterReducer({ min, initial, step })
    const [state, dispatch] = useReducer(reducer, null as unknown as State, init)

    useEffect(() => {
        localStorage.setItem(key("value"), String(state.value))
        localStorage.setItem(key("step"), String(state.step))
    }, [state.value, state.step, id])


    return {
        value: state.value,
        step: state.step,
        inc: () => dispatch({ type: "inc" }),
        dec: () => dispatch({ type: "dec" }),
        reset: () => dispatch({ type: "reset" }),
        setValueTo: (n: number) => dispatch({ type: "setValueTo", payload: n }),
        setStep: (n: number) => dispatch({ type: "setStep", payload: n }),
        min
    }
}