export interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  password?: string | null;
  surname?: string | null;
}

export const VEHICLE_TYPE = {
  track: "track",
  trailer: "trailer",
  furgone: "furgone",
} as const;

export const VEHICLE_NAME = {
  track: "Camion",
  trailer: "Rimorchio",
  furgone: "Furgone",
};
export const optionSelectType = [
  { type: VEHICLE_TYPE.track, typeName: VEHICLE_NAME.track },
  { type: VEHICLE_TYPE.trailer, typeName: VEHICLE_NAME.trailer },
  { type: VEHICLE_TYPE.furgone, typeName: VEHICLE_NAME.furgone },
];

export type VehicleType = keyof typeof VEHICLE_TYPE;
export interface VehicleUser {
  userId: string;
  userFullName: string;
  dateStart?: Date;
  dateFinish?: Date;
}
export type Vehicle = {
  isUse: boolean;
  _id: string;
  type: VehicleType;
  licensePlateNumber: string;
  users: VehicleUser[];
};
