import { LikeGroup } from "../enums/like.enum";
import { ObjectId } from 'mongoose';


export interface Like {
    _id: ObjectId;
    likeGroup: LikeGroup;
    likeRefId: ObjectId;
    memberId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

export interface LikeInput {
    memberId: ObjectId;
    likeRefId: ObjectId;
    likeGroup: LikeGroup;
};