export interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  password?: string | null;
  surname?: string | null;
}

export const MONGODB_NAME = {
  DbName: "my-deliveries",
};

export const MONGODB_COLLECTIONS = {
  Users: "Users",
  Accounts: "Accounts",
  Sessions: "Sessions",
  VerificationTokens: "VerificationTokens",
  deliveries: "deliveries",
  vehicle: "vehicle",
};

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

export type Vehicle = {
  type: VehicleType;
  licensePlateNumber: string;
};
