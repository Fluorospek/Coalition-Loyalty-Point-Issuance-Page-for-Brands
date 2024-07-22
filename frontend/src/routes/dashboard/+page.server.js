
export const actions = {
    main: async ({ req }) => {
        console.log("Hello")
        return {
            key: "message",
            value: "Hello World"
        }
    }
}