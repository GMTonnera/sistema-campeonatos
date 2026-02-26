import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChampionshipModule } from './championship/championship.module';
import { MatchModule } from './match/match.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // deixa disponível em toda aplicação
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: parseInt(configService.get<string>('POSTGRES_PORT') ?? '5432', 10),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    ChampionshipModule, 
    TeamModule, 
    MatchModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
