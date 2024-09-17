export const AUTH_TIMER = 24;
export const MORGAN_FORMAT = `:method :url :response-time [:status] \n`;

import mongoose from "mongoose";
export const shapeIntoMongooseObjectId = (target: any) => {
    return typeof target === 'string' ? new mongoose.Types.ObjectId(target) : target;
};

export enum ProductGender {
    MAN = "MAN",
    WOMAN = "WOMAN"
};

export enum ProductStatus {
    HOLD = "HOLD",
    ACTIVE = "ACTIVE",
    SOLD = "SOLD"
};