import store from "@/store";

export function hasRole(value) {
  if (store.getters["acl/admin"]) return true;
  if (value instanceof Array && value.length > 0)
    return can(store.getters["acl/role"], {
      role: value,
      mode: "oneOf",
    });
  let mode = "oneOf";
  if (value.hasOwnProperty("mode")) mode = value["mode"];
  let result = true;
  if (value.hasOwnProperty("role"))
    result =
      result && can(store.getters["acl/role"], { role: value["role"], mode });
  if (result && value.hasOwnProperty("ability"))
    result =
      result &&
      can(store.getters["acl/ability"], {
        role: value["ability"],
        mode,
      });
  return result;
}

export function can(roleOrAbility, value) {
  let hasRole = false;
  if (
    value instanceof Object &&
    value.hasOwnProperty("role") &&
    value.hasOwnProperty("mode")
  ) {
    const { role, mode } = value;
    if (mode === "allOf") {
      hasRole = role.every((item) => {
        return roleOrAbility.includes(item);
      });
    }
    if (mode === "oneOf") {
      hasRole = role.some((item) => {
        return roleOrAbility.includes(item);
      });
    }
    if (mode === "except") {
      hasRole = !role.some((item) => {
        return roleOrAbility.includes(item);
      });
    }
  }
  return hasRole;
}
