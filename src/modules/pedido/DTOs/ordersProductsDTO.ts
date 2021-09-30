
interface IOrderProductsDTO {
    id?: string;
    pedido_id?: string;
    product_id: string;
    quantidade: number;
    valor?: number;
}

export { IOrderProductsDTO }