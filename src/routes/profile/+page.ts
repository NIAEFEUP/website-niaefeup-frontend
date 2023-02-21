import { fetchWithAuth } from "$lib/network";
import type { PageLoad } from "./$types";

export const ssr = false;

export async function load({ fetch }) {
    const response = await fetchWithAuth(fetch, '/auth');
    const json = await response.json();
    const info = JSON.stringify(json);
    return {
        info
    }
}