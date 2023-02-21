export async function load({ fetch }) {
  const response = await fetch('api/auth');
  const json = await response.json();
  return json;
}
