import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('championship')
export class Championship {
    
    @PrimaryGeneratedColumn()
    championship_id: number;

    @Column({ length: 80 })
    championship_name: string;

    @Column({ length: 500 })
    championship_description: string;

    @Column()
    championship_startDate: Date;

    @Column({ nullable: true })
    championship_endDate?: Date;

    @Column()
    championship_minTeams: number;

    @Column()
    championship_maxTeams: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
