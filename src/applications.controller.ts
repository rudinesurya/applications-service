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
import logger from '@rudinesurya/logger';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) { }

  @MessagePattern('application_get_by_id')
  public async getApplicationById({ id }: { id: string }): Promise<IApplicationSearchResponse> {
    logger.info(`Received request to fetch application with ID: ${id}`);

    if (!id) {
      logger.warn('Missing application ID in request');
      return {
        status: HttpStatus.BAD_REQUEST,
        system_message: 'application_get_bad_request',
        application: null,
        errors: null,
      };
    }

    try {
      const application = await this.applicationsService.getApplicationById(id);
      logger.info(`Successfully fetched application with ID: ${id}`);

      return {
        status: HttpStatus.OK,
        system_message: 'application_get_success',
        application,
        errors: null,
      };
    } catch (error) {
      logger.error(`Error fetching application with ID: ${id}`, { error: error.message, stack: error.stack });

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        system_message: 'application_get_internal_error',
        application: null,
        errors: error.errors || error.message,
      };
    }
  }

  @MessagePattern('applications_get_by_job_id')
  public async getApplicationsByJobId({ id }: { id: string }): Promise<IApplicationsSearchResponse> {
    logger.info(`Received request to fetch applications for job with ID: ${id}`);

    if (!id) {
      logger.warn('Missing job ID in request');
      return {
        status: HttpStatus.BAD_REQUEST,
        system_message: 'applications_get_bad_request',
        applications: null,
        errors: null,
      };
    }

    try {
      const applications = await this.applicationsService.getApplicationsByJobId(id);
      logger.info(`Successfully fetched applications for job with ID: ${id}`);

      return {
        status: HttpStatus.OK,
        system_message: 'applications_get_success',
        applications,
        errors: null,
      };
    } catch (error) {
      logger.error(`Error fetching applications for job with ID: ${id}`, { error: error.message, stack: error.stack });

      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        system_message: 'applications_get_internal_error',
        applications: null,
        errors: error.errors || error.message,
      };
    }
  }

  @MessagePattern('application_create')
  public async createApplication(params: { createData: IApplication }): Promise<IApplicationCreateResponse> {
    logger.info('Received request to create application');

    if (!params?.createData) {
      logger.warn('Missing createData in application creation request');
      return {
        status: HttpStatus.BAD_REQUEST,
        system_message: 'application_create_bad_request',
        application: null,
        errors: null,
      };
    }

    try {
      const application = await this.applicationsService.createApplication(params.createData);
      logger.info('Application created successfully');

      return {
        status: HttpStatus.CREATED,
        system_message: 'application_create_success',
        application,
        errors: null,
      };
    } catch (error) {
      logger.error('Error creating application', { error: error.message, stack: error.stack });

      return {
        status: HttpStatus.PRECONDITION_FAILED,
        system_message: 'application_create_precondition_failed',
        application: null,
        errors: error.errors || error.message,
      };
    }
  }

  @MessagePattern('application_update')
  public async updateApplication(params: { id: string; userId: string; updateData: IApplicationUpdate }): Promise<IApplicationUpdateResponse> {
    logger.info(`Received request to update application with ID: ${params?.id}, userId: ${params?.userId}`);

    if (!params?.id || !params?.userId || !params?.updateData) {
      logger.warn('Invalid request parameters for application update');
      return {
        status: HttpStatus.BAD_REQUEST,
        system_message: 'application_update_bad_request',
        application: null,
        errors: null,
      };
    }

    try {
      const application = await this.applicationsService.updateApplication(params.id, params.userId, params.updateData);
      logger.info(`Application updated successfully with ID: ${params.id}`);

      return {
        status: HttpStatus.OK,
        system_message: 'application_update_success',
        application,
        errors: null,
      };
    } catch (error) {
      logger.error('Error updating application', { error: error.message, stack: error.stack });

      return {
        status: HttpStatus.PRECONDITION_FAILED,
        system_message: 'application_update_precondition_failed',
        application: null,
        errors: error.errors || error.message,
      };
    }
  }

  @MessagePattern('application_delete_by_id')
  public async deleteApplication(params: { id: string; userId: string }): Promise<IApplicationDeleteResponse> {
    logger.info(`Received request to delete application with ID: ${params?.id}, userId: ${params?.userId}`);

    if (!params?.id || !params?.userId) {
      logger.warn('Invalid request parameters for application deletion');
      return {
        status: HttpStatus.BAD_REQUEST,
        system_message: 'application_delete_by_id_bad_request',
        errors: null,
      };
    }

    try {
      await this.applicationsService.removeApplication(params.id, params.userId);
      logger.info(`Application deleted successfully with ID: ${params.id}`);

      return {
        status: HttpStatus.OK,
        system_message: 'application_delete_by_id_success',
        errors: null,
      };
    } catch (error) {
      logger.error('Error deleting application', { error: error.message, stack: error.stack });

      return {
        status: HttpStatus.PRECONDITION_FAILED,
        system_message: 'application_delete_by_id_precondition_failed',
        errors: error.errors || error.message,
      };
    }
  }
}