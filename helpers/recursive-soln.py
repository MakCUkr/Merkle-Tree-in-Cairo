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

def verify_proof_v2(proofs, proofs_idx, root, leaf, index):
  hash = leaf;
  if(proofs_idx < len(proofs)):
    proofElement = proofs[proofs_idx]
    if (index % 2 == 0):
        hash = getHash(hash, proofElement)
    else:
        hash = getHash(proofElement, hash)
    index = int(index / 2)
    verify_proof_v2(proofs, proofs_idx+1, root, hash, index)
  else:
    print(root==leaf)

verify_proof_v2(proofs, 0, root, leaf, index)