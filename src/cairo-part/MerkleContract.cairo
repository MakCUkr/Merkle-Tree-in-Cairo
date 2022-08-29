%lang starknet

from starkware.cairo.common.cairo_builtins import (
    HashBuiltin
)

@storage_var
func MERKLE_root() -> (root : felt):
end

@view
func root{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr,
    }() -> (root: felt):
    let (root) = MERKLE_root.read()
    return (root)
end

@external
func set_merkle_root{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr,
    }(root: felt) -> ():
    MERKLE_root.write(root)
    return ()
end