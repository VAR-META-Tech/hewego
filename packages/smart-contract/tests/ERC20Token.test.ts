import { ethers } from "hardhat";
import { expect } from "chai";
import { ERC20Token } from "../typechain-types";

describe("ERC20Token", () => {
    let token: ERC20Token;
    let owner: any;
    let user1: any;
    let user2: any;

    before(async () => {
        [owner, user1, user2] = await ethers.getSigners();
        console.table({ owner, user1, user2 });
    });

    beforeEach(async () => {
        const Token = await ethers.getContractFactory("ERC20Token");
        token = (await Token.deploy("test", "test")) as ERC20Token;
        await token.waitForDeployment();

        // Mint tokens to users for testing
        await token.mint(user1.address, ethers.parseUnits("100", 18));
        await token.mint(user2.address, ethers.parseUnits("100", 18));
        await token.mint(owner.address, ethers.parseUnits("10000", 18));
    });

    describe("Deployment", () => {
        it("Should set the right owner", async () => {
            expect(await token.owner()).to.equal(owner.address);
        });

        it("Should assign the total supply of tokens to the owner", async () => {
            const ownerBalance = await token.balanceOf(owner.address);
            expect(await token.totalSupply()).to.equal(ownerBalance + ethers.parseUnits("200", 18)); // Adding the 200 tokens already transferred
        });
    });

    describe("Transactions", () => {
        it("Should transfer tokens between accounts", async () => {
            // Transfer 50 tokens from owner to user1
            await token.connect(owner).transfer(user1.address, ethers.parseUnits("50", 18));
            const user1Balance = await token.balanceOf(user1.address);
            expect(user1Balance).to.equal(ethers.parseUnits("150", 18)); // Initial 100 + 50

            // Transfer 50 tokens from user1 to user2
            await token.connect(user1).transfer(user2.address, ethers.parseUnits("50", 18));
            const user2Balance = await token.balanceOf(user2.address);
            expect(user2Balance).to.equal(ethers.parseUnits("150", 18)); // Initial 100 + 50
        });

        it("Should fail if sender doesn’t have enough tokens", async () => {
            const initialOwnerBalance = await token.balanceOf(owner.address);

            // Try to send 101 tokens from user1 (100 tokens) to owner
            await expect(token.connect(user1).transfer(owner.address, ethers.parseUnits("101", 18))).to.be.revertedWith(
                "ERC20: transfer amount exceeds balance",
            );

            // Owner balance shouldn't have changed.
            expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        });

        it("Should update balances after transfers", async () => {
            const initialOwnerBalance = await token.balanceOf(owner.address);

            // Transfer 100 tokens from owner to user1.
            await token.connect(owner).transfer(user1.address, ethers.parseUnits("100", 18));

            // Transfer another 50 tokens from owner to user2.
            await token.connect(owner).transfer(user2.address, ethers.parseUnits("50", 18));

            // Check balances.
            const finalOwnerBalance = await token.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance - ethers.parseUnits("150", 18));

            const user1Balance = await token.balanceOf(user1.address);
            expect(user1Balance).to.equal(ethers.parseUnits("200", 18)); // Initial 100 + 100

            const user2Balance = await token.balanceOf(user2.address);
            expect(user2Balance).to.equal(ethers.parseUnits("150", 18)); // Initial 100 + 50
        });
    });
});
