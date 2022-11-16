import { Permission } from '../../permission'

export class PermissionClaim {
    permission: Permission
    attribute?: Map<string, any>
}
