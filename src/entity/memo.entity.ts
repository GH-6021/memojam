import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
export class Memo{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>User)
    @JoinColumn({name:'userId'})
    user:User

    @Column()
    title:string;

    @Column()
    content:string;
}