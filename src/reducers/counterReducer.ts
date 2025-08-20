
export type State = { value: number, step: number }
export type Action =
    | { type: "inc" }
    | { type: "dec" }
    | { type: "setValueTo", payload: number }
    | { type: "setStep", payload: number }
    | { type: "reset" };

type CounterRedProps = {
    min: number;
    initial: number;
    step: number
}

export const sanitizeStep = (n: number) => {
    return Number.isFinite(n) && n > 0 ? n : 1
}

export default function counterReducer({ min, initial, step }: CounterRedProps) {

    return function reducer(state: State, action: Action) {
        switch (action.type) {
            case "inc":
                return { ...state, value: state.value + state.step };
            case "dec":
                return { ...state, value: Math.max(min, state.value - state.step) };
            case "setValueTo":
                return { ...state, value: Math.max(min, action.payload) };
            case "setStep":
                return { ...state, step: Math.max(min, action.payload) }
            case "reset":
                return { value: Math.max(min, initial), step: sanitizeStep(step) }
            default:
                return state;
        }
    };
}