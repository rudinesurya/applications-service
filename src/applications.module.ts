import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfigService } from './services/config/mongo-config.service';
import { ConfigService } from './services/config/config.service';
import { ApplicationsController } from './applications.controller';
import { ApplicationSchema } from './schemas/application.schema';
import { ApplicationsService } from './services/applications.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: 'Application',
        schema: ApplicationSchema,
        collection: 'applications',
      },
    ]),
  ],
  controllers: [ApplicationsController],
  providers: [
    ApplicationsService,
    ConfigService,
  ],
})
export class ApplicationsModule { }