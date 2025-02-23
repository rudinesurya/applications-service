export interface IApplicationDeleteResponse {
    status: number;
    system_message: string;
    errors: { [key: string]: any };
}   