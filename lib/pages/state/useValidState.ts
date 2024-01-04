import { useState } from "react"

const useValidState = () => {
    const [isValid, setIsValid] = useState(false);
    
    const setValidity = (validity: boolean) => {
        setIsValid(validity);
    }
    return [isValid, setValidity] as [boolean, typeof setValidity]
}

export default useValidState;