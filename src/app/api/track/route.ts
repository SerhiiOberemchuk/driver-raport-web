import { connectDB } from "@/lib/mongodb";
import VehicleModel, { VEHICLE_TYPE } from "@/models/vehicleModel";
import { Vehicle } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const vehicles = await VehicleModel.find();

    if (!vehicles || vehicles.length === 0) {
      return NextResponse.json({ message: "No tracks" }, { status: 404 });
    }
    return NextResponse.json({ vehicles }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: Vehicle = await request.json();
    const { licensePlateNumber, type } = body;
    if (!(type in VEHICLE_TYPE)) {
      return NextResponse.json(
        { message: "Type of vehicle must be track, trailer or furgone" },
        { status: 400 }
      );
    }
    await connectDB();
    await VehicleModel.create({
      licensePlateNumber,
      isUse: false,
      type,
      users: [],
    });

    const vehicles = await VehicleModel.find();
    return NextResponse.json(
      { message: "New vehicle added successfully!", vehicles },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}
