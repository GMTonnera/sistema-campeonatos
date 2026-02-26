import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
}
