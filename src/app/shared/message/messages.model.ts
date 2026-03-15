import { ToastMessageOptions } from "primeng/api";

export enum MessageScopes {
    Login = 'login',
    Dashboard = 'dashboard',
    Blog = 'blog',
    Register = 'register',
}

export enum MessageSeverity {
    Success = 'success',
    Info = 'info',
    Warn = 'warn',
    Error = 'error',
}

export const RegistrationSuccessMessage: ToastMessageOptions = {
    severity: MessageSeverity.Success,
    closable: true,
    key: MessageScopes.Login,
    summary: '',
    detail: 'Registration Successful! Please log in to continue.',
}

export const RegistrationFailureMessage: ToastMessageOptions = {
    severity: MessageSeverity.Error,
    closable: true,
    key: MessageScopes.Register,
    summary: '',
    detail: "Registration Failed! Please try again, or come back later.",
}