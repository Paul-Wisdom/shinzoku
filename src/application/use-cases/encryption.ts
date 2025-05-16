import { CryptoEncryptionService } from "../../types/types"

export const generateNounceUseCase = (cryptoEncryptionService: CryptoEncryptionService) => {
    return () => {
        return cryptoEncryptionService.generateNounce()
    }
}

