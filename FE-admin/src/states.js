import create from "zustand";

const useHelpStore = create((set) => ({
  qryString: "",
  setQryString: (qryString) => set({ qryString: qryString }),
}));

const useMemberStore = create((set) => ({
  isLogind: false, // 현재 로그인 중인지를 알림
  setIsLogind: (isLogind) => set({ isLogind: isLogind }),

  validated: false, // Token 검증 OK
  setValidated: (validated) => set({ validated: validated }),

  userToken: "",
  setUserToken: (userToken) => set({ userToken: userToken }),

  userName: "",
  setUserName: (userName) => set({ userName: userName }),

  userId: "",
  setUserId: (userId) => set({ userId: userId }),
}));

export { useMemberStore, useHelpStore };
