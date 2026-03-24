import type { PageServerLoad, Actions } from './$types';

function getResult(pw: string, pw_confirm: string): string {
    if (pw !== pw_confirm)
        return "Passwords don't match!";
    return "";
}

export const load: PageServerLoad = async ({ params }) => {
    return {
        token: params.token
    };
};

export const actions: Actions = {
    submitRecovery: async ({ request, fetch }) => {
        const requestData = await request.formData();
        const password = requestData.get('password');
        const confirmpassword = requestData.get('confirmpassword');
        const token = requestData.get('token');

        let stringpassword = password != null ? password.toString() : '';
        let stringpassword_confirm = confirmpassword != null ? confirmpassword.toString() : '';

        const err = getResult(stringpassword, stringpassword_confirm);
        if (err) return { success: false, err };
        
        const res = await fetch(`/api/auth/password/recovery/${token}/confirm`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: stringpassword })
        });

        if (!res.ok) {
            const data = await res.json();
            const message = data.errors[0].message;
            return { success: false, err: message };
        }

        console.log(await res.text());

        return { success: true, err: '' };
    }
};