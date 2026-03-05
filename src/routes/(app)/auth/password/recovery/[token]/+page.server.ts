import type { PageServerLoad, Actions } from './$types';


export const load: PageServerLoad = async ({params}) => {
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
        let stringpassword = '';
        if (password != null){
            stringpassword = password.toString()
        }
        

        let check = password != '' && password == confirmpassword;
        if (check){
            const formData = new FormData();
            formData.append('password', stringpassword);
            const message: string = token;
            console.log(message);
            const res = await fetch(`/api/auth/password/recovery/${token}/confirm`, {
                method: 'POST',
                body: formData
            });
        };
    }
};
