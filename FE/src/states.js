import create from 'zustand'

const useStore = create(set => ({
    // 사용자 정보에 관해서
    userId: '',
    setUserId: givenId => set({ userId : givenId}),
    userToken: '',
    setUserToken: givenToken => set({ userToken : givenToken })
    
}))

const userInput = create(set => ({
    userAnswer:'',
    getUserInput: input =>
        set({
        userAnswer: input
    }),
}));

export { useStore, userInput };