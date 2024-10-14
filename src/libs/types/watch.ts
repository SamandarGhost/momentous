import { ObjectId } from "mongoose";
import { WatchBrand, WatchFunc, WatchMov } from "../enums/watch.enum";
import { ProductGender, ProductStatus } from "./common";
import { MeLiked } from "./like";
import { MeSaved } from "./save";


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
    watchImages: string[];
    watchViews: number;
    watchLikes: number;
    watchComments: number;
    createdAt: Date;
    updatedAt: Date;
    meLikely?: MeLiked;
    meSaved?: MeSaved;
}

export interface WatchInquiry {
    order: string;
    page: number;
    limit: number;
    watchFunc?: WatchFunc;
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

export interface WatchUpdateInput {
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