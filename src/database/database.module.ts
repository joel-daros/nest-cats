import { Module } from '@nestjs/common';
import { knexSnakeCaseMappers } from 'objection';
import knex from 'knex';
import { DatabaseService } from './database.service';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ObjectionModule.registerAsync({
      // Model: BaseModel,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          config: {
            ...configService.get<knex.Config>('database'),
            ...knexSnakeCaseMappers(),
          },
        };
      },
    }),
  ],
  exports: [ObjectionModule],
  providers: [DatabaseService],
})
export class DatabaseModule {}
