import HttpError from './http-error'

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: string
  headers?: {
    [key: string]: string
  }
}

export interface IHttpClient {
  GET(endpoint: string, options?: RequestOptions): Promise<any>
  POST(endpoint: string, body: any, options?: RequestOptions): Promise<any>
  PATCH(endpoint: string, body: any, options?: RequestOptions): Promise<any>
  DELETE(endpoint: string): Promise<any>
}

class HttpClient implements IHttpClient {
  private static async fetchRequest(endpoint: string, options?: RequestOptions) {
    const response = await fetch(endpoint, {
      ...options,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers ?? {}),
      },
    });

    if (!response.ok) {
      // TODO: Handle error throw
      /* const { status, statusText } = response;
      throw new HttpError(`(${status}) - ${statusText}`, status); */
    }

    let data = await response.text();

    try {
      data = JSON.parse(data);
      return data;
    } catch (err) {
      return data;
    }
  }

  async GET(endpoint: string, options?: RequestOptions): Promise<any> {
    return HttpClient.fetchRequest(endpoint, {
      ...options,
      method: 'GET',
    });
  }

  async POST(endpoint: string, body: any, options?: RequestOptions): Promise<any> {
    return HttpClient.fetchRequest(endpoint, {
      ...options,
      method: 'POST',
      body: typeof body === 'string' ? body : JSON.stringify(body),
    });
  }

  async PATCH(endpoint: string, body: any, options?: RequestOptions): Promise<any> {
    return HttpClient.fetchRequest(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  async DELETE(endpoint: string): Promise<any> {
    return HttpClient.fetchRequest(endpoint, {
      method: 'DELETE',
    });
  }
}

const httpClient = new HttpClient();
export default httpClient;