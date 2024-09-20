import Errors, { Message } from "../libs/Errors";
import { HttpCode } from "../libs/Errors";
import LikeModel from "../schema/Like.model";
import { LikeInput } from "../libs/types/like";
import { T } from "../libs/types/common";
import { MeLiked } from "../libs/types/like";

class LikeService {
    private readonly likeModel;

    constructor() {
        this.likeModel = LikeModel;
    }

    public async toggleLike(input: LikeInput): Promise<number> {
        const search: T = {
            memberId: input.memberId,
            likeRefId: input.likeRefId,
        };
        const existLike = await this.likeModel.findOne(search).exec();

        let modifier = 1;

        if (existLike) {
            await this.likeModel.findOneAndDelete(search).exec();
            modifier = -1;
        } else {
            try {
                await this.likeModel.create(input);
            } catch (err) {
                console.log('Error, likeService.model', err);
                throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);
            }
        }

        console.log(`Like modifier = ${modifier}`);
        return modifier;
    }

    public async checkLikeExistence(input: LikeInput): Promise<MeLiked[]> {
        const { memberId, likeRefId } = input;
        const result = await this.likeModel.findOne({ memberId: memberId, likeRefId: likeRefId }).exec();
        return result ? [{ memberId: memberId, likeRefId: likeRefId, myLikely: true }] : [];
    }
}

export default LikeService;