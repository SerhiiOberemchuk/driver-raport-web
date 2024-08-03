import client from "@/lib/mongodb";
import {
  MONGODB_COLLECTIONS,
  MONGODB_NAME,
  Vehicle,
  VEHICLE_TYPE,
} from "@/types/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await client.db(MONGODB_NAME.DbName);
    const collectionTracks = db.collection(MONGODB_COLLECTIONS.vehicle);

    const vehicles = await collectionTracks.find({}).toArray();
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
    const db = await client.db(MONGODB_NAME.DbName);
    const collectionTracks = await db.collection(MONGODB_COLLECTIONS.vehicle);
    await collectionTracks.insertOne({
      licensePlateNumber,
      type,
    });

    const vehicles = await collectionTracks.find({}).toArray();
    return NextResponse.json(
      { message: "New vehicle added successfully!", vehicles },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}
