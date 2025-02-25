import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { IApplicationUpdate } from 'src/interfaces/application-update.interface';
import { IApplication } from 'src/interfaces/application.interface';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel('Application') private readonly applicationModel: Model<IApplication>
  ) { }

  public async getApplicationById(id: string): Promise<IApplication> {
    return this.applicationModel
      .findOne({ _id: new Types.ObjectId(id) })
      .exec();
  }

  public async getApplicationsByJobId(id: string): Promise<IApplication[]> {
    return this.applicationModel
      .find({ job: new Types.ObjectId(id) })
      .exec();
  }

  public async createApplication(application: IApplication): Promise<IApplication> {
    try {
      const applicationModel = new this.applicationModel(application);
      return await applicationModel.save();
    } catch (error: any) {
      // MongoDB duplicate key error code
      if (error.code === 11000) {
        throw new ForbiddenException('You have already created this application.');
      }
      throw error;
    }
  }

  public async updateApplication(id: string, userId: string, updateData: IApplicationUpdate): Promise<IApplication> {
    const updatedApplication = await this.applicationModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id), applicant: new Types.ObjectId(userId) },
      { $set: updateData },
      { new: true }
    ).exec();

    if (!updatedApplication) {
      throw new NotFoundException('Application not found or you are not the owner');
    }

    return updatedApplication;
  }

  public async removeApplication(id: string, userId: string): Promise<{ system_message: string }> {
    const deletedApplication = await this.applicationModel.findOneAndDelete({
      _id: new Types.ObjectId(id),
      applicant: new Types.ObjectId(userId),
    }).exec();

    if (!deletedApplication) {
      throw new NotFoundException('Application not found or you are not the owner');
    }

    return { system_message: 'Application removed successfully' };
  }
}