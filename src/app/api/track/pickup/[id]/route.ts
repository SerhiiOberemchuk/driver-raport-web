import { connectDB } from "@/lib/mongodb";
import VehicleModel, { VehicleUser } from "@/models/VehicleModel";

import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

interface RequestParams {
  params: { id: string };
}

export async function PATCH(request: Request, { params }: RequestParams) {
  try {
    await connectDB();
    const body = await request.json();
    const { isUse, userData }: { isUse: string; userData: VehicleUser } = body;
    const { userFullName, dateStart, userId } = userData;

    const finedVehicle = await VehicleModel.findById(params.id);

    if (!finedVehicle) {
      return NextResponse.json("Not found vehicle", { status: 404 });
    }

    if (finedVehicle.isUse && !!isUse) {
      return NextResponse.json("Vehicle are using", { status: 403 });
    }

    if (isUse) {
      const updatedVehicle = await VehicleModel.findById(params.id);
      updatedVehicle.isUse = isUse;
      updatedVehicle.users.push({ userFullName, dateStart, userId });
      await updatedVehicle.save();
    }

    const vehicles = await VehicleModel.find();
    return NextResponse.json(vehicles, { status: 200 });
  } catch (error) {
    return NextResponse.json(`${(error as Error).message}`);
  }
}
