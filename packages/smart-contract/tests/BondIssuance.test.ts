import { ethers } from "hardhat";
import { expect } from "chai";
import { BondIssuance, ERC20Token, PriceFeed } from "../typechain-types";

describe("BondIssuance", () => {
    let bondIssuance: BondIssuance;
    let priceFeed: PriceFeed;
    let collateralToken: ERC20Token;
    let loanToken: ERC20Token;
    let admin: any;
    let borrower: any;
    let lender: any;
    let lender_1: any;
    let lender_2: any;
    let lender_3: any;

    before(async () => {
        [admin, borrower, lender, lender_1, lender_2, lender_3] = await ethers.getSigners();
        console.table({ admin: admin.address, borrower: borrower.address, lender: lender.address });
    });

    before(async () => {
        const PriceFeedFactory = await ethers.getContractFactory("PriceFeed");
        priceFeed = await PriceFeedFactory.deploy();
        await priceFeed.waitForDeployment();

        const TokenFactory = await ethers.getContractFactory("ERC20Token");
        collateralToken = await TokenFactory.deploy("Collateral Token", "CTK");
        await collateralToken.waitForDeployment();

        loanToken = await TokenFactory.deploy("Loan Token", "LTK");
        await loanToken.waitForDeployment();

        await collateralToken.mint(borrower.address, ethers.parseUnits("1000", 8));
        await loanToken.mint(borrower.address, ethers.parseUnits("1000", 8));
        await loanToken.mint(lender.address, ethers.parseUnits("1000", 8));
        await loanToken.mint(lender_1.address, ethers.parseUnits("1000", 8));
        await loanToken.mint(lender_2.address, ethers.parseUnits("1000", 8));
        await loanToken.mint(lender_3.address, ethers.parseUnits("1000", 8));

        await priceFeed.setInitialPrice(loanToken.target, collateralToken.target, ethers.parseUnits("1", 8));

        const BondIssuanceFactory = await ethers.getContractFactory("BondIssuance");
        bondIssuance = await BondIssuanceFactory.deploy(priceFeed.target);
        await bondIssuance.waitForDeployment();

        await bondIssuance.connect(admin).setRateTokenPerBond(loanToken.target, ethers.parseUnits("10", 8));
        await bondIssuance.connect(admin).setUpScaleCollateral(collateralToken.target, 1500);
    });

    describe("Bond creation and lending", () => {
        it("Should allow creation of a bond and lending to it", async () => {
            const bondDetails = {
                name: "Development Bond",
                loanAmount: ethers.parseUnits("100", 8),
                bondDuration: 12, // weeks
                borrowerInterestRate: 100, // 10%
                lenderInterestRate: 50, // 5%
                collateralTokenAddress: collateralToken.target,
            };

            const amountCollateral = await bondIssuance.collateralAmountCalculation(
                loanToken.target,
                bondDetails.loanAmount,
                collateralToken.target,
            );
            await collateralToken.connect(borrower).approve(bondIssuance.target, amountCollateral);
            await bondIssuance
                .connect(borrower)
                .createBond(
                    bondDetails.name,
                    loanToken.target,
                    bondDetails.loanAmount,
                    bondDetails.bondDuration,
                    bondDetails.borrowerInterestRate,
                    bondDetails.lenderInterestRate,
                    bondDetails.collateralTokenAddress,
                );

            const bondId = 0;
            const bond = await bondIssuance.getBond(bondId);
            console.log(bond);
            expect(bond.name).to.equal(bondDetails.name);
            expect(bond.loanAmount).to.equal(bondDetails.loanAmount);

            console.log("bondDetails.loanAmount : ", bondDetails.loanAmount);
            await loanToken.connect(lender).approve(bondIssuance.target, bondDetails.loanAmount);
            const boneAmount = await bondIssuance.loanTokenToBondTokenCalculation(
                loanToken.target,
                bondDetails.loanAmount,
            );
            await bondIssuance.connect(lender).buyBond(bondId, boneAmount);

            const updatedBond = await bondIssuance.getBond(bondId);
            expect(updatedBond.totalLend).to.equal(bondDetails.loanAmount);
        });
        it("Should borrower claim", async () => {
            await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60 + 1]); // + 7 days
            const bondId = 0;
            const beforeBalance = await loanToken.balanceOf(borrower.address);
            await bondIssuance.connect(borrower).borrowerClaim(bondId);
            const afterBalance = await loanToken.balanceOf(borrower.address);

            console.log("Should borrower claim", { beforeBalance, afterBalance });
        });
        it("Should allow the borrower to repay the bond", async () => {
            await ethers.provider.send("evm_increaseTime", [12 * 7 * 24 * 60 * 60 + 1]); // + 12 weeks
            const beforeBalance = await loanToken.balanceOf(borrower.address);
            const bondId = 0;
            const repaymentAmount = ethers.parseUnits("200", 8); // Original plus interest
            await loanToken.connect(borrower).approve(bondIssuance.target, repaymentAmount);
            await bondIssuance.connect(borrower).repayBond(bondId);
            const afterBalance = await loanToken.balanceOf(borrower.address);
            console.log("Should borrower repay the bond", { beforeBalance, afterBalance });

            const bond = await bondIssuance.getBond(bondId);
            expect(bond.readyToRepay).to.be.true;
        });

        it("Should lender claim", async () => {
            const bondId = 0;
            const beforeBalanceClaim = await loanToken.balanceOf(lender.address);
            await bondIssuance.connect(lender).lenderClaim(bondId);
            const afterBalanceClaim = await loanToken.balanceOf(lender.address);
            console.log("Should lender claim", { beforeBalanceClaim, afterBalanceClaim });
        });
    });
    describe("Bond liquidate", () => {
        it("Should allow creation of a bond and lending to it", async () => {
            const bondDetails = {
                name: "Development Bond",
                loanAmount: ethers.parseUnits("100", 8),
                bondDuration: 12, // weeks
                borrowerInterestRate: 100, // 10%
                lenderInterestRate: 50, // 5%
                collateralTokenAddress: collateralToken.target,
            };

            const amountCollateral = await bondIssuance.collateralAmountCalculation(
                loanToken.target,
                bondDetails.loanAmount,
                collateralToken.target,
            );
            await collateralToken.connect(borrower).approve(bondIssuance.target, amountCollateral);
            await bondIssuance
                .connect(borrower)
                .createBond(
                    bondDetails.name,
                    loanToken.target,
                    bondDetails.loanAmount,
                    bondDetails.bondDuration,
                    bondDetails.borrowerInterestRate,
                    bondDetails.lenderInterestRate,
                    bondDetails.collateralTokenAddress,
                );

            const bondId = 1;
            const bond = await bondIssuance.getBond(bondId);
            console.log(bond);
            expect(bond.name).to.equal(bondDetails.name);
            expect(bond.loanAmount).to.equal(bondDetails.loanAmount);

            console.log("bondDetails.loanAmount : ", bondDetails.loanAmount);
            await loanToken.connect(lender).approve(bondIssuance.target, bondDetails.loanAmount);
            const boneAmount = await bondIssuance.loanTokenToBondTokenCalculation(
                loanToken.target,
                bondDetails.loanAmount,
            );
            await bondIssuance.connect(lender).buyBond(bondId, boneAmount);

            const updatedBond = await bondIssuance.getBond(bondId);
            expect(updatedBond.totalLend).to.equal(bondDetails.loanAmount);
        });
        it("Should borrower claim", async () => {
            await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60 + 1]); // + 7 days
            const bondId = 1;
            const beforeBalance = await loanToken.balanceOf(borrower.address);
            await bondIssuance.connect(borrower).borrowerClaim(bondId);
            const afterBalance = await loanToken.balanceOf(borrower.address);

            console.log("Should borrower claim", { beforeBalance, afterBalance });
        });
        it("Should liquidate", async () => {
            await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60 + 1]); // + 7 days
            await priceFeed.setInitialPrice(loanToken.target, collateralToken.target, ethers.parseUnits("0.1", 8));

            const bondId = 1;
            const repaymentAmount = ethers.parseUnits("200", 8); // Original plus interest
            await loanToken.mint(bondIssuance.target, repaymentAmount);
            await bondIssuance.connect(borrower).liquidateBond(bondId);

            const bond = await bondIssuance.getBond(bondId);
            expect(bond.readyToRepay).to.be.true;
        });
        it("Should lender claim", async () => {
            const bondId = 1;
            const beforeBalanceClaim = await loanToken.balanceOf(lender.address);
            await bondIssuance.connect(lender).lenderClaim(bondId);
            const afterBalanceClaim = await loanToken.balanceOf(lender.address);
            console.log("Should lender claim", { beforeBalanceClaim, afterBalanceClaim });
        });
    });
});
