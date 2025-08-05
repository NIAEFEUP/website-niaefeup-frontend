import { error, fail } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const res = await fetch(`/api/accounts/${params.id}`);
  if (!res.ok) error(res.status, 'Account not found');
  const account = await res.json();
  return { account };
};

export const actions = {
  default: async ({ params, request, fetch }: RequestEvent) => {
    const data = await request.formData();

    const email = data.get('email');
    const name = data.get('name');
    const bio = data.get('bio');
    const birthDate = new Date(data.get('birthDate') as string);
    const birthDatejson = `${birthDate.getDate()}-${birthDate.getMonth() + 1}-${birthDate.getFullYear()} ${birthDate.getHours()}:${birthDate.getMinutes()}`;
    const linkedin = data.get('linkedin');
    const github = data.get('github');
    const photo = data.get('photo') as File;
    const url = data.get('url') as string;
    const icon = data.get('icon') as string;
    const label = data.get('label') as string;
    const isActive = data.get('isActive') === 'Ativo' ? true : false;

    const value = {
      email: email,
      name: name,
      bio: bio,
      birthDate: birthDatejson,
      linkedin: linkedin,
      github: github,
      websites: [
        {
          url: url,
          iconPath: icon,
          label: label
        }
      ],
      isActive: isActive
    };

    console.log(value);
    const json = JSON.stringify(value);
    const blob = new Blob([json], { type: 'application/json' });
    const form = new FormData();
    form.append('account', blob);
    if (photo && photo.size != 0) form.append('photoFile', photo, photo.name);

    try {
      const res = await fetch(`/api/accounts/${params.id}`, {
        method: 'PUT',
        body: form
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        let messages: string[] = [];

        if (Array.isArray(errorData.errors)) {
          messages = errorData.errors.map((error: { message: string }) => error.message);
        } else if (errorData.message) {
          messages = [errorData.message];
        } else {
          messages = ['Failed to edit account.'];
        }
        return fail(res.status, { errorMessage: messages });
      }

      return { success: true };
    } catch (err) {
      return fail(500, { errorMessage: 'Server error. Please try again.' });
    }
  }
};
