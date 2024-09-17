import mongoose, { Schema } from "mongoose";
import { ProductGender, ProductStatus } from "../libs/config";
import { JewelryMaterial, JewelryType } from "../libs/enums/jewelry.enum";


const jewelrySchema = new Schema(
    {
        jewelryType: {
            type: String,
            enum: JewelryType,
            required: true,
        },

        jewelryMaterial: {
            type: String,
            enum: JewelryMaterial,
            required: true,
        },

        jewelryGender: {
            type: String,
            enum: ProductGender,
            required: true,
        },

        jewelryStatus: {
            type: String,
            enum: ProductStatus,
            default: ProductStatus.HOLD,
        },

        jewelryBrand: {
            type: String,
            required: true,
        },

        jewelryLength: {
            type: Number,
        },

        jewelrySize: {
            type: Number,
        },

        jewelryName: {
            type: String,
            required: true,
        },

        jewelryPrice: {
            type: Number,
            required: true,
        },

        jewelryDetail: {
            type: String,
            required: true,
        },

        jewelryDesc: {
            type: String,
        },

        jewelryImages: {
            type: [String],
            default: [],
        },
        jewelryViews: {
            type: Number,
            default: 0,
        },

        jewelryLikes: {
            type: Number,
            default: 0,
        },

        jewelryComments: {
            type: Number,
            default: 0,
        },


    },
    { timestamps: true }  // updateAt, createAt
);

jewelrySchema.index(
    { jewelryName: 1, jewelryPrice: 1, jewelryType: 1 },
    { unique: true });


export default mongoose.model("Jewelry", jewelrySchema);