import { CommentGroup, CommentStatus } from "../enums/comment.enum";
import { ObjectId } from 'mongoose';
import { Member } from "./member";
import { Direction } from "./common";

export interface Comment {
    _id: ObjectId;
    commentStatus: CommentStatus;
    commentGroup: CommentGroup;
    commentContent: string;
    commentRefId: ObjectId;
    memberId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
    memberData?: Member;
};

export interface CommentInput {
    commentGroup: CommentGroup;
    commentContent: string;
    commentRefId: ObjectId;
    memberId?: ObjectId;
};

interface CISearch {
    commentRefId: ObjectId;
}

export interface CommentsInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: CISearch;
}