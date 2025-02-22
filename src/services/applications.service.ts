import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel('Application') private readonly applicationModel: Model<IApplication>
  ) { }

  
}