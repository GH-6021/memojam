import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Memo } from "./memo.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    password:string;

    @OneToMany(()=>Memo,(memo)=>memo.user)
    memo:Memo[];
}