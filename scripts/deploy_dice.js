async function main () {
  // We get the contract to deploy
  const DiceRoller = await ethers.getContractFactory('DiceRoller');
  console.log('Deploying DiceRoller...');
  const instance = await DiceRoller.deploy(
        "0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9", // VRFCOORDINATOR
        "0xa36085F69e2889c224210F603D836748e7dC0088", // LINK
        "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4",  // KEYHASH
        // ethers.utils.formatEther("100000000000000000") // FEE = 0.1 LINK
        ethers.utils.parseEther('0.1')
  );
  await instance.deployed();
  console.log('DiceRoller deployed to:', instance.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });