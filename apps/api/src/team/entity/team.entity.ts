import { Match } from 'src/match/entity/match.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('team')
export class Team {
    
    @PrimaryGeneratedColumn()
    team_id: number;

    @Column({ length: 50 })
    team_name: string;

    @Column({ length: 3 })
    team_acronym: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Match, (match) => match.match_homeTeam)
    homeMatches: Match[];
    
    @OneToMany(() => Match, (match) => match.match_visitingTeam)
    visitingMatches: Match[];
}
