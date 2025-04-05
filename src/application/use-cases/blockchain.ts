import { SolanaService } from "../../types/types"

export const verifySignatureUseCase = (solanaService: SolanaService) => {
    return (pubKey: string, signature: string, message: string) => {
        return solanaService.verifySignature(pubKey, signature, message)
    }


}