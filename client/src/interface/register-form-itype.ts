export type RegisterFormType = {
    type: string,
    placeholder: string,
    name: FormType
}

export type FormType = {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    re_password?: string;
};