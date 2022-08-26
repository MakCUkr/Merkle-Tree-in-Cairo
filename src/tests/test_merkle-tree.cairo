%lang starknet
from starkware.starknet.common.syscalls import get_block_timestamp
from starkware.cairo.common.uint256 import Uint256
from starkware.cairo.common.cairo_builtins import (
    HashBuiltin,
    SignatureBuiltin,
)
from starkware.cairo.common.hash import hash2

@external
func test_one{
    syscall_ptr : felt*,
    pedersen_ptr : HashBuiltin*,
    range_check_ptr,
    ecdsa_ptr : SignatureBuiltin*,
}():
    alloc_locals
    let hash_one = 0xe2b3ef059d063574126341c156c6483fa5f522b261924088ad376ae8cfafc7a4
    let hash_two = 0x6527eb1b3583a25f669d6026e7e230e7ac0c7c56ab0af8841dad1acfb972b0e4

    # if index%2 == 0:
    let (hash_three) = hash2{hash_ptr=pedersen_ptr}(hash_one, hash_two)
    assert hash_three = 317361488391619876795111473446934822816165198340275047808265191786403800248

    return ()
end


# @external
# func increase_balance(user : felt, amount : felt, sig : (felt, felt)):
#     # Compute the hash of the message.
#     # The hash of (x, 0) is equivalent to the hash of (x).
#     let (amount_hash) = hash2{hash_ptr=pedersen_ptr}(amount, 0)