import create from 'zustand';

/* 예시입니다. 전역으로 상태관리 할때 사용하면 됩니다. */
const useStore = create(set => ({
  // 사용자 id
  userId: '',
  setUserId: (id) => set({ userId: id }),
  // 사용자 nickName
  userToken: '',
  setUserToken: (userToken) => set({userToken: userToken}),
  // 사용자 area
  userArea: '',
  setUserArea: givenUserArea => set({ userArea: givenUserArea })
}));

const useUserInput = create(set => ({
  userInput: '',
  getUserInput: input =>
    set({
      userInput: input
}),
}));

const useTestInput = create(set => ({
  testId: '',
  setTestId : (id) => set({ testId: id}),
  testPw: '',
  setTestPw : (pw) => set({ testPw: pw })
}))
export { useStore, useUserInput, useTestInput };

/* ------------------------------다른 컴포넌트에서 작성법--------------------------------------  */
// 다른 Components에서 사용하고자 할 때
// import { useStore, useUserInput } from 'states.js/상대파일경로';

// const cnt = useStore(state => {
//   state.cnt;
// });
// const increase = useStore(state => {
//   state.increase;
// });

// const userInput = useUserInput(state => {
//   state.country;
// });

// const getUserInput = useUserInput(state => {
//   state.getUserInput;
// });