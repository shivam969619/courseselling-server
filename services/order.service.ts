import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import OrderModel from "../models/orderModel";

// Create new order
export const newOrder = catchAsyncError(async (data:any,req: Request, res: Response, next: NextFunction) => {

 const order=await OrderModel.create(data);
 res.status(201).json({
  success: true,
  order,
});
});

//get All orders

export const getAllOrdersService=async(res:Response)=>{
  const orders=await OrderModel.find().sort({createdAt:-1});
  res.status(201).json({
      success:true,
      orders,
  })
};
