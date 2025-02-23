import { IApplication } from "./application.interface";

export interface IApplicationUpdateResponse {
    status: number;
    message: string;
    application: IApplication | null;
    errors: { [key: string]: any };
}