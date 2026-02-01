import type { Request, Response } from "express";
import * as service from "./auth.services"

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Missing fields" });

    await service.registerUser(email, password);
    res.status(201).json({ message: "Registered successfully" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const tokens = await service.loginUser(
      req.body.email,
      req.body.password
    );
    res.json(tokens);
  } catch (e: any) {
    res.status(401).json({ message: e.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const token = await service.refreshTokens(refreshToken);
    res.json(token);
  } catch {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

export const logout = async (req: Request, res: Response) => {
  await service.logoutUser(req.body.refreshToken);
  res.json({ message: "Logged out" });
};
