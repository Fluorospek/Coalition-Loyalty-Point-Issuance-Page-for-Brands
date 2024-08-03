import { UserRole } from "src/user-role.enum";

declare global {
  namespace Express {
    interface User {
      userId: number;
      email: string;
      role: UserRole;
    }
  }
}