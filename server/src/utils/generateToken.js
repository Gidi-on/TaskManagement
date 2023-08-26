import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
