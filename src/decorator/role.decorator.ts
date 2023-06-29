import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/config/role';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
