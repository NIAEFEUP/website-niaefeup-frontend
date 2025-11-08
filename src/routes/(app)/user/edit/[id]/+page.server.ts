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
    
    const iconFiles: File[] = [];
    
    while (data.get(`url ${websiteIndex}`) !== null) {
      const icon = data.get(`icon ${websiteIndex}`) as File;
      
      console.log(`Icon ${websiteIndex}:`, icon, 'Size:', icon?.size, 'Name:', icon?.name);
      
      dataWebsites.push({
        url: data.get(`url ${websiteIndex}`) as string,
        label: data.get(`label ${websiteIndex}`) as string
      });
      
      iconFiles.push(icon);
      
      websiteIndex++;
    }
    const isActive = data.get('isActive') === 'Active' ? true : false;

    const value = {
      email: email,
      name: name,
      bio: bio,
      birthDate: birthDateJson,
      linkedin: linkedin,
      github: github,
      websites: dataWebsites,
      isActive: isActive
    };

    const blob = new Blob([JSON.stringify(value)], {
      type: 'application/json'
    });

    const form = new FormData();
    form.append('account', blob);
    if (photo && photo.size != 0) form.append('photoFile', photo);
    
    console.log('Value being sent:', value);
    console.log('Icon files to append:', iconFiles.length);

    iconFiles.forEach((iconFile, index) => {
      if (iconFile instanceof File && iconFile.size > 0) {
        const fieldName = `websites[${index}].iconPath`;
        console.log(`Appending ${fieldName}:`, iconFile.name, iconFile.size, 'bytes');
        form.append(fieldName, iconFile, iconFile.name);
      } else {
        console.log(`Skipping icon ${index} - size:`, iconFile?.size);
      }
    });

    console.log('\n=== FormData Contents ===');
    for (const pair of form.entries()) {
      const [key, value] = pair;
      if (value instanceof File) {
        console.log(`${key}: File(${value.name}, ${value.size} bytes)`);
      } else {
        console.log(`${key}: Other type`);
      }
    }
    console.log('========================\n');
    
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
