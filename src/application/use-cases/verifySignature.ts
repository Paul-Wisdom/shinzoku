import { SolanaService } from "../../utils/types"

export const verifySignatureUseCase = (solanaService: SolanaService) => {
    return (pubKey: string, signature: string, message: string) => {
        return solanaService.verifySignature(pubKey, signature, message)
    }


}