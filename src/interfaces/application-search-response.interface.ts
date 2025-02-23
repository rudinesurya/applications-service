import { IApplication } from "./application.interface";

export interface IApplicationSearchResponse {
    status: number;
    message: string;
    application: IApplication | null;
    errors: { [key: string]: any };
}