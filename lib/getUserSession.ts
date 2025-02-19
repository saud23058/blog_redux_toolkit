import { auth } from "./auth";

export const getUserSession = async ():Promise<any> => {
  const session = await auth();
  return session?.user;
};
