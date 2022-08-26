%lang starknet
from starkware.cairo.common.uint256 import Uint256
from starkware.cairo.common.cairo_builtins import (
    HashBuiltin,
    SignatureBuiltin,
)
from starkware.cairo.common.hash import hash2

namespace MerkleTree:
    const SECONDS_PER_YEAR = 365 * 24 * 3600

    func getHash{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr,
        ecdsa_ptr : SignatureBuiltin*
    }(a: felt, b: felt) -> (res: felt):
        let (res) = hash2{hash_ptr=pedersen_ptr}(a,b)
        return (res)
    end

    func verify_proof{
        syscall_ptr : felt*, 
        pedersen_ptr : HashBuiltin*, 
        range_check_ptr,
        ecdsa_ptr : SignatureBuiltin*
    }(proofs : felt*, proofs_idx : felt, proofs_len: felt, root : felt, leaf : felt, index : felt):
        alloc_locals

        if proofs_idx == proofs_len:
            assert leaf = root
            return()
        end
        
        let hash = leaf
        let proofElement = [proofs + proofs_idx]
        let (new_hash) = getHash(hash, proofElement)
        verify_proof(proofs, proofs_idx+1, proofs_len, root, new_hash, index+1)

        return ()
    end
end


# def verify_proof_v2(proofs, proofs_idx, proofs_len, root, leaf, index):
#   hash = leaf;
#   if(proofs_idx >= proofs_len):
#     print(root==leaf)
#     return
  
#   proofElement = proofs[proofs_idx]
#   if (index % 2 == 0):
#       hash = getHash(hash, proofElement)
#   else:
#       hash = getHash(proofElement, hash)
#   index = int(index / 2)
#   verify_proof_v2(proofs, proofs_idx+1, proofs_len, root, hash, index)

