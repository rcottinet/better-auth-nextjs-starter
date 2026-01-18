import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { organization } from "better-auth/plugins"
import { db } from "@/database/db"
import * as schema from "@/database/schema"
import { APIError } from "better-auth/api";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        usePlural: true,
        schema
    }),
    emailAndPassword: {
        enabled: true,
        disableSignUp: true
    },
    plugins: [
        organization()
    ],
    databaseHooks: {
        user: {
            create: {
                before: async (user, ctx) => {
                    const isAllowedToSignUp = false;
                    if (!isAllowedToSignUp) {
                        throw new APIError("BAD_REQUEST", {
                            message: "Signup is disabled",
                        });
                    }
                },
            },
        },
    }
})
