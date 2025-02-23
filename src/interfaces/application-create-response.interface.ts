import { IApplication } from "./application.interface";

export interface IApplicationCreateResponse {
    status: number;
    message: string;
    application: IApplication | null;
    errors: { [key: string]: any };
}