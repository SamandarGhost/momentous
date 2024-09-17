import { ObjectId } from "mongoose";
import { ProductGender, ProductStatus } from "../config";
import { WatchBrand, WatchFunc, WatchMov } from "../enums/watch.enum";


export interface Watch {
    _id: ObjectId;
    watchStatus: ProductStatus;
    watchGender: ProductGender
    watchFunc: WatchFunc;
    watchMov: WatchMov;
    watchBrand: WatchBrand
    watchName: string;
    watchPrice: number;
    watchDetail: string;
    watchDesc?: string;
    productImages: string[];
    watchViews: number;
    watchLikes: number;
    watchComments: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface WatchInquiry {
    order: string;
    page: number;
    limit: number;
    watchBrand?: WatchBrand;
    watchGender?: ProductGender;
    search?: string;
}


export interface WatchInput {
    watchStatus?: ProductStatus;
    watchBarnd: WatchBrand;
    watchFunc: WatchFunc;
    watchMov: WatchMov;
    watchGender: ProductGender;
    watchName: string;
    watchPrice: number;
    watchDetail: string;
    watchDesc?: string;
    watchImages?: string[];
    watchViews?: number;
    watchLikes?: number;
    watchComments?: number;
}

export interface ProductUpdateInput {
    _id: ObjectId;
    watchStatus?: ProductStatus;
    watchBarnd?: WatchBrand;
    watchFunc?: WatchFunc;
    watchMov?: WatchMov;
    watchGender?: ProductGender;
    watchName?: string;
    watchPrice?: number;
    watchDetail?: string;
    watchDesc?: string;
    watchImages?: string[];
    productViews?: number;
}