import mongoose, { Schema } from "mongoose";
import { WatchBrand, WatchFunc, WatchMov } from "../libs/enums/watch.enum";
import { ProductGender, ProductStatus } from "../libs/config";


const watchSchema = new Schema(
    {
        watchFunc: {
            type: String,
            enum: WatchFunc,
            required: true,
        },

        watchMov: {
            type: String,
            enum: WatchMov,
            required: true,
        },

        watchGender: {
            type: String,
            enum: ProductGender,
            required: true,
        },

        watchStatus: {
            type: String,
            enum: ProductStatus,
            default: ProductStatus.HOLD,
        },

        watchBrand: {
            type: String,
            enum: WatchBrand,
            required: true,
        },

        watchName: {
            type: String,
            required: true,
        },

        watchPrice: {
            type: Number,
            required: true,
        },

        watchDetail: {
            type: String,
            required: true,
        },

        watchDesc: {
            type: String,
        },

        watchImages: {
            type: [String],
            default: [],
        },
        watchViews: {
            type: Number,
            default: 0,
        },

        watchLikes: {
            type: Number,
            default: 0,
        },

        watchComments: {
            type: Number,
            default: 0,
        },


    },
    { timestamps: true }  // updateAt, createAt
);

watchSchema.index(
    { watchName: 1, watchPrice: 1, watchBrand: 1 },
    { unique: true });


export default mongoose.model("Watch", watchSchema);