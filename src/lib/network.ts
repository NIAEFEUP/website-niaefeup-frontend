import { PUBLIC_API_URL } from '$env/static/public'

const JWT_ACCESS_STORAGE_KEY = 'jwt'
const JWT_REFRESH_STORAGE_KEY = 'jwt-refresh'

async function _refreshAccessToken(): Promise<boolean> {
    const jwtRefresh = localStorage.getItem(JWT_REFRESH_STORAGE_KEY)
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
    localStorage.setItem(JWT_ACCESS_STORAGE_KEY, json['access_token'])
    return true
}

export async function _fetchWithAuth(allowRefresh: boolean, relativeUrl: URL | string,
    method: string, headers?: HeadersInit, body?: Object): Promise<Response> {

    const fetchAdapter = (relativeUrl: URL | string, method: string, headers: Headers, body?: Object) => {
        const url = new URL(relativeUrl, PUBLIC_API_URL)
        headers.append('Content-Type', 'application/json')
        return fetch(url, { method: method, body: JSON.stringify(body), headers })
    }

    const jwt = localStorage.getItem(JWT_ACCESS_STORAGE_KEY)
    if (!jwt) {
        return fetchAdapter(relativeUrl, method, new Headers(headers), body)
    }

    const authHeaders = new Headers(headers)
    authHeaders.append('Authorization', `Bearer ${jwt}`)

    const response = await fetchAdapter(relativeUrl, method, authHeaders, body)
    if (response.status === 401 && allowRefresh) {
        const refreshedAccessTokenSuccessful = await _refreshAccessToken()
        if (refreshedAccessTokenSuccessful) {
            return _fetchWithAuth(false, relativeUrl, method, headers, body)
        }
    }
    return response
}

export async function fetchWithAuth(relativeUrl: URL | string,
    method: string = "GET", headers?: HeadersInit, body?: Object): Promise<Response> {
    return _fetchWithAuth(true, relativeUrl, method, headers, body)
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
    localStorage.setItem(JWT_ACCESS_STORAGE_KEY, json['access_token'])
    localStorage.setItem(JWT_REFRESH_STORAGE_KEY, json['refresh_token'])
    return true
}

export function logout(): void {
    localStorage.removeItem(JWT_ACCESS_STORAGE_KEY)
    localStorage.removeItem(JWT_REFRESH_STORAGE_KEY)
}
