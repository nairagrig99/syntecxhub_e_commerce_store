import {useState} from "react";
import type {RegisterFormType} from "../interface/register-form-itype.ts";

export default function useForm(form_state: RegisterFormType[]) {
    const [form, setForm] = useState<RegisterFormType[]>(form_state);
    const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        const newArr = form.map((f) => {
            if (Object.keys(f.name)[0] === name) {
                return {...f, name: {[name]: value}}
            }
            return {...f}
        })
        setForm(newArr)
    }

    return {form, handleFormInput}
}