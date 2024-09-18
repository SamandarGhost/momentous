import { ObjectId } from "mongoose";
import { JewelryMaterial, JewelryType } from "../enums/jewelry.enum";
import { ProductGender, ProductStatus } from "./common";


export interface Jewelry {
    _id: ObjectId;
    jewelryStatus: ProductStatus;
    jewelryType: JewelryType;
    jewelryMaterial: JewelryMaterial;
    jewelryGender: ProductGender;
    jewelryBrand: string;
    jewelryLength: number;
    jewelrySize: number;
    jewelryName: string;
    jewelryPrice: number;
    jewelryDetail: string;
    jewelryDesc: string;
    jewelryImages: string[];
    jewelryViews: number;
    jewelryLikes: number;
    jewelryComments: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface JewelryInquiry {
    order: string;
    page: number;
    limit: number;
    jewelryType?: JewelryType;
    jewelryGender?: ProductGender;
    search?: string;
}


export interface JewelryInput {
    jewelryStatus: ProductStatus;
    jewelryType: JewelryType;
    jewelryMaterial: JewelryMaterial;
    jewelryGender: ProductGender;
    jewelryBrand?: string;
    jewelryLength?: number;
    jewelrySize?: number;
    jewelryName: string;
    jewelryPrice: number;
    jewelryDetail: string;
    jewelryDesc?: string;
    jewelryImages: string[];
    jewelryViews?: number;
    jewelryLikes?: number;
    jewelryComments?: number;
}

export interface JewelryUpdateInput {
    _id: ObjectId;
    jewelryStatus?: ProductStatus;
    jewelryType?: JewelryType;
    jewelryMaterial?: JewelryMaterial;
    jewelryGender?: ProductGender;
    jewelryBrand?: string;
    jewelryLength?: number;
    jewelrySize?: number;
    jewelryName?: string;
    jewelryPrice?: number;
    jewelryDetail?: string;
    jewelryDesc?: string;
    jewelryImages?: string[];
}