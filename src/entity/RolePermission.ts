import { Permission } from "./permission";
import { Role } from "./role";

export const rolePermissions: Role[] = [
    { name: 'admin', permissions: [Permission.READ, Permission.WRITE, Permission.DELETE] },
    { name: 'user', permissions: [Permission.READ] },
    { name: 'manager', permissions: [Permission.READ, Permission.WRITE] }
];
