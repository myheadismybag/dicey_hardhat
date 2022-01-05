# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
# Issues I am having

My test cases work fine when run locally and the contract operates as expected when I use remix or the hardhat console.
When I run my tests, the last one fails because of out of gas error. I dont understand why it differs between the automated tests and manually.

Copy the .env_example to .env and add your account private key. Only one account is needed for these tests.

Use this to run tests on kovan testnet.
npx hardhat test ./test/Box.test.js --network kovan --verbose

# Contracts

DiceRoller is my original contract that works manually.
Box is from openzepplin docs and I expanded it as a simplified version of the DiceRoller contract for troubleshooting.
