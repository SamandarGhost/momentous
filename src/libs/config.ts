export const AUTH_TIMER = 48;
export const MORGAN_FORMAT = `:method :url :response-time [:status] \n`;

import mongoose from "mongoose";
import { T } from "./types/common";
export const shapeIntoMongooseObjectId = (target: any) => {
    return typeof target === 'string' ? new mongoose.Types.ObjectId(target) : target;
};

export const lookupUserLiked = (memberId: T, watchRefId: string = '$_id') => {
    return {
        $lookup: {
            from: 'likes',
            let: {
                localLikeRefId: watchRefId,
                localMemberId: memberId,
                localMyLike: true
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ['$likeRefId', '$$localLikeRefId'] }, { $eq: ['$memberId', '$$localMemberId'] }
                            ],
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        memberId: 1,
                        likeRefId: 1,
                        meLikely: '$$localMyLike',
                    },
                },
            ],
            as: 'myLikely',
        },
    };
};

export const lookupUserSaved = (memberId: T, watchRefId: string = '$_id') => {
    return {
        $lookup: {
            from: 'saves',
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ['$saveRefId', watchRefId] }, { $eq: ['$memberId', memberId] }
                            ],
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        memberId: 1,
                        likeRefId: 1,
                        meLikely: true,
                    },
                },
            ],
            as: 'mySaved',
        },
    };
};