export interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  password?: string | null;
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
};
