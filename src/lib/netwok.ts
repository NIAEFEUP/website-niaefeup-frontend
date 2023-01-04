import { PUBLIC_API_URL } from '$env/static/public'

const JWT_ACCESS_STORAGE_KEY = 'jwt'
const JWT_REFRESH_STORAGE_KEY = 'jwt-refresh'

async function refreshAccessToken(): Promise<boolean> {
    const jwtRefresh = localStorage.getItem('jwt-refresh')
    if (!jwtRefresh) {
        return false
    }

    const response = await fetch(`${PUBLIC_API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: jwtRefresh })
    })

    if (response.status !== 200) {
        return false
    }

    const json = await response.json()
    localStorage.setItem(JWT_ACCESS_STORAGE_KEY, json.accessToken)
    return true
}

export async function fetchWithAuth(relativeUrl: URL, method: string, headers: Headers, body: Object): Promise<Response> {
    const fetchAdapter = (relativeUrl: URL, method: string, headers: Headers, body: Object) => {
        const url = new URL(relativeUrl, PUBLIC_API_URL)
        headers.append('Content-Type', 'application/json')
        return fetch(url, { method: method, body: JSON.stringify(body), headers })
    }

    const jwt = localStorage.getItem(JWT_ACCESS_STORAGE_KEY)
    if (!jwt) {
        return fetchAdapter(relativeUrl, method, headers, body)
    }

    const authHeaders = new Headers(headers)
    headers.append('Authorization', `Bearer ${jwt}`)

    const response = await fetchAdapter(relativeUrl, method, authHeaders, body)
    if (response.status === 401) {
        const refreshedAccessTokenSuccessful = await refreshAccessToken()
        if (refreshedAccessTokenSuccessful) {
            return fetchWithAuth(relativeUrl, method, headers, body)
        }
    }
    return response
}

export async function login(email: string, password: string): Promise<boolean> {
    const response = await fetch(`${PUBLIC_API_URL}/auth/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    if (response.status !== 200) {
        return false
    }

    const json = await response.json()
    localStorage.setItem(JWT_ACCESS_STORAGE_KEY, json.accessToken)
    localStorage.setItem(JWT_REFRESH_STORAGE_KEY, json.refreshToken)
    return true
}

export function logout(): void {
    localStorage.removeItem(JWT_ACCESS_STORAGE_KEY)
    localStorage.removeItem(JWT_REFRESH_STORAGE_KEY)
}
