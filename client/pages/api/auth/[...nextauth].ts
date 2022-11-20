import NextAuth from "next-auth/next";
import YandexProvider from "next-auth/providers/yandex";

export default NextAuth({
    providers: [
        YandexProvider({
            clientId: process.env.YANDEX_CLIENT_ID || "",
            clientSecret: process.env.YANDEX_CLIENT_SECRET || "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET || "",
});
