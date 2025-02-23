export interface IApplicationDeleteResponse {
    status: number;
    message: string;
    errors: { [key: string]: any };
}   