import NextAuth from "next-auth/next";
import YandexProvider from "next-auth/providers/yandex";
import { server } from "../../../config/axios";

type IUser = {
    name: string;
    email: string;
    image: string;
    id: string;
};

const buildRequestBody = (user: IUser) => {
    const [firstName, lastName] = user.name.split(" ");
    const [login] = user.email.split("@");
    return {
        firstName,
        lastName,
        email: user.email,
        login,
        id: user.id,
    };
};

export default NextAuth({
    providers: [
        YandexProvider({
            clientId: process.env.YANDEX_CLIENT_ID || "",
            clientSecret: process.env.YANDEX_CLIENT_SECRET || "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET || "",
    callbacks: {
        async signIn({ user }) {
            try {
                await server.post("/register", buildRequestBody(user as IUser));
            } catch (err) {
                if (err instanceof Error) console.error(err.message);
            }
            return true;
        },
    },
});
