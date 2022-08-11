import Cookies from "universal-cookie";

// add Cookies and get token
const cookies = new Cookies();
const adminToken = cookies.get("TOKEN_ADMIN", { path: "/dash/" });
const userToken = cookies.get("TOKEN_USER", { path: "/" });
const accessName = cookies.get("ACCESS_NAME", { path: "/" });

export const adminHeaders = {
  headers: { Authorization: `Bearer ${adminToken}` },
};
export const userHeaders = {
  headers: { Authorization: `Bearer ${userToken}` },
};
export { accessName, userToken, adminToken };
