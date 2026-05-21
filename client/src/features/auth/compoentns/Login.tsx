import type {RegisterFormType} from "../../../interface/register-form-itype.ts";
import styles from './Register.module.scss';
import useForm from "../../../hooks/useForm.ts";
import {SIGN_IN_STATE} from "../../../constants/constant.ts";
import {Link, useNavigate} from "react-router-dom";
import {ApiLogin} from "../../../services/server.ts";
import {useState} from "react";
import {EyeIcon} from "../../../components/ui/EyeSvg.tsx";
import useAuth from "../hooks/useAuth.ts";
import {ActionEnum} from "../../../enums/action-enum.ts";

export default function Login() {
    const useFormHook = useForm(SIGN_IN_STATE);
    const {dispatch} = useAuth()
    const navigate = useNavigate()
    const [isShow, setIsShow] = useState<boolean>(false);
    const [error, setError] = useState<string>('')
    const handleLoginSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const {email, password} = event.target;

        const request = await ApiLogin({
            email: email.value,
            password: password.value
        });

        if (!request || request.errorMessage) {
            setError(request.errorMessage.message)
            return
        }
        dispatch({type: ActionEnum.LOGIN_SUCCESS, payload: {user: request.user, token: request.token}})
        localStorage.setItem('_token', request.token);
        navigate('/')
    }

    const wrapObjectKey = (obj: RegisterFormType) => Object.keys(obj.name)[0];
    const wrapObjectValue = (obj: RegisterFormType): string => Object.values(obj.name)[0] as string;

    const showPassword = () => setIsShow(!isShow)

    return <div className={styles.register_form}>
        <h3>Sign In</h3>
        <form onSubmit={handleLoginSubmit}>
            {useFormHook.form.map((f) => <div key={wrapObjectKey(f)} style={{width: '450px', position: 'relative'}}>
                    <input
                        name={wrapObjectKey(f)}
                        onChange={useFormHook.handleFormInput}
                        type={f.type === 'password' && isShow ? 'text' : f.type}
                        placeholder={f.placeholder}
                        className={styles.inputField}
                        value={wrapObjectValue(f)}/>

                    {
                        wrapObjectKey(f) === 'password' &&
                        <EyeIcon onClick={showPassword}/>
                    }

                </div>
            )}
            <p style={{color: 'red', fontSize: '15px', marginBottom: '10px', marginTop: 0}}> {error}</p>
            <button type='submit'
                    className={styles.submitButton}>
                Sign In
            </button>
        </form>
        <span className={styles['register_form_login_render']}>
  Don't have an account? <Link to='/auth/register'>Sign Up</Link>
</span>
    </div>
}