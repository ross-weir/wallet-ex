/**
 * Why this abomination exists:
 * https://medium.com/visual-development/how-to-fix-nasty-circular-dependency-issues-once-and-for-all-in-javascript-typescript-a04c987cf0de
 */

/* eslint simple-import-sort/exports: 0 */
export * from '@/entities/baseEntity';
export * from '@/entities/address/address.entity';
export * from '@/entities/account/account.entity';
export * from '@/entities/wallet/wallet.entity';

export * from '@/entities/address/address.service';
export * from '@/entities/account/account.service';
export * from '@/entities/wallet/wallet.service';

export * from '@/entities/account/dto';

export * from '@/storage';
export * from '@/types';

export * from '@/blockchains/types';
export * from '@/blockchains/blockchain';
export * from '@/blockchains/blockchainRegistry';
export * from '@/blockchains/blockchainClient';
export * from '@/blockchains/mappings';
export * from '@/blockchains/mappings';

export * from '@/hooks/useAuthenticatedWallet';

export * from '@/utils/fmt';

export * from '@/i18n';
