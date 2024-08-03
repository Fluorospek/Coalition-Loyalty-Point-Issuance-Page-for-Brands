import { SetMetadata } from '@nestjs/common';
import { UserRole } from './user-role.enum';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);