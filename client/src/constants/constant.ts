import type {RegisterFormType} from "../interface/register-form-itype.ts";

export const SIGN_UP_STATE: RegisterFormType[] = [
    {type: "text", placeholder: 'First Name', name: {first_name: ""}},
    {type: "text", placeholder: 'Last Name', name: {last_name: ""}},
    {type: "email", placeholder: 'Email', name: {email: ""}},
    {type: "password", placeholder: 'Password', name: {password: ""}},
    {type: "password", placeholder: 'Re password', name: {re_password: ""}}
]

export const SIGN_IN_STATE: RegisterFormType[] = [
    {type: "email", placeholder: 'Email', name: {email: ""}},
    {type: "password", placeholder: 'Password', name: {password: ""}}
]