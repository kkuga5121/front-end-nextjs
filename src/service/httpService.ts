// src/httpService.ts
export class HttpService {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async request<T>(url: string, config: RequestInit): Promise<T> {
        try {
            const response = await fetch(`${this.baseURL}${url}`, config);
                
            const data= await response.json();
            return data;
        } catch (error) {
            // Handle errors globally
            console.error('Fetch error:', error);
            throw error;
        }
    }

    public get<T>(url: string, config?: RequestInit): Promise<T> {
        return this.request<T>(url, { method: 'GET', ...config });
    }

    public post<T>(url: string, data?: any, config?: RequestInit): Promise<T> {
        return this.request<T>(url, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' }, ...config });
    }

    public patch<T>(url: string, data?: any, config?: RequestInit): Promise<T> {
        return this.request<T>(url, { method: 'PATCH', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' }, ...config });
    }

    public delete<T>(url: string, config?: RequestInit): Promise<T> {
        return this.request<T>(url, { method: 'DELETE', ...config });
    }
}

// const httpService = new HttpService('http://localhost:3000/api2');
const apiUrl: string = process.env.API_URL! as string
const httpService = new HttpService('http://localhost:3000/api');
// const httpService = new HttpService(apiUrl);

export default httpService;
