export const actions = {
  deleteTechnology: async ({ request, fetch }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    const res = await fetch(`/api/technologies/${id}`, {
      method: 'DELETE'
    });

    return { success: res.ok };
  },
  addTechnology: async ({ request, fetch }) => {
    const data = await request.formData();

    const formData = new FormData();

    formData.append(
      'dto',
      new Blob(
        [
          JSON.stringify({
            name: data.get('name'),
            url: data.get('url')
          })
        ],
        { type: 'application/json' }
      )
    );
    formData.append('image', data.get('image'));

    const res = await fetch(`/api/technologies`, {
      method: 'POST',
      body: formData
    });

    const json = await res.json();

    console.log("JSON: ", json);

    return { success: res.ok };
  }
};
