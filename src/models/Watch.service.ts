import { WatchInput, WatchInquiry, WatchUpdateInput } from "../libs/types/watch";
import WatchModel from "../schema/Watch.model";
import { Watch } from "../libs/types/watch";
import { ProductStatus, StatisticModifier, T } from "../libs/types/common";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { ObjectId } from "mongoose";
import { shapeIntoMongooseObjectId } from "../libs/config";
import ViewService from "./View.service";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/enums/view.enum";

class WatchService {
    private readonly watchModel;
    public viewService: ViewService;

    constructor() {
        this.watchModel = WatchModel;
        this.viewService = new ViewService();
    }

    public async getWatches(inquiry: WatchInquiry): Promise<Watch[]> {
        const match: T = { watchStatus: ProductStatus.ACTIVE };

        if (inquiry.watchBrand) match.watchBarnd = inquiry.watchBrand;

        if (inquiry.watchGender) match.watchGender = inquiry.watchGender;

        if (inquiry.search) { match.watchName = { $regex: new RegExp(inquiry.search, "i") }; }

        const sort: T = inquiry.order === "watchPrice" ? { [inquiry.order]: 1 } : { [inquiry.order]: -1 };

        const result = await this.watchModel
            .aggregate([
                { $match: match },
                { $sort: sort },
                { $skip: (inquiry.page * 1 - 1) * inquiry.limit },
                { $limit: inquiry.limit * 1 },
            ])
            .exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.N0_DATA_FOUND);

        return result;

    }

    public async getWatch(memberId: ObjectId | null, _id: string): Promise<Watch> {
        const watchId = shapeIntoMongooseObjectId(_id);

        const result = await this.watchModel.findOne({ _id: watchId, watchStatus: ProductStatus.ACTIVE });
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.N0_DATA_FOUND);

        if (memberId) {
            const input: ViewInput = {
                memberId: memberId,
                viewRefId: watchId,
                viewGroup: ViewGroup.WATCH,
            };
            const existView = await this.viewService.checkViewExistence(input);

            console.log('exist:', !!existView);
            if (!existView) {
                console.log('viewInsert');
                await this.viewService.insertMemberView(input);
                await this.watchStatsEditor({ _id: watchId, targetKey: 'watchViews', modifier: 1 });
            }
        }
        return result;
    }

    public async getAllWatch(): Promise<Watch[]> {
        const result = await this.watchModel.find().exec();
        if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.N0_DATA_FOUND);
        return result;
    }

    public async createWatch(input: WatchInput): Promise<Watch> {
        try {
            return await this.watchModel.create(input);
        } catch (err) {
            console.log('Error, watchModel: createWatch:', err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }

    public async updateWatch(watchId: string, input: WatchUpdateInput): Promise<Watch> {
        watchId = shapeIntoMongooseObjectId(watchId);
        const result = await this.watchModel.findOneAndUpdate({ _id: watchId }, input, { new: true }).exec();
        if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
        return result;
    }

    public async removeWatch(watchId: string): Promise<Watch> {
        watchId = shapeIntoMongooseObjectId(watchId);
        const search: T = { _id: watchId, watchStatus: ProductStatus.DELETE };
        const result = await this.watchModel.findOneAndDelete(search).exec();
        if (!result) throw new Errors(HttpCode.BAD_REQUEST, Message.REMOVE_FAILED);
        return result;
    }

    public async watchStatsEditor(input: StatisticModifier): Promise<Watch> {
        console.log('executed!');

        const { _id, targetKey, modifier } = input;
        return this.watchModel.findByIdAndUpdate(_id, { $inc: { [targetKey]: modifier } }, { new: true }).exec();
    }
};

export default WatchService;
