import { Championship } from 'src/championship/entity/championship.entity';
import { MatchStatus } from 'src/common/enums/match-status.enum';
import { Team } from 'src/team/entity/team.entity';
import { Entity, Index, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('match')
@Index(['championship', 'matchDatetime'])
export class Match {
    
    @PrimaryGeneratedColumn()
    match_id: number;

    @ManyToOne(() => Championship, (championship) => championship.matches, {
        onDelete: 'CASCADE',
        nullable: false
    })
    match_championship: Championship;

    @ManyToOne(() => Team, (team) => team.homeMatches, {
        onDelete: 'CASCADE',
        nullable: false
    })
    match_homeTeam: Team;
    
    @ManyToOne(() => Team, (team) => team.visitingMatches, {
        onDelete: 'CASCADE',
        nullable: false
    })
    match_visitingTeam: Team;

    @Column()
    match_datetime: Date;

    @Column({ length: 150 })
    match_location: string;

    @Column({ type: 'enum', enum: MatchStatus})
    match_status: MatchStatus;

    @Column({ nullable: true })
    match_homeTeamPontuation?: number;

    @Column({ nullable: true })
    match_visitingTeamPontuation?: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
