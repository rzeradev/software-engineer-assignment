import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseURL: string = "http://localhost:8080";

class ApiService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: baseURL,
            headers: {
                Accept: "application/json",
                "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN") || "", // Get CSRF token from cookies
            },
            withCredentials: true,
        });

        this.initializeResponseInterceptor();
    }

    private initializeResponseInterceptor() {
        this.axiosInstance.interceptors.response.use(
            this.handleResponse,
            this.handleError,
        );
    }

    private handleResponse(response: AxiosResponse) {
        return response;
    }

    private handleError(error: AxiosError) {
        if (!error.response) {
            toast.error(
                "Network error: Please check your internet connection.",
            );
        }

        if (error.response) {
            switch (error.response.status) {
                case 400:
                    toast.error("Bad Request: The request is invalid.");
                    break;
                case 401:
                    break;
                case 403:
                    toast.error(
                        "Forbidden: You do not have permission to access this resource.",
                    );
                    break;
                case 404:
                    toast.error(
                        "Not Found: The requested resource could not be found.",
                    );
                    break;
                case 422:
                    toast.error(
                        "Unprocessable Entity: The request is invalid.",
                    );
                    break;
                default:
                    if (error.response.data instanceof Blob) {
                        const reader = new FileReader();
                        reader.onload = function () {
                            const data = JSON.parse(reader.result as string);

                            toast.error("An error occurred: " + data.message);
                        };
                        reader.readAsText(error.response.data);
                    } else {
                        toast.error(
                            "An error occurred: " +
                                (error.response.data as any).message,
                        );
                    }
            }
        }

        return Promise.reject(error);
    }

    private async getCSRFToken() {
        await this.axiosInstance.get("sanctum/csrf-cookie");
    }

    public async get<T = unknown>(
        url: string,
        params?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        await this.getCSRFToken();
        return this.axiosInstance.get<T>(url, { params, ...config });
    }

    public async post<T = unknown>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        await this.getCSRFToken();
        return this.axiosInstance.post<T>(url, data, config);
    }

    public async put<T = unknown>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        await this.getCSRFToken();
        return this.axiosInstance.put<T>(url, data, config);
    }

    public async delete<T = unknown>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        await this.getCSRFToken();
        return this.axiosInstance.delete<T>(url, config);
    }

    public async uploadFile<T = unknown>(
        url: string,
        formData: FormData,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        const uploadConfig = {
            ...config,
            headers: {
                ...config?.headers,
                "Content-Type": "multipart/form-data",
            },
        };
        return this.axiosInstance.post<T>(url, formData, uploadConfig);
    }
}

export const apiService = new ApiService();
