import { SupportedBlockchain } from '@/internal';

export class CreateAccountDto {
  name!: string;
  blockchainName!: SupportedBlockchain;
  deriveIdx!: number;
  network!: string;
}
