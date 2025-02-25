import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApplicationsService } from './services/applications.service';
import { IApplicationCreateResponse } from './interfaces/application-create-response.interface';
import { IApplicationDeleteResponse } from './interfaces/application-delete-response.interface';
import { IApplicationSearchResponse } from './interfaces/application-search-response.interface';
import { IApplicationUpdateResponse } from './interfaces/application-update-response.interface';
import { IApplicationUpdate } from './interfaces/application-update.interface';
import { IApplication } from './interfaces/application.interface';
import { IApplicationsSearchResponse } from './interfaces/applications-search-response.interface';

@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
  ) { }

  @MessagePattern('application_get_by_id')
  public async getApplicationById({ id }): Promise<IApplicationSearchResponse> {
    let result: IApplicationSearchResponse;

    if (id) {
      const application = await this.applicationsService.getApplicationById(id);
      result = {
        status: HttpStatus.OK,
        system_message: 'application_get_success',
        application: application,
        errors: null,
      };
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        system_message: 'application_get_bad_request',
        application: null,
        errors: null,
      };
    }

    return result;
  }

  @MessagePattern('applications_get_by_job_id')
  public async getApplicationsByJobId({ id }): Promise<IApplicationsSearchResponse> {
    let result: IApplicationsSearchResponse;

    if (id) {
      const applications = await this.applicationsService.getApplicationsByJobId(id);
      result = {
        status: HttpStatus.OK,
        system_message: 'applications_get_success',
        applications: applications,
        errors: null,
      };
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        system_message: 'applications_get_bad_request',
        applications: null,
        errors: null,
      };
    }

    return result;
  }

  @MessagePattern('application_create')
  public async createApplication(params: { createData: IApplication }): Promise<IApplicationCreateResponse> {
    let result: IApplicationCreateResponse;

    if (params && params.createData) {
      try {
        const application = await this.applicationsService.createApplication(params.createData);
        result = {
          status: HttpStatus.CREATED,
          system_message: 'application_create_success',
          application: application,
          errors: null,
        };
      } catch (e) {
        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          system_message: 'application_create_precondition_failed',
          application: null,
          errors: e.errors,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        system_message: 'application_create_bad_request',
        application: null,
        errors: null,
      };
    }

    return result;
  }

  @MessagePattern('application_update')
  public async updateApplication(params: { id: string; userId: string; updateData: IApplicationUpdate }): Promise<IApplicationUpdateResponse> {
    let result: IApplicationUpdateResponse;

    if (params && params.id && params.userId && params.updateData) {
      try {
        const application = await this.applicationsService.updateApplication(params.id, params.userId, params.updateData);
        result = {
          status: HttpStatus.OK,
          system_message: 'application_update_success',
          application: application,
          errors: null,
        };
      } catch (e) {
        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          system_message: 'application_update_precondition_failed',
          application: null,
          errors: e.errors,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        system_message: 'application_update_bad_request',
        application: null,
        errors: null,
      };
    }

    return result;
  }

  @MessagePattern('application_delete_by_id')
  public async deleteApplication(params: {
    id: string;
    userId: string;
  }): Promise<IApplicationDeleteResponse> {
    let result: IApplicationDeleteResponse;

    if (params && params.id && params.userId) {
      try {
        await this.applicationsService.removeApplication(params.id, params.userId);
        result = {
          status: HttpStatus.OK,
          system_message: 'application_delete_by_id_success',
          errors: null,
        };

      } catch (e) {
        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          system_message: 'application_delete_by_id_precondition_failed',
          errors: e.errors,
        };
      }
    }
    else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        system_message: 'application_delete_by_id_bad_request',
        errors: null,
      };
    }
    return result;
  }
}