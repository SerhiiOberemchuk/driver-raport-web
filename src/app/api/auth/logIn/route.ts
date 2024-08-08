import { getCollectionDb } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const collectionUsers = await getCollectionDb("my-deliveries", "Users");
  } catch (error) {}
}
