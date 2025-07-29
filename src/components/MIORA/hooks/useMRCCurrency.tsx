import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

export interface MRCTransaction {
  id: string;
  type: 'send' | 'receive' | 'mine' | 'tax' | 'salary' | 'purchase' | 'reward';
  amount: number;
  from: string;
  to: string;
  timestamp: number;
  description: string;
  fee: number;
  status: 'pending' | 'completed' | 'failed';
  blockHash: string;
}

export interface MRCWallet {
  id: string;
  address: string;
  balance: number;
  privateKey: string;
  publicKey: string;
  transactions: MRCTransaction[];
  createdAt: number;
  label: string;
}

export interface MRCBlock {
  id: string;
  blockNumber: number;
  timestamp: number;
  transactions: MRCTransaction[];
  previousHash: string;
  hash: string;
  nonce: number;
  difficulty: number;
  reward: number;
  miner: string;
}

export interface CurrencyStats {
  totalSupply: number;
  circulatingSupply: number;
  dailyMined: number;
  dailyTransactions: number;
  averageTransactionFee: number;
  marketCap: number;
  exchangeRate: number; // MRC to USD
  inflationRate: number;
  burnedTokens: number;
  stakingRewards: number;
  governmentReserves: number;
  miningDifficulty: number;
  blockTime: number;
  lastBlockReward: number;
}

export interface MiningStats {
  hashrate: number;
  difficulty: number;
  blocksFound: number;
  totalEarnings: number;
  efficiency: number;
  power: number;
  status: 'active' | 'inactive' | 'error';
}

