export const actions = {
    main: async ({ req }) => {
        console.log("Hello from server")
        return {
            key: "message",
            value: "Hello World"
        }
    }
}