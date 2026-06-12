import type {RegisterFormType} from "../../../interface/register-form-itype.ts";
import styles from './Register.module.scss';
import useForm from "../../../hooks/useForm.ts";
import {Link, useNavigate} from "react-router-dom";
import {SIGN_UP_STATE} from "../../../constants/constant.ts";
import {useValidation} from "../../../hooks/useValidation.ts";
import {useEffect, useState} from "react";

import {EyeIcon} from "../../../components/ui/EyeSvg.tsx";
import {fetchRequest} from "../../../services/fetch-request-server.ts";
import {useApiRequest} from "../../../hooks/useApiRequest.ts";

export default function Register() {
    const useFormHook = useForm(SIGN_UP_STATE);
    const useValidationForm = useValidation();
    const api = useApiRequest()
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState<boolean>(false);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget);
        const formValue = Object.fromEntries(formData.entries());

        const sendRequest = await fetchRequest(() => api.ApiRegister(formValue))
        if (!sendRequest || sendRequest.errorMessage) return
        navigate('/auth/login')
    }

    useEffect(() => {
        console.log('useValidationForm', useValidationForm.error);
    }, [useValidationForm.error]);

    const wrapObjectKey = (obj: RegisterFormType) => Object.keys(obj.name)[0];
    const wrapObjectValue = (obj: RegisterFormType): string => Object.values(obj.name)[0] as string;

    const showPassword = () => {
        setIsShow(!isShow)
    }
    return <div className={styles.register_form}>
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
            {useFormHook.form.map((f) =>
                (<div key={wrapObjectKey(f)} className={styles['register_form_main_block']}>
                    <input
                        name={wrapObjectKey(f)}
                        onChange={useFormHook.handleFormInput}
                        type={f.type === 'password' && isShow ? 'text' : f.type}
                        onBlur={(e) => useValidationForm.validateForm(useFormHook.form, e)}
                        placeholder={f.placeholder}
                        className={styles.inputField}
                        value={wrapObjectValue(f)}/>
                    {/*<span className="error">{useValidationForm.error[wrapObjectKey(f)]}</span>*/}
                    {
                        wrapObjectKey(f) === 'password' || wrapObjectKey(f) === 're_password' && <p>
                            <EyeIcon onClick={showPassword}/>
                        </p>
                    }
                </div>)
            )}
            <button type='submit'
                    className={styles.submitButton}>
                Sign Up
            </button>
        </form>
        <span className={styles['register_form_login_render']}>Do you have an account already ? <Link
            to='/auth/login'>Sign In </Link></span>
    </div>
}