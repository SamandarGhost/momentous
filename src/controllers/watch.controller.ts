import { Request, Response } from "express";
import { ProductGender, T } from "../libs/types/common";
import { ExtendedRequest, OwnerRequest } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import WatchService from "../models/Watch.service";
import { Watch, WatchInput, WatchInquiry } from "../libs/types/watch";
import { WatchBrand } from "../libs/enums/watch.enum";

const watchService = new WatchService();

const watchController: T = {};


watchController.getWatch = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log('getWatch');
        const { _id } = req.params;
        const memberId = req.member?._id ?? null;
        const result = await watchService.getWatch(memberId, _id);

    } catch (err) {
        console.log("Error, getWatch:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};
watchController.getWatches = async (req: Request, res: Response) => {
    try {
        console.log("getWatches");
        const { page, limit, order, watchBrand, watchGender, search } = req.query;
        const inquiry: WatchInquiry = {
            order: String(order),
            page: Number(page),
            limit: Number(limit),
        };

        if (watchBrand) { inquiry.watchBrand = watchBrand as WatchBrand; };
        if (watchGender) { inquiry.watchGender = watchGender as ProductGender };
        if (search) inquiry.search = String(search);

        const result = await watchService.getWatches(inquiry);

        res.status(HttpCode.OK).json(result);

    } catch (err) {
        console.log("Error, getWatches:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

watchController.getAllWatch = async (req: Request, res: Response) => {
    try {
        console.log('getAllWatch');
        const input: Watch[] = await watchService.getAllWatch();

        res.send('done');
        // res.render('products', { watch: input });
    } catch (err) {
        console.log("Error, getAllWatch:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

watchController.createWatch = async (req: OwnerRequest, res: Response) => {
    try {
        console.log("createWatch");

        if (!req.files?.length)
            throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

        const input: WatchInput = req.body;
        input.watchImages = req.files?.map(ele => {
            return ele.path.replace(/\\/g, "/");
        });

        await watchService.createWatch(input);

        res.send(`<script> alert("Sucessful creation!"); window.location.replace("/owner/watch-all") </script>`);
    } catch (err) {
        console.log("Error, createNewProduct:", err);
        const message =
            err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(`<script> alert("${message}"); window.location.replace("/owner/watch-all") </script>`);
    }
}

watchController.updateWatch = async (req: OwnerRequest, res: Response) => {
    try {
        console.log('updateWatch');
        const watchId = req.params.id;

        const result = await watchService.updateWatch(watchId, req.body);

        res.status(HttpCode.OK).json({ input: result });
    } catch (err) {
        console.log("Error, updateWatch:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

watchController.removeWatch = async (req: OwnerRequest, res: Response) => {
    try {
        console.log('removeWatch');
        const watchId = req.params.id;
        await watchService.removeWatch(watchId);

        res.send(`<script> alert("Sucessful removed!"); window.location.replace("/owner/watch-all") </script>`);
    } catch (err) {
        console.log("Error, updateWatch:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

export default watchController;