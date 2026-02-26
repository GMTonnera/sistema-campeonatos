import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Championship } from './entity/championship.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Championship])
    ],
})
export class ChampionshipModule {}
