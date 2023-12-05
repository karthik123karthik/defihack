//SPDX-License_identifier : UNLICENSED

pragma solidity^0.8.0;

contract Owner{
    
    address public currentOwner;
    address[] public previousOwners;

     event newowner(address owner);
     event transferRight(address previous, address current);

    constructor(address _owner){
       currentOwner = _owner;
       emit newowner(_owner);
    }


    function transferRights(address _newowner)public{
          require(msg.sender == currentOwner, "YOU are not the owner of this land");
          previousOwners.push(currentOwner);
          currentOwner = _newowner;
          emit transferRight(address(previousOwners[previousOwners.length - 1]), currentOwner);
    }


    function getOwners()public view returns(address[] memory){
       return previousOwners;
    }




}