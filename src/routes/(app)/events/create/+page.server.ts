import type { RequestEvent } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, fetch }: RequestEvent) => {
    const data = await request.formData();

    const Title = data.get("Title")
    const Slug = data.get("Slug")
    const Description = data.get("Description")
    const Date = data.get("Date")
    const SignUp = data.get("SignUp")
    const Place = data.get("Place")
    const Image = data.get("Profile Picture")

    const dummy = "bipbop";

    const value  = {
      // technologies: formData.get("title"),
      title: Title,
      description: Description,
      slug: Slug,
      teamMembersIds: [],
      image: Image,
      registerUrl: "idk :/",
      dateInterval: Date,
      location: Place,
      category: "idk :/"
    }


    const json = JSON.stringify(value)
    const blob = new Blob([json],{type: "application/json"})

    const form = new FormData()
    form.append("event",blob)
    //form.append("image",image)

    const success = await fetch(`/api/events`,
      {
      method: 'POST',
      body:form 
    }).then((res) => res.ok);

    return success;
  }
};