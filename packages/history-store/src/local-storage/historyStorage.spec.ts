import {BlockchainCode, EthereumStoredTransaction, isEthereumStoredTransaction} from '@emeraldwallet/core';
import BigNumber from 'bignumber.js';
import { loadTransactions, storeTransactions } from './historyStorage';

describe('historyStorage', () => {
  it('store and load txs', () => {
    const now = new Date();
    const trans = [{
      timestamp: now,
      hash: '0x1234',
      value: new BigNumber(1),
      chain: BlockchainCode.Unknown,
      chainId: 100,
      gasPrice: '0x0',
      gas: '0x0',
      from: '0x0',
      to: '0x0',
      nonce: 1,
      blockchain: BlockchainCode.Kovan,
      since: new Date(),
      discarded: false
    }];

    storeTransactions('key1', trans);
    const loaded = loadTransactions('key1', 100);

    expect(loaded).toHaveLength(1);

    expect(isEthereumStoredTransaction(loaded[0])).toBeTruthy();
    const loadedTx = loaded[0] as EthereumStoredTransaction;

    expect(loadedTx.hash).toEqual('0x1234');
    expect((loadedTx.value as BigNumber).comparedTo(new BigNumber(1))).toEqual(0);
    expect(typeof loadedTx.timestamp == "string").toBeFalsy();
    expect(loadedTx.timestamp).toEqual(now);
  });
});
