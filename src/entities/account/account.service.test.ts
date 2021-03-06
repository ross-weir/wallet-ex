import Container from 'typedi';

import { Account, AccountService, SupportedBlockchain } from '@/internal';

export {};

let accountService: AccountService;

beforeEach(() => {
  accountService = Container.get(AccountService);
});

describe('AccountService', () => {
  describe('getNextDeriveIndex', () => {
    it('should return 0 if no existing coin type & network', () => {
      const accounts: Account[] = [
        Account.fromJson({
          name: 'test',
          deriveIdx: 0,
          blockchainName: SupportedBlockchain.Ergo,
          network: 'testnet',
          walletId: 1,
        }),
        Account.fromJson({
          name: 'test',
          deriveIdx: 1,
          blockchainName: SupportedBlockchain.Ergo,
          network: 'testnet',
          walletId: 1,
        }),
      ];

      expect(
        accountService.getNextDeriveIndex(
          accounts,
          SupportedBlockchain.Ergo,
          'mainnet',
        ),
      ).toBe(0);
    });

    it('should return next index if existing coin type & network', () => {
      const accounts: Account[] = [
        Account.fromJson({
          name: 'test',
          deriveIdx: 0,
          blockchainName: SupportedBlockchain.Ergo,
          network: 'testnet',
          walletId: 1,
        }),
        Account.fromJson({
          name: 'test',
          deriveIdx: 1,
          blockchainName: SupportedBlockchain.Ergo,
          network: 'testnet',
          walletId: 1,
        }),
      ];

      expect(
        accountService.getNextDeriveIndex(
          accounts,
          SupportedBlockchain.Ergo,
          'testnet',
        ),
      ).toBe(2);
    });

    it('should return next index with multiple existing combinations', () => {
      const accounts: Account[] = [
        Account.fromJson({
          name: 'test',
          deriveIdx: 0,
          blockchainName: SupportedBlockchain.Ergo,
          network: 'testnet',
          walletId: 1,
        }),
        Account.fromJson({
          name: 'test',
          deriveIdx: 0,
          blockchainName: SupportedBlockchain.Ergo,
          network: 'mainnet',
          walletId: 1,
        }),
        Account.fromJson({
          name: 'test',
          deriveIdx: 1,
          blockchainName: SupportedBlockchain.Ergo,
          network: 'mainnet',
          walletId: 1,
        }),
      ];

      expect(
        accountService.getNextDeriveIndex(
          accounts,
          SupportedBlockchain.Ergo,
          'testnet',
        ),
      ).toBe(1);
    });
  });
});
