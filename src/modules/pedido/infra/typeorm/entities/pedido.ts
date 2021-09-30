import { v4 as uuidV4 } from 'uuid'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity('pedidos')
class Pedido {
 
    @PrimaryColumn()
    id?: string;

    @Column()
    user_id: string;

    @Column()
    valor_total: number;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuidV4()
        }
    }
}

export { Pedido }