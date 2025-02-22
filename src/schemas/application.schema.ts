import * as mongoose from 'mongoose';

export interface IApplicationSchema extends mongoose.Document {
    job: mongoose.Types.ObjectId;
    applicant: mongoose.Types.ObjectId;
    cover_letter: string;
}

export const ApplicationSchema = new mongoose.Schema<IApplicationSchema>(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job', // Adjust the ref as needed
            required: true,
        },
        applicant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Adjust the ref as needed
            required: true,
        },
        cover_letter: {
            type: String,
        },
    },
    {
        toObject: {
            virtuals: false,
            versionKey: false,
        },
        toJSON: {
            virtuals: false,
            versionKey: false,
        },
    },
);