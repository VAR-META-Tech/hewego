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
        loanToken = await TokenFactory.deploy("Loan Token", "LTK");
        await collateralToken.waitForDeployment();
        await loanToken.waitForDeployment();

        await collateralToken.mint(borrower.address, ethers.parseUnits("1000", 18));
        await loanToken.mint(borrower.address, ethers.parseUnits("1000", 18));
        await loanToken.mint(lender.address, ethers.parseUnits("1000", 18));
        await loanToken.mint(lender_1.address, ethers.parseUnits("1000", 18));
        await loanToken.mint(lender_2.address, ethers.parseUnits("1000", 18));
        await loanToken.mint(lender_3.address, ethers.parseUnits("1000", 18));

        await priceFeed.setInitialPrice(loanToken.target, collateralToken.target, ethers.parseUnits("1", 18));

        const BondIssuanceFactory = await ethers.getContractFactory("BondIssuance");
        bondIssuance = await BondIssuanceFactory.deploy(priceFeed.target);
        await bondIssuance.waitForDeployment();

        await bondIssuance.connect(admin).setBorrower(borrower.address);
        await bondIssuance.connect(admin).setLender(lender.address);
        await bondIssuance.connect(admin).setRateTokenPerBond(loanToken.target, ethers.parseUnits("1", 18));

        await bondIssuance.connect(admin).setUpScaleCollateral(collateralToken.target, ethers.parseUnits("1500"));
    });

    describe("Bond creation and lending", () => {
        it("Should allow creation of a bond and lending to it", async () => {
            const bondDetails = {
                name: "Development Bond",
                loanAmount: ethers.parseUnits("100", 18),
                bondDuration: 12, // weeks
                borrowerInterestRate: 100, // 10%
                lenderInterestRate: 50, // 5%
                collateralTokenAddress: collateralToken.target,
            };

            const rateLoanTokenPerCollateralToken = await priceFeed.getLatestPrice(
                loanToken.target,
                collateralToken.target,
            );
            const amountCollateral =
                ((BigInt(bondDetails.loanAmount) / BigInt(rateLoanTokenPerCollateralToken[0])) *
                    (await bondIssuance.upScaleCollateral(collateralToken.target))) /
                BigInt(1000);
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
            expect(bond.name).to.equal(bondDetails.name);
            expect(bond.loanAmount).to.equal(bondDetails.loanAmount);

            console.log("bondDetails.loanAmount : ", bondDetails.loanAmount);
            await loanToken.connect(lender).approve(bondIssuance.target, bondDetails.loanAmount);
            await bondIssuance.connect(lender).lendBond(bondId, bondDetails.loanAmount);

            const updatedBond = await bondIssuance.getBond(bondId);
            expect(updatedBond.totalLend).to.equal(bondDetails.loanAmount);
        });

        it("Should allow the borrower to repay the bond", async () => {
            const bondId = 0;
            const repaymentAmount = ethers.parseUnits("200", 18); // Original plus interest
            await loanToken.connect(borrower).approve(bondIssuance.target, repaymentAmount);
            await bondIssuance.connect(borrower).repayBond(bondId);

            const bond = await bondIssuance.getBond(bondId);
            expect(bond.isRepaid).to.be.true;
        });
    });
});
