import { Order, OrderInquiry, OrderItemInput, OrderUpdateInput } from "../libs/types/order";
import { Member } from "../libs/types/member";
import OrderModel from "../schema/Order.model";
import OrderItemModel from "../schema/OrderItem.model";
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { Message } from "../libs/Errors";
import { HttpCode } from "../libs/Errors";
import { ObjectId } from "mongoose";
import { OrderStatus } from "../libs/enums/order.enum";
import MemberService from "./Member.service";

class OrderService {
    private readonly orderModel;
    private readonly orderItemModel;
    private readonly memberService;

    constructor() {
        this.orderModel = OrderModel;
        this.orderItemModel = OrderItemModel;
        this.memberService = new MemberService;
    }

    public async createOrder(
        member: Member, 
        input: OrderItemInput[]
    ): Promise<Order> {
        const memberId = shapeIntoMongooseObjectId(member._id);
        const amount = input.reduce((accumlator: number, item: OrderItemInput) => {
            return accumlator + item.itemPrice * item.itemQuantity;
        }, 0);
        const delivery = amount < 100 ? 5 : 0;

        try{
            const newOrder: Order = await this.orderModel.create({
                orderTotal: amount + delivery,
                orderDelivery: delivery,
                memberId: memberId,
            });
            const orderId = newOrder._id;
            console.log("orderId:", newOrder._id);
            await this.recordOrderItem(orderId, input);

            return newOrder;            
        } catch (err) {
            console.log("Error, model: createOrder");
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }

    private async recordOrderItem(orderId: ObjectId, input: OrderItemInput[]): Promise<void> {
        const promisedlist =  input.map( async (item: OrderItemInput) => {
            item.orderId = orderId;
            item.productId = shapeIntoMongooseObjectId(item.productId);
            await this.orderItemModel.create(item);
            return "INSERTED";
        });

        console.log("promisedList:", promisedlist);
        const orderItemState = await Promise.all(promisedlist);
        console.log("orderItemState:", orderItemState);
        
        
    }

    public async getMyOrders(
        member: Member,
        inquery: OrderInquiry
      ): Promise<Order[]> {
        const memberId = shapeIntoMongooseObjectId(member._id);
        const matches = { memberId: memberId, orderStatus: inquery.orderStatus };
    
        const result = await this.orderModel
          .aggregate([
            { $match: matches },
            { $sort: { updatedAt: -1 } },
            { $skip: (inquery.page - 1) * inquery.limit },
            { $limit: inquery.limit },
            {
              $lookup: {
                from: "orderItems",
                localField: "_id",
                foreignField: "orderId",
                as: "orderItems",
              },
            },
    
            {
              $lookup: {
                from: "products",
                localField: "orderItems.productId",
                foreignField: "_id",
                as: "productData",
              },
            },
          ])
          .exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
        return result;
      }

    public async updateOrder(
        member: Member,
        input: OrderUpdateInput
    ): Promise<Order> {
        const memberId = shapeIntoMongooseObjectId(member._id);
        const orderId = shapeIntoMongooseObjectId(input.orderId);
        const orderStatus = input.orderStatus;

        const result = await this.orderModel.findOneAndUpdate(
            {
                memberId: memberId,
                _id: orderId,
            },
            { orderStatus: orderStatus },
            { new: true }
        ).exec();

        if(!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

        if(orderStatus === OrderStatus.PROCESS) {
            await this.memberService.addUserPoint(member, 1);
        }

        return result;
    }
}

export default OrderService;