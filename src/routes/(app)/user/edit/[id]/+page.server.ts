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

    const dataWebsites = [];
    let websiteIndex = 1;
    const email = data.get('email');
    const name = data.get('name');
    const bio = data.get('bio');
    const birthDate = new Date(data.get('birthDate') as string);
    const birthDateJson = `${birthDate.getDate()}-${birthDate.getMonth() + 1}-${birthDate.getFullYear()} ${birthDate.getHours()}:${birthDate.getMinutes()}`;
    const linkedin = data.get('linkedin');
    const github = data.get('github');
    const photo = data.get('photo') as File;

    const parts = [];
    while (data.get(`url ${websiteIndex}`) !== null) {
      const icon = data.get(`icon ${websiteIndex}`) as File | null;
      let blobAtual;

      const atual = {
        url: data.get(`url ${websiteIndex}`) as string,
        label: data.get(`label ${websiteIndex}`) as string,
      };
      if (icon) {
        blobAtual = new Blob(
          [JSON.stringify(atual), icon],
          { type: "application/octet-stream" }
        );  
      } else {
        blobAtual = new Blob([JSON.stringify(atual)], {
          type: "application/json"
        });
      }
      parts.push(blobAtual);

      websiteIndex++;
    }
    const blobWebsites = new Blob(parts);

    const isActive = data.get('isActive') === 'Membro Ativo' ? true : false;

    const value = {
      email: email,
      name: name,
      bio: bio,
      birthDate: birthDateJson,
      linkedin: linkedin,
      github: github,
      isActive: isActive
    };

    const blobAccount = new Blob([JSON.stringify(value)], {
      type: 'application/json'
    });

    const form = new FormData();

    if (photo && photo.size != 0) form.append('photo', photo);
    const blobFinal = new Blob([blobAccount, blobWebsites]);
    form.append("account", blobFinal); //isso tá errado, infelizmente parece que ao tranformar em blob, tudo passa a ser bytes concatenados e não haveria maneira de dizer ou dar parse de onde um site acaba e outro começa e assim em diante... talvez passar para uma abordagem de dar um form.append para a account e a photo, e para cada website seguido de sua icon/null
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
