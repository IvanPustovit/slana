import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const { userId } = JSON.parse(req.body);
    const data = await db.collection("users").findOne({ userId });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
