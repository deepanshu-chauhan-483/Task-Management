import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../prisma";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";

export const registerUser = async (email: string, password: string) => {
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { email, password: hashed },
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return { accessToken, refreshToken };
};

export const refreshTokens = async (refreshToken: string) => {
  const payload = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET!
  ) as { userId: string };

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user || user.refreshToken !== refreshToken)
    throw new Error("Invalid refresh token");

  return {
    accessToken: generateAccessToken(user.id),
  };
};

export const logoutUser = async (refreshToken: string) => {
  await prisma.user.updateMany({
    where: { refreshToken },
    data: { refreshToken: null },
  });
};
