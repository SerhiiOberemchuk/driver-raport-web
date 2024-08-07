import client from "@/lib/mongodb";
import {
  MONGODB_COLLECTIONS,
  MONGODB_NAME,
  Vehicle,
  VehicleUser,
} from "@/types/types";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

interface RequestParams {
  params: { id: string };
}

export async function PATCH(request: Request, { params }: RequestParams) {
  try {
    const vehicleId = new ObjectId(params.id);
    const body = await request.json();
    const { isUse, userData }: { isUse: boolean; userData: VehicleUser } = body;
    const { userFullName, dateFinish, dateStart, userId } = userData;
    const db = await client.db(MONGODB_NAME.DbName);
    const collectionVehicles = await db.collection(MONGODB_COLLECTIONS.vehicle);

    const finedVehicle = await collectionVehicles.findOne({ _id: vehicleId });

    if (!finedVehicle) {
      return NextResponse.json(
        { message: "Not found vehicle" },
        { status: 404 }
      );
    }

    if (finedVehicle.isUse && isUse) {
      return NextResponse.json(
        { message: `Vehicle are using ` },
        { status: 401 }
      );
    }

    if (isUse) {
      const updetedData: Partial<VehicleUser> = { userFullName, userId };
      if (dateStart) updetedData.dateStart = dateStart;

      const updatedVehicle = await collectionVehicles.findOneAndUpdate(
        {
          _id: vehicleId,
        },
        { $set: { isUse: isUse }, $push: { users: updetedData } },

        {
          returnDocument: "after",
        }
      );
      console.log("pickUp", updatedVehicle);
      if (!updatedVehicle) {
        return NextResponse.json(
          { message: "Vehicle update failed" },
          { status: 500 }
        );
      }
    } else {
      const updatedVehicle = await collectionVehicles.findOneAndUpdate(
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
        },

        {
          returnDocument: "after",
        }
      );
      console.log("put", updatedVehicle);
      if (!updatedVehicle) {
        return NextResponse.json(
          { message: "With present vehicle you have not open delivery" },
          { status: 500 }
        );
      }
    }

    console.log("after all");

    const updatedVehicles = await collectionVehicles.find({}).toArray();
    console.log("updatedVehicles>>", updatedVehicles);

    return NextResponse.json(updatedVehicles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}
