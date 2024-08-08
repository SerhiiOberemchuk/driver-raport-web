import mongoose, { Schema, model } from "mongoose";

export interface VehicleUser {
  userId: string;
  userFullName: string;
  dateStart?: Date;
  dateFinish?: Date;
}
export const VEHICLE_TYPE = {
  track: "track",
  trailer: "trailer",
  furgone: "furgone",
} as const;

export type VehicleType = keyof typeof VEHICLE_TYPE;

export interface VehicleDocument {
  _id: string;
  isUse: boolean;
  type: VehicleType;
  licensePlateNumber: string;
  users: VehicleUser[];
}

const VehicleSchema = new Schema<VehicleDocument>(
  {
    isUse: {
      type: Boolean,
      default: false,
      required: [true, "IsUse is required"],
    },
    type: {
      type: String,
      required: [true, "Vehicle type is required"],
    },
    licensePlateNumber: {
      type: String,
      required: [true, "licensePlateNumber is required"],
      uppercase: true,
    },
    users: [
      {
        userId: { type: String, required: [true, "User id is required"] },
        userFullName: {
          type: String,
          required: [true, "User full name is reqiured"],
          uppercase: true,
        },
        dateStart: { type: Date },
        dateFinish: { type: Date },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const VehicleModel =
  mongoose.models?.Vehicle || model<VehicleDocument>("Vehicle", VehicleSchema);
export default VehicleModel;
