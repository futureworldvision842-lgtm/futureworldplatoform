import crypto from "crypto";

// Blockchain simulation for transparent voting and financial tracking
// This creates verifiable hash chains that can be upgraded to real blockchain later

interface Block {
  index: number;
  timestamp: string;
  data: Record<string, unknown>;
  previousHash: string;
  hash: string;
  nonce: number;
}

export function createHash(data: string): string {
  return crypto.createHash("sha256").update(data).digest("hex");
}

export function createBlock(
  index: number,
  data: Record<string, unknown>,
  previousHash: string
): Block {
  const timestamp = new Date().toISOString();
  const nonce = Math.floor(Math.random() * 1000000);
  const blockData = `${index}${timestamp}${JSON.stringify(data)}${previousHash}${nonce}`;
  const hash = createHash(blockData);

  return {
    index,
    timestamp,
    data,
    previousHash,
    hash,
    nonce,
  };
}

export function createVoteHash(vote: {
  odlId: string;
  proposalId: string;
  choice: string;
  timestamp: string;
}): string {
  const data = `VOTE:${vote.odlId}:${vote.proposalId}:${vote.choice}:${vote.timestamp}`;
  return createHash(data);
}

export function createTransactionHash(transaction: {
  fromId: string;
  toId: string;
  amount: number;
  type: string;
  timestamp: string;
}): string {
  const data = `TX:${transaction.fromId}:${transaction.toId}:${transaction.amount}:${transaction.type}:${transaction.timestamp}`;
  return createHash(data);
}

export function verifyHash(data: string, expectedHash: string): boolean {
  const computedHash = createHash(data);
  return computedHash === expectedHash;
}

export function generateGenesisBlock(): Block {
  return createBlock(0, { type: "GENESIS", message: "G.A.I.G.S. Platform Genesis Block" }, "0");
}

// Create a chain of hashes for audit trail
export function createAuditChain(entries: Array<Record<string, unknown>>): Block[] {
  const chain: Block[] = [generateGenesisBlock()];

  for (let i = 0; i < entries.length; i++) {
    const previousBlock = chain[chain.length - 1];
    const newBlock = createBlock(i + 1, entries[i], previousBlock.hash);
    chain.push(newBlock);
  }

  return chain;
}

export function validateChain(chain: Block[]): boolean {
  for (let i = 1; i < chain.length; i++) {
    const currentBlock = chain[i];
    const previousBlock = chain[i - 1];

    if (currentBlock.previousHash !== previousBlock.hash) {
      return false;
    }
  }
  return true;
}
