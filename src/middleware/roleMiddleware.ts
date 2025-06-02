import { Request, Response, NextFunction } from "express";

const authorizedRoles = (roles: string[]) => {
  interface User {
    role: string;
    [key: string]: any;
  }

  interface AuthenticatedRequest extends Request {
    user?: User;
  }

  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    const user = req.user;

    if (!user || !user.role) {
      res.status(403).json({ message: "Access denied, no user role found" });
      return;
    }

    if (!roles.includes(user.role)) {
      res
        .status(403)
        .json({ message: "Access denied, insufficient permissions" });
      return;
    }

    next();
  };
};

export default authorizedRoles;
