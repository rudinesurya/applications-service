import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { IApplication } from 'src/interfaces/application.interface';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel('Application') private readonly applicationModel: Model<IApplication>
  ) { }

  
}