%lang starknet
from starkware.cairo.common.uint256 import Uint256
from starkware.cairo.common.math import unsigned_div_rem
from starkware.cairo.common.cairo_builtins import (
    HashBuiltin,
    SignatureBuiltin,
)
from starkware.cairo.common.hash import hash2

namespace MerkleTree:

    func get_modulo{
        syscall_ptr : felt*,
        range_check_ptr
    }(a : felt, b : felt) -> (result : felt):
        let (dividend, remainder) = unsigned_div_rem(a, b)
        return (remainder)
    end

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
        let (index_divisible_by_2) = get_modulo(index, 2)
        if index_divisible_by_2 == 0:
            let (new_hash) = getHash(hash, proofElement)
            tempvar syscall_ptr = syscall_ptr
            tempvar pedersen_ptr = pedersen_ptr
            tempvar range_check_ptr = range_check_ptr
        else:
            let (new_hash) = getHash(proofElement, hash)
            tempvar syscall_ptr = syscall_ptr
            tempvar pedersen_ptr = pedersen_ptr
            tempvar range_check_ptr = range_check_ptr
        end

        verify_proof(proofs, proofs_idx+1, proofs_len, root, new_hash, index/2)

        return ()
    end
end