import { CryptoEncryptionService } from "../../utils/types"

export const generateNounceUseCase = (cryptoEncryptionService: CryptoEncryptionService) => {
    return () => {
        return cryptoEncryptionService.generateNounce()
    }
}

