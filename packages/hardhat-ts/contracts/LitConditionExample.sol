//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract LitConditionExample {

    bool public condition ; 
    uint public num ;

    function setCondition(bool _condition) public {    
     condition = _condition;
    }


    function getFlag () view public returns (bool){
        return condition;
    }

    function setNumber(uint _number) public {    
     num = _number;
    }


    function getNum () view public returns (uint){
        return num;
    }


}