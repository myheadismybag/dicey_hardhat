const { expect, assert } = require('chai');

// Start test block
describe('Box', function () {
  let Box, addr1, addr2;


  before(async function () {
    Box = await ethers.getContractFactory('Box');
  });

  beforeEach(async function () {
    this.box = await Box.deploy();
    await this.box.deployed();
    console.log('Address: ' + this.box.address);

    let x  = await ethers.getSigners();
    console.log('x: ' + x.length);
    [addr1, addr2] = await ethers.getSigners();
    console.log('Account 0: ' + addr1.address);
    console.log('Account 1: ' + addr2.address);
  });

  // Test case
  it('retrieve returns a value previously stored', async function () {
    // Store a value
    let tx = await this.box.store(42);
    await tx.wait();
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
});