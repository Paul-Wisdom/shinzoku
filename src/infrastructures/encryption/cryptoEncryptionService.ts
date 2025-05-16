import { randomBytes } from "crypto";

export const cryptoEncryptionService = {
    generateNounce: () => randomBytes(16).toString("hex"),
}