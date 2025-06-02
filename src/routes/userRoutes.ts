import express, { Request, Response, Router } from "express";
import verifyToken from "../middleware/authMiddleware";
import authorizedRoles from "../middleware/roleMiddleware";

const router = express.Router();

//only admin can access this route
interface AdminRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}
router.get(
  "/admin",
  verifyToken,
  authorizedRoles(["admin"]),
  (req: Request, res: Response) => {
    res.send("Admin access granted");
  }
);

//only user can access this route
interface UserRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}
router.get(
  "/user",
  verifyToken,
  authorizedRoles(["user"]),
  (req: Request, res: Response) => {
    res.send("User access granted");
  }
);

interface AllUserRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}
router.get(
  "/all",
  verifyToken,
  authorizedRoles(["user", "admin"]),
  (req: Request, res: Response) => {
    res.send("All users access granted");
  }
);

export default router;
