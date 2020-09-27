import { connectToDatabase } from "../../util/mongodb";
import bcript from "bcryptjs";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { email, password } = JSON.parse(req.body);
  const data = await db.collection("users").findOne({ email });
  if (!data) {
    return res.status(404).json({});
  }

  const isMatch = await bcript.compare(password, data.password);
  if (!isMatch) {
    return res.json({});
  }
  const token = jwt.sign({ userId: data._id }, "jwtSecret", {
    expiresIn: "1h",
  });
  res.json({ token, userId: data._id });
};
