import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  console.log(req.params);

  try {
    switch (req.method) {
      case "GET":
        const { userId } = JSON.parse(req.body);
        const data = await db.collection("users").findOne({ userId });
        console.log(data);
        res.status(200).json(data);

        break;

      default:
        break;
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
