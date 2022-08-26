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
        syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr
    }(proofs : felt*, proofs_idx : felt, root : felt, leaf : felt, index : felt):
        alloc_locals

        
        return ()
    end
end
