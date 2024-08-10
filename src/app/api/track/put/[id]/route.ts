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
    const vehicleId = new ObjectId(params.id);
    const body = await request.json();
    const { isUse, userData }: { isUse: string; userData: VehicleUser } = body;
    const { dateFinish, userId } = userData;

    const finedVehicle = await VehicleModel.findById(params.id);

    if (!finedVehicle) {
      return NextResponse.json("Not found vehicle", { status: 404 });
    }

    if (!isUse) {
      const updatedVehicle = await VehicleModel.findOneAndUpdate(
        {
          _id: vehicleId,
          users: {
            $elemMatch: { userId: userId, dateFinish: { $exists: false } },
          },
        },
        {
          $set: {
            isUse: isUse,
            "users.$.dateFinish": dateFinish,
          },
        }
      );

      if (!updatedVehicle) {
        return NextResponse.json(
          "With present vehicle you have not open delivery",
          { status: 500 }
        );
      }
    }

    const vehicles = await VehicleModel.find();
    return NextResponse.json(vehicles, { status: 200 });
  } catch (error) {
    return NextResponse.json(`${(error as Error).message}`);
  }
}
