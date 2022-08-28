%lang starknet

@storage_var
func MERKLE_root() -> (root : felt):
end

@view
func root() -> (root: felt):
    let (root) = merkle_root.read()
    return (root)
end

@external
func set_merkle_root(root: felt) -> ():
    MERKLE_root.write(root)
end