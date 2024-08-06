import { promises as fs } from "fs";

export async function saveContractAddress(chain_name: string, contract_address_name: string, data: unknown) {
    const folderPath = `address_contracts/${chain_name}`;
    const filePath = `${folderPath}/${contract_address_name}.json`;

    let existingData = [];

    try {
        await fs.access(folderPath);
        console.log("Folder already exists");
    } catch (error) {
        try {
            await fs.mkdir(folderPath, { recursive: true });
            console.log("Folder created");
        } catch (err) {
            console.error("Error creating folder:", err);
        }
    }

    try {
        const fileData = await fs.readFile(filePath, "utf-8");
        existingData = JSON.parse(fileData);
        console.log("File exists, appending data to the existing array");
    } catch (err) {
        console.log("File does not exist, creating a new file");
    }

    const currentDate = new Date();
    existingData.push({
        ...JSON.parse(JSON.stringify(data)),
        deployTime: currentDate,
    });

    try {
        await fs.writeFile(filePath, JSON.stringify(existingData));
        console.log("Data saved successfully");
    } catch (err) {
        console.error("Error writing file:", err);
    }
}
export async function readJSONFile(filePath: string) {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        console.error("Error reading file:", error);
        return null;
    }
}