export const useMRCCurrency = () => {
  const [mrcBalance, setMrcBalance] = useState<number>(0);
  const [isCurrencyActive, setIsCurrencyActive] = useState<boolean>(false);
  const [wallet, setWallet] = useState<MRCWallet | null>(null);
  const [transactions, setTransactions] = useState<MRCTransaction[]>([]);
  const [blockchain, setBlockchain] = useState<MRCBlock[]>([]);
  const [miningStats, setMiningStats] = useState<MiningStats>({
    hashrate: 0,
    difficulty: 1000,
    blocksFound: 0,
    totalEarnings: 0,
    efficiency: 0,
    power: 0,
    status: 'inactive'
  });
  
  const [currencyStats, setCurrencyStats] = useState<CurrencyStats>({
    totalSupply: 1000000,
    circulatingSupply: 0,
    dailyMined: 0,
    dailyTransactions: 0,
    averageTransactionFee: 0.001,
    marketCap: 0,
    exchangeRate: 1.25, // 1 MRC = $1.25
    inflationRate: 2.5,
    burnedTokens: 0,
    stakingRewards: 0,
    governmentReserves: 100000,
    miningDifficulty: 1000,
    blockTime: 30,
    lastBlockReward: 12.5
  });

  const miningInterval = useRef<NodeJS.Timeout | null>(null);
  const blockInterval = useRef<NodeJS.Timeout | null>(null);

  // Initialize MRC Currency System
  const initializeCurrency = useCallback(async () => {
    console.log('💰 MRC Currency: Initializing currency system...');
    
    // Create genesis wallet
    const genesisWallet: MRCWallet = {
      id: 'wallet_genesis',
      address: `MRC${Date.now().toString().substr(-8)}${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      balance: 10000,
      privateKey: `priv_${Math.random().toString(36).substr(2, 32)}`,
      publicKey: `pub_${Math.random().toString(36).substr(2, 32)}`,
      transactions: [],
      createdAt: Date.now(),
      label: 'Genesis Wallet'
    };

    // Create genesis block
    const genesisBlock: MRCBlock = {
      id: 'block_0',
      blockNumber: 0,
      timestamp: Date.now(),
      transactions: [],
      previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
      hash: generateBlockHash('0000000000000000000000000000000000000000000000000000000000000000', 0),
      nonce: 0,
      difficulty: 1000,
      reward: 0,
      miner: 'MIORA System'
    };

    setWallet(genesisWallet);
    setMrcBalance(genesisWallet.balance);
    setBlockchain([genesisBlock]);
    setIsCurrencyActive(true);

    setCurrencyStats(prev => ({
      ...prev,
      circulatingSupply: genesisWallet.balance,
      governmentReserves: genesisWallet.balance * 0.1
    }));

    // Start mining simulation
    startMining();

    // Start block generation
    startBlockGeneration();

    // Save initialization data
    const initData = {
      timestamp: Date.now(),
      initialSupply: 1000000,
      genesisWallet: genesisWallet.address,
      genesisBlock: genesisBlock.hash,
      exchangeRate: currencyStats.exchangeRate
    };

    localStorage.setItem('mrc_currency_init', JSON.stringify(initData));

    console.log('💰 MRC Currency: System initialized successfully');
    
    toast({
      title: "💰 MRC Currency Active",
      description: "MIORA Coin currency system is now operational",
      duration: 4000,
    });

    return true;
  }, []);

  // Generate block hash
  const generateBlockHash = useCallback((previousHash: string, nonce: number): string => {
    const data = `${previousHash}${nonce}${Date.now()}`;
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).padStart(64, '0');
  }, []);

  // Start mining simulation
  const startMining = useCallback(() => {
    if (miningInterval.current) clearInterval(miningInterval.current);
    
    setMiningStats(prev => ({ ...prev, status: 'active' }));
    
    miningInterval.current = setInterval(() => {
      const miningReward = Math.random() * 2 + 1; // 1-3 MRC per mining cycle
      const powerConsumption = Math.random() * 0.5 + 0.1; // 0.1-0.6 power units
      
      setMrcBalance(prev => prev + miningReward);
      setMiningStats(prev => ({
        ...prev,
        hashrate: Math.random() * 1000 + 500,
        totalEarnings: prev.totalEarnings + miningReward,
        efficiency: Math.random() * 20 + 80,
        power: prev.power + powerConsumption
      }));

      setCurrencyStats(prev => ({
        ...prev,
        dailyMined: prev.dailyMined + miningReward,
        circulatingSupply: prev.circulatingSupply + miningReward
      }));

      // Create mining transaction
      const miningTransaction: MRCTransaction = {
        id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'mine',
        amount: miningReward,
        from: 'MIORA Network',
        to: wallet?.address || 'Unknown',
        timestamp: Date.now(),
        description: `Mining reward: ${miningReward.toFixed(4)} MRC`,
        fee: 0,
        status: 'completed',
        blockHash: generateBlockHash('mining', Date.now())
      };

      setTransactions(prev => [miningTransaction, ...prev.slice(0, 49)]);

      console.log(`⛏️ Mining: +${miningReward.toFixed(4)} MRC`);
    }, 8000); // Mine every 8 seconds
  }, [wallet, generateBlockHash]);

  // Start block generation
  const startBlockGeneration = useCallback(() => {
    if (blockInterval.current) clearInterval(blockInterval.current);
    
    blockInterval.current = setInterval(() => {
      const pendingTransactions = transactions.filter(tx => tx.status === 'pending').slice(0, 10);
      
      if (pendingTransactions.length > 0) {
        const newBlock: MRCBlock = {
          id: `block_${Date.now()}`,
          blockNumber: blockchain.length,
          timestamp: Date.now(),
          transactions: pendingTransactions,
          previousHash: blockchain[blockchain.length - 1]?.hash || '0',
          hash: generateBlockHash(blockchain[blockchain.length - 1]?.hash || '0', Date.now()),
          nonce: Math.floor(Math.random() * 1000000),
          difficulty: currencyStats.miningDifficulty,
          reward: currencyStats.lastBlockReward,
          miner: wallet?.address || 'Unknown'
        };

        setBlockchain(prev => [...prev, newBlock]);
        
        // Update transaction status
        setTransactions(prev => prev.map(tx => 
          pendingTransactions.find(ptx => ptx.id === tx.id) 
            ? { ...tx, status: 'completed' as const, blockHash: newBlock.hash }
            : tx
        ));

        setMiningStats(prev => ({
          ...prev,
          blocksFound: prev.blocksFound + 1
        }));

        console.log(`⛓️ New block mined: #${newBlock.blockNumber}`);
      }
    }, 30000); // Generate block every 30 seconds
  }, [blockchain, transactions, currencyStats, wallet, generateBlockHash]);

  // Send MRC transaction
  const sendMRC = useCallback(async (toAddress: string, amount: number, description: string = '') => {
    if (!wallet) {
      toast({
        title: "Error",
        description: "No wallet available",
        variant: "destructive",
      });
      return false;
    }

    if (amount > mrcBalance) {
      toast({
        title: "Insufficient Balance",
        description: "Not enough MRC for this transaction",
        variant: "destructive",
      });
      return false;
    }

    const fee = amount * 0.001; // 0.1% transaction fee
    const newTransaction: MRCTransaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'send',
      amount,
      from: wallet.address,
      to: toAddress,
      timestamp: Date.now(),
      description: description || `Transfer to ${toAddress}`,
      fee,
      status: 'pending',
      blockHash: ''
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setMrcBalance(prev => prev - amount - fee);

    setCurrencyStats(prev => ({
      ...prev,
      dailyTransactions: prev.dailyTransactions + 1,
      averageTransactionFee: (prev.averageTransactionFee + fee) / 2
    }));

    console.log(`💸 MRC sent: ${amount} MRC to ${toAddress}`);
    
    toast({
      title: "💸 MRC Sent",
      description: `${amount} MRC sent to ${toAddress}`,
      duration: 3000,
    });

    return true;
  }, [wallet, mrcBalance]);

  // Receive MRC (for government operations)
  const receiveMRC = useCallback((fromAddress: string, amount: number, description: string = '') => {
    if (!wallet) return false;

    const newTransaction: MRCTransaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'receive',
      amount,
      from: fromAddress,
      to: wallet.address,
      timestamp: Date.now(),
      description: description || `Received from ${fromAddress}`,
      fee: 0,
      status: 'completed',
      blockHash: generateBlockHash('receive', Date.now())
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setMrcBalance(prev => prev + amount);

    console.log(`💰 MRC received: ${amount} MRC from ${fromAddress}`);
    
    toast({
      title: "💰 MRC Received",
      description: `${amount} MRC received from ${fromAddress}`,
      duration: 3000,
    });

    return true;
  }, [wallet, generateBlockHash]);

  // Get detailed currency statistics
  const getCurrencyStats = useCallback(() => {
    const totalTransactionVolume = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const totalFees = transactions.reduce((sum, tx) => sum + tx.fee, 0);
    const successfulTransactions = transactions.filter(tx => tx.status === 'completed').length;
    const averageTransactionAmount = totalTransactionVolume / transactions.length || 0;

    return {
      ...currencyStats,
      totalTransactionVolume,
      totalFees,
      successfulTransactions,
      averageTransactionAmount,
      activeWallets: 1,
      networkHashrate: miningStats.hashrate,
      blocksInBlockchain: blockchain.length,
      transactionsProcessed: transactions.length
    };
  }, [currencyStats, transactions, miningStats, blockchain]);

  // Stop mining
  const stopMining = useCallback(() => {
    if (miningInterval.current) {
      clearInterval(miningInterval.current);
      miningInterval.current = null;
    }
    if (blockInterval.current) {
      clearInterval(blockInterval.current);
      blockInterval.current = null;
    }
    setMiningStats(prev => ({ ...prev, status: 'inactive' }));
    
    console.log('⛏️ Mining stopped');
  }, []);

  // Auto-save currency state
  useEffect(() => {
    if (isCurrencyActive) {
      const currencyData = {
        mrcBalance,
        wallet,
        transactions: transactions.slice(0, 100), // Keep last 100 transactions
        currencyStats,
        miningStats,
        blockchain: blockchain.slice(-10), // Keep last 10 blocks
        timestamp: Date.now()
      };
      localStorage.setItem('mrc_currency_state', JSON.stringify(currencyData));
    }
  }, [mrcBalance, wallet, transactions, currencyStats, miningStats, blockchain, isCurrencyActive]);

  // Load saved currency state
  useEffect(() => {
    const savedState = localStorage.getItem('mrc_currency_state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setMrcBalance(parsedState.mrcBalance || 0);
        setWallet(parsedState.wallet);
        setTransactions(parsedState.transactions || []);
        setCurrencyStats(parsedState.currencyStats || currencyStats);
        setMiningStats(parsedState.miningStats || miningStats);
        setBlockchain(parsedState.blockchain || []);
        setIsCurrencyActive(!!parsedState.wallet);
        
        // Restart mining if wallet exists
        if (parsedState.wallet) {
          startMining();
          startBlockGeneration();
        }
        
        console.log('💰 MRC Currency state loaded from localStorage');
      } catch (error) {
        console.error('Error loading currency state:', error);
      }
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (miningInterval.current) clearInterval(miningInterval.current);
      if (blockInterval.current) clearInterval(blockInterval.current);
    };
  }, []);

  return {
    mrcBalance,
    isCurrencyActive,
    wallet,
    transactions,
    blockchain,
    miningStats,
    currencyStats,
    initializeCurrency,
    sendMRC,
    receiveMRC,
    getCurrencyStats,
    stopMining,
    startMining
  };
};