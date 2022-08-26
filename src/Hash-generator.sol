// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Testing{


    function getHash(bytes memory a) public pure returns (bytes32){
        return keccak256(a);
    }

    function getEPHash(bytes32 a, bytes32 b) public pure returns (bytes32){
        return keccak256(abi.encodePacked(a,b));
    }

    function getEP(bytes32 a, bytes32 b) public pure returns (bytes memory){
        return abi.encodePacked(a,b);
    }
}