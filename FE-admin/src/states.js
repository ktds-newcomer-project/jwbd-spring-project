import create from "zustand";

const useMemberStore = create((set) => ({
  userToken: "",
  userName: "",
  setUserToken: (userToken) => set({ userToken: userToken }),
  setUserName: (userName) => set({ userName: userName }),
}));

export { useMemberStore };
