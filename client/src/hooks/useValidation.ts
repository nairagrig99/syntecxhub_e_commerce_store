import type { FormType, RegisterFormType } from "../interface/register-form-itype.ts";
import { useState } from "react";

export function useValidation() {
    const [error, setError] = useState<FormType[]>([]);

    const validateForm = (f: RegisterFormType[], e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let errorMessage = "";

        if (value.trim() === "") {
            errorMessage = "This field is required";
        }

        else if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = "Please enter a valid email address";
            }
        }


        setError((prev) => {

            const cleanErrors = prev.filter((err) => !err.hasOwnProperty(name));

            if (errorMessage) {
                return [...cleanErrors, { [name]: errorMessage } as unknown as FormType];
            }

            return cleanErrors;
        });
    };

    return { error, validateForm };
}