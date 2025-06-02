import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface DecodedToken {
  id: string;
  email?: string;
  iat?: number;
  exp?: number;
  [key: string]: any;
}

interface AuthenticatedRequest extends Request {
  user?: DecodedToken;
}

const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  let token: string | undefined;
  let authHeader: string | undefined =
    req.headers.authorization || (req.headers as any).Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      res
        .status(401)
        .json({ message: "No token provided, authorization denied" });
      return;
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as DecodedToken;
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Token is not valid" });
      return;
    }
  } else {
    res.status(401).json({ message: "Authorization header is not valid" });
    return;
  }
};

export default verifyToken;
