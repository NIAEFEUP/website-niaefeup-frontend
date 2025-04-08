import type { RequestEvent } from '@sveltejs/kit';
import { getContext } from 'svelte';

export const actions = {
  default: async ({ request,params, fetch }: RequestEvent) => {
    const formData : FormData = await request.formData();
    const id = params.id;
    const googlePlay = formData.get("googleplay");
    const appStore = formData.get("appstore");

    const image = formData.get("image")
    console.log(googlePlay)
    console.log(appStore)
    console.log([googlePlay, appStore])
    console.log("---------------------------------------------------------------------")
    const value  = {
        // technologies: formData.get("title"),
        title: formData.get("title"),
        description: formData.get("description"),
        slug: formData.get("slug"),
        // teamMembersId: [],
        isArchived: false,
        // technologies: [],
        slogan: formData.get("slogan"),
        targetAudience: formData.get("targetaudience"),
        ////github: formData.get("github"),
        links: [
          {url: googlePlay},
          {url: appStore}
        ],
        // timeline: [],
        // hallOfFameIds: []
      }

    const json = JSON.stringify(value)
    const blob = new Blob([json],{type: "application/json"})
    const form = new FormData()
    form.append("project",blob)
    //form.append("image",image)

    const success = await fetch(`/api/projects/${id}`,
      //isaac inves de projects colocar o events
      {
      method: 'PUT',
      //isaac ser post
       body:form 
    }).then((res) => res.ok);

    return success;
  }
};
