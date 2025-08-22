import { computed, reactive } from 'vue';
import router from '@/router';
import { AxiosError } from 'axios';

import {
    csrfCookie,
    login as apiLogin,
    logout as apiLogout,
    user as apiUser,
    register as apiRegister
} from '@api/auth';

interface User {
    email: string
}

interface Credentials {
    email: string
    password: string
}

interface RegisterForm {
    email: string
    password: string
    password_confirmation: string
}

const state = reactive<{
    authenticated: boolean
    user: User | Record<string, never> | null
}>({
    authenticated: false,
    user: {},
});

export default function useAuth() {
    const authenticated = computed(() => state.authenticated);
    const user = computed(() => state.user);

    const setAuthenticated = (authenticated: boolean) => {
        state.authenticated = authenticated;
    };

    const setUser = (user: User) => {
        state.user = user;
    };

    const resetUser = () => {
        setAuthenticated(false);
        state.user = null;
    };

    const login = async (credentials: Credentials): Promise<void> => {
        await csrfCookie();

        try {
            await apiLogin(credentials);
            await attempt();
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                return Promise.reject(e.response?.data?.errors || 'Login error');
            } else {
                return Promise.reject('Login error');
            }
        }
    };

    const attempt = async (): Promise<void> => {
        try {
            const response = await apiUser();
            setAuthenticated(true);
            setUser(response.data);
        } catch {
            resetUser();
            void router.push({ name: 'home' });
        }
    };

    const register = async (form: RegisterForm): Promise<void> => {
        await csrfCookie();
        await apiRegister(form);
        void router.push({ name: 'home' });
    };

    const logout = async (): Promise<void> => {
        await apiLogout();
        resetUser();
        void router.push({ name: 'home' });
    };

    return {
        authenticated,
        user,
        login,
        attempt,
        register,
        logout,
        resetUser,
    };
}
