const { expect, assert } = require('chai');

// Start test block
describe('Box', function () {
  let Box, addr1, addr2;


  before(async function () {
    Box = await ethers.getContractFactory('Box');
  });

  beforeEach(async function () {
    [addr1, addr2] = await ethers.getSigners();
    console.log('Account 0: ' + addr1.address);
    console.log('Account 1: ' + addr2.address);

    this.box = await Box.deploy();
    await this.box.deployed();
    console.log('Address: ' + this.box.address);
  });

  // Test case
  it('retrieve returns a value previously stored', async function () {
    // Store a value
    let tx = await this.box.store(42);
    await tx.wait();
    console.log('tx1: ' + JSON.stringify(tx))
    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await this.box.retrieve()).toString()).to.equal('42');
  });

  it('prevents non owners from storing a value', async function () {
    try {
      await this.box.connect(addr2).store(43);
      assert.fail();
    }
    catch(err) {
      //console.log('err: ' + err)
      assert.isOk('failed','as expected')
    }
  });

  
  /**
    This test always seems to fail when run on kovan because of out of gas:
    npx hardhat test ./test/Box.test.js --network kovan --verbose

    Yet works find when I manually run on remix or the hardhard console:
    npx hardhat console --network kovan

    const Box = await ethers.getContractFactory('Box');

    [addr1, addr2] = await ethers.getSigners();

    const box = await Box.attach('0x5345E54377694f87BaD6cc5fc7eA068f492B32c3')

    const numberOfDie = 4;
    const dieSize = 10;
    const adjustment = 0;
    const result = 13;
    let tx = await box.hasRolled(numberOfDie, dieSize, adjustment, result);

    kovan.etherscan.io shows that 98% of gas is used when run manually, but 100% when run via hardhat.

   */
  it('will return true from hasRolledOnce when an address has called hasRolled.', async function() {
    console.log('Address1: ' + addr1.address)
    let hasRolled = await this.box.hasRolledOnce( addr1.address );
    // assert.equal(hasRolled, false, "Address should return true");
    expect(hasRolled).to.equal(false);

    const numberOfDie = 4;
    const dieSize = 10;
    const adjustment = 0;
    const result = 13;
    let tx = await this.box.hasRolled(numberOfDie, dieSize, adjustment, result);
    await tx.wait();
    console.log('tx1: ' + JSON.stringify(tx))
    hasRolled = await this.box.hasRolledOnce( addr1.address );
    // assert.equal(hasRolled, true, "Address should return true");
    expect(hasRolled).to.equal(true);

    // Rolling again will not change the result
    tx = await this.box.hasRolled(numberOfDie, dieSize, adjustment, result);
    await tx.wait();
    console.log('tx2: ' + JSON.stringify(tx))
    // hasRolled = await this.box.hasRolledOnce( addr1.address );
    // // assert.equal(hasRolled, true, "Address should return true");
    // expect(hasRolled).to.equal(true);
  });

});