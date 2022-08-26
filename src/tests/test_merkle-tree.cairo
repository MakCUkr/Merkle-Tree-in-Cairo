%lang starknet
from starkware.cairo.common.uint256 import Uint256
from starkware.cairo.common.cairo_builtins import (
    HashBuiltin,
    SignatureBuiltin,
)
from starkware.cairo.common.keccak import unsafe_keccak
from starkware.cairo.common.alloc import alloc
from MerkleTreeUtils import MerkleTree

@external
func test_one{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr,
        ecdsa_ptr : SignatureBuiltin*
    }():
    alloc_locals
    let hash_one = 1145740579986834829318467109289126196422112283458566209179034823478827791393
    let hash_two = 3128043887554350334570628527917084743624356612532641151385005685036883923477

    let (hash_three) = MerkleTree.getHash(hash_one,hash_two)
    # Calculated previously
    assert hash_three = 3274240073858950339877966369107462560525003124241902355403880717440512776591

    return ()
end


@external
func test_two{
    syscall_ptr : felt*,
    pedersen_ptr : HashBuiltin*,
    range_check_ptr,
    ecdsa_ptr : SignatureBuiltin*,
}():
    alloc_locals
    let (local proofs: felt*) = alloc()
    assert proofs[0] = 222
    assert proofs[1] = 3128043887554350334570628527917084743624356612532641151385005685036883923477

    let proofs_idx = 0
    let proofs_len = 2
    let leaf = 111
     %{expect_revert()%}
    let root = 6969
    let index = 0

    MerkleTree.verify_proof(
        proofs,
        proofs_idx, 
        proofs_len,
        root, 
        leaf, 
        index
    )
    return ()
end

@external
func test_three{
    syscall_ptr : felt*,
    pedersen_ptr : HashBuiltin*,
    range_check_ptr,
    ecdsa_ptr : SignatureBuiltin*,
}():
    alloc_locals
    let (local proofs: felt*) = alloc()
    assert proofs[0] = 222
    assert proofs[1] = 3128043887554350334570628527917084743624356612532641151385005685036883923477

    let proofs_idx = 0
    let proofs_len = 2
    let leaf = 111
    let root = 3274240073858950339877966369107462560525003124241902355403880717440512776591
    let index = 0

    MerkleTree.verify_proof(
        proofs,
        proofs_idx, 
        proofs_len,
        root, 
        leaf, 
        index
    )
    return ()
end


@external
func test_four{
    syscall_ptr : felt*,
    pedersen_ptr : HashBuiltin*,
    range_check_ptr,
    ecdsa_ptr : SignatureBuiltin*,
}():
    alloc_locals
    let (local proofs: felt*) = alloc()
    assert proofs[0] = 444
    assert proofs[1] = 1145740579986834829318467109289126196422112283458566209179034823478827791393

    let proofs_idx = 0
    let proofs_len = 2
    let leaf = 333
    let root = 3274240073858950339877966369107462560525003124241902355403880717440512776591
    let index = 2

    MerkleTree.verify_proof(
        proofs,
        proofs_idx, 
        proofs_len,
        root, 
        leaf, 
        index
    )
    return ()
end


# An example of using keccak with the merkle tree
@external
func test_five():
    alloc_locals
    let (local data: felt*) = alloc()
    assert data[0] = 111
    assert data[1] = 222
    let data_len = 2

    let (low: felt, high: felt) = unsafe_keccak(data, data_len)
    # Calculated previously
    assert low = 91007330149233898612256674446167786685
    assert high = 172120300650343214599491932905192275101

    return ()
end