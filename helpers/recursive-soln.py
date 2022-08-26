# basically equivalent of keccak256(abi.encodePacked())
def getHash(a, b):
  return str(a)+str(b)

leaf = "d"
index = 3
root = "abcd"
proofs = ["c", "ab"] 

def verify_proof(proofs, root, leaf, index):
  hash = leaf;
  for proofElement in proofs:
      if (index % 2 == 0):
          hash = getHash(hash, proofElement);
      else:
          hash = getHash(proofElement, hash);
      index = int(index / 2)

  print(hash==root)

verify_proof(proofs, root, leaf, index)

def verify_proof_v2(proofs, proofs_idx, proofs_len, root, leaf, index):
  hash = leaf;
  if(proofs_idx >= proofs_len):
    print(root==leaf)
    return
  
  proofElement = proofs[proofs_idx]
  if (index % 2 == 0):
      hash = getHash(hash, proofElement)
  else:
      hash = getHash(proofElement, hash)
  index = int(index / 2)
  verify_proof_v2(proofs, proofs_idx+1, proofs_len, root, hash, index)

verify_proof_v2(proofs, 0, len(proofs), root, leaf, index)