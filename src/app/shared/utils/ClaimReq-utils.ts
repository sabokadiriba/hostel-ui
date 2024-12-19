export const claimReq = {
  superAdminonly: (c: any) => c.role == "SuperAdmin",
  adminOnly: (c: any) => c.role == "Admin",
  superviserOnly: (c: any) => c.role == "Superviser",
  superviserAndAdmin: (c: any) => c.role == "Superviser" || c.role == "Admin"
}