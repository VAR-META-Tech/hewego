import { Pagination } from "nestjs-typeorm-paginate";

import { AccountId } from "@hashgraph/sdk";

const NodeCache = require("node-cache");
const nodeCache = new NodeCache({ stdTTL: 2, checkperiod: 2 });
const CryptoJS = require("crypto-js");

export function nowInMillis(): number {
  return Date.now();
}

// Alias for nowInMillis
export function now(): number {
  return nowInMillis();
}

export function nowInSeconds(): number {
  return (nowInMillis() / 1000) | 0;
}

export function compareDate(dateSecond1: number, dateSecond2: number): number {
  const dateTime1 = new Date(dateSecond1 * 1000);
  const dateTime2 = new Date(dateSecond2 * 1000);
  const dateCompare1 = Date.parse(
    `${dateTime1.getFullYear()}-${dateTime1.getMonth()}-${dateTime1.getDate()}`
  );
  const dateCompare2 = Date.parse(
    `${dateTime2.getFullYear()}-${dateTime2.getMonth()}-${dateTime2.getDate()}`
  );
  if (dateCompare1 == dateCompare2) {
    return 0;
  } else if (dateCompare1 > dateCompare2) {
    return 1;
  } else {
    return -1;
  }
}

export function getArrayPaginationBuildTotal<T>(
  totalItems: any[],
  totalData: any[],
  options: any
): Pagination<T> {
  const { limit, page } = options;

  const selectedItems = totalItems;
  let totalRecord = 0;
  if (totalData.length > 0) {
    totalRecord = totalData[0].Total;
  }
  const pagination = {
    totalItems: Number(totalRecord),
    itemCount: Number(totalRecord),
    itemsPerPage: Number(limit),
    totalPages: Math.ceil(Number(totalRecord) / limit),
    currentPage: Number(page),
  };

  return new Pagination(selectedItems, pagination, null);
}

export function getPaginationBuildTotal<T>(
  totalRecord: number,
  options: any
): Pagination<T> {
  const { limit, page } = options;

  const pagination = {
    totalItems: Number(totalRecord),
    itemCount: Number(totalRecord),
    itemsPerPage: Number(limit),
    totalPages: Math.ceil(Number(totalRecord) / limit),
    currentPage: Number(page),
  };

  return new Pagination(null, pagination, null);
}

export function existValueInEnum(type: any, value: any): boolean {
  return (
    Object.keys(type)
      .filter((k) => isNaN(Number(k)))
      .filter((k) => type[k] === value).length > 0
  );
}

// export async function checkTypeERC(
//   rpcEndpoint: string,
//   contractAddress: string,
//   type: string
// ) {
//   const web3 = new Web3(rpcEndpoint);

//   const ERC165Abi: any = [
//     {
//       inputs: [
//         {
//           internalType: "bytes4",
//           name: "interfaceId",
//           type: "bytes4",
//         },
//       ],
//       name: "supportsInterface",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//   ];
//   const ERC1155InterfaceId: string = "0xd9b67a26";
//   const ERC721InterfaceId: string = "0x80ac58cd";

//   const contract = new web3.eth.Contract(ERC165Abi, contractAddress);

//   if (type == "ERC1155") {
//     return contract.methods.supportsInterface(ERC1155InterfaceId).call();
//   }

//   if (type == "ERC721") {
//     return contract.methods.supportsInterface(ERC721InterfaceId).call();
//   }
// }

async function web3Cache(key, func) {
  let value = nodeCache.get(key);
  if (value == undefined) {
    // handle miss!
    value = await func;
    nodeCache.set(key, value);
    return value;
  }
  return value;
}

export async function getBlockNumber(chainId, web3) {
  return web3Cache(`${chainId}: getBlockNumber`, web3.eth.getBlockNumber());
}

export function convertBigNumberToDecimal(bigNum: string, decimal: number) {
  // currency * 10^18
  let preZero = [];

  if (bigNum.length > decimal) {
    bigNum =
      bigNum?.slice(0, bigNum.length - decimal) +
      "." +
      bigNum?.slice(bigNum.length - decimal, bigNum.length);
  } else if (bigNum.length == decimal) {
    bigNum = "0." + bigNum;
  } else {
    for (let i = 0; i < decimal - bigNum.length; i++) {
      preZero[i] = "0";
    }
    bigNum = "0." + preZero.join("") + bigNum;
  }

  return bigNum;
}

//NOTE: objectArray must be sorted by key property by asc
export function binarySearch(
  objectArray,
  objectFind,
  objectKeyFind,
  objectKeyArray
) {
  let start = 0,
    end = objectArray.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (objectArray[mid][objectKeyArray] == objectFind[objectKeyFind]) {
      return objectArray[mid];
    } else if (objectArray[mid][objectKeyArray] < objectFind[objectKeyFind]) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return false;
}

export function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function nativeCoin(chain: string) {
  chain = chain.toLowerCase();
  switch (chain) {
    case "eth":
      return "ETH";
    case "bsc":
      return "BNB";
    case "polygon":
      return "MATIC";

    default:
      return chain.toUpperCase();
  }
}

// export function convertTokenBalance(balance: BigNumber, decimals: number) {
//   return balance.div(new BigNumber(10).pow(decimals));
// }

export function genExchangeSignature(
  userId: number,
  sequenceId: number,
  type: "increase" | "decrease",
  amount: string
) {
  return JSON.stringify({
    "user-id": Number(userId),
    "sequence-id": Number(sequenceId),
    type: type,
    amount: amount,
  });
}

export function convertToHederaAccountId(hexAddress: string): string {
  return AccountId.fromString(hexAddress).toString();
}
