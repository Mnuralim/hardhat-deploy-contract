# Swisstronik Tesnet Techinal Task 1

link : [Click!](https://www.swisstronik.com/testnet2/dashboard)

Feel free donate to my EVM address

EVM :

```bash
0x9902C3A98Df4b240ad5496cC26F89bAb8058f4aE
```

## Steps

### 1. Clone Repository

```bash
git clone https://github.com/Mnuralim/hardhat-deploy-contract.git
```

```
cd hardhat-deploy-contract
```

### 2. Install Dependency

```bash
npm install
```

### 3. Set .env File

create .env file in root project

```bash
PRIVATE_KEY="your private key"
```

### 4. Create Smart Contract

- Open contract folder
- Create Hello_swtr.sol file
- Copy this code and paste there

```
/// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

//This contract is only intended for testing purposes

contract Swisstronik {
    string private message;

    /**
     * @dev Constructor is used to set the initial message for the contract
     * @param _message the message to associate with the message variable.
     */
    constructor(string memory _message) payable{
        message = _message;
    }

    /**
     * @dev setMessage() updates the stored message in the contract
     * @param _message the new message to replace the existing one
     */
    function setMessage(string memory _message) public {
        message = _message;
    }

    /**
     * @dev getMessage() retrieves the currently stored message in the contract
     * @return The message associated with the contract
     */
    function getMessage() public view returns(string memory){
        return message;
    }
}
```

### 5. Compile Smart Contract

```bash
npm run compile
```

### 6. Deploy Smart Contract

```bash
npm run deploy
```

### 7. Get Message

```bash
npm run get-message
```

### 8. Get Message

```bash
npm run set-message
```

### 9. Finsihed

- Open the deployed-adddress.ts (location in utils folder)
- Copy the address and paste the address in testnet dashboard
- push this project to your github and paste your repository link in testnet dashboard

by :
github : [Mnuralim](https://github.com/Mnuralim)
twitter : @Izzycracker04
telegram : @fitriay19

//0xf1f0C7Bf19ee4E196C0213cEE1002e9a5fadff62//
