export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    image_url: string;
    active: boolean;
}

export class ProductModel {
    id!: number;
    name!: string;
    price!: number;
    description!: string;
    image!: string;
    image_url!: string;
    active!: boolean;
}
