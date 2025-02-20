export interface IProperty {
    title: string;
    description: string;
    location: string;
    price: number;
    status: string;
    images: File[],
};

export interface IPropertyDetails {
    title: string;
    description: string;
    location: string;
    price: number;
    status: string;
    images: string[],
    hoster?: any;
};