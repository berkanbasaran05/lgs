import { RoleType } from "../../redux/features/user/userSlice";

export const roleDisplayer = (role: RoleType) => {
  const roles = {
    ADMIN: { title: "Admin", type: "warning" },
    OPERATOR: { title: "Operator", type: "gray" },
    RESTAURANT_OWNER: { title: "RestaurantOwner", type: "green" },
    WORKER: { title: "Worker", type: "success" },
  };
  return roles[role];
};
