import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Team } from './entity/team.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Team])
    ],
})
export class TeamModule {}
