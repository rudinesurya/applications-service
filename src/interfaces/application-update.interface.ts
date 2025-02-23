import { Document } from 'mongoose';

export interface IApplicationUpdate extends Document {
    cover_letter: string;
}