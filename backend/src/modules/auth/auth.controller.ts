import { Request, Response } from "express";
import AuthService from "./auth.service";
import { AuthRequest } from "../../middleware/auth.middleware";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user = await AuthService.register(req.body);

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await AuthService.login(req.body);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async profile(req: AuthRequest, res: Response) {
    try {
      return res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        data: req.user,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new AuthController();