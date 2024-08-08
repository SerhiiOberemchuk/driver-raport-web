import { connectDB } from "@/lib/mongodb";
import VehicleModel from "@/models/vehicleModel";
import Vehicle, { VehicleUser } from "@/models/vehicleModel";
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
    const { userFullName, dateFinish, dateStart, userId } = userData;

    const finedVehicle = await VehicleModel.findById(params.id);

    if (!finedVehicle) {
      return NextResponse.json(
        { message: "Not found vehicle", finedVehicle },
        { status: 404 }
      );
    }

    if (finedVehicle.isUse && isUse) {
      return NextResponse.json(
        { message: `Vehicle are using ` },
        { status: 403 }
      );
    }

    if (isUse) {
      const updatedVehicle = await VehicleModel.findById(params.id);
      updatedVehicle.isUse = isUse;
      updatedVehicle.users.push({ userFullName, dateStart, userId });
      await updatedVehicle.save();
    } else {
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
          { message: "With present vehicle you have not open delivery" },
          { status: 500 }
        );
      }
    }

    const vehicles = await Vehicle.find();
    return NextResponse.json({ vehicles }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}
