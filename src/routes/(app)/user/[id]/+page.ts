import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetch(`/api/accounts/${params.id}`);
  const teamMember = await res.json();

  return { teamMember };
};
