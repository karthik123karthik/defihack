//SPDX-License-Identifier: MIT
//0xF958C99Af17be1f661BC51548C114362E8069B1B

pragma solidity^0.8.0;

import "./Ownable.sol";

//contract is same as a class

contract Landregister is Owner{
   
    string public country;
    string public state;
    string public district;
    string public village;
    string public landaddress;
    string public length;
    string public width;
    uint public survey;
    
    constructor(string memory _country, string memory _state, string memory _district, string memory _village,string memory _Address, string memory _width, string memory _height, address _owner, uint _survey)Owner(_owner){
        country = _country;
        state = _state;
        district = _district;
        village = _village;
        landaddress = _Address;
        length = _height;
        width = _width;
        survey = _survey;
    }   

}

contract deploy{
    Landregister[] public contractaddress;
    address public officer;
    mapping(uint => bool)public registered;

    constructor(){
        officer = msg.sender;
    }

    function create_contract(string memory _country, string memory _state, string memory _district, string memory _village, string memory _Address, string memory _width, string memory _height, address buyer, uint survey)public {
          require(msg.sender == officer,"You do not have rights to create");
          require(!registered[survey], "land already registered");
          Landregister newland = new Landregister(_country, _state, _district, _village, _Address, _width, _height, buyer, survey);
          contractaddress.push(newland);
          registered[survey] = true;
    }

    function getdeployedContractAddress()public view returns(address){
        require(contractaddress.length > 0, "there is no address available");
        return address(contractaddress[contractaddress.length - 1]);
    }

    function getallcontracts()public view returns(Landregister[]memory){
        return contractaddress;
    }
}
