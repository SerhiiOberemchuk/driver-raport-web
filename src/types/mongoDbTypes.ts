export const MONGODB_NAME = {
  DbName: "my-deliveries",
} as const;

export const MONGODB_COLLECTIONS = {
  Users: "Users",
  Accounts: "Accounts",
  Sessions: "Sessions",
  VerificationTokens: "VerificationTokens",
  deliveries: "deliveries",
  vehicle: "vehicle",
} as const;

export type dataBase = (typeof MONGODB_NAME)[keyof typeof MONGODB_NAME];
export type collectionDb =
  (typeof MONGODB_COLLECTIONS)[keyof typeof MONGODB_COLLECTIONS];
