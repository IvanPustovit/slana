import { connectToDatabase } from "../../util/mongodb";
import bcript from "bcryptjs";
import User from "../../models/User";

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const { email, password, name } = JSON.parse(req.body);
    const data = await db.collection("users").findOne({ email });
    if (data) {
      return res.status(404).json({});
    }
    const hashPassword = await bcript.hash(password, 5);

    const newUser = new User({
      email,
      password: hashPassword,
      name,
    });
    const user = await db.collection("users").insertOne(newUser);

    res.status(201).json({ data: user.ops[0] });
  } catch (error) {
    res.status(400).json({ message: "OOPS", data: error });
  }
};
