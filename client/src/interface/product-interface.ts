export interface IProduct {
    _id?: string;
    title: string;
    description: string;
    image: string;
    price: number;
    countInStock: number;
    rating?: number;
    numReviews?: number;
    createdAt?: string;
    updatedAt?: string;
}