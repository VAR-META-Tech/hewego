// Sources flattened with hardhat v2.22.7 https://hardhat.org

// SPDX-License-Identifier: Apache-2.0 AND MIT

pragma experimental ABIEncoderV2;

// File @openzeppelin/contracts/access/IAccessControl.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (access/IAccessControl.sol)

pragma solidity ^0.8.0;

/**
 * @dev External interface of AccessControl declared to support ERC165 detection.
 */
interface IAccessControl {
    /**
     * @dev Emitted when `newAdminRole` is set as ``role``'s admin role, replacing `previousAdminRole`
     *
     * `DEFAULT_ADMIN_ROLE` is the starting admin for all roles, despite
     * {RoleAdminChanged} not being emitted signaling this.
     *
     * _Available since v3.1._
     */
    event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole);

    /**
     * @dev Emitted when `account` is granted `role`.
     *
     * `sender` is the account that originated the contract call, an admin role
     * bearer except when using {AccessControl-_setupRole}.
     */
    event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);

    /**
     * @dev Emitted when `account` is revoked `role`.
     *
     * `sender` is the account that originated the contract call:
     *   - if using `revokeRole`, it is the admin role bearer
     *   - if using `renounceRole`, it is the role bearer (i.e. `account`)
     */
    event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);

    /**
     * @dev Returns `true` if `account` has been granted `role`.
     */
    function hasRole(bytes32 role, address account) external view returns (bool);

    /**
     * @dev Returns the admin role that controls `role`. See {grantRole} and
     * {revokeRole}.
     *
     * To change a role's admin, use {AccessControl-_setRoleAdmin}.
     */
    function getRoleAdmin(bytes32 role) external view returns (bytes32);

    /**
     * @dev Grants `role` to `account`.
     *
     * If `account` had not been already granted `role`, emits a {RoleGranted}
     * event.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     */
    function grantRole(bytes32 role, address account) external;

    /**
     * @dev Revokes `role` from `account`.
     *
     * If `account` had been granted `role`, emits a {RoleRevoked} event.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     */
    function revokeRole(bytes32 role, address account) external;

    /**
     * @dev Revokes `role` from the calling account.
     *
     * Roles are often managed via {grantRole} and {revokeRole}: this function's
     * purpose is to provide a mechanism for accounts to lose their privileges
     * if they are compromised (such as when a trusted device is misplaced).
     *
     * If the calling account had been granted `role`, emits a {RoleRevoked}
     * event.
     *
     * Requirements:
     *
     * - the caller must be `account`.
     */
    function renounceRole(bytes32 role, address account) external;
}


// File @openzeppelin/contracts/utils/Context.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.4) (utils/Context.sol)

pragma solidity ^0.8.0;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }

    function _contextSuffixLength() internal view virtual returns (uint256) {
        return 0;
    }
}


// File @openzeppelin/contracts/utils/introspection/IERC165.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/introspection/IERC165.sol)

pragma solidity ^0.8.0;

/**
 * @dev Interface of the ERC165 standard, as defined in the
 * https://eips.ethereum.org/EIPS/eip-165[EIP].
 *
 * Implementers can declare support of contract interfaces, which can then be
 * queried by others ({ERC165Checker}).
 *
 * For an implementation, see {ERC165}.
 */
interface IERC165 {
    /**
     * @dev Returns true if this contract implements the interface defined by
     * `interfaceId`. See the corresponding
     * https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section]
     * to learn more about how these ids are created.
     *
     * This function call must use less than 30 000 gas.
     */
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}


// File @openzeppelin/contracts/utils/introspection/ERC165.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/introspection/ERC165.sol)

pragma solidity ^0.8.0;

/**
 * @dev Implementation of the {IERC165} interface.
 *
 * Contracts that want to implement ERC165 should inherit from this contract and override {supportsInterface} to check
 * for the additional interface id that will be supported. For example:
 *
 * ```solidity
 * function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
 *     return interfaceId == type(MyInterface).interfaceId || super.supportsInterface(interfaceId);
 * }
 * ```
 *
 * Alternatively, {ERC165Storage} provides an easier to use but more expensive implementation.
 */
abstract contract ERC165 is IERC165 {
    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC165).interfaceId;
    }
}


// File @openzeppelin/contracts/utils/math/Math.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.0) (utils/math/Math.sol)

pragma solidity ^0.8.0;

/**
 * @dev Standard math utilities missing in the Solidity language.
 */
library Math {
    enum Rounding {
        Down, // Toward negative infinity
        Up, // Toward infinity
        Zero // Toward zero
    }

    /**
     * @dev Returns the largest of two numbers.
     */
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? a : b;
    }

    /**
     * @dev Returns the smallest of two numbers.
     */
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

    /**
     * @dev Returns the average of two numbers. The result is rounded towards
     * zero.
     */
    function average(uint256 a, uint256 b) internal pure returns (uint256) {
        // (a + b) / 2 can overflow.
        return (a & b) + (a ^ b) / 2;
    }

    /**
     * @dev Returns the ceiling of the division of two numbers.
     *
     * This differs from standard division with `/` in that it rounds up instead
     * of rounding down.
     */
    function ceilDiv(uint256 a, uint256 b) internal pure returns (uint256) {
        // (a + b - 1) / b can overflow on addition, so we distribute.
        return a == 0 ? 0 : (a - 1) / b + 1;
    }

    /**
     * @notice Calculates floor(x * y / denominator) with full precision. Throws if result overflows a uint256 or denominator == 0
     * @dev Original credit to Remco Bloemen under MIT license (https://xn--2-umb.com/21/muldiv)
     * with further edits by Uniswap Labs also under MIT license.
     */
    function mulDiv(uint256 x, uint256 y, uint256 denominator) internal pure returns (uint256 result) {
        unchecked {
            // 512-bit multiply [prod1 prod0] = x * y. Compute the product mod 2^256 and mod 2^256 - 1, then use
            // use the Chinese Remainder Theorem to reconstruct the 512 bit result. The result is stored in two 256
            // variables such that product = prod1 * 2^256 + prod0.
            uint256 prod0; // Least significant 256 bits of the product
            uint256 prod1; // Most significant 256 bits of the product
            assembly {
                let mm := mulmod(x, y, not(0))
                prod0 := mul(x, y)
                prod1 := sub(sub(mm, prod0), lt(mm, prod0))
            }

            // Handle non-overflow cases, 256 by 256 division.
            if (prod1 == 0) {
                // Solidity will revert if denominator == 0, unlike the div opcode on its own.
                // The surrounding unchecked block does not change this fact.
                // See https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic.
                return prod0 / denominator;
            }

            // Make sure the result is less than 2^256. Also prevents denominator == 0.
            require(denominator > prod1, "Math: mulDiv overflow");

            ///////////////////////////////////////////////
            // 512 by 256 division.
            ///////////////////////////////////////////////

            // Make division exact by subtracting the remainder from [prod1 prod0].
            uint256 remainder;
            assembly {
                // Compute remainder using mulmod.
                remainder := mulmod(x, y, denominator)

                // Subtract 256 bit number from 512 bit number.
                prod1 := sub(prod1, gt(remainder, prod0))
                prod0 := sub(prod0, remainder)
            }

            // Factor powers of two out of denominator and compute largest power of two divisor of denominator. Always >= 1.
            // See https://cs.stackexchange.com/q/138556/92363.

            // Does not overflow because the denominator cannot be zero at this stage in the function.
            uint256 twos = denominator & (~denominator + 1);
            assembly {
                // Divide denominator by twos.
                denominator := div(denominator, twos)

                // Divide [prod1 prod0] by twos.
                prod0 := div(prod0, twos)

                // Flip twos such that it is 2^256 / twos. If twos is zero, then it becomes one.
                twos := add(div(sub(0, twos), twos), 1)
            }

            // Shift in bits from prod1 into prod0.
            prod0 |= prod1 * twos;

            // Invert denominator mod 2^256. Now that denominator is an odd number, it has an inverse modulo 2^256 such
            // that denominator * inv = 1 mod 2^256. Compute the inverse by starting with a seed that is correct for
            // four bits. That is, denominator * inv = 1 mod 2^4.
            uint256 inverse = (3 * denominator) ^ 2;

            // Use the Newton-Raphson iteration to improve the precision. Thanks to Hensel's lifting lemma, this also works
            // in modular arithmetic, doubling the correct bits in each step.
            inverse *= 2 - denominator * inverse; // inverse mod 2^8
            inverse *= 2 - denominator * inverse; // inverse mod 2^16
            inverse *= 2 - denominator * inverse; // inverse mod 2^32
            inverse *= 2 - denominator * inverse; // inverse mod 2^64
            inverse *= 2 - denominator * inverse; // inverse mod 2^128
            inverse *= 2 - denominator * inverse; // inverse mod 2^256

            // Because the division is now exact we can divide by multiplying with the modular inverse of denominator.
            // This will give us the correct result modulo 2^256. Since the preconditions guarantee that the outcome is
            // less than 2^256, this is the final result. We don't need to compute the high bits of the result and prod1
            // is no longer required.
            result = prod0 * inverse;
            return result;
        }
    }

    /**
     * @notice Calculates x * y / denominator with full precision, following the selected rounding direction.
     */
    function mulDiv(uint256 x, uint256 y, uint256 denominator, Rounding rounding) internal pure returns (uint256) {
        uint256 result = mulDiv(x, y, denominator);
        if (rounding == Rounding.Up && mulmod(x, y, denominator) > 0) {
            result += 1;
        }
        return result;
    }

    /**
     * @dev Returns the square root of a number. If the number is not a perfect square, the value is rounded down.
     *
     * Inspired by Henry S. Warren, Jr.'s "Hacker's Delight" (Chapter 11).
     */
    function sqrt(uint256 a) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        // For our first guess, we get the biggest power of 2 which is smaller than the square root of the target.
        //
        // We know that the "msb" (most significant bit) of our target number `a` is a power of 2 such that we have
        // `msb(a) <= a < 2*msb(a)`. This value can be written `msb(a)=2**k` with `k=log2(a)`.
        //
        // This can be rewritten `2**log2(a) <= a < 2**(log2(a) + 1)`
        // → `sqrt(2**k) <= sqrt(a) < sqrt(2**(k+1))`
        // → `2**(k/2) <= sqrt(a) < 2**((k+1)/2) <= 2**(k/2 + 1)`
        //
        // Consequently, `2**(log2(a) / 2)` is a good first approximation of `sqrt(a)` with at least 1 correct bit.
        uint256 result = 1 << (log2(a) >> 1);

        // At this point `result` is an estimation with one bit of precision. We know the true value is a uint128,
        // since it is the square root of a uint256. Newton's method converges quadratically (precision doubles at
        // every iteration). We thus need at most 7 iteration to turn our partial result with one bit of precision
        // into the expected uint128 result.
        unchecked {
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            return min(result, a / result);
        }
    }

    /**
     * @notice Calculates sqrt(a), following the selected rounding direction.
     */
    function sqrt(uint256 a, Rounding rounding) internal pure returns (uint256) {
        unchecked {
            uint256 result = sqrt(a);
            return result + (rounding == Rounding.Up && result * result < a ? 1 : 0);
        }
    }

    /**
     * @dev Return the log in base 2, rounded down, of a positive value.
     * Returns 0 if given 0.
     */
    function log2(uint256 value) internal pure returns (uint256) {
        uint256 result = 0;
        unchecked {
            if (value >> 128 > 0) {
                value >>= 128;
                result += 128;
            }
            if (value >> 64 > 0) {
                value >>= 64;
                result += 64;
            }
            if (value >> 32 > 0) {
                value >>= 32;
                result += 32;
            }
            if (value >> 16 > 0) {
                value >>= 16;
                result += 16;
            }
            if (value >> 8 > 0) {
                value >>= 8;
                result += 8;
            }
            if (value >> 4 > 0) {
                value >>= 4;
                result += 4;
            }
            if (value >> 2 > 0) {
                value >>= 2;
                result += 2;
            }
            if (value >> 1 > 0) {
                result += 1;
            }
        }
        return result;
    }

    /**
     * @dev Return the log in base 2, following the selected rounding direction, of a positive value.
     * Returns 0 if given 0.
     */
    function log2(uint256 value, Rounding rounding) internal pure returns (uint256) {
        unchecked {
            uint256 result = log2(value);
            return result + (rounding == Rounding.Up && 1 << result < value ? 1 : 0);
        }
    }

    /**
     * @dev Return the log in base 10, rounded down, of a positive value.
     * Returns 0 if given 0.
     */
    function log10(uint256 value) internal pure returns (uint256) {
        uint256 result = 0;
        unchecked {
            if (value >= 10 ** 64) {
                value /= 10 ** 64;
                result += 64;
            }
            if (value >= 10 ** 32) {
                value /= 10 ** 32;
                result += 32;
            }
            if (value >= 10 ** 16) {
                value /= 10 ** 16;
                result += 16;
            }
            if (value >= 10 ** 8) {
                value /= 10 ** 8;
                result += 8;
            }
            if (value >= 10 ** 4) {
                value /= 10 ** 4;
                result += 4;
            }
            if (value >= 10 ** 2) {
                value /= 10 ** 2;
                result += 2;
            }
            if (value >= 10 ** 1) {
                result += 1;
            }
        }
        return result;
    }

    /**
     * @dev Return the log in base 10, following the selected rounding direction, of a positive value.
     * Returns 0 if given 0.
     */
    function log10(uint256 value, Rounding rounding) internal pure returns (uint256) {
        unchecked {
            uint256 result = log10(value);
            return result + (rounding == Rounding.Up && 10 ** result < value ? 1 : 0);
        }
    }

    /**
     * @dev Return the log in base 256, rounded down, of a positive value.
     * Returns 0 if given 0.
     *
     * Adding one to the result gives the number of pairs of hex symbols needed to represent `value` as a hex string.
     */
    function log256(uint256 value) internal pure returns (uint256) {
        uint256 result = 0;
        unchecked {
            if (value >> 128 > 0) {
                value >>= 128;
                result += 16;
            }
            if (value >> 64 > 0) {
                value >>= 64;
                result += 8;
            }
            if (value >> 32 > 0) {
                value >>= 32;
                result += 4;
            }
            if (value >> 16 > 0) {
                value >>= 16;
                result += 2;
            }
            if (value >> 8 > 0) {
                result += 1;
            }
        }
        return result;
    }

    /**
     * @dev Return the log in base 256, following the selected rounding direction, of a positive value.
     * Returns 0 if given 0.
     */
    function log256(uint256 value, Rounding rounding) internal pure returns (uint256) {
        unchecked {
            uint256 result = log256(value);
            return result + (rounding == Rounding.Up && 1 << (result << 3) < value ? 1 : 0);
        }
    }
}


// File @openzeppelin/contracts/utils/math/SignedMath.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.8.0) (utils/math/SignedMath.sol)

pragma solidity ^0.8.0;

/**
 * @dev Standard signed math utilities missing in the Solidity language.
 */
library SignedMath {
    /**
     * @dev Returns the largest of two signed numbers.
     */
    function max(int256 a, int256 b) internal pure returns (int256) {
        return a > b ? a : b;
    }

    /**
     * @dev Returns the smallest of two signed numbers.
     */
    function min(int256 a, int256 b) internal pure returns (int256) {
        return a < b ? a : b;
    }

    /**
     * @dev Returns the average of two signed numbers without overflow.
     * The result is rounded towards zero.
     */
    function average(int256 a, int256 b) internal pure returns (int256) {
        // Formula from the book "Hacker's Delight"
        int256 x = (a & b) + ((a ^ b) >> 1);
        return x + (int256(uint256(x) >> 255) & (a ^ b));
    }

    /**
     * @dev Returns the absolute unsigned value of a signed value.
     */
    function abs(int256 n) internal pure returns (uint256) {
        unchecked {
            // must be unchecked in order to support `n = type(int256).min`
            return uint256(n >= 0 ? n : -n);
        }
    }
}


// File @openzeppelin/contracts/utils/Strings.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.0) (utils/Strings.sol)

pragma solidity ^0.8.0;


/**
 * @dev String operations.
 */
library Strings {
    bytes16 private constant _SYMBOLS = "0123456789abcdef";
    uint8 private constant _ADDRESS_LENGTH = 20;

    /**
     * @dev Converts a `uint256` to its ASCII `string` decimal representation.
     */
    function toString(uint256 value) internal pure returns (string memory) {
        unchecked {
            uint256 length = Math.log10(value) + 1;
            string memory buffer = new string(length);
            uint256 ptr;
            /// @solidity memory-safe-assembly
            assembly {
                ptr := add(buffer, add(32, length))
            }
            while (true) {
                ptr--;
                /// @solidity memory-safe-assembly
                assembly {
                    mstore8(ptr, byte(mod(value, 10), _SYMBOLS))
                }
                value /= 10;
                if (value == 0) break;
            }
            return buffer;
        }
    }

    /**
     * @dev Converts a `int256` to its ASCII `string` decimal representation.
     */
    function toString(int256 value) internal pure returns (string memory) {
        return string(abi.encodePacked(value < 0 ? "-" : "", toString(SignedMath.abs(value))));
    }

    /**
     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation.
     */
    function toHexString(uint256 value) internal pure returns (string memory) {
        unchecked {
            return toHexString(value, Math.log256(value) + 1);
        }
    }

    /**
     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.
     */
    function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {
        bytes memory buffer = new bytes(2 * length + 2);
        buffer[0] = "0";
        buffer[1] = "x";
        for (uint256 i = 2 * length + 1; i > 1; --i) {
            buffer[i] = _SYMBOLS[value & 0xf];
            value >>= 4;
        }
        require(value == 0, "Strings: hex length insufficient");
        return string(buffer);
    }

    /**
     * @dev Converts an `address` with fixed length of 20 bytes to its not checksummed ASCII `string` hexadecimal representation.
     */
    function toHexString(address addr) internal pure returns (string memory) {
        return toHexString(uint256(uint160(addr)), _ADDRESS_LENGTH);
    }

    /**
     * @dev Returns true if the two strings are equal.
     */
    function equal(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }
}


// File @openzeppelin/contracts/access/AccessControl.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.0) (access/AccessControl.sol)

pragma solidity ^0.8.0;




/**
 * @dev Contract module that allows children to implement role-based access
 * control mechanisms. This is a lightweight version that doesn't allow enumerating role
 * members except through off-chain means by accessing the contract event logs. Some
 * applications may benefit from on-chain enumerability, for those cases see
 * {AccessControlEnumerable}.
 *
 * Roles are referred to by their `bytes32` identifier. These should be exposed
 * in the external API and be unique. The best way to achieve this is by
 * using `public constant` hash digests:
 *
 * ```solidity
 * bytes32 public constant MY_ROLE = keccak256("MY_ROLE");
 * ```
 *
 * Roles can be used to represent a set of permissions. To restrict access to a
 * function call, use {hasRole}:
 *
 * ```solidity
 * function foo() public {
 *     require(hasRole(MY_ROLE, msg.sender));
 *     ...
 * }
 * ```
 *
 * Roles can be granted and revoked dynamically via the {grantRole} and
 * {revokeRole} functions. Each role has an associated admin role, and only
 * accounts that have a role's admin role can call {grantRole} and {revokeRole}.
 *
 * By default, the admin role for all roles is `DEFAULT_ADMIN_ROLE`, which means
 * that only accounts with this role will be able to grant or revoke other
 * roles. More complex role relationships can be created by using
 * {_setRoleAdmin}.
 *
 * WARNING: The `DEFAULT_ADMIN_ROLE` is also its own admin: it has permission to
 * grant and revoke this role. Extra precautions should be taken to secure
 * accounts that have been granted it. We recommend using {AccessControlDefaultAdminRules}
 * to enforce additional security measures for this role.
 */
abstract contract AccessControl is Context, IAccessControl, ERC165 {
    struct RoleData {
        mapping(address => bool) members;
        bytes32 adminRole;
    }

    mapping(bytes32 => RoleData) private _roles;

    bytes32 public constant DEFAULT_ADMIN_ROLE = 0x00;

    /**
     * @dev Modifier that checks that an account has a specific role. Reverts
     * with a standardized message including the required role.
     *
     * The format of the revert reason is given by the following regular expression:
     *
     *  /^AccessControl: account (0x[0-9a-f]{40}) is missing role (0x[0-9a-f]{64})$/
     *
     * _Available since v4.1._
     */
    modifier onlyRole(bytes32 role) {
        _checkRole(role);
        _;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IAccessControl).interfaceId || super.supportsInterface(interfaceId);
    }

    /**
     * @dev Returns `true` if `account` has been granted `role`.
     */
    function hasRole(bytes32 role, address account) public view virtual override returns (bool) {
        return _roles[role].members[account];
    }

    /**
     * @dev Revert with a standard message if `_msgSender()` is missing `role`.
     * Overriding this function changes the behavior of the {onlyRole} modifier.
     *
     * Format of the revert message is described in {_checkRole}.
     *
     * _Available since v4.6._
     */
    function _checkRole(bytes32 role) internal view virtual {
        _checkRole(role, _msgSender());
    }

    /**
     * @dev Revert with a standard message if `account` is missing `role`.
     *
     * The format of the revert reason is given by the following regular expression:
     *
     *  /^AccessControl: account (0x[0-9a-f]{40}) is missing role (0x[0-9a-f]{64})$/
     */
    function _checkRole(bytes32 role, address account) internal view virtual {
        if (!hasRole(role, account)) {
            revert(
                string(
                    abi.encodePacked(
                        "AccessControl: account ",
                        Strings.toHexString(account),
                        " is missing role ",
                        Strings.toHexString(uint256(role), 32)
                    )
                )
            );
        }
    }

    /**
     * @dev Returns the admin role that controls `role`. See {grantRole} and
     * {revokeRole}.
     *
     * To change a role's admin, use {_setRoleAdmin}.
     */
    function getRoleAdmin(bytes32 role) public view virtual override returns (bytes32) {
        return _roles[role].adminRole;
    }

    /**
     * @dev Grants `role` to `account`.
     *
     * If `account` had not been already granted `role`, emits a {RoleGranted}
     * event.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     *
     * May emit a {RoleGranted} event.
     */
    function grantRole(bytes32 role, address account) public virtual override onlyRole(getRoleAdmin(role)) {
        _grantRole(role, account);
    }

    /**
     * @dev Revokes `role` from `account`.
     *
     * If `account` had been granted `role`, emits a {RoleRevoked} event.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     *
     * May emit a {RoleRevoked} event.
     */
    function revokeRole(bytes32 role, address account) public virtual override onlyRole(getRoleAdmin(role)) {
        _revokeRole(role, account);
    }

    /**
     * @dev Revokes `role` from the calling account.
     *
     * Roles are often managed via {grantRole} and {revokeRole}: this function's
     * purpose is to provide a mechanism for accounts to lose their privileges
     * if they are compromised (such as when a trusted device is misplaced).
     *
     * If the calling account had been revoked `role`, emits a {RoleRevoked}
     * event.
     *
     * Requirements:
     *
     * - the caller must be `account`.
     *
     * May emit a {RoleRevoked} event.
     */
    function renounceRole(bytes32 role, address account) public virtual override {
        require(account == _msgSender(), "AccessControl: can only renounce roles for self");

        _revokeRole(role, account);
    }

    /**
     * @dev Grants `role` to `account`.
     *
     * If `account` had not been already granted `role`, emits a {RoleGranted}
     * event. Note that unlike {grantRole}, this function doesn't perform any
     * checks on the calling account.
     *
     * May emit a {RoleGranted} event.
     *
     * [WARNING]
     * ====
     * This function should only be called from the constructor when setting
     * up the initial roles for the system.
     *
     * Using this function in any other way is effectively circumventing the admin
     * system imposed by {AccessControl}.
     * ====
     *
     * NOTE: This function is deprecated in favor of {_grantRole}.
     */
    function _setupRole(bytes32 role, address account) internal virtual {
        _grantRole(role, account);
    }

    /**
     * @dev Sets `adminRole` as ``role``'s admin role.
     *
     * Emits a {RoleAdminChanged} event.
     */
    function _setRoleAdmin(bytes32 role, bytes32 adminRole) internal virtual {
        bytes32 previousAdminRole = getRoleAdmin(role);
        _roles[role].adminRole = adminRole;
        emit RoleAdminChanged(role, previousAdminRole, adminRole);
    }

    /**
     * @dev Grants `role` to `account`.
     *
     * Internal function without access restriction.
     *
     * May emit a {RoleGranted} event.
     */
    function _grantRole(bytes32 role, address account) internal virtual {
        if (!hasRole(role, account)) {
            _roles[role].members[account] = true;
            emit RoleGranted(role, account, _msgSender());
        }
    }

    /**
     * @dev Revokes `role` from `account`.
     *
     * Internal function without access restriction.
     *
     * May emit a {RoleRevoked} event.
     */
    function _revokeRole(bytes32 role, address account) internal virtual {
        if (hasRole(role, account)) {
            _roles[role].members[account] = false;
            emit RoleRevoked(role, account, _msgSender());
        }
    }
}


// File @openzeppelin/contracts/access/Ownable.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.0) (access/Ownable.sol)

pragma solidity ^0.8.0;

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}


// File @openzeppelin/contracts/token/ERC1155/IERC1155.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.0) (token/ERC1155/IERC1155.sol)

pragma solidity ^0.8.0;

/**
 * @dev Required interface of an ERC1155 compliant contract, as defined in the
 * https://eips.ethereum.org/EIPS/eip-1155[EIP].
 *
 * _Available since v3.1._
 */
interface IERC1155 is IERC165 {
    /**
     * @dev Emitted when `value` tokens of token type `id` are transferred from `from` to `to` by `operator`.
     */
    event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value);

    /**
     * @dev Equivalent to multiple {TransferSingle} events, where `operator`, `from` and `to` are the same for all
     * transfers.
     */
    event TransferBatch(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256[] ids,
        uint256[] values
    );

    /**
     * @dev Emitted when `account` grants or revokes permission to `operator` to transfer their tokens, according to
     * `approved`.
     */
    event ApprovalForAll(address indexed account, address indexed operator, bool approved);

    /**
     * @dev Emitted when the URI for token type `id` changes to `value`, if it is a non-programmatic URI.
     *
     * If an {URI} event was emitted for `id`, the standard
     * https://eips.ethereum.org/EIPS/eip-1155#metadata-extensions[guarantees] that `value` will equal the value
     * returned by {IERC1155MetadataURI-uri}.
     */
    event URI(string value, uint256 indexed id);

    /**
     * @dev Returns the amount of tokens of token type `id` owned by `account`.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     */
    function balanceOf(address account, uint256 id) external view returns (uint256);

    /**
     * @dev xref:ROOT:erc1155.adoc#batch-operations[Batched] version of {balanceOf}.
     *
     * Requirements:
     *
     * - `accounts` and `ids` must have the same length.
     */
    function balanceOfBatch(
        address[] calldata accounts,
        uint256[] calldata ids
    ) external view returns (uint256[] memory);

    /**
     * @dev Grants or revokes permission to `operator` to transfer the caller's tokens, according to `approved`,
     *
     * Emits an {ApprovalForAll} event.
     *
     * Requirements:
     *
     * - `operator` cannot be the caller.
     */
    function setApprovalForAll(address operator, bool approved) external;

    /**
     * @dev Returns true if `operator` is approved to transfer ``account``'s tokens.
     *
     * See {setApprovalForAll}.
     */
    function isApprovedForAll(address account, address operator) external view returns (bool);

    /**
     * @dev Transfers `amount` tokens of token type `id` from `from` to `to`.
     *
     * Emits a {TransferSingle} event.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - If the caller is not `from`, it must have been approved to spend ``from``'s tokens via {setApprovalForAll}.
     * - `from` must have a balance of tokens of type `id` of at least `amount`.
     * - If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155Received} and return the
     * acceptance magic value.
     */
    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes calldata data) external;

    /**
     * @dev xref:ROOT:erc1155.adoc#batch-operations[Batched] version of {safeTransferFrom}.
     *
     * Emits a {TransferBatch} event.
     *
     * Requirements:
     *
     * - `ids` and `amounts` must have the same length.
     * - If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155BatchReceived} and return the
     * acceptance magic value.
     */
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts,
        bytes calldata data
    ) external;
}


// File @openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (token/ERC1155/extensions/IERC1155MetadataURI.sol)

pragma solidity ^0.8.0;

/**
 * @dev Interface of the optional ERC1155MetadataExtension interface, as defined
 * in the https://eips.ethereum.org/EIPS/eip-1155#metadata-extensions[EIP].
 *
 * _Available since v3.1._
 */
interface IERC1155MetadataURI is IERC1155 {
    /**
     * @dev Returns the URI for token type `id`.
     *
     * If the `\{id\}` substring is present in the URI, it must be replaced by
     * clients with the actual token type ID.
     */
    function uri(uint256 id) external view returns (string memory);
}


// File @openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.5.0) (token/ERC1155/IERC1155Receiver.sol)

pragma solidity ^0.8.0;

/**
 * @dev _Available since v3.1._
 */
interface IERC1155Receiver is IERC165 {
    /**
     * @dev Handles the receipt of a single ERC1155 token type. This function is
     * called at the end of a `safeTransferFrom` after the balance has been updated.
     *
     * NOTE: To accept the transfer, this must return
     * `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`
     * (i.e. 0xf23a6e61, or its own function selector).
     *
     * @param operator The address which initiated the transfer (i.e. msg.sender)
     * @param from The address which previously owned the token
     * @param id The ID of the token being transferred
     * @param value The amount of tokens being transferred
     * @param data Additional data with no specified format
     * @return `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))` if transfer is allowed
     */
    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external returns (bytes4);

    /**
     * @dev Handles the receipt of a multiple ERC1155 token types. This function
     * is called at the end of a `safeBatchTransferFrom` after the balances have
     * been updated.
     *
     * NOTE: To accept the transfer(s), this must return
     * `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))`
     * (i.e. 0xbc197c81, or its own function selector).
     *
     * @param operator The address which initiated the batch transfer (i.e. msg.sender)
     * @param from The address which previously owned the token
     * @param ids An array containing ids of each token being transferred (order and length must match values array)
     * @param values An array containing amounts of each token being transferred (order and length must match ids array)
     * @param data Additional data with no specified format
     * @return `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))` if transfer is allowed
     */
    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) external returns (bytes4);
}


// File @openzeppelin/contracts/utils/Address.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.0) (utils/Address.sol)

pragma solidity ^0.8.1;

/**
 * @dev Collection of functions related to the address type
 */
library Address {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * [IMPORTANT]
     * ====
     * It is unsafe to assume that an address for which this function returns
     * false is an externally-owned account (EOA) and not a contract.
     *
     * Among others, `isContract` will return false for the following
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed
     *
     * Furthermore, `isContract` will also return true if the target contract within
     * the same transaction is already scheduled for destruction by `SELFDESTRUCT`,
     * which only has an effect at the end of a transaction.
     * ====
     *
     * [IMPORTANT]
     * ====
     * You shouldn't rely on `isContract` to protect against flash loan attacks!
     *
     * Preventing calls from contracts is highly discouraged. It breaks composability, breaks support for smart wallets
     * like Gnosis Safe, and does not provide security since it can be circumvented by calling from a contract
     * constructor.
     * ====
     */
    function isContract(address account) internal view returns (bool) {
        // This method relies on extcodesize/address.code.length, which returns 0
        // for contracts in construction, since the code is only stored at the end
        // of the constructor execution.

        return account.code.length > 0;
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://consensys.net/diligence/blog/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.8.0/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain `call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason, it is bubbled up by this
     * function (like regular Solidity function calls).
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0, "Address: low-level call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
     * `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(address target, bytes memory data, uint256 value) internal returns (bytes memory) {
        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
    }

    /**
     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
     * with `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value,
        string memory errorMessage
    ) internal returns (bytes memory) {
        require(address(this).balance >= value, "Address: insufficient balance for call");
        (bool success, bytes memory returndata) = target.call{value: value}(data);
        return verifyCallResultFromTarget(target, success, returndata, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {
        return functionStaticCall(target, data, "Address: low-level static call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal view returns (bytes memory) {
        (bool success, bytes memory returndata) = target.staticcall(data);
        return verifyCallResultFromTarget(target, success, returndata, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a delegate call.
     *
     * _Available since v3.4._
     */
    function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionDelegateCall(target, data, "Address: low-level delegate call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a delegate call.
     *
     * _Available since v3.4._
     */
    function functionDelegateCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        (bool success, bytes memory returndata) = target.delegatecall(data);
        return verifyCallResultFromTarget(target, success, returndata, errorMessage);
    }

    /**
     * @dev Tool to verify that a low level call to smart-contract was successful, and revert (either by bubbling
     * the revert reason or using the provided one) in case of unsuccessful call or if target was not a contract.
     *
     * _Available since v4.8._
     */
    function verifyCallResultFromTarget(
        address target,
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) internal view returns (bytes memory) {
        if (success) {
            if (returndata.length == 0) {
                // only check isContract if the call was successful and the return data is empty
                // otherwise we already know that it was a contract
                require(isContract(target), "Address: call to non-contract");
            }
            return returndata;
        } else {
            _revert(returndata, errorMessage);
        }
    }

    /**
     * @dev Tool to verify that a low level call was successful, and revert if it wasn't, either by bubbling the
     * revert reason or using the provided one.
     *
     * _Available since v4.3._
     */
    function verifyCallResult(
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) internal pure returns (bytes memory) {
        if (success) {
            return returndata;
        } else {
            _revert(returndata, errorMessage);
        }
    }

    function _revert(bytes memory returndata, string memory errorMessage) private pure {
        // Look for revert reason and bubble it up if present
        if (returndata.length > 0) {
            // The easiest way to bubble the revert reason is using memory via assembly
            /// @solidity memory-safe-assembly
            assembly {
                let returndata_size := mload(returndata)
                revert(add(32, returndata), returndata_size)
            }
        } else {
            revert(errorMessage);
        }
    }
}


// File @openzeppelin/contracts/token/ERC1155/ERC1155.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.0) (token/ERC1155/ERC1155.sol)

pragma solidity ^0.8.0;






/**
 * @dev Implementation of the basic standard multi-token.
 * See https://eips.ethereum.org/EIPS/eip-1155
 * Originally based on code by Enjin: https://github.com/enjin/erc-1155
 *
 * _Available since v3.1._
 */
contract ERC1155 is Context, ERC165, IERC1155, IERC1155MetadataURI {
    using Address for address;

    // Mapping from token ID to account balances
    mapping(uint256 => mapping(address => uint256)) private _balances;

    // Mapping from account to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    // Used as the URI for all token types by relying on ID substitution, e.g. https://token-cdn-domain/{id}.json
    string private _uri;

    /**
     * @dev See {_setURI}.
     */
    constructor(string memory uri_) {
        _setURI(uri_);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
        return
            interfaceId == type(IERC1155).interfaceId ||
            interfaceId == type(IERC1155MetadataURI).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IERC1155MetadataURI-uri}.
     *
     * This implementation returns the same URI for *all* token types. It relies
     * on the token type ID substitution mechanism
     * https://eips.ethereum.org/EIPS/eip-1155#metadata[defined in the EIP].
     *
     * Clients calling this function must replace the `\{id\}` substring with the
     * actual token type ID.
     */
    function uri(uint256) public view virtual override returns (string memory) {
        return _uri;
    }

    /**
     * @dev See {IERC1155-balanceOf}.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     */
    function balanceOf(address account, uint256 id) public view virtual override returns (uint256) {
        require(account != address(0), "ERC1155: address zero is not a valid owner");
        return _balances[id][account];
    }

    /**
     * @dev See {IERC1155-balanceOfBatch}.
     *
     * Requirements:
     *
     * - `accounts` and `ids` must have the same length.
     */
    function balanceOfBatch(
        address[] memory accounts,
        uint256[] memory ids
    ) public view virtual override returns (uint256[] memory) {
        require(accounts.length == ids.length, "ERC1155: accounts and ids length mismatch");

        uint256[] memory batchBalances = new uint256[](accounts.length);

        for (uint256 i = 0; i < accounts.length; ++i) {
            batchBalances[i] = balanceOf(accounts[i], ids[i]);
        }

        return batchBalances;
    }

    /**
     * @dev See {IERC1155-setApprovalForAll}.
     */
    function setApprovalForAll(address operator, bool approved) public virtual override {
        _setApprovalForAll(_msgSender(), operator, approved);
    }

    /**
     * @dev See {IERC1155-isApprovedForAll}.
     */
    function isApprovedForAll(address account, address operator) public view virtual override returns (bool) {
        return _operatorApprovals[account][operator];
    }

    /**
     * @dev See {IERC1155-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: caller is not token owner or approved"
        );
        _safeTransferFrom(from, to, id, amount, data);
    }

    /**
     * @dev See {IERC1155-safeBatchTransferFrom}.
     */
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual override {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: caller is not token owner or approved"
        );
        _safeBatchTransferFrom(from, to, ids, amounts, data);
    }

    /**
     * @dev Transfers `amount` tokens of token type `id` from `from` to `to`.
     *
     * Emits a {TransferSingle} event.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `from` must have a balance of tokens of type `id` of at least `amount`.
     * - If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155Received} and return the
     * acceptance magic value.
     */
    function _safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) internal virtual {
        require(to != address(0), "ERC1155: transfer to the zero address");

        address operator = _msgSender();
        uint256[] memory ids = _asSingletonArray(id);
        uint256[] memory amounts = _asSingletonArray(amount);

        _beforeTokenTransfer(operator, from, to, ids, amounts, data);

        uint256 fromBalance = _balances[id][from];
        require(fromBalance >= amount, "ERC1155: insufficient balance for transfer");
        unchecked {
            _balances[id][from] = fromBalance - amount;
        }
        _balances[id][to] += amount;

        emit TransferSingle(operator, from, to, id, amount);

        _afterTokenTransfer(operator, from, to, ids, amounts, data);

        _doSafeTransferAcceptanceCheck(operator, from, to, id, amount, data);
    }

    /**
     * @dev xref:ROOT:erc1155.adoc#batch-operations[Batched] version of {_safeTransferFrom}.
     *
     * Emits a {TransferBatch} event.
     *
     * Requirements:
     *
     * - If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155BatchReceived} and return the
     * acceptance magic value.
     */
    function _safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual {
        require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");
        require(to != address(0), "ERC1155: transfer to the zero address");

        address operator = _msgSender();

        _beforeTokenTransfer(operator, from, to, ids, amounts, data);

        for (uint256 i = 0; i < ids.length; ++i) {
            uint256 id = ids[i];
            uint256 amount = amounts[i];

            uint256 fromBalance = _balances[id][from];
            require(fromBalance >= amount, "ERC1155: insufficient balance for transfer");
            unchecked {
                _balances[id][from] = fromBalance - amount;
            }
            _balances[id][to] += amount;
        }

        emit TransferBatch(operator, from, to, ids, amounts);

        _afterTokenTransfer(operator, from, to, ids, amounts, data);

        _doSafeBatchTransferAcceptanceCheck(operator, from, to, ids, amounts, data);
    }

    /**
     * @dev Sets a new URI for all token types, by relying on the token type ID
     * substitution mechanism
     * https://eips.ethereum.org/EIPS/eip-1155#metadata[defined in the EIP].
     *
     * By this mechanism, any occurrence of the `\{id\}` substring in either the
     * URI or any of the amounts in the JSON file at said URI will be replaced by
     * clients with the token type ID.
     *
     * For example, the `https://token-cdn-domain/\{id\}.json` URI would be
     * interpreted by clients as
     * `https://token-cdn-domain/000000000000000000000000000000000000000000000000000000000004cce0.json`
     * for token type ID 0x4cce0.
     *
     * See {uri}.
     *
     * Because these URIs cannot be meaningfully represented by the {URI} event,
     * this function emits no events.
     */
    function _setURI(string memory newuri) internal virtual {
        _uri = newuri;
    }

    /**
     * @dev Creates `amount` tokens of token type `id`, and assigns them to `to`.
     *
     * Emits a {TransferSingle} event.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155Received} and return the
     * acceptance magic value.
     */
    function _mint(address to, uint256 id, uint256 amount, bytes memory data) internal virtual {
        require(to != address(0), "ERC1155: mint to the zero address");

        address operator = _msgSender();
        uint256[] memory ids = _asSingletonArray(id);
        uint256[] memory amounts = _asSingletonArray(amount);

        _beforeTokenTransfer(operator, address(0), to, ids, amounts, data);

        _balances[id][to] += amount;
        emit TransferSingle(operator, address(0), to, id, amount);

        _afterTokenTransfer(operator, address(0), to, ids, amounts, data);

        _doSafeTransferAcceptanceCheck(operator, address(0), to, id, amount, data);
    }

    /**
     * @dev xref:ROOT:erc1155.adoc#batch-operations[Batched] version of {_mint}.
     *
     * Emits a {TransferBatch} event.
     *
     * Requirements:
     *
     * - `ids` and `amounts` must have the same length.
     * - If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155BatchReceived} and return the
     * acceptance magic value.
     */
    function _mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual {
        require(to != address(0), "ERC1155: mint to the zero address");
        require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");

        address operator = _msgSender();

        _beforeTokenTransfer(operator, address(0), to, ids, amounts, data);

        for (uint256 i = 0; i < ids.length; i++) {
            _balances[ids[i]][to] += amounts[i];
        }

        emit TransferBatch(operator, address(0), to, ids, amounts);

        _afterTokenTransfer(operator, address(0), to, ids, amounts, data);

        _doSafeBatchTransferAcceptanceCheck(operator, address(0), to, ids, amounts, data);
    }

    /**
     * @dev Destroys `amount` tokens of token type `id` from `from`
     *
     * Emits a {TransferSingle} event.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `from` must have at least `amount` tokens of token type `id`.
     */
    function _burn(address from, uint256 id, uint256 amount) internal virtual {
        require(from != address(0), "ERC1155: burn from the zero address");

        address operator = _msgSender();
        uint256[] memory ids = _asSingletonArray(id);
        uint256[] memory amounts = _asSingletonArray(amount);

        _beforeTokenTransfer(operator, from, address(0), ids, amounts, "");

        uint256 fromBalance = _balances[id][from];
        require(fromBalance >= amount, "ERC1155: burn amount exceeds balance");
        unchecked {
            _balances[id][from] = fromBalance - amount;
        }

        emit TransferSingle(operator, from, address(0), id, amount);

        _afterTokenTransfer(operator, from, address(0), ids, amounts, "");
    }

    /**
     * @dev xref:ROOT:erc1155.adoc#batch-operations[Batched] version of {_burn}.
     *
     * Emits a {TransferBatch} event.
     *
     * Requirements:
     *
     * - `ids` and `amounts` must have the same length.
     */
    function _burnBatch(address from, uint256[] memory ids, uint256[] memory amounts) internal virtual {
        require(from != address(0), "ERC1155: burn from the zero address");
        require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");

        address operator = _msgSender();

        _beforeTokenTransfer(operator, from, address(0), ids, amounts, "");

        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 amount = amounts[i];

            uint256 fromBalance = _balances[id][from];
            require(fromBalance >= amount, "ERC1155: burn amount exceeds balance");
            unchecked {
                _balances[id][from] = fromBalance - amount;
            }
        }

        emit TransferBatch(operator, from, address(0), ids, amounts);

        _afterTokenTransfer(operator, from, address(0), ids, amounts, "");
    }

    /**
     * @dev Approve `operator` to operate on all of `owner` tokens
     *
     * Emits an {ApprovalForAll} event.
     */
    function _setApprovalForAll(address owner, address operator, bool approved) internal virtual {
        require(owner != operator, "ERC1155: setting approval status for self");
        _operatorApprovals[owner][operator] = approved;
        emit ApprovalForAll(owner, operator, approved);
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning, as well as batched variants.
     *
     * The same hook is called on both single and batched variants. For single
     * transfers, the length of the `ids` and `amounts` arrays will be 1.
     *
     * Calling conditions (for each `id` and `amount` pair):
     *
     * - When `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * of token type `id` will be  transferred to `to`.
     * - When `from` is zero, `amount` tokens of token type `id` will be minted
     * for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens of token type `id`
     * will be burned.
     * - `from` and `to` are never both zero.
     * - `ids` and `amounts` have the same, non-zero length.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual {}

    /**
     * @dev Hook that is called after any token transfer. This includes minting
     * and burning, as well as batched variants.
     *
     * The same hook is called on both single and batched variants. For single
     * transfers, the length of the `id` and `amount` arrays will be 1.
     *
     * Calling conditions (for each `id` and `amount` pair):
     *
     * - When `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * of token type `id` will be  transferred to `to`.
     * - When `from` is zero, `amount` tokens of token type `id` will be minted
     * for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens of token type `id`
     * will be burned.
     * - `from` and `to` are never both zero.
     * - `ids` and `amounts` have the same, non-zero length.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _afterTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual {}

    function _doSafeTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) private {
        if (to.isContract()) {
            try IERC1155Receiver(to).onERC1155Received(operator, from, id, amount, data) returns (bytes4 response) {
                if (response != IERC1155Receiver.onERC1155Received.selector) {
                    revert("ERC1155: ERC1155Receiver rejected tokens");
                }
            } catch Error(string memory reason) {
                revert(reason);
            } catch {
                revert("ERC1155: transfer to non-ERC1155Receiver implementer");
            }
        }
    }

    function _doSafeBatchTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) private {
        if (to.isContract()) {
            try IERC1155Receiver(to).onERC1155BatchReceived(operator, from, ids, amounts, data) returns (
                bytes4 response
            ) {
                if (response != IERC1155Receiver.onERC1155BatchReceived.selector) {
                    revert("ERC1155: ERC1155Receiver rejected tokens");
                }
            } catch Error(string memory reason) {
                revert(reason);
            } catch {
                revert("ERC1155: transfer to non-ERC1155Receiver implementer");
            }
        }
    }

    function _asSingletonArray(uint256 element) private pure returns (uint256[] memory) {
        uint256[] memory array = new uint256[](1);
        array[0] = element;

        return array;
    }
}


// File contracts/BondERC1155Token.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.0;
contract BondERC1155Token is ERC1155, Ownable {
    constructor(string memory uri) ERC1155(uri) {}

    function mint(address account, uint256 id, uint256 amount, bytes memory data) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function burn(address account, uint256 id, uint256 amount) public onlyOwner {
        _burn(account, id, amount);
    }
}


// File @openzeppelin/contracts/security/ReentrancyGuard.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.0) (security/ReentrancyGuard.sol)

pragma solidity ^0.8.0;

/**
 * @dev Contract module that helps prevent reentrant calls to a function.
 *
 * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
 * available, which can be applied to functions to make sure there are no nested
 * (reentrant) calls to them.
 *
 * Note that because there is a single `nonReentrant` guard, functions marked as
 * `nonReentrant` may not call one another. This can be worked around by making
 * those functions `private`, and then adding `external` `nonReentrant` entry
 * points to them.
 *
 * TIP: If you would like to learn more about reentrancy and alternative ways
 * to protect against it, check out our blog post
 * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
 */
abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    uint256 private _status;

    constructor() {
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and making it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        _nonReentrantBefore();
        _;
        _nonReentrantAfter();
    }

    function _nonReentrantBefore() private {
        // On the first call to nonReentrant, _status will be _NOT_ENTERED
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");

        // Any calls to nonReentrant after this point will fail
        _status = _ENTERED;
    }

    function _nonReentrantAfter() private {
        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Returns true if the reentrancy guard is currently set to "entered", which indicates there is a
     * `nonReentrant` function in the call stack.
     */
    function _reentrancyGuardEntered() internal view returns (bool) {
        return _status == _ENTERED;
    }
}


// File @openzeppelin/contracts/token/ERC20/IERC20.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.0) (token/ERC20/IERC20.sol)

pragma solidity ^0.8.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `from` to `to` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}


// File contracts/hedera/system/HederaResponseCodes.sol

// Original license: SPDX_License_Identifier: Apache-2.0
pragma solidity >=0.4.9 <0.9.0;

library HederaResponseCodes {
    // response codes
    int32 internal constant OK = 0; // The transaction passed the precheck validations.
    int32 internal constant INVALID_TRANSACTION = 1; // For any error not handled by specific error codes listed below.
    int32 internal constant PAYER_ACCOUNT_NOT_FOUND = 2; //Payer account does not exist.
    int32 internal constant INVALID_NODE_ACCOUNT = 3; //Node Account provided does not match the node account of the node the transaction was submitted to.
    int32 internal constant TRANSACTION_EXPIRED = 4; // Pre-Check error when TransactionValidStart + transactionValidDuration is less than current consensus time.
    int32 internal constant INVALID_TRANSACTION_START = 5; // Transaction start time is greater than current consensus time
    int32 internal constant INVALID_TRANSACTION_DURATION = 6; //valid transaction duration is a positive non zero number that does not exceed 120 seconds
    int32 internal constant INVALID_SIGNATURE = 7; // The transaction signature is not valid
    int32 internal constant MEMO_TOO_LONG = 8; //Transaction memo size exceeded 100 bytes
    int32 internal constant INSUFFICIENT_TX_FEE = 9; // The fee provided in the transaction is insufficient for this type of transaction
    int32 internal constant INSUFFICIENT_PAYER_BALANCE = 10; // The payer account has insufficient cryptocurrency to pay the transaction fee
    int32 internal constant DUPLICATE_TRANSACTION = 11; // This transaction ID is a duplicate of one that was submitted to this node or reached consensus in the last 180 seconds (receipt period)
    int32 internal constant BUSY = 12; //If API is throttled out
    int32 internal constant NOT_SUPPORTED = 13; //The API is not currently supported

    int32 internal constant INVALID_FILE_ID = 14; //The file id is invalid or does not exist
    int32 internal constant INVALID_ACCOUNT_ID = 15; //The account id is invalid or does not exist
    int32 internal constant INVALID_CONTRACT_ID = 16; //The contract id is invalid or does not exist
    int32 internal constant INVALID_TRANSACTION_ID = 17; //Transaction id is not valid
    int32 internal constant RECEIPT_NOT_FOUND = 18; //Receipt for given transaction id does not exist
    int32 internal constant RECORD_NOT_FOUND = 19; //Record for given transaction id does not exist
    int32 internal constant INVALID_SOLIDITY_ID = 20; //The solidity id is invalid or entity with this solidity id does not exist

    int32 internal constant UNKNOWN = 21; // The responding node has submitted the transaction to the network. Its final status is still unknown.
    int32 internal constant SUCCESS = 22; // The transaction succeeded
    int32 internal constant FAIL_INVALID = 23; // There was a system error and the transaction failed because of invalid request parameters.
    int32 internal constant FAIL_FEE = 24; // There was a system error while performing fee calculation, reserved for future.
    int32 internal constant FAIL_BALANCE = 25; // There was a system error while performing balance checks, reserved for future.

    int32 internal constant KEY_REQUIRED = 26; //Key not provided in the transaction body
    int32 internal constant BAD_ENCODING = 27; //Unsupported algorithm/encoding used for keys in the transaction
    int32 internal constant INSUFFICIENT_ACCOUNT_BALANCE = 28; //When the account balance is not sufficient for the transfer
    int32 internal constant INVALID_SOLIDITY_ADDRESS = 29; //During an update transaction when the system is not able to find the Users Solidity address

    int32 internal constant INSUFFICIENT_GAS = 30; //Not enough gas was supplied to execute transaction
    int32 internal constant CONTRACT_SIZE_LIMIT_EXCEEDED = 31; //contract byte code size is over the limit
    int32 internal constant LOCAL_CALL_MODIFICATION_EXCEPTION = 32; //local execution (query) is requested for a function which changes state
    int32 internal constant CONTRACT_REVERT_EXECUTED = 33; //Contract REVERT OPCODE executed
    int32 internal constant CONTRACT_EXECUTION_EXCEPTION = 34; //For any contract execution related error not handled by specific error codes listed above.
    int32 internal constant INVALID_RECEIVING_NODE_ACCOUNT = 35; //In Query validation, account with +ve(amount) value should be Receiving node account, the receiver account should be only one account in the list
    int32 internal constant MISSING_QUERY_HEADER = 36; // Header is missing in Query request

    int32 internal constant ACCOUNT_UPDATE_FAILED = 37; // The update of the account failed
    int32 internal constant INVALID_KEY_ENCODING = 38; // Provided key encoding was not supported by the system
    int32 internal constant NULL_SOLIDITY_ADDRESS = 39; // null solidity address

    int32 internal constant CONTRACT_UPDATE_FAILED = 40; // update of the contract failed
    int32 internal constant INVALID_QUERY_HEADER = 41; // the query header is invalid

    int32 internal constant INVALID_FEE_SUBMITTED = 42; // Invalid fee submitted
    int32 internal constant INVALID_PAYER_SIGNATURE = 43; // Payer signature is invalid

    int32 internal constant KEY_NOT_PROVIDED = 44; // The keys were not provided in the request.
    int32 internal constant INVALID_EXPIRATION_TIME = 45; // Expiration time provided in the transaction was invalid.
    int32 internal constant NO_WACL_KEY = 46; //WriteAccess Control Keys are not provided for the file
    int32 internal constant FILE_CONTENT_EMPTY = 47; //The contents of file are provided as empty.
    int32 internal constant INVALID_ACCOUNT_AMOUNTS = 48; // The crypto transfer credit and debit do not sum equal to 0
    int32 internal constant EMPTY_TRANSACTION_BODY = 49; // Transaction body provided is empty
    int32 internal constant INVALID_TRANSACTION_BODY = 50; // Invalid transaction body provided

    int32 internal constant INVALID_SIGNATURE_TYPE_MISMATCHING_KEY = 51; // the type of key (base ed25519 key, KeyList, or ThresholdKey) does not match the type of signature (base ed25519 signature, SignatureList, or ThresholdKeySignature)
    int32 internal constant INVALID_SIGNATURE_COUNT_MISMATCHING_KEY = 52; // the number of key (KeyList, or ThresholdKey) does not match that of signature (SignatureList, or ThresholdKeySignature). e.g. if a keyList has 3 base keys, then the corresponding signatureList should also have 3 base signatures.

    int32 internal constant EMPTY_LIVE_HASH_BODY = 53; // the livehash body is empty
    int32 internal constant EMPTY_LIVE_HASH = 54; // the livehash data is missing
    int32 internal constant EMPTY_LIVE_HASH_KEYS = 55; // the keys for a livehash are missing
    int32 internal constant INVALID_LIVE_HASH_SIZE = 56; // the livehash data is not the output of a SHA-384 digest

    int32 internal constant EMPTY_QUERY_BODY = 57; // the query body is empty
    int32 internal constant EMPTY_LIVE_HASH_QUERY = 58; // the crypto livehash query is empty
    int32 internal constant LIVE_HASH_NOT_FOUND = 59; // the livehash is not present
    int32 internal constant ACCOUNT_ID_DOES_NOT_EXIST = 60; // the account id passed has not yet been created.
    int32 internal constant LIVE_HASH_ALREADY_EXISTS = 61; // the livehash already exists for a given account

    int32 internal constant INVALID_FILE_WACL = 62; // File WACL keys are invalid
    int32 internal constant SERIALIZATION_FAILED = 63; // Serialization failure
    int32 internal constant TRANSACTION_OVERSIZE = 64; // The size of the Transaction is greater than transactionMaxBytes
    int32 internal constant TRANSACTION_TOO_MANY_LAYERS = 65; // The Transaction has more than 50 levels
    int32 internal constant CONTRACT_DELETED = 66; //Contract is marked as deleted

    int32 internal constant PLATFORM_NOT_ACTIVE = 67; // the platform node is either disconnected or lagging behind.
    int32 internal constant KEY_PREFIX_MISMATCH = 68; // one internal key matches more than one prefixes on the signature map
    int32 internal constant PLATFORM_TRANSACTION_NOT_CREATED = 69; // transaction not created by platform due to large backlog
    int32 internal constant INVALID_RENEWAL_PERIOD = 70; // auto renewal period is not a positive number of seconds
    int32 internal constant INVALID_PAYER_ACCOUNT_ID = 71; // the response code when a smart contract id is passed for a crypto API request
    int32 internal constant ACCOUNT_DELETED = 72; // the account has been marked as deleted
    int32 internal constant FILE_DELETED = 73; // the file has been marked as deleted
    int32 internal constant ACCOUNT_REPEATED_IN_ACCOUNT_AMOUNTS = 74; // same accounts repeated in the transfer account list
    int32 internal constant SETTING_NEGATIVE_ACCOUNT_BALANCE = 75; // attempting to set negative balance value for crypto account
    int32 internal constant OBTAINER_REQUIRED = 76; // when deleting smart contract that has crypto balance either transfer account or transfer smart contract is required
    int32 internal constant OBTAINER_SAME_CONTRACT_ID = 77; //when deleting smart contract that has crypto balance you can not use the same contract id as transferContractId as the one being deleted
    int32 internal constant OBTAINER_DOES_NOT_EXIST = 78; //transferAccountId or transferContractId specified for contract delete does not exist
    int32 internal constant MODIFYING_IMMUTABLE_CONTRACT = 79; //attempting to modify (update or delete a immutable smart contract, i.e. one created without a admin key)
    int32 internal constant FILE_SYSTEM_EXCEPTION = 80; //Unexpected exception thrown by file system functions
    int32 internal constant AUTORENEW_DURATION_NOT_IN_RANGE = 81; // the duration is not a subset of [MINIMUM_AUTORENEW_DURATION,MAXIMUM_AUTORENEW_DURATION]
    int32 internal constant ERROR_DECODING_BYTESTRING = 82; // Decoding the smart contract binary to a byte array failed. Check that the input is a valid hex string.
    int32 internal constant CONTRACT_FILE_EMPTY = 83; // File to create a smart contract was of length zero
    int32 internal constant CONTRACT_BYTECODE_EMPTY = 84; // Bytecode for smart contract is of length zero
    int32 internal constant INVALID_INITIAL_BALANCE = 85; // Attempt to set negative initial balance
    int32 internal constant INVALID_RECEIVE_RECORD_THRESHOLD = 86; // [Deprecated]. attempt to set negative receive record threshold
    int32 internal constant INVALID_SEND_RECORD_THRESHOLD = 87; // [Deprecated]. attempt to set negative send record threshold
    int32 internal constant ACCOUNT_IS_NOT_GENESIS_ACCOUNT = 88; // Special Account Operations should be performed by only Genesis account, return this code if it is not Genesis Account
    int32 internal constant PAYER_ACCOUNT_UNAUTHORIZED = 89; // The fee payer account doesn't have permission to submit such Transaction
    int32 internal constant INVALID_FREEZE_TRANSACTION_BODY = 90; // FreezeTransactionBody is invalid
    int32 internal constant FREEZE_TRANSACTION_BODY_NOT_FOUND = 91; // FreezeTransactionBody does not exist
    int32 internal constant TRANSFER_LIST_SIZE_LIMIT_EXCEEDED = 92; //Exceeded the number of accounts (both from and to) allowed for crypto transfer list
    int32 internal constant RESULT_SIZE_LIMIT_EXCEEDED = 93; // Smart contract result size greater than specified maxResultSize
    int32 internal constant NOT_SPECIAL_ACCOUNT = 94; //The payer account is not a special account(account 0.0.55)
    int32 internal constant CONTRACT_NEGATIVE_GAS = 95; // Negative gas was offered in smart contract call
    int32 internal constant CONTRACT_NEGATIVE_VALUE = 96; // Negative value / initial balance was specified in a smart contract call / create
    int32 internal constant INVALID_FEE_FILE = 97; // Failed to update fee file
    int32 internal constant INVALID_EXCHANGE_RATE_FILE = 98; // Failed to update exchange rate file
    int32 internal constant INSUFFICIENT_LOCAL_CALL_GAS = 99; // Payment tendered for contract local call cannot cover both the fee and the gas
    int32 internal constant ENTITY_NOT_ALLOWED_TO_DELETE = 100; // Entities with Entity ID below 1000 are not allowed to be deleted
    int32 internal constant AUTHORIZATION_FAILED = 101; // Violating one of these rules: 1) treasury account can update all entities below 0.0.1000, 2) account 0.0.50 can update all entities from 0.0.51 - 0.0.80, 3) Network Function Master Account A/c 0.0.50 - Update all Network Function accounts & perform all the Network Functions listed below, 4) Network Function Accounts: i) A/c 0.0.55 - Update Address Book files (0.0.101/102), ii) A/c 0.0.56 - Update Fee schedule (0.0.111), iii) A/c 0.0.57 - Update Exchange Rate (0.0.112).
    int32 internal constant FILE_UPLOADED_PROTO_INVALID = 102; // Fee Schedule Proto uploaded but not valid (append or update is required)
    int32 internal constant FILE_UPLOADED_PROTO_NOT_SAVED_TO_DISK = 103; // Fee Schedule Proto uploaded but not valid (append or update is required)
    int32 internal constant FEE_SCHEDULE_FILE_PART_UPLOADED = 104; // Fee Schedule Proto File Part uploaded
    int32 internal constant EXCHANGE_RATE_CHANGE_LIMIT_EXCEEDED = 105; // The change on Exchange Rate exceeds Exchange_Rate_Allowed_Percentage
    int32 internal constant MAX_CONTRACT_STORAGE_EXCEEDED = 106; // Contract permanent storage exceeded the currently allowable limit
    int32 internal constant TRANSFER_ACCOUNT_SAME_AS_DELETE_ACCOUNT = 107; // Transfer Account should not be same as Account to be deleted
    int32 internal constant TOTAL_LEDGER_BALANCE_INVALID = 108;
    int32 internal constant EXPIRATION_REDUCTION_NOT_ALLOWED = 110; // The expiration date/time on a smart contract may not be reduced
    int32 internal constant MAX_GAS_LIMIT_EXCEEDED = 111; //Gas exceeded currently allowable gas limit per transaction
    int32 internal constant MAX_FILE_SIZE_EXCEEDED = 112; // File size exceeded the currently allowable limit

    int32 internal constant INVALID_TOPIC_ID = 150; // The Topic ID specified is not in the system.
    int32 internal constant INVALID_ADMIN_KEY = 155; // A provided admin key was invalid.
    int32 internal constant INVALID_SUBMIT_KEY = 156; // A provided submit key was invalid.
    int32 internal constant UNAUTHORIZED = 157; // An attempted operation was not authorized (ie - a deleteTopic for a topic with no adminKey).
    int32 internal constant INVALID_TOPIC_MESSAGE = 158; // A ConsensusService message is empty.
    int32 internal constant INVALID_AUTORENEW_ACCOUNT = 159; // The autoRenewAccount specified is not a valid, active account.
    int32 internal constant AUTORENEW_ACCOUNT_NOT_ALLOWED = 160; // An adminKey was not specified on the topic, so there must not be an autoRenewAccount.
    // The topic has expired, was not automatically renewed, and is in a 7 day grace period before the topic will be
    // deleted unrecoverably. This error response code will not be returned until autoRenew functionality is supported
    // by HAPI.
    int32 internal constant TOPIC_EXPIRED = 162;
    int32 internal constant INVALID_CHUNK_NUMBER = 163; // chunk number must be from 1 to total (chunks) inclusive.
    int32 internal constant INVALID_CHUNK_TRANSACTION_ID = 164; // For every chunk, the payer account that is part of initialTransactionID must match the Payer Account of this transaction. The entire initialTransactionID should match the transactionID of the first chunk, but this is not checked or enforced by Hedera except when the chunk number is 1.
    int32 internal constant ACCOUNT_FROZEN_FOR_TOKEN = 165; // Account is frozen and cannot transact with the token
    int32 internal constant TOKENS_PER_ACCOUNT_LIMIT_EXCEEDED = 166; // An involved account already has more than <tt>tokens.maxPerAccount</tt> associations with non-deleted tokens.
    int32 internal constant INVALID_TOKEN_ID = 167; // The token is invalid or does not exist
    int32 internal constant INVALID_TOKEN_DECIMALS = 168; // Invalid token decimals
    int32 internal constant INVALID_TOKEN_INITIAL_SUPPLY = 169; // Invalid token initial supply
    int32 internal constant INVALID_TREASURY_ACCOUNT_FOR_TOKEN = 170; // Treasury Account does not exist or is deleted
    int32 internal constant INVALID_TOKEN_SYMBOL = 171; // Token Symbol is not UTF-8 capitalized alphabetical string
    int32 internal constant TOKEN_HAS_NO_FREEZE_KEY = 172; // Freeze key is not set on token
    int32 internal constant TRANSFERS_NOT_ZERO_SUM_FOR_TOKEN = 173; // Amounts in transfer list are not net zero
    int32 internal constant MISSING_TOKEN_SYMBOL = 174; // A token symbol was not provided
    int32 internal constant TOKEN_SYMBOL_TOO_LONG = 175; // The provided token symbol was too long
    int32 internal constant ACCOUNT_KYC_NOT_GRANTED_FOR_TOKEN = 176; // KYC must be granted and account does not have KYC granted
    int32 internal constant TOKEN_HAS_NO_KYC_KEY = 177; // KYC key is not set on token
    int32 internal constant INSUFFICIENT_TOKEN_BALANCE = 178; // Token balance is not sufficient for the transaction
    int32 internal constant TOKEN_WAS_DELETED = 179; // Token transactions cannot be executed on deleted token
    int32 internal constant TOKEN_HAS_NO_SUPPLY_KEY = 180; // Supply key is not set on token
    int32 internal constant TOKEN_HAS_NO_WIPE_KEY = 181; // Wipe key is not set on token
    int32 internal constant INVALID_TOKEN_MINT_AMOUNT = 182; // The requested token mint amount would cause an invalid total supply
    int32 internal constant INVALID_TOKEN_BURN_AMOUNT = 183; // The requested token burn amount would cause an invalid total supply
    int32 internal constant TOKEN_NOT_ASSOCIATED_TO_ACCOUNT = 184; // A required token-account relationship is missing
    int32 internal constant CANNOT_WIPE_TOKEN_TREASURY_ACCOUNT = 185; // The target of a wipe operation was the token treasury account
    int32 internal constant INVALID_KYC_KEY = 186; // The provided KYC key was invalid.
    int32 internal constant INVALID_WIPE_KEY = 187; // The provided wipe key was invalid.
    int32 internal constant INVALID_FREEZE_KEY = 188; // The provided freeze key was invalid.
    int32 internal constant INVALID_SUPPLY_KEY = 189; // The provided supply key was invalid.
    int32 internal constant MISSING_TOKEN_NAME = 190; // Token Name is not provided
    int32 internal constant TOKEN_NAME_TOO_LONG = 191; // Token Name is too long
    int32 internal constant INVALID_WIPING_AMOUNT = 192; // The provided wipe amount must not be negative, zero or bigger than the token holder balance
    int32 internal constant TOKEN_IS_IMMUTABLE = 193; // Token does not have Admin key set, thus update/delete transactions cannot be performed
    int32 internal constant TOKEN_ALREADY_ASSOCIATED_TO_ACCOUNT = 194; // An <tt>associateToken</tt> operation specified a token already associated to the account
    int32 internal constant TRANSACTION_REQUIRES_ZERO_TOKEN_BALANCES = 195; // An attempted operation is invalid until all token balances for the target account are zero
    int32 internal constant ACCOUNT_IS_TREASURY = 196; // An attempted operation is invalid because the account is a treasury
    int32 internal constant TOKEN_ID_REPEATED_IN_TOKEN_LIST = 197; // Same TokenIDs present in the token list
    int32 internal constant TOKEN_TRANSFER_LIST_SIZE_LIMIT_EXCEEDED = 198; // Exceeded the number of token transfers (both from and to) allowed for token transfer list
    int32 internal constant EMPTY_TOKEN_TRANSFER_BODY = 199; // TokenTransfersTransactionBody has no TokenTransferList
    int32 internal constant EMPTY_TOKEN_TRANSFER_ACCOUNT_AMOUNTS = 200; // TokenTransfersTransactionBody has a TokenTransferList with no AccountAmounts
    int32 internal constant INVALID_SCHEDULE_ID = 201; // The Scheduled entity does not exist; or has now expired, been deleted, or been executed
    int32 internal constant SCHEDULE_IS_IMMUTABLE = 202; // The Scheduled entity cannot be modified. Admin key not set
    int32 internal constant INVALID_SCHEDULE_PAYER_ID = 203; // The provided Scheduled Payer does not exist
    int32 internal constant INVALID_SCHEDULE_ACCOUNT_ID = 204; // The Schedule Create Transaction TransactionID account does not exist
    int32 internal constant NO_NEW_VALID_SIGNATURES = 205; // The provided sig map did not contain any new valid signatures from required signers of the scheduled transaction
    int32 internal constant UNRESOLVABLE_REQUIRED_SIGNERS = 206; // The required signers for a scheduled transaction cannot be resolved, for example because they do not exist or have been deleted
    int32 internal constant SCHEDULED_TRANSACTION_NOT_IN_WHITELIST = 207; // Only whitelisted transaction types may be scheduled
    int32 internal constant SOME_SIGNATURES_WERE_INVALID = 208; // At least one of the signatures in the provided sig map did not represent a valid signature for any required signer
    int32 internal constant TRANSACTION_ID_FIELD_NOT_ALLOWED = 209; // The scheduled field in the TransactionID may not be set to true
    int32 internal constant IDENTICAL_SCHEDULE_ALREADY_CREATED = 210; // A schedule already exists with the same identifying fields of an attempted ScheduleCreate (that is, all fields other than scheduledPayerAccountID)
    int32 internal constant INVALID_ZERO_BYTE_IN_STRING = 211; // A string field in the transaction has a UTF-8 encoding with the prohibited zero byte
    int32 internal constant SCHEDULE_ALREADY_DELETED = 212; // A schedule being signed or deleted has already been deleted
    int32 internal constant SCHEDULE_ALREADY_EXECUTED = 213; // A schedule being signed or deleted has already been executed
    int32 internal constant MESSAGE_SIZE_TOO_LARGE = 214; // ConsensusSubmitMessage request's message size is larger than allowed.
    int32 internal constant OPERATION_REPEATED_IN_BUCKET_GROUPS = 215; // An operation was assigned to more than one throttle group in a given bucket
    int32 internal constant BUCKET_CAPACITY_OVERFLOW = 216; // The capacity needed to satisfy all opsPerSec groups in a bucket overflowed a signed 8-byte integral type
    int32 internal constant NODE_CAPACITY_NOT_SUFFICIENT_FOR_OPERATION = 217; // Given the network size in the address book, the node-level capacity for an operation would never be enough to accept a single request; usually means a bucket burstPeriod should be increased
    int32 internal constant BUCKET_HAS_NO_THROTTLE_GROUPS = 218; // A bucket was defined without any throttle groups
    int32 internal constant THROTTLE_GROUP_HAS_ZERO_OPS_PER_SEC = 219; // A throttle group was granted zero opsPerSec
    int32 internal constant SUCCESS_BUT_MISSING_EXPECTED_OPERATION = 220; // The throttle definitions file was updated, but some supported operations were not assigned a bucket
    int32 internal constant UNPARSEABLE_THROTTLE_DEFINITIONS = 221; // The new contents for the throttle definitions system file were not valid protobuf
    int32 internal constant INVALID_THROTTLE_DEFINITIONS = 222; // The new throttle definitions system file were invalid, and no more specific error could be divined
    int32 internal constant ACCOUNT_EXPIRED_AND_PENDING_REMOVAL = 223; // The transaction references an account which has passed its expiration without renewal funds available, and currently remains in the ledger only because of the grace period given to expired entities
    int32 internal constant INVALID_TOKEN_MAX_SUPPLY = 224; // Invalid token max supply
    int32 internal constant INVALID_TOKEN_NFT_SERIAL_NUMBER = 225; // Invalid token nft serial number
    int32 internal constant INVALID_NFT_ID = 226; // Invalid nft id
    int32 internal constant METADATA_TOO_LONG = 227; // Nft metadata is too long
    int32 internal constant BATCH_SIZE_LIMIT_EXCEEDED = 228; // Repeated operations count exceeds the limit
    int32 internal constant INVALID_QUERY_RANGE = 229; // The range of data to be gathered is out of the set boundaries
    int32 internal constant FRACTION_DIVIDES_BY_ZERO = 230; // A custom fractional fee set a denominator of zero
    int32 internal constant INSUFFICIENT_PAYER_BALANCE_FOR_CUSTOM_FEE = 231; // The transaction payer could not afford a custom fee
    int32 internal constant CUSTOM_FEES_LIST_TOO_LONG = 232; // More than 10 custom fees were specified
    int32 internal constant INVALID_CUSTOM_FEE_COLLECTOR = 233; // Any of the feeCollector accounts for customFees is invalid
    int32 internal constant INVALID_TOKEN_ID_IN_CUSTOM_FEES = 234; // Any of the token Ids in customFees is invalid
    int32 internal constant TOKEN_NOT_ASSOCIATED_TO_FEE_COLLECTOR = 235; // Any of the token Ids in customFees are not associated to feeCollector
    int32 internal constant TOKEN_MAX_SUPPLY_REACHED = 236; // A token cannot have more units minted due to its configured supply ceiling
    int32 internal constant SENDER_DOES_NOT_OWN_NFT_SERIAL_NO = 237; // The transaction attempted to move an NFT serial number from an account other than its owner
    int32 internal constant CUSTOM_FEE_NOT_FULLY_SPECIFIED = 238; // A custom fee schedule entry did not specify either a fixed or fractional fee
    int32 internal constant CUSTOM_FEE_MUST_BE_POSITIVE = 239; // Only positive fees may be assessed at this time
    int32 internal constant TOKEN_HAS_NO_FEE_SCHEDULE_KEY = 240; // Fee schedule key is not set on token
    int32 internal constant CUSTOM_FEE_OUTSIDE_NUMERIC_RANGE = 241; // A fractional custom fee exceeded the range of a 64-bit signed integer
    int32 internal constant ROYALTY_FRACTION_CANNOT_EXCEED_ONE = 242; // A royalty cannot exceed the total fungible value exchanged for an NFT
    int32 internal constant FRACTIONAL_FEE_MAX_AMOUNT_LESS_THAN_MIN_AMOUNT = 243; // Each fractional custom fee must have its maximum_amount, if specified, at least its minimum_amount
    int32 internal constant CUSTOM_SCHEDULE_ALREADY_HAS_NO_FEES = 244; // A fee schedule update tried to clear the custom fees from a token whose fee schedule was already empty
    int32 internal constant CUSTOM_FEE_DENOMINATION_MUST_BE_FUNGIBLE_COMMON = 245; // Only tokens of type FUNGIBLE_COMMON can be used to as fee schedule denominations
    int32 internal constant CUSTOM_FRACTIONAL_FEE_ONLY_ALLOWED_FOR_FUNGIBLE_COMMON = 246; // Only tokens of type FUNGIBLE_COMMON can have fractional fees
    int32 internal constant INVALID_CUSTOM_FEE_SCHEDULE_KEY = 247; // The provided custom fee schedule key was invalid
    int32 internal constant INVALID_TOKEN_MINT_METADATA = 248; // The requested token mint metadata was invalid
    int32 internal constant INVALID_TOKEN_BURN_METADATA = 249; // The requested token burn metadata was invalid
    int32 internal constant CURRENT_TREASURY_STILL_OWNS_NFTS = 250; // The treasury for a unique token cannot be changed until it owns no NFTs
    int32 internal constant ACCOUNT_STILL_OWNS_NFTS = 251; // An account cannot be dissociated from a unique token if it owns NFTs for the token
    int32 internal constant TREASURY_MUST_OWN_BURNED_NFT = 252; // A NFT can only be burned when owned by the unique token's treasury
    int32 internal constant ACCOUNT_DOES_NOT_OWN_WIPED_NFT = 253; // An account did not own the NFT to be wiped
    int32 internal constant ACCOUNT_AMOUNT_TRANSFERS_ONLY_ALLOWED_FOR_FUNGIBLE_COMMON = 254; // An AccountAmount token transfers list referenced a token type other than FUNGIBLE_COMMON
    int32 internal constant MAX_NFTS_IN_PRICE_REGIME_HAVE_BEEN_MINTED = 255; // All the NFTs allowed in the current price regime have already been minted
    int32 internal constant PAYER_ACCOUNT_DELETED = 256; // The payer account has been marked as deleted
    int32 internal constant CUSTOM_FEE_CHARGING_EXCEEDED_MAX_RECURSION_DEPTH = 257; // The reference chain of custom fees for a transferred token exceeded the maximum length of 2
    int32 internal constant CUSTOM_FEE_CHARGING_EXCEEDED_MAX_ACCOUNT_AMOUNTS = 258; // More than 20 balance adjustments were to satisfy a CryptoTransfer and its implied custom fee payments
    int32 internal constant INSUFFICIENT_SENDER_ACCOUNT_BALANCE_FOR_CUSTOM_FEE = 259; // The sender account in the token transfer transaction could not afford a custom fee
    int32 internal constant SERIAL_NUMBER_LIMIT_REACHED = 260; // Currently no more than 4,294,967,295 NFTs may be minted for a given unique token type
    int32 internal constant CUSTOM_ROYALTY_FEE_ONLY_ALLOWED_FOR_NON_FUNGIBLE_UNIQUE = 261; // Only tokens of type NON_FUNGIBLE_UNIQUE can have royalty fees
    int32 internal constant NO_REMAINING_AUTOMATIC_ASSOCIATIONS = 262; // The account has reached the limit on the automatic associations count.
    int32 internal constant EXISTING_AUTOMATIC_ASSOCIATIONS_EXCEED_GIVEN_LIMIT = 263; // Already existing automatic associations are more than the new maximum automatic associations.
    int32 internal constant REQUESTED_NUM_AUTOMATIC_ASSOCIATIONS_EXCEEDS_ASSOCIATION_LIMIT = 264; // Cannot set the number of automatic associations for an account more than the maximum allowed tokens.maxPerAccount.
    int32 internal constant TOKEN_IS_PAUSED = 265; // Token is paused. This Token cannot be a part of any kind of Transaction until unpaused.
    int32 internal constant TOKEN_HAS_NO_PAUSE_KEY = 266; // Pause key is not set on token
    int32 internal constant INVALID_PAUSE_KEY = 267; // The provided pause key was invalid
    int32 internal constant FREEZE_UPDATE_FILE_DOES_NOT_EXIST = 268; // The update file in a freeze transaction body must exist.
    int32 internal constant FREEZE_UPDATE_FILE_HASH_DOES_NOT_MATCH = 269; // The hash of the update file in a freeze transaction body must match the in-memory hash.
    int32 internal constant NO_UPGRADE_HAS_BEEN_PREPARED = 270; // A FREEZE_UPGRADE transaction was handled with no previous update prepared.
    int32 internal constant NO_FREEZE_IS_SCHEDULED = 271; // A FREEZE_ABORT transaction was handled with no scheduled freeze.
    int32 internal constant UPDATE_FILE_HASH_CHANGED_SINCE_PREPARE_UPGRADE = 272; // The update file hash when handling a FREEZE_UPGRADE transaction differs from the file hash at the time of handling the PREPARE_UPGRADE transaction.
    int32 internal constant FREEZE_START_TIME_MUST_BE_FUTURE = 273; // The given freeze start time was in the (consensus) past.
    int32 internal constant PREPARED_UPDATE_FILE_IS_IMMUTABLE = 274; // The prepared update file cannot be updated or appended until either the upgrade has been completed, or a FREEZE_ABORT has been handled.
    int32 internal constant FREEZE_ALREADY_SCHEDULED = 275; // Once a freeze is scheduled, it must be aborted before any other type of freeze can be performed.
    int32 internal constant FREEZE_UPGRADE_IN_PROGRESS = 276; // If an NMT upgrade has been prepared, the following operation must be a FREEZE_UPGRADE (To issue a FREEZE_ONLY, submit a FREEZE_ABORT first.)
    int32 internal constant UPDATE_FILE_ID_DOES_NOT_MATCH_PREPARED = 277; // If an NMT upgrade has been prepared, the subsequent FREEZE_UPGRADE transaction must confirm the id of the file to be used in the upgrade.
    int32 internal constant UPDATE_FILE_HASH_DOES_NOT_MATCH_PREPARED = 278; // If an NMT upgrade has been prepared, the subsequent FREEZE_UPGRADE transaction must confirm the hash of the file to be used in the upgrade.
    int32 internal constant CONSENSUS_GAS_EXHAUSTED = 279; // Consensus throttle did not allow execution of this transaction. System is throttled at consensus level.
    int32 internal constant REVERTED_SUCCESS = 280; // A precompiled contract succeeded, but was later reverted.
    int32 internal constant MAX_STORAGE_IN_PRICE_REGIME_HAS_BEEN_USED = 281; // All contract storage allocated to the current price regime has been consumed.
    int32 internal constant INVALID_ALIAS_KEY = 282; // An alias used in a CryptoTransfer transaction is not the serialization of a primitive Key message -- that is, a Key with a single Ed25519 or ECDSA(secp256k1) public key and no unknown protobuf fields.
    int32 internal constant UNEXPECTED_TOKEN_DECIMALS = 283; // A fungible token transfer expected a different number of decimals than the involved type actually has.
    int32 internal constant INVALID_PROXY_ACCOUNT_ID = 284; // [Deprecated] The proxy account id is invalid or does not exist.
    int32 internal constant INVALID_TRANSFER_ACCOUNT_ID = 285; // The transfer account id in CryptoDelete transaction is invalid or does not exist.
    int32 internal constant INVALID_FEE_COLLECTOR_ACCOUNT_ID = 286; // The fee collector account id in TokenFeeScheduleUpdate is invalid or does not exist.
    int32 internal constant ALIAS_IS_IMMUTABLE = 287; // The alias already set on an account cannot be updated using CryptoUpdate transaction.
    int32 internal constant SPENDER_ACCOUNT_SAME_AS_OWNER = 288; // An approved allowance specifies a spender account that is the same as the hbar/token owner account.
    int32 internal constant AMOUNT_EXCEEDS_TOKEN_MAX_SUPPLY = 289; // The establishment or adjustment of an approved allowance cause the token allowance to exceed the token maximum supply.
    int32 internal constant NEGATIVE_ALLOWANCE_AMOUNT = 290; // The specified amount for an approved allowance cannot be negative.
    int32 internal constant CANNOT_APPROVE_FOR_ALL_FUNGIBLE_COMMON = 291; // [Deprecated] The approveForAll flag cannot be set for a fungible token.
    int32 internal constant SPENDER_DOES_NOT_HAVE_ALLOWANCE = 292; // The spender does not have an existing approved allowance with the hbar/token owner.
    int32 internal constant AMOUNT_EXCEEDS_ALLOWANCE = 293; // The transfer amount exceeds the current approved allowance for the spender account.
    int32 internal constant MAX_ALLOWANCES_EXCEEDED = 294; // The payer account of an approveAllowances or adjustAllowance transaction is attempting to go beyond the maximum allowed number of allowances.
    int32 internal constant EMPTY_ALLOWANCES = 295; // No allowances have been specified in the approval transaction.
    int32 internal constant SPENDER_ACCOUNT_REPEATED_IN_ALLOWANCES = 296; // [Deprecated] Spender is repeated more than once in Crypto or Token or NFT allowance lists in a single CryptoApproveAllowance transaction.
    int32 internal constant REPEATED_SERIAL_NUMS_IN_NFT_ALLOWANCES = 297; // [Deprecated] Serial numbers are repeated in nft allowance for a single spender account
    int32 internal constant FUNGIBLE_TOKEN_IN_NFT_ALLOWANCES = 298; // Fungible common token used in NFT allowances
    int32 internal constant NFT_IN_FUNGIBLE_TOKEN_ALLOWANCES = 299; // Non fungible token used in fungible token allowances
    int32 internal constant INVALID_ALLOWANCE_OWNER_ID = 300; // The account id specified as the owner is invalid or does not exist.
    int32 internal constant INVALID_ALLOWANCE_SPENDER_ID = 301; // The account id specified as the spender is invalid or does not exist.
    int32 internal constant REPEATED_ALLOWANCES_TO_DELETE = 302; // [Deprecated] If the CryptoDeleteAllowance transaction has repeated crypto or token or Nft allowances to delete.
    int32 internal constant INVALID_DELEGATING_SPENDER = 303; // If the account Id specified as the delegating spender is invalid or does not exist.
    int32 internal constant DELEGATING_SPENDER_CANNOT_GRANT_APPROVE_FOR_ALL = 304; // The delegating Spender cannot grant approveForAll allowance on a NFT token type for another spender.
    int32 internal constant DELEGATING_SPENDER_DOES_NOT_HAVE_APPROVE_FOR_ALL = 305; // The delegating Spender cannot grant allowance on a NFT serial for another spender as it doesnt not have approveForAll granted on token-owner.
    int32 internal constant SCHEDULE_EXPIRATION_TIME_TOO_FAR_IN_FUTURE = 306; // The scheduled transaction could not be created because it's expiration_time was too far in the future.
    int32 internal constant SCHEDULE_EXPIRATION_TIME_MUST_BE_HIGHER_THAN_CONSENSUS_TIME = 307; // The scheduled transaction could not be created because it's expiration_time was less than or equal to the consensus time.
    int32 internal constant SCHEDULE_FUTURE_THROTTLE_EXCEEDED = 308; // The scheduled transaction could not be created because it would cause throttles to be violated on the specified expiration_time.
    int32 internal constant SCHEDULE_FUTURE_GAS_LIMIT_EXCEEDED = 309; // The scheduled transaction could not be created because it would cause the gas limit to be violated on the specified expiration_time.
    int32 internal constant INVALID_ETHEREUM_TRANSACTION = 310; // The ethereum transaction either failed parsing or failed signature validation, or some other EthereumTransaction error not covered by another response code.
    int32 internal constant WRONG_CHAIN_ID = 311; // EthereumTransaction was signed against a chainId that this network does not support.
    int32 internal constant WRONG_NONCE = 312; // This transaction specified an ethereumNonce that is not the current ethereumNonce of the account.
    int32 internal constant ACCESS_LIST_UNSUPPORTED = 313; // The ethereum transaction specified an access list, which the network does not support.
    int32 internal constant SCHEDULE_PENDING_EXPIRATION = 314; // A schedule being signed or deleted has passed it's expiration date and is pending execution if needed and then expiration.
    int32 internal constant CONTRACT_IS_TOKEN_TREASURY = 315; // A selfdestruct or ContractDelete targeted a contract that is a token treasury.
    int32 internal constant CONTRACT_HAS_NON_ZERO_TOKEN_BALANCES = 316; // A selfdestruct or ContractDelete targeted a contract with non-zero token balances.
    int32 internal constant CONTRACT_EXPIRED_AND_PENDING_REMOVAL = 317; // A contract referenced by a transaction is "detached"; that is, expired and lacking any hbar funds for auto-renewal payment---but still within its post-expiry grace period.
    int32 internal constant CONTRACT_HAS_NO_AUTO_RENEW_ACCOUNT = 318; // A ContractUpdate requested removal of a contract's auto-renew account, but that contract has no auto-renew account.
    int32 internal constant PERMANENT_REMOVAL_REQUIRES_SYSTEM_INITIATION = 319; // A delete transaction submitted via HAPI set permanent_removal=true
    int32 internal constant PROXY_ACCOUNT_ID_FIELD_IS_DEPRECATED = 320; // A CryptoCreate or ContractCreate used the deprecated proxyAccountID field.
    int32 internal constant SELF_STAKING_IS_NOT_ALLOWED = 321; // An account set the staked_account_id to itself in CryptoUpdate or ContractUpdate transactions.
    int32 internal constant INVALID_STAKING_ID = 322; // The staking account id or staking node id given is invalid or does not exist.
    int32 internal constant STAKING_NOT_ENABLED = 323; // Native staking, while implemented, has not yet enabled by the council.
    int32 internal constant INVALID_PRNG_RANGE = 324; // The range provided in UtilPrng transaction is negative.
    int32 internal constant MAX_ENTITIES_IN_PRICE_REGIME_HAVE_BEEN_CREATED = 325; // The maximum number of entities allowed in the current price regime have been created.
    int32 internal constant INVALID_FULL_PREFIX_SIGNATURE_FOR_PRECOMPILE = 326; // The full prefix signature for precompile is not valid
    int32 internal constant INSUFFICIENT_BALANCES_FOR_STORAGE_RENT = 327; // The combined balances of a contract and its auto-renew account (if any) did not cover the rent charged for net new storage used in a transaction.
    int32 internal constant MAX_CHILD_RECORDS_EXCEEDED = 328; // A contract transaction tried to use more than the allowed number of child records, via either system contract records or internal contract creations.
    int32 internal constant INSUFFICIENT_BALANCES_FOR_RENEWAL_FEES = 329; // The combined balances of a contract and its auto-renew account (if any) or balance of an account did not cover the auto-renewal fees in a transaction.
}


// File contracts/hedera/system/IHederaTokenService.sol

// Original license: SPDX_License_Identifier: Apache-2.0
pragma solidity >=0.4.9 <0.9.0;
// Original pragma directive: pragma experimental ABIEncoderV2

interface IHederaTokenService {
    /// Transfers cryptocurrency among two or more accounts by making the desired adjustments to their
    /// balances. Each transfer list can specify up to 10 adjustments. Each negative amount is withdrawn
    /// from the corresponding account (a sender), and each positive one is added to the corresponding
    /// account (a receiver). The amounts list must sum to zero. Each amount is a number of tinybars
    /// (there are 100,000,000 tinybars in one hbar).  If any sender account fails to have sufficient
    /// hbars, then the entire transaction fails, and none of those transfers occur, though the
    /// transaction fee is still charged. This transaction must be signed by the keys for all the sending
    /// accounts, and for any receiving accounts that have receiverSigRequired == true. The signatures
    /// are in the same order as the accounts, skipping those accounts that don't need a signature.
    /// @custom:version 0.3.0 previous version did not include isApproval
    struct AccountAmount {
        // The Account ID, as a solidity address, that sends/receives cryptocurrency or tokens
        address accountID;
        // The amount of  the lowest denomination of the given token that
        // the account sends(negative) or receives(positive)
        int64 amount;
        // If true then the transfer is expected to be an approved allowance and the
        // accountID is expected to be the owner. The default is false (omitted).
        bool isApproval;
    }

    /// A sender account, a receiver account, and the serial number of an NFT of a Token with
    /// NON_FUNGIBLE_UNIQUE type. When minting NFTs the sender will be the default AccountID instance
    /// (0.0.0 aka 0x0) and when burning NFTs, the receiver will be the default AccountID instance.
    /// @custom:version 0.3.0 previous version did not include isApproval
    struct NftTransfer {
        // The solidity address of the sender
        address senderAccountID;
        // The solidity address of the receiver
        address receiverAccountID;
        // The serial number of the NFT
        int64 serialNumber;
        // If true then the transfer is expected to be an approved allowance and the
        // accountID is expected to be the owner. The default is false (omitted).
        bool isApproval;
    }

    struct TokenTransferList {
        // The ID of the token as a solidity address
        address token;
        // Applicable to tokens of type FUNGIBLE_COMMON. Multiple list of AccountAmounts, each of which
        // has an account and amount.
        AccountAmount[] transfers;
        // Applicable to tokens of type NON_FUNGIBLE_UNIQUE. Multiple list of NftTransfers, each of
        // which has a sender and receiver account, including the serial number of the NFT
        NftTransfer[] nftTransfers;
    }

    struct TransferList {
        // Multiple list of AccountAmounts, each of which has an account and amount.
        // Used to transfer hbars between the accounts in the list.
        AccountAmount[] transfers;
    }

    /// Expiry properties of a Hedera token - second, autoRenewAccount, autoRenewPeriod
    struct Expiry {
        // The epoch second at which the token should expire; if an auto-renew account and period are
        // specified, this is coerced to the current epoch second plus the autoRenewPeriod
        int64 second;
        // ID of an account which will be automatically charged to renew the token's expiration, at
        // autoRenewPeriod interval, expressed as a solidity address
        address autoRenewAccount;
        // The interval at which the auto-renew account will be charged to extend the token's expiry
        int64 autoRenewPeriod;
    }

    /// A Key can be a public key from either the Ed25519 or ECDSA(secp256k1) signature schemes, where
    /// in the ECDSA(secp256k1) case we require the 33-byte compressed form of the public key. We call
    /// these public keys <b>primitive keys</b>.
    /// A Key can also be the ID of a smart contract instance, which is then authorized to perform any
    /// precompiled contract action that requires this key to sign.
    /// Note that when a Key is a smart contract ID, it <i>doesn't</i> mean the contract with that ID
    /// will actually create a cryptographic signature. It only means that when the contract calls a
    /// precompiled contract, the resulting "child transaction" will be authorized to perform any action
    /// controlled by the Key.
    /// Exactly one of the possible values should be populated in order for the Key to be valid.
    struct KeyValue {
        // if set to true, the key of the calling Hedera account will be inherited as the token key
        bool inheritAccountKey;
        // smart contract instance that is authorized as if it had signed with a key
        address contractId;
        // Ed25519 public key bytes
        bytes ed25519;
        // Compressed ECDSA(secp256k1) public key bytes
        bytes ECDSA_secp256k1;
        // A smart contract that, if the recipient of the active message frame, should be treated
        // as having signed. (Note this does not mean the <i>code being executed in the frame</i>
        // will belong to the given contract, since it could be running another contract's code via
        // <tt>delegatecall</tt>. So setting this key is a more permissive version of setting the
        // contractID key, which also requires the code in the active message frame belong to the
        // the contract with the given id.)
        address delegatableContractId;
    }

    /// A list of token key types the key should be applied to and the value of the key
    struct TokenKey {
        // bit field representing the key type. Keys of all types that have corresponding bits set to 1
        // will be created for the token.
        // 0th bit: adminKey
        // 1st bit: kycKey
        // 2nd bit: freezeKey
        // 3rd bit: wipeKey
        // 4th bit: supplyKey
        // 5th bit: feeScheduleKey
        // 6th bit: pauseKey
        // 7th bit: ignored
        uint keyType;
        // the value that will be set to the key type
        KeyValue key;
    }

    /// Basic properties of a Hedera Token - name, symbol, memo, tokenSupplyType, maxSupply,
    /// treasury, freezeDefault. These properties are related both to Fungible and NFT token types.
    struct HederaToken {
        // The publicly visible name of the token. The token name is specified as a Unicode string.
        // Its UTF-8 encoding cannot exceed 100 bytes, and cannot contain the 0 byte (NUL).
        string name;
        // The publicly visible token symbol. The token symbol is specified as a Unicode string.
        // Its UTF-8 encoding cannot exceed 100 bytes, and cannot contain the 0 byte (NUL).
        string symbol;
        // The ID of the account which will act as a treasury for the token as a solidity address.
        // This account will receive the specified initial supply or the newly minted NFTs in
        // the case for NON_FUNGIBLE_UNIQUE Type
        address treasury;
        // The memo associated with the token (UTF-8 encoding max 100 bytes)
        string memo;
        // IWA compatibility. Specified the token supply type. Defaults to INFINITE
        bool tokenSupplyType;
        // IWA Compatibility. Depends on TokenSupplyType. For tokens of type FUNGIBLE_COMMON - the
        // maximum number of tokens that can be in circulation. For tokens of type NON_FUNGIBLE_UNIQUE -
        // the maximum number of NFTs (serial numbers) that can be minted. This field can never be changed!
        int64 maxSupply;
        // The default Freeze status (frozen or unfrozen) of Hedera accounts relative to this token. If
        // true, an account must be unfrozen before it can receive the token
        bool freezeDefault;
        // list of keys to set to the token
        TokenKey[] tokenKeys;
        // expiry properties of a Hedera token - second, autoRenewAccount, autoRenewPeriod
        Expiry expiry;
    }

    /// Additional post creation fungible and non fungible properties of a Hedera Token.
    struct TokenInfo {
        /// Basic properties of a Hedera Token
        HederaToken token;
        /// The number of tokens (fungible) or serials (non-fungible) of the token
        int64 totalSupply;
        /// Specifies whether the token is deleted or not
        bool deleted;
        /// Specifies whether the token kyc was defaulted with KycNotApplicable (true) or Revoked (false)
        bool defaultKycStatus;
        /// Specifies whether the token is currently paused or not
        bool pauseStatus;
        /// The fixed fees collected when transferring the token
        FixedFee[] fixedFees;
        /// The fractional fees collected when transferring the token
        FractionalFee[] fractionalFees;
        /// The royalty fees collected when transferring the token
        RoyaltyFee[] royaltyFees;
        /// The ID of the network ledger
        string ledgerId;
    }

    /// Additional fungible properties of a Hedera Token.
    struct FungibleTokenInfo {
        /// The shared hedera token info
        TokenInfo tokenInfo;
        /// The number of decimal places a token is divisible by
        int32 decimals;
    }

    /// Additional non fungible properties of a Hedera Token.
    struct NonFungibleTokenInfo {
        /// The shared hedera token info
        TokenInfo tokenInfo;
        /// The serial number of the nft
        int64 serialNumber;
        /// The account id specifying the owner of the non fungible token
        address ownerId;
        /// The epoch second at which the token was created.
        int64 creationTime;
        /// The unique metadata of the NFT
        bytes metadata;
        /// The account id specifying an account that has been granted spending permissions on this nft
        address spenderId;
    }

    /// A fixed number of units (hbar or token) to assess as a fee during a transfer of
    /// units of the token to which this fixed fee is attached. The denomination of
    /// the fee depends on the values of tokenId, useHbarsForPayment and
    /// useCurrentTokenForPayment. Exactly one of the values should be set.
    struct FixedFee {
        int64 amount;
        // Specifies ID of token that should be used for fixed fee denomination
        address tokenId;
        // Specifies this fixed fee should be denominated in Hbar
        bool useHbarsForPayment;
        // Specifies this fixed fee should be denominated in the Token currently being created
        bool useCurrentTokenForPayment;
        // The ID of the account to receive the custom fee, expressed as a solidity address
        address feeCollector;
    }

    /// A fraction of the transferred units of a token to assess as a fee. The amount assessed will never
    /// be less than the given minimumAmount, and never greater than the given maximumAmount.  The
    /// denomination is always units of the token to which this fractional fee is attached.
    struct FractionalFee {
        // A rational number's numerator, used to set the amount of a value transfer to collect as a custom fee
        int64 numerator;
        // A rational number's denominator, used to set the amount of a value transfer to collect as a custom fee
        int64 denominator;
        // The minimum amount to assess
        int64 minimumAmount;
        // The maximum amount to assess (zero implies no maximum)
        int64 maximumAmount;
        bool netOfTransfers;
        // The ID of the account to receive the custom fee, expressed as a solidity address
        address feeCollector;
    }

    /// A fee to assess during a transfer that changes ownership of an NFT. Defines the fraction of
    /// the fungible value exchanged for an NFT that the ledger should collect as a royalty. ("Fungible
    /// value" includes both ℏ and units of fungible HTS tokens.) When the NFT sender does not receive
    /// any fungible value, the ledger will assess the fallback fee, if present, to the new NFT owner.
    /// Royalty fees can only be added to tokens of type type NON_FUNGIBLE_UNIQUE.
    struct RoyaltyFee {
        // A fraction's numerator of fungible value exchanged for an NFT to collect as royalty
        int64 numerator;
        // A fraction's denominator of fungible value exchanged for an NFT to collect as royalty
        int64 denominator;
        // If present, the fee to assess to the NFT receiver when no fungible value
        // is exchanged with the sender. Consists of:
        // amount: the amount to charge for the fee
        // tokenId: Specifies ID of token that should be used for fixed fee denomination
        // useHbarsForPayment: Specifies this fee should be denominated in Hbar
        int64 amount;
        address tokenId;
        bool useHbarsForPayment;
        // The ID of the account to receive the custom fee, expressed as a solidity address
        address feeCollector;
    }

    /**********************
     * Direct HTS Calls   *
     **********************/

    /// Performs transfers among combinations of tokens and hbars
    /// @param transferList the list of hbar transfers to do
    /// @param tokenTransfers the list of token transfers to do
    /// @custom:version 0.3.0 the signature of the previous version was cryptoTransfer(TokenTransferList[] memory tokenTransfers)
    function cryptoTransfer(
        TransferList memory transferList,
        TokenTransferList[] memory tokenTransfers
    ) external returns (int64 responseCode);

    /// Mints an amount of the token to the defined treasury account
    /// @param token The token for which to mint tokens. If token does not exist, transaction results in
    ///              INVALID_TOKEN_ID
    /// @param amount Applicable to tokens of type FUNGIBLE_COMMON. The amount to mint to the Treasury Account.
    ///               Amount must be a positive non-zero number represented in the lowest denomination of the
    ///               token. The new supply must be lower than 2^63.
    /// @param metadata Applicable to tokens of type NON_FUNGIBLE_UNIQUE. A list of metadata that are being created.
    ///                 Maximum allowed size of each metadata is 100 bytes
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return newTotalSupply The new supply of tokens. For NFTs it is the total count of NFTs
    /// @return serialNumbers If the token is an NFT the newly generate serial numbers, othersise empty.
    function mintToken(
        address token,
        int64 amount,
        bytes[] memory metadata
    ) external returns (int64 responseCode, int64 newTotalSupply, int64[] memory serialNumbers);

    /// Burns an amount of the token from the defined treasury account
    /// @param token The token for which to burn tokens. If token does not exist, transaction results in
    ///              INVALID_TOKEN_ID
    /// @param amount  Applicable to tokens of type FUNGIBLE_COMMON. The amount to burn from the Treasury Account.
    ///                Amount must be a positive non-zero number, not bigger than the token balance of the treasury
    ///                account (0; balance], represented in the lowest denomination.
    /// @param serialNumbers Applicable to tokens of type NON_FUNGIBLE_UNIQUE. The list of serial numbers to be burned.
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return newTotalSupply The new supply of tokens. For NFTs it is the total count of NFTs
    function burnToken(
        address token,
        int64 amount,
        int64[] memory serialNumbers
    ) external returns (int64 responseCode, int64 newTotalSupply);

    ///  Associates the provided account with the provided tokens. Must be signed by the provided
    ///  Account's key or called from the accounts contract key
    ///  If the provided account is not found, the transaction will resolve to INVALID_ACCOUNT_ID.
    ///  If the provided account has been deleted, the transaction will resolve to ACCOUNT_DELETED.
    ///  If any of the provided tokens is not found, the transaction will resolve to INVALID_TOKEN_REF.
    ///  If any of the provided tokens has been deleted, the transaction will resolve to TOKEN_WAS_DELETED.
    ///  If an association between the provided account and any of the tokens already exists, the
    ///  transaction will resolve to TOKEN_ALREADY_ASSOCIATED_TO_ACCOUNT.
    ///  If the provided account's associations count exceed the constraint of maximum token associations
    ///    per account, the transaction will resolve to TOKENS_PER_ACCOUNT_LIMIT_EXCEEDED.
    ///  On success, associations between the provided account and tokens are made and the account is
    ///    ready to interact with the tokens.
    /// @param account The account to be associated with the provided tokens
    /// @param tokens The tokens to be associated with the provided account. In the case of NON_FUNGIBLE_UNIQUE
    ///               Type, once an account is associated, it can hold any number of NFTs (serial numbers) of that
    ///               token type
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function associateTokens(address account, address[] memory tokens) external returns (int64 responseCode);

    /// Single-token variant of associateTokens. Will be mapped to a single entry array call of associateTokens
    /// @param account The account to be associated with the provided token
    /// @param token The token to be associated with the provided account
    function associateToken(address account, address token) external returns (int64 responseCode);

    /// Dissociates the provided account with the provided tokens. Must be signed by the provided
    /// Account's key.
    /// If the provided account is not found, the transaction will resolve to INVALID_ACCOUNT_ID.
    /// If the provided account has been deleted, the transaction will resolve to ACCOUNT_DELETED.
    /// If any of the provided tokens is not found, the transaction will resolve to INVALID_TOKEN_REF.
    /// If any of the provided tokens has been deleted, the transaction will resolve to TOKEN_WAS_DELETED.
    /// If an association between the provided account and any of the tokens does not exist, the
    /// transaction will resolve to TOKEN_NOT_ASSOCIATED_TO_ACCOUNT.
    /// If a token has not been deleted and has not expired, and the user has a nonzero balance, the
    /// transaction will resolve to TRANSACTION_REQUIRES_ZERO_TOKEN_BALANCES.
    /// If a <b>fungible token</b> has expired, the user can disassociate even if their token balance is
    /// not zero.
    /// If a <b>non fungible token</b> has expired, the user can <b>not</b> disassociate if their token
    /// balance is not zero. The transaction will resolve to TRANSACTION_REQUIRED_ZERO_TOKEN_BALANCES.
    /// On success, associations between the provided account and tokens are removed.
    /// @param account The account to be dissociated from the provided tokens
    /// @param tokens The tokens to be dissociated from the provided account.
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function dissociateTokens(address account, address[] memory tokens) external returns (int64 responseCode);

    /// Single-token variant of dissociateTokens. Will be mapped to a single entry array call of dissociateTokens
    /// @param account The account to be associated with the provided token
    /// @param token The token to be associated with the provided account
    function dissociateToken(address account, address token) external returns (int64 responseCode);

    /// Creates a Fungible Token with the specified properties
    /// @param token the basic properties of the token being created
    /// @param initialTotalSupply Specifies the initial supply of tokens to be put in circulation. The
    /// initial supply is sent to the Treasury Account. The supply is in the lowest denomination possible.
    /// @param decimals the number of decimal places a token is divisible by
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenAddress the created token's address
    function createFungibleToken(
        HederaToken memory token,
        int64 initialTotalSupply,
        int32 decimals
    ) external payable returns (int64 responseCode, address tokenAddress);

    /// Creates a Fungible Token with the specified properties
    /// @param token the basic properties of the token being created
    /// @param initialTotalSupply Specifies the initial supply of tokens to be put in circulation. The
    /// initial supply is sent to the Treasury Account. The supply is in the lowest denomination possible.
    /// @param decimals the number of decimal places a token is divisible by.
    /// @param fixedFees list of fixed fees to apply to the token
    /// @param fractionalFees list of fractional fees to apply to the token
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenAddress the created token's address
    function createFungibleTokenWithCustomFees(
        HederaToken memory token,
        int64 initialTotalSupply,
        int32 decimals,
        FixedFee[] memory fixedFees,
        FractionalFee[] memory fractionalFees
    ) external payable returns (int64 responseCode, address tokenAddress);

    /// Creates an Non Fungible Unique Token with the specified properties
    /// @param token the basic properties of the token being created
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenAddress the created token's address
    function createNonFungibleToken(
        HederaToken memory token
    ) external payable returns (int64 responseCode, address tokenAddress);

    /// Creates an Non Fungible Unique Token with the specified properties
    /// @param token the basic properties of the token being created
    /// @param fixedFees list of fixed fees to apply to the token
    /// @param royaltyFees list of royalty fees to apply to the token
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenAddress the created token's address
    function createNonFungibleTokenWithCustomFees(
        HederaToken memory token,
        FixedFee[] memory fixedFees,
        RoyaltyFee[] memory royaltyFees
    ) external payable returns (int64 responseCode, address tokenAddress);

    /**********************
     * ABIV1 calls        *
     **********************/

    /// Initiates a Fungible Token Transfer
    /// @param token The ID of the token as a solidity address
    /// @param accountId account to do a transfer to/from
    /// @param amount The amount from the accountId at the same index
    function transferTokens(
        address token,
        address[] memory accountId,
        int64[] memory amount
    ) external returns (int64 responseCode);

    /// Initiates a Non-Fungable Token Transfer
    /// @param token The ID of the token as a solidity address
    /// @param sender the sender of an nft
    /// @param receiver the receiver of the nft sent by the same index at sender
    /// @param serialNumber the serial number of the nft sent by the same index at sender
    function transferNFTs(
        address token,
        address[] memory sender,
        address[] memory receiver,
        int64[] memory serialNumber
    ) external returns (int64 responseCode);

    /// Transfers tokens where the calling account/contract is implicitly the first entry in the token transfer list,
    /// where the amount is the value needed to zero balance the transfers. Regular signing rules apply for sending
    /// (positive amount) or receiving (negative amount)
    /// @param token The token to transfer to/from
    /// @param sender The sender for the transaction
    /// @param recipient The receiver of the transaction
    /// @param amount Non-negative value to send. a negative value will result in a failure.
    function transferToken(
        address token,
        address sender,
        address recipient,
        int64 amount
    ) external returns (int64 responseCode);

    /// Transfers tokens where the calling account/contract is implicitly the first entry in the token transfer list,
    /// where the amount is the value needed to zero balance the transfers. Regular signing rules apply for sending
    /// (positive amount) or receiving (negative amount)
    /// @param token The token to transfer to/from
    /// @param sender The sender for the transaction
    /// @param recipient The receiver of the transaction
    /// @param serialNumber The serial number of the NFT to transfer.
    function transferNFT(
        address token,
        address sender,
        address recipient,
        int64 serialNumber
    ) external returns (int64 responseCode);

    /// Allows spender to withdraw from your account multiple times, up to the value amount. If this function is called
    /// again it overwrites the current allowance with value.
    /// Only Applicable to Fungible Tokens
    /// @param token The hedera token address to approve
    /// @param spender the account address authorized to spend
    /// @param amount the amount of tokens authorized to spend.
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function approve(address token, address spender, uint256 amount) external returns (int64 responseCode);

    /// Transfers `amount` tokens from `from` to `to` using the
    //  allowance mechanism. `amount` is then deducted from the caller's allowance.
    /// Only applicable to fungible tokens
    /// @param token The address of the fungible Hedera token to transfer
    /// @param from The account address of the owner of the token, on the behalf of which to transfer `amount` tokens
    /// @param to The account address of the receiver of the `amount` tokens
    /// @param amount The amount of tokens to transfer from `from` to `to`
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function transferFrom(
        address token,
        address from,
        address to,
        uint256 amount
    ) external returns (int64 responseCode);

    /// Returns the amount which spender is still allowed to withdraw from owner.
    /// Only Applicable to Fungible Tokens
    /// @param token The Hedera token address to check the allowance of
    /// @param owner the owner of the tokens to be spent
    /// @param spender the spender of the tokens
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return allowance The amount which spender is still allowed to withdraw from owner.
    function allowance(
        address token,
        address owner,
        address spender
    ) external returns (int64 responseCode, uint256 allowance);

    /// Allow or reaffirm the approved address to transfer an NFT the approved address does not own.
    /// Only Applicable to NFT Tokens
    /// @param token The Hedera NFT token address to approve
    /// @param approved The new approved NFT controller.  To revoke approvals pass in the zero address.
    /// @param serialNumber The NFT serial number  to approve
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function approveNFT(address token, address approved, uint256 serialNumber) external returns (int64 responseCode);

    /// Transfers `serialNumber` of `token` from `from` to `to` using the allowance mechanism.
    /// Only applicable to NFT tokens
    /// @param token The address of the non-fungible Hedera token to transfer
    /// @param from The account address of the owner of `serialNumber` of `token`
    /// @param to The account address of the receiver of `serialNumber`
    /// @param serialNumber The NFT serial number to transfer
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function transferFromNFT(
        address token,
        address from,
        address to,
        uint256 serialNumber
    ) external returns (int64 responseCode);

    /// Get the approved address for a single NFT
    /// Only Applicable to NFT Tokens
    /// @param token The Hedera NFT token address to check approval
    /// @param serialNumber The NFT to find the approved address for
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return approved The approved address for this NFT, or the zero address if there is none
    function getApproved(address token, uint256 serialNumber) external returns (int64 responseCode, address approved);

    /// Enable or disable approval for a third party ("operator") to manage
    ///  all of `msg.sender`'s assets
    /// @param token The Hedera NFT token address to approve
    /// @param operator Address to add to the set of authorized operators
    /// @param approved True if the operator is approved, false to revoke approval
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function setApprovalForAll(address token, address operator, bool approved) external returns (int64 responseCode);

    /// Query if an address is an authorized operator for another address
    /// Only Applicable to NFT Tokens
    /// @param token The Hedera NFT token address to approve
    /// @param owner The address that owns the NFTs
    /// @param operator The address that acts on behalf of the owner
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return approved True if `operator` is an approved operator for `owner`, false otherwise
    function isApprovedForAll(
        address token,
        address owner,
        address operator
    ) external returns (int64 responseCode, bool approved);

    /// Query if token account is frozen
    /// @param token The token address to check
    /// @param account The account address associated with the token
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return frozen True if `account` is frozen for `token`
    function isFrozen(address token, address account) external returns (int64 responseCode, bool frozen);

    /// Query if token account has kyc granted
    /// @param token The token address to check
    /// @param account The account address associated with the token
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return kycGranted True if `account` has kyc granted for `token`
    function isKyc(address token, address account) external returns (int64 responseCode, bool kycGranted);

    /// Operation to delete token
    /// @param token The token address to be deleted
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function deleteToken(address token) external returns (int64 responseCode);

    /// Query token custom fees
    /// @param token The token address to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return fixedFees Set of fixed fees for `token`
    /// @return fractionalFees Set of fractional fees for `token`
    /// @return royaltyFees Set of royalty fees for `token`
    function getTokenCustomFees(
        address token
    )
        external
        returns (
            int64 responseCode,
            FixedFee[] memory fixedFees,
            FractionalFee[] memory fractionalFees,
            RoyaltyFee[] memory royaltyFees
        );

    /// Query token default freeze status
    /// @param token The token address to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return defaultFreezeStatus True if `token` default freeze status is frozen.
    function getTokenDefaultFreezeStatus(address token) external returns (int64 responseCode, bool defaultFreezeStatus);

    /// Query token default kyc status
    /// @param token The token address to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return defaultKycStatus True if `token` default kyc status is KycNotApplicable and false if Revoked.
    function getTokenDefaultKycStatus(address token) external returns (int64 responseCode, bool defaultKycStatus);

    /// Query token expiry info
    /// @param token The token address to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return expiry Expiry info for `token`
    function getTokenExpiryInfo(address token) external returns (int64 responseCode, Expiry memory expiry);

    /// Query fungible token info
    /// @param token The token address to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return fungibleTokenInfo FungibleTokenInfo info for `token`
    function getFungibleTokenInfo(
        address token
    ) external returns (int64 responseCode, FungibleTokenInfo memory fungibleTokenInfo);

    /// Query token info
    /// @param token The token address to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenInfo TokenInfo info for `token`
    function getTokenInfo(address token) external returns (int64 responseCode, TokenInfo memory tokenInfo);

    /// Query token KeyValue
    /// @param token The token address to check
    /// @param keyType The keyType of the desired KeyValue
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return key KeyValue info for key of type `keyType`
    function getTokenKey(address token, uint keyType) external returns (int64 responseCode, KeyValue memory key);

    /// Query non fungible token info
    /// @param token The token address to check
    /// @param serialNumber The NFT serialNumber to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return nonFungibleTokenInfo NonFungibleTokenInfo info for `token` `serialNumber`
    function getNonFungibleTokenInfo(
        address token,
        int64 serialNumber
    ) external returns (int64 responseCode, NonFungibleTokenInfo memory nonFungibleTokenInfo);

    /// Operation to freeze token account
    /// @param token The token address
    /// @param account The account address to be frozen
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function freezeToken(address token, address account) external returns (int64 responseCode);

    /// Operation to unfreeze token account
    /// @param token The token address
    /// @param account The account address to be unfrozen
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function unfreezeToken(address token, address account) external returns (int64 responseCode);

    /// Operation to grant kyc to token account
    /// @param token The token address
    /// @param account The account address to grant kyc
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function grantTokenKyc(address token, address account) external returns (int64 responseCode);

    /// Operation to revoke kyc to token account
    /// @param token The token address
    /// @param account The account address to revoke kyc
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function revokeTokenKyc(address token, address account) external returns (int64 responseCode);

    /// Operation to pause token
    /// @param token The token address to be paused
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function pauseToken(address token) external returns (int64 responseCode);

    /// Operation to unpause token
    /// @param token The token address to be unpaused
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function unpauseToken(address token) external returns (int64 responseCode);

    /// Operation to wipe fungible tokens from account
    /// @param token The token address
    /// @param account The account address to revoke kyc
    /// @param amount The number of tokens to wipe
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function wipeTokenAccount(address token, address account, int64 amount) external returns (int64 responseCode);

    /// Operation to wipe non fungible tokens from account
    /// @param token The token address
    /// @param account The account address to revoke kyc
    /// @param  serialNumbers The serial numbers of token to wipe
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function wipeTokenAccountNFT(
        address token,
        address account,
        int64[] memory serialNumbers
    ) external returns (int64 responseCode);

    /// Operation to update token info
    /// @param token The token address
    /// @param tokenInfo The hedera token info to update token with
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function updateTokenInfo(address token, HederaToken memory tokenInfo) external returns (int64 responseCode);

    /// Operation to update token expiry info
    /// @param token The token address
    /// @param expiryInfo The hedera token expiry info
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function updateTokenExpiryInfo(address token, Expiry memory expiryInfo) external returns (int64 responseCode);

    /// Operation to update token expiry info
    /// @param token The token address
    /// @param keys The token keys
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function updateTokenKeys(address token, TokenKey[] memory keys) external returns (int64 responseCode);

    /// Query if valid token found for the given address
    /// @param token The token address
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return isToken True if valid token found for the given address
    function isToken(address token) external returns (int64 responseCode, bool isToken);

    /// Query to return the token type for a given address
    /// @param token The token address
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenType the token type. 0 is FUNGIBLE_COMMON, 1 is NON_FUNGIBLE_UNIQUE, -1 is UNRECOGNIZED
    function getTokenType(address token) external returns (int64 responseCode, int32 tokenType);

    /// Initiates a Redirect For Token
    /// @param token The token address
    /// @param encodedFunctionSelector The function selector from the ERC20 interface + the bytes input for the function called
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return response The result of the call that had been encoded and sent for execution.
    function redirectForToken(
        address token,
        bytes memory encodedFunctionSelector
    ) external returns (int64 responseCode, bytes memory response);
}


// File contracts/hedera/system/HederaTokenService.sol

// Original license: SPDX_License_Identifier: Apache-2.0
pragma solidity >=0.5.0 <0.9.0;
// Original pragma directive: pragma experimental ABIEncoderV2
abstract contract HederaTokenService {
    address constant precompileAddress = address(0x167);
    // 90 days in seconds
    int32 constant defaultAutoRenewPeriod = 7776000;

    modifier nonEmptyExpiry(IHederaTokenService.HederaToken memory token) {
        if (token.expiry.second == 0 && token.expiry.autoRenewPeriod == 0) {
            token.expiry.autoRenewPeriod = defaultAutoRenewPeriod;
        }
        _;
    }

    /// Performs transfers among combinations of tokens and hbars
    /// @param transferList the list of hbar transfers to do
    /// @param tokenTransfers the list of transfers to do
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @custom:version 0.3.0 the signature of the previous version was cryptoTransfer(TokenTransferList[] memory tokenTransfers)
    function cryptoTransfer(
        IHederaTokenService.TransferList memory transferList,
        IHederaTokenService.TokenTransferList[] memory tokenTransfers
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.cryptoTransfer.selector, transferList, tokenTransfers)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Performs transfers among combinations of tokens and hbars
    /// @param transferList the list of hbar transfers to do
    /// @param tokenTransfers the list of transfers to do
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @custom:version 0.3.0 the signature of the previous version was cryptoTransfer(TokenTransferList[] memory tokenTransfers)
    function delegateCryptoTransfer(
        IHederaTokenService.TransferList memory transferList,
        IHederaTokenService.TokenTransferList[] memory tokenTransfers
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.cryptoTransfer.selector, transferList, tokenTransfers)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Mints an amount of the token to the defined treasury account
    /// @param token The token for which to mint tokens. If token does not exist, transaction results in
    ///              INVALID_TOKEN_ID
    /// @param amount Applicable to tokens of type FUNGIBLE_COMMON. The amount to mint to the Treasury Account.
    ///               Amount must be a positive non-zero number represented in the lowest denomination of the
    ///               token. The new supply must be lower than 2^63.
    /// @param metadata Applicable to tokens of type NON_FUNGIBLE_UNIQUE. A list of metadata that are being created.
    ///                 Maximum allowed size of each metadata is 100 bytes
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return newTotalSupply The new supply of tokens. For NFTs it is the total count of NFTs
    /// @return serialNumbers If the token is an NFT the newly generate serial numbers, otherwise empty.
    function mintToken(
        address token,
        int64 amount,
        bytes[] memory metadata
    ) internal returns (int responseCode, int64 newTotalSupply, int64[] memory serialNumbers) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.mintToken.selector, token, amount, metadata)
        );
        (responseCode, newTotalSupply, serialNumbers) = success
            ? abi.decode(result, (int32, int64, int64[]))
            : (HederaResponseCodes.UNKNOWN, int64(0), new int64[](0));
    }

    /// Burns an amount of the token from the defined treasury account
    /// @param token The token for which to burn tokens. If token does not exist, transaction results in
    ///              INVALID_TOKEN_ID
    /// @param amount  Applicable to tokens of type FUNGIBLE_COMMON. The amount to burn from the Treasury Account.
    ///                Amount must be a positive non-zero number, not bigger than the token balance of the treasury
    ///                account (0; balance], represented in the lowest denomination.
    /// @param serialNumbers Applicable to tokens of type NON_FUNGIBLE_UNIQUE. The list of serial numbers to be burned.
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return newTotalSupply The new supply of tokens. For NFTs it is the total count of NFTs
    function burnToken(
        address token,
        int64 amount,
        int64[] memory serialNumbers
    ) internal returns (int responseCode, int64 newTotalSupply) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.burnToken.selector, token, amount, serialNumbers)
        );
        (responseCode, newTotalSupply) = success
            ? abi.decode(result, (int32, int64))
            : (HederaResponseCodes.UNKNOWN, int64(0));
    }

    ///  Associates the provided account with the provided tokens. Must be signed by the provided
    ///  Account's key or called from the accounts contract key
    ///  If the provided account is not found, the transaction will resolve to INVALID_ACCOUNT_ID.
    ///  If the provided account has been deleted, the transaction will resolve to ACCOUNT_DELETED.
    ///  If any of the provided tokens is not found, the transaction will resolve to INVALID_TOKEN_REF.
    ///  If any of the provided tokens has been deleted, the transaction will resolve to TOKEN_WAS_DELETED.
    ///  If an association between the provided account and any of the tokens already exists, the
    ///  transaction will resolve to TOKEN_ALREADY_ASSOCIATED_TO_ACCOUNT.
    ///  If the provided account's associations count exceed the constraint of maximum token associations
    ///    per account, the transaction will resolve to TOKENS_PER_ACCOUNT_LIMIT_EXCEEDED.
    ///  On success, associations between the provided account and tokens are made and the account is
    ///    ready to interact with the tokens.
    /// @param account The account to be associated with the provided tokens
    /// @param tokens The tokens to be associated with the provided account. In the case of NON_FUNGIBLE_UNIQUE
    ///               Type, once an account is associated, it can hold any number of NFTs (serial numbers) of that
    ///               token type
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function associateTokens(address account, address[] memory tokens) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.associateTokens.selector, account, tokens)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    function associateToken(address account, address token) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.associateToken.selector, account, token)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Dissociates the provided account with the provided tokens. Must be signed by the provided
    /// Account's key.
    /// If the provided account is not found, the transaction will resolve to INVALID_ACCOUNT_ID.
    /// If the provided account has been deleted, the transaction will resolve to ACCOUNT_DELETED.
    /// If any of the provided tokens is not found, the transaction will resolve to INVALID_TOKEN_REF.
    /// If any of the provided tokens has been deleted, the transaction will resolve to TOKEN_WAS_DELETED.
    /// If an association between the provided account and any of the tokens does not exist, the
    /// transaction will resolve to TOKEN_NOT_ASSOCIATED_TO_ACCOUNT.
    /// If a token has not been deleted and has not expired, and the user has a nonzero balance, the
    /// transaction will resolve to TRANSACTION_REQUIRES_ZERO_TOKEN_BALANCES.
    /// If a <b>fungible token</b> has expired, the user can disassociate even if their token balance is
    /// not zero.
    /// If a <b>non fungible token</b> has expired, the user can <b>not</b> disassociate if their token
    /// balance is not zero. The transaction will resolve to TRANSACTION_REQUIRED_ZERO_TOKEN_BALANCES.
    /// On success, associations between the provided account and tokens are removed.
    /// @param account The account to be dissociated from the provided tokens
    /// @param tokens The tokens to be dissociated from the provided account.
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function dissociateTokens(address account, address[] memory tokens) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.dissociateTokens.selector, account, tokens)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    function dissociateToken(address account, address token) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.dissociateToken.selector, account, token)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Creates a Fungible Token with the specified properties
    /// @param token the basic properties of the token being created
    /// @param initialTotalSupply Specifies the initial supply of tokens to be put in circulation. The
    /// initial supply is sent to the Treasury Account. The supply is in the lowest denomination possible.
    /// @param decimals the number of decimal places a token is divisible by
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenAddress the created token's address
    function createFungibleToken(
        IHederaTokenService.HederaToken memory token,
        int64 initialTotalSupply,
        int32 decimals
    ) internal nonEmptyExpiry(token) returns (int responseCode, address tokenAddress) {
        (bool success, bytes memory result) = precompileAddress.call{value: msg.value}(
            abi.encodeWithSelector(
                IHederaTokenService.createFungibleToken.selector,
                token,
                initialTotalSupply,
                decimals
            )
        );

        (responseCode, tokenAddress) = success
            ? abi.decode(result, (int32, address))
            : (HederaResponseCodes.UNKNOWN, address(0));
    }

    /// Creates a Fungible Token with the specified properties
    /// @param token the basic properties of the token being created
    /// @param initialTotalSupply Specifies the initial supply of tokens to be put in circulation. The
    /// initial supply is sent to the Treasury Account. The supply is in the lowest denomination possible.
    /// @param decimals the number of decimal places a token is divisible by
    /// @param fixedFees list of fixed fees to apply to the token
    /// @param fractionalFees list of fractional fees to apply to the token
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenAddress the created token's address
    function createFungibleTokenWithCustomFees(
        IHederaTokenService.HederaToken memory token,
        int64 initialTotalSupply,
        int32 decimals,
        IHederaTokenService.FixedFee[] memory fixedFees,
        IHederaTokenService.FractionalFee[] memory fractionalFees
    ) internal nonEmptyExpiry(token) returns (int responseCode, address tokenAddress) {
        (bool success, bytes memory result) = precompileAddress.call{value: msg.value}(
            abi.encodeWithSelector(
                IHederaTokenService.createFungibleTokenWithCustomFees.selector,
                token,
                initialTotalSupply,
                decimals,
                fixedFees,
                fractionalFees
            )
        );
        (responseCode, tokenAddress) = success
            ? abi.decode(result, (int32, address))
            : (HederaResponseCodes.UNKNOWN, address(0));
    }

    /// Creates an Non Fungible Unique Token with the specified properties
    /// @param token the basic properties of the token being created
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenAddress the created token's address
    function createNonFungibleToken(
        IHederaTokenService.HederaToken memory token
    ) internal nonEmptyExpiry(token) returns (int responseCode, address tokenAddress) {
        (bool success, bytes memory result) = precompileAddress.call{value: msg.value}(
            abi.encodeWithSelector(IHederaTokenService.createNonFungibleToken.selector, token)
        );
        (responseCode, tokenAddress) = success
            ? abi.decode(result, (int32, address))
            : (HederaResponseCodes.UNKNOWN, address(0));
    }

    /// Creates an Non Fungible Unique Token with the specified properties
    /// @param token the basic properties of the token being created
    /// @param fixedFees list of fixed fees to apply to the token
    /// @param royaltyFees list of royalty fees to apply to the token
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenAddress the created token's address
    function createNonFungibleTokenWithCustomFees(
        IHederaTokenService.HederaToken memory token,
        IHederaTokenService.FixedFee[] memory fixedFees,
        IHederaTokenService.RoyaltyFee[] memory royaltyFees
    ) internal nonEmptyExpiry(token) returns (int responseCode, address tokenAddress) {
        (bool success, bytes memory result) = precompileAddress.call{value: msg.value}(
            abi.encodeWithSelector(
                IHederaTokenService.createNonFungibleTokenWithCustomFees.selector,
                token,
                fixedFees,
                royaltyFees
            )
        );
        (responseCode, tokenAddress) = success
            ? abi.decode(result, (int32, address))
            : (HederaResponseCodes.UNKNOWN, address(0));
    }

    /// Retrieves fungible specific token info for a fungible token
    /// @param token The ID of the token as a solidity address
    function getFungibleTokenInfo(
        address token
    ) internal returns (int responseCode, IHederaTokenService.FungibleTokenInfo memory tokenInfo) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.getFungibleTokenInfo.selector, token)
        );
        IHederaTokenService.FungibleTokenInfo memory defaultTokenInfo;
        (responseCode, tokenInfo) = success
            ? abi.decode(result, (int32, IHederaTokenService.FungibleTokenInfo))
            : (HederaResponseCodes.UNKNOWN, defaultTokenInfo);
    }

    /// Retrieves general token info for a given token
    /// @param token The ID of the token as a solidity address
    function getTokenInfo(
        address token
    ) internal returns (int responseCode, IHederaTokenService.TokenInfo memory tokenInfo) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.getTokenInfo.selector, token)
        );
        IHederaTokenService.TokenInfo memory defaultTokenInfo;
        (responseCode, tokenInfo) = success
            ? abi.decode(result, (int32, IHederaTokenService.TokenInfo))
            : (HederaResponseCodes.UNKNOWN, defaultTokenInfo);
    }

    /// Retrieves non-fungible specific token info for a given NFT
    /// @param token The ID of the token as a solidity address
    function getNonFungibleTokenInfo(
        address token,
        int64 serialNumber
    ) internal returns (int responseCode, IHederaTokenService.NonFungibleTokenInfo memory tokenInfo) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.getNonFungibleTokenInfo.selector, token, serialNumber)
        );
        IHederaTokenService.NonFungibleTokenInfo memory defaultTokenInfo;
        (responseCode, tokenInfo) = success
            ? abi.decode(result, (int32, IHederaTokenService.NonFungibleTokenInfo))
            : (HederaResponseCodes.UNKNOWN, defaultTokenInfo);
    }

    /// Query token custom fees
    /// @param token The token address to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return fixedFees Set of fixed fees for `token`
    /// @return fractionalFees Set of fractional fees for `token`
    /// @return royaltyFees Set of royalty fees for `token`
    function getTokenCustomFees(
        address token
    )
        internal
        returns (
            int64 responseCode,
            IHederaTokenService.FixedFee[] memory fixedFees,
            IHederaTokenService.FractionalFee[] memory fractionalFees,
            IHederaTokenService.RoyaltyFee[] memory royaltyFees
        )
    {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.getTokenCustomFees.selector, token)
        );
        IHederaTokenService.FixedFee[] memory defaultFixedFees;
        IHederaTokenService.FractionalFee[] memory defaultFractionalFees;
        IHederaTokenService.RoyaltyFee[] memory defaultRoyaltyFees;
        (responseCode, fixedFees, fractionalFees, royaltyFees) = success
            ? abi.decode(
                result,
                (
                    int32,
                    IHederaTokenService.FixedFee[],
                    IHederaTokenService.FractionalFee[],
                    IHederaTokenService.RoyaltyFee[]
                )
            )
            : (HederaResponseCodes.UNKNOWN, defaultFixedFees, defaultFractionalFees, defaultRoyaltyFees);
    }

    /// Allows spender to withdraw from your account multiple times, up to the value amount. If this function is called
    /// again it overwrites the current allowance with value.
    /// Only Applicable to Fungible Tokens
    /// @param token The hedera token address to approve
    /// @param spender the account authorized to spend
    /// @param amount the amount of tokens authorized to spend.
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function approve(address token, address spender, uint256 amount) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.approve.selector, token, spender, amount)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Allows spender to withdraw from your account multiple times, up to the value amount. If this function is called
    /// again it overwrites the current allowance with value.
    /// Only Applicable to Fungible Tokens
    /// @param token The hedera token address to approve
    /// @param spender the account authorized to spend
    /// @param amount the amount of tokens authorized to spend.
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegateApprove(address token, address spender, uint256 amount) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.approve.selector, token, spender, amount)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Transfers `amount` tokens from `from` to `to` using the
    //  allowance mechanism. `amount` is then deducted from the caller's allowance.
    /// Only applicable to fungible tokens
    /// @param token The address of the fungible Hedera token to transfer
    /// @param from The account address of the owner of the token, on the behalf of which to transfer `amount` tokens
    /// @param to The account address of the receiver of the `amount` tokens
    /// @param amount The amount of tokens to transfer from `from` to `to`
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function transferFrom(
        address token,
        address from,
        address to,
        uint256 amount
    ) external returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.transferFrom.selector, token, from, to, amount)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Transfers `amount` tokens from `from` to `to` using the
    //  allowance mechanism. `amount` is then deducted from the caller's allowance.
    /// Only applicable to fungible tokens
    /// @param token The address of the fungible Hedera token to transfer
    /// @param from The account address of the owner of the token, on the behalf of which to transfer `amount` tokens
    /// @param to The account address of the receiver of the `amount` tokens
    /// @param amount The amount of tokens to transfer from `from` to `to`
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegateTransferFrom(
        address token,
        address from,
        address to,
        uint256 amount
    ) external returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.transferFrom.selector, token, from, to, amount)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Transfers `serialNumber` of `token` from `from` to `to` using the allowance mechanism.
    /// Only applicable to NFT tokens
    /// @param token The address of the non-fungible Hedera token to transfer
    /// @param from The account address of the owner of `serialNumber` of `token`
    /// @param to The account address of the receiver of `serialNumber`
    /// @param serialNumber The NFT serial number to transfer
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function transferFromNFT(
        address token,
        address from,
        address to,
        uint256 serialNumber
    ) external returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.transferFromNFT.selector, token, from, to, serialNumber)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Transfers `serialNumber` of `token` from `from` to `to` using the allowance mechanism.
    /// Only applicable to NFT tokens
    /// @param token The address of the non-fungible Hedera token to transfer
    /// @param from The account address of the owner of `serialNumber` of `token`
    /// @param to The account address of the receiver of `serialNumber`
    /// @param serialNumber The NFT serial number to transfer
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegateTransferFromNFT(
        address token,
        address from,
        address to,
        uint256 serialNumber
    ) external returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.transferFromNFT.selector, token, from, to, serialNumber)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Returns the amount which spender is still allowed to withdraw from owner.
    /// Only Applicable to Fungible Tokens
    /// @param token The Hedera token address to check the allowance of
    /// @param owner the owner of the tokens to be spent
    /// @param spender the spender of the tokens
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function allowance(
        address token,
        address owner,
        address spender
    ) internal returns (int responseCode, uint256 amount) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.allowance.selector, token, owner, spender)
        );
        (responseCode, amount) = success ? abi.decode(result, (int32, uint256)) : (HederaResponseCodes.UNKNOWN, 0);
    }

    /// Allow or reaffirm the approved address to transfer an NFT the approved address does not own.
    /// Only Applicable to NFT Tokens
    /// @param token The Hedera NFT token address to approve
    /// @param approved The new approved NFT controller.  To revoke approvals pass in the zero address.
    /// @param serialNumber The NFT serial number  to approve
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function approveNFT(address token, address approved, uint256 serialNumber) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.approveNFT.selector, token, approved, serialNumber)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Allow or reaffirm the approved address to transfer an NFT the approved address does not own.
    /// Only Applicable to NFT Tokens
    /// @param token The Hedera NFT token address to approve
    /// @param approved The new approved NFT controller.  To revoke approvals pass in the zero address.
    /// @param serialNumber The NFT serial number  to approve
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegateApproveNFT(
        address token,
        address approved,
        uint256 serialNumber
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.approveNFT.selector, token, approved, serialNumber)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Get the approved address for a single NFT
    /// Only Applicable to NFT Tokens
    /// @param token The Hedera NFT token address to check approval
    /// @param serialNumber The NFT to find the approved address for
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return approved The approved address for this NFT, or the zero address if there is none
    function getApproved(address token, uint256 serialNumber) internal returns (int responseCode, address approved) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.getApproved.selector, token, serialNumber)
        );
        (responseCode, approved) = success
            ? abi.decode(result, (int32, address))
            : (HederaResponseCodes.UNKNOWN, address(0));
    }

    /// Query if token account is frozen
    /// @param token The token address to check
    /// @param account The account address associated with the token
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return frozen True if `account` is frozen for `token`
    function isFrozen(address token, address account) internal returns (int64 responseCode, bool frozen) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.isFrozen.selector, token, account)
        );
        (responseCode, frozen) = success ? abi.decode(result, (int32, bool)) : (HederaResponseCodes.UNKNOWN, false);
    }

    /// Query if token account has kyc granted
    /// @param token The token address to check
    /// @param account The account address associated with the token
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return kycGranted True if `account` has kyc granted for `token`
    function isKyc(address token, address account) internal returns (int64 responseCode, bool kycGranted) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.isKyc.selector, token, account)
        );
        (responseCode, kycGranted) = success ? abi.decode(result, (int32, bool)) : (HederaResponseCodes.UNKNOWN, false);
    }

    /// Operation to freeze token account
    /// @param token The token address
    /// @param account The account address to be frozen
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function freezeToken(address token, address account) internal returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.freezeToken.selector, token, account)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to delegate freeze token account
    /// @param token The token address
    /// @param account The account address to be frozen
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegateFreezeToken(address token, address account) internal returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.freezeToken.selector, token, account)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to unfreeze token account
    /// @param token The token address
    /// @param account The account address to be unfrozen
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function unfreezeToken(address token, address account) internal returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.unfreezeToken.selector, token, account)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to delegate unfreeze token account
    /// @param token The token address
    /// @param account The account address to be unfrozen
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegateUnfreezeToken(address token, address account) internal returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.unfreezeToken.selector, token, account)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to grant kyc to token account
    /// @param token The token address
    /// @param account The account address to grant kyc
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function grantTokenKyc(address token, address account) internal returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.grantTokenKyc.selector, token, account)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to revoke kyc to token account
    /// @param token The token address
    /// @param account The account address to revoke kyc
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function revokeTokenKyc(address token, address account) internal returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.revokeTokenKyc.selector, token, account)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Enable or disable approval for a third party ("operator") to manage
    ///  all of `msg.sender`'s assets
    /// @param token The Hedera NFT token address to approve
    /// @param operator Address to add to the set of authorized operators
    /// @param approved True if the operator is approved, false to revoke approval
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function setApprovalForAll(address token, address operator, bool approved) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.setApprovalForAll.selector, token, operator, approved)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Enable or disable approval for a third party ("operator") to manage
    ///  all of `msg.sender`'s assets
    /// @param token The Hedera NFT token address to approve
    /// @param operator Address to add to the set of authorized operators
    /// @param approved True if the operator is approved, false to revoke approval
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegateSetApprovalForAll(
        address token,
        address operator,
        bool approved
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.setApprovalForAll.selector, token, operator, approved)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Query if an address is an authorized operator for another address
    /// Only Applicable to NFT Tokens
    /// @param token The Hedera NFT token address to approve
    /// @param owner The address that owns the NFTs
    /// @param operator The address that acts on behalf of the owner
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return approved True if `operator` is an approved operator for `owner`, false otherwise
    function isApprovedForAll(
        address token,
        address owner,
        address operator
    ) internal returns (int responseCode, bool approved) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.isApprovedForAll.selector, token, owner, operator)
        );
        (responseCode, approved) = success ? abi.decode(result, (int32, bool)) : (HederaResponseCodes.UNKNOWN, false);
    }

    /// Query token default freeze status
    /// @param token The token address to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return defaultFreezeStatus True if `token` default freeze status is frozen.
    function getTokenDefaultFreezeStatus(address token) internal returns (int responseCode, bool defaultFreezeStatus) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.getTokenDefaultFreezeStatus.selector, token)
        );
        (responseCode, defaultFreezeStatus) = success
            ? abi.decode(result, (int32, bool))
            : (HederaResponseCodes.UNKNOWN, false);
    }

    /// Query token default kyc status
    /// @param token The token address to check
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return defaultKycStatus True if `token` default kyc status is KycNotApplicable and false if Revoked.
    function getTokenDefaultKycStatus(address token) internal returns (int responseCode, bool defaultKycStatus) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.getTokenDefaultKycStatus.selector, token)
        );
        (responseCode, defaultKycStatus) = success
            ? abi.decode(result, (int32, bool))
            : (HederaResponseCodes.UNKNOWN, false);
    }

    /**********************
     * ABI v1 calls       *
     **********************/

    /// Initiates a Fungible Token Transfer
    /// @param token The ID of the token as a solidity address
    /// @param accountIds account to do a transfer to/from
    /// @param amounts The amount from the accountId at the same index
    function transferTokens(
        address token,
        address[] memory accountIds,
        int64[] memory amounts
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.transferTokens.selector, token, accountIds, amounts)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Initiates a Non-Fungable Token Transfer
    /// @param token The ID of the token as a solidity address
    /// @param sender the sender of an nft
    /// @param receiver the receiver of the nft sent by the same index at sender
    /// @param serialNumber the serial number of the nft sent by the same index at sender
    function transferNFTs(
        address token,
        address[] memory sender,
        address[] memory receiver,
        int64[] memory serialNumber
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.transferNFTs.selector, token, sender, receiver, serialNumber)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Transfers tokens where the calling account/contract is implicitly the first entry in the token transfer list,
    /// where the amount is the value needed to zero balance the transfers. Regular signing rules apply for sending
    /// (positive amount) or receiving (negative amount)
    /// @param token The token to transfer to/from
    /// @param sender The sender for the transaction
    /// @param receiver The receiver of the transaction
    /// @param amount Non-negative value to send. a negative value will result in a failure.
    function transferToken(
        address token,
        address sender,
        address receiver,
        int64 amount
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.transferToken.selector, token, sender, receiver, amount)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    // Router is using delegatecall - don't need to associate tokens to router
    function transferTokenRouter(
        address token,
        address sender,
        address receiver,
        int64 amount
    ) internal returns (int32 responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.transferToken.selector, token, sender, receiver, amount)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Transfers tokens where the calling account/contract is implicitly the first entry in the token transfer list,
    /// where the amount is the value needed to zero balance the transfers. Regular signing rules apply for sending
    /// (positive amount) or receiving (negative amount)
    /// @param token The token to transfer to/from
    /// @param sender The sender for the transaction
    /// @param receiver The receiver of the transaction
    /// @param serialNumber The serial number of the NFT to transfer.
    function transferNFT(
        address token,
        address sender,
        address receiver,
        int64 serialNumber
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.transferNFT.selector, token, sender, receiver, serialNumber)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to pause token
    /// @param token The token address to be paused
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function pauseToken(address token) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.pauseToken.selector, token)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to delegate pause token
    /// @param token The token address to be paused
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegatePauseToken(address token) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.pauseToken.selector, token)
        );
        responseCode = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to unpause token
    /// @param token The token address to be unpaused
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function unpauseToken(address token) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.unpauseToken.selector, token)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to delegate unpause token
    /// @param token The token address to be unpaused
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegateUnpauseToken(address token) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.unpauseToken.selector, token)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to wipe fungible tokens from account
    /// @param token The token address
    /// @param account The account address to revoke kyc
    /// @param amount The number of tokens to wipe
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function wipeTokenAccount(address token, address account, int64 amount) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.wipeTokenAccount.selector, token, account, amount)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to wipe fungible tokens from account with delegate call
    /// @param token The token address
    /// @param account The account address to revoke kyc
    /// @param amount The number of tokens to wipe
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegateWipeTokenAccount(
        address token,
        address account,
        int64 amount
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.wipeTokenAccount.selector, token, account, amount)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to wipe non fungible tokens from account
    /// @param token The token address
    /// @param account The account address to revoke kyc
    /// @param  serialNumbers The serial numbers of token to wipe
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function wipeTokenAccountNFT(
        address token,
        address account,
        int64[] memory serialNumbers
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.wipeTokenAccountNFT.selector, token, account, serialNumbers)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to delete token
    /// @param token The token address
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function deleteToken(address token) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.deleteToken.selector, token)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to update token keys
    /// @param token The token address
    /// @param keys The token keys
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function updateTokenKeys(
        address token,
        IHederaTokenService.TokenKey[] memory keys
    ) internal returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.updateTokenKeys.selector, token, keys)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to update token keys with delegate call
    /// @param token The token address
    /// @param keys The token keys
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function delegateUpdateTokenKeys(
        address token,
        IHederaTokenService.TokenKey[] memory keys
    ) internal returns (int64 responseCode) {
        (bool success, bytes memory result) = precompileAddress.delegatecall(
            abi.encodeWithSelector(IHederaTokenService.updateTokenKeys.selector, token, keys)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Query token KeyValue
    /// @param token The token address to check
    /// @param keyType The keyType of the desired KeyValue
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return key KeyValue info for key of type `keyType`
    function getTokenKey(
        address token,
        uint keyType
    ) internal returns (int64 responseCode, IHederaTokenService.KeyValue memory key) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.getTokenKey.selector, token, keyType)
        );
        IHederaTokenService.KeyValue memory defaultKeyValueInfo;
        (responseCode, key) = success
            ? abi.decode(result, (int32, IHederaTokenService.KeyValue))
            : (HederaResponseCodes.UNKNOWN, defaultKeyValueInfo);
    }

    /// Query if valid token found for the given address
    /// @param token The token address
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return isTokenFlag True if valid token found for the given address
    function isToken(address token) internal returns (int64 responseCode, bool isTokenFlag) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.isToken.selector, token)
        );
        (responseCode, isTokenFlag) = success
            ? abi.decode(result, (int32, bool))
            : (HederaResponseCodes.UNKNOWN, false);
    }

    /// Query to return the token type for a given address
    /// @param token The token address
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return tokenType the token type. 0 is FUNGIBLE_COMMON, 1 is NON_FUNGIBLE_UNIQUE, -1 is UNRECOGNIZED
    function getTokenType(address token) internal returns (int64 responseCode, int32 tokenType) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.getTokenType.selector, token)
        );
        (responseCode, tokenType) = success ? abi.decode(result, (int32, int32)) : (HederaResponseCodes.UNKNOWN, -1);
    }

    /// Operation to get token expiry info
    /// @param token The token address
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    /// @return expiryInfo The expiry info of the token
    function getTokenExpiryInfo(
        address token
    ) internal returns (int responseCode, IHederaTokenService.Expiry memory expiryInfo) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.getTokenExpiryInfo.selector, token)
        );
        IHederaTokenService.Expiry memory defaultExpiryInfo;
        (responseCode, expiryInfo) = success
            ? abi.decode(result, (int32, IHederaTokenService.Expiry))
            : (HederaResponseCodes.UNKNOWN, defaultExpiryInfo);
    }

    /// Operation to update token expiry info
    /// @param token The token address
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function updateTokenExpiryInfo(
        address token,
        IHederaTokenService.Expiry memory expiryInfo
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.updateTokenExpiryInfo.selector, token, expiryInfo)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }

    /// Operation to update token info
    /// @param token The token address
    /// @param tokenInfo The hedera token info to update token with
    /// @return responseCode The response code for the status of the request. SUCCESS is 22.
    function updateTokenInfo(
        address token,
        IHederaTokenService.HederaToken memory tokenInfo
    ) internal returns (int responseCode) {
        (bool success, bytes memory result) = precompileAddress.call(
            abi.encodeWithSelector(IHederaTokenService.updateTokenInfo.selector, token, tokenInfo)
        );
        (responseCode) = success ? abi.decode(result, (int32)) : HederaResponseCodes.UNKNOWN;
    }
}


// File contracts/hedera/system/SafeCast.sol

// Original license: SPDX_License_Identifier: Apache-2.0
pragma solidity >=0.5.0 <0.9.0;

library SafeCast {
    function toInt64(int256 value) internal pure returns (int64 downcasted) {
        downcasted = int64(value);
        require(downcasted == value, "SafeCast: value doesn't fit in 64 bits");
    }

    function toInt64(uint256 value) internal pure returns (int64) {
        // Note: Unsafe cast below is okay because `type(int64).max` is guaranteed to be positive
        require(value <= uint256(uint64(type(int64).max)), "SafeCast: value doesn't fit in an int64");
        return int64(uint64(value));
    }

    function toUint64(uint256 value) internal pure returns (uint64) {
        require(value <= type(uint64).max, "SafeCast: value doesn't fit in 64 bits");
        return uint64(value);
    }
}


// File contracts/hedera/system/SafeHederaTokenService.sol

// Original license: SPDX_License_Identifier: Apache-2.0
pragma solidity >=0.4.9 <0.9.0;
// Original pragma directive: pragma experimental ABIEncoderV2
abstract contract SafeHederaTokenService is HederaTokenService {
    using SafeCast for uint256;

    event Transfer(address indexed from, address indexed to, uint64 value);

    function safeMintToken(
        address token,
        uint256 amount,
        bytes[] memory metadata
    ) internal returns (int64 newTotalSupply, int64[] memory serialNumbers) {
        int256 responseCode;
        (responseCode, newTotalSupply, serialNumbers) = HederaTokenService.mintToken(token, amount.toInt64(), metadata);
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe mint failed!");
    }

    function safeBurnToken(
        address token,
        uint256 amount,
        int64[] memory serialNumbers
    ) internal returns (int64 newTotalSupply) {
        int256 responseCode;
        (responseCode, newTotalSupply) = HederaTokenService.burnToken(token, amount.toInt64(), serialNumbers);
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe burn failed!");
    }

    function safeAssociateTokens(address account, address[] memory tokens) internal {
        int256 responseCode;
        (responseCode) = HederaTokenService.associateTokens(account, tokens);
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe multiple associations failed!");
    }

    function safeAssociateToken(address account, address token) internal {
        int256 responseCode;
        (responseCode) = HederaTokenService.associateToken(account, token);
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe single association failed!");
    }

    function safeTransferToken(address token, address sender, address receiver, uint256 amount) internal {
        int256 responseCode;
        (responseCode) = HederaTokenService.transferToken(token, sender, receiver, amount.toInt64());
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe token transfer failed!");
    }

    function safeTransferTokenRouter(address token, address sender, address receiver, uint256 amount) internal {
        int32 responseCode;
        (responseCode) = HederaTokenService.transferTokenRouter(token, sender, receiver, amount.toInt64());
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe token transfer router failed!");
    }

    function safeApprove(address token, address spender, uint256 amount) internal {
        int responseCode;
        (responseCode) = HederaTokenService.approve(token, spender, amount);
        require(responseCode == HederaResponseCodes.SUCCESS, "Safe approve failed!");
    }
}


// File contracts/BondIssuance.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.0;
/**
 * @title BondIssuance
 * @dev [Vincent]
 */

// feature update: check priceFeed last update is validate
// feature update: support for different token decimal
interface IPriceFeed {
    function getLatestPrice(address _tokenA, address _tokenB) external view returns (uint256, uint256); // price, lastUpdated
}

interface IUniswapV2Router {
    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
}

contract BondIssuance is AccessControl, ReentrancyGuard, SafeHederaTokenService {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    address public vault;

    bool public useErc20Mode = false;
    uint256 public platformFeePercent = 50; // 5%
    uint256 public issuanceDateWaitingLoan;
    address public platformFeeAddress;

    IPriceFeed public priceFeed;
    BondERC1155Token public bondToken;
    IUniswapV2Router public saucerSwapRouter = IUniswapV2Router(0x0000000000000000000000000000000000004b40);

    struct Lender {
        address lender;
        uint256 amountLend;
        uint256 amountBond;
    }
    struct Bond {
        string name;
        address loanToken;
        uint256 loanAmount;
        uint256 volumeBond;
        uint256 bondDuration; // in weeks
        uint256 borrowerInterestRate;
        uint256 lenderInterestRate;
        uint256 platformFeePercent;
        address collateralToken;
        uint256 collateralAmount;
        uint256 issuanceDate;
        uint256 maturityDate;
        address borrower;
        Lender[] lenders;
        uint256 totalLend;
        uint256 totalBond;
        uint256 liquidationLoanTokenAmount;
        bool isActive;
        bool readyToRepay;
        bool isBorrowerClaimed;
    }

    Bond[] public bonds;
    mapping(address => uint256[]) public userBonds;
    mapping(address => uint256) public loanTokenRatePerBond;
    mapping(address => uint256) public collateralScalingFactor;
    mapping(address => uint256) public thresholdLiquidityCollateral;

    event BondCreated(
        uint256 bondId,
        string name,
        address indexed borrower,
        address loanToken,
        uint256 loanAmount,
        uint256 volumeBond,
        uint256 bondDuration,
        uint256 borrowerInterestRate,
        uint256 lenderInterestRate,
        address collateralToken,
        uint256 collateralAmount,
        uint256 issuanceDate,
        uint256 maturityDate
    );
    event RateTokenPerBondUpdated(address indexed token, uint256 rate);
    event UpScaleCollateralUpdated(address indexed token, uint256 scale);
    event LenderParticipated(uint256 bondId, address indexed lender, uint256 amountLend, uint256 amountBond);
    event BondRepaid(
        uint256 indexed bondId,
        address indexed borrower,
        uint256 totalLend,
        uint256 repaymentAmount,
        uint256 interestPaid,
        uint256 collateralReturnedAmount
    );
    event BorrowerClaimLoanToken(uint256 bondId, address indexed borrower, address loanToken, uint256 loanAmount);
    event BorrowerRefundoanToken(
        uint256 bondId,
        address indexed borrower,
        address collateralToken,
        uint256 collateralAmount
    );

    event BondLiquidated(
        uint256 indexed bondId,
        address indexed borrower,
        uint256 collateralAmount,
        uint256 currentCollateralValue,
        uint256 loanTokenReceived,
        uint256 repaymentAmount,
        uint256 excessRefund
    );
    event LenderClaimed(
        uint256 indexed bondId,
        address indexed lender,
        uint256 bondTokenAmount,
        uint256 loanTokenAmount,
        uint256 interestLoanTokenAmount,
        uint256 repaymentAmount
    );
    event PlatformFeeUpdated(uint256 oldFee, uint256 newFee);
    event CollateralAdded(
        uint256 indexed bondId,
        address indexed borrower,
        address collateralToken,
        uint256 additionalCollateralAmount,
        uint256 newCollateralAmount
    );

    constructor(address _priceFeed) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
        priceFeed = IPriceFeed(_priceFeed);
        platformFeeAddress = msg.sender;

        bondToken = new BondERC1155Token("https://hedera.com/ipfs/vincent");
        vault = address(this);
        issuanceDateWaitingLoan = 7 minutes;
    }

    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
        _;
    }

    function setPlatformFeeAddress(address _newFeeAddress) external onlyAdmin {
        require(_newFeeAddress != address(0), "Invalid address");
        platformFeeAddress = _newFeeAddress;
    }

    function setRateTokenPerBond(address _token, uint256 _rate) external onlyAdmin {
        loanTokenRatePerBond[_token] = _rate;
        emit RateTokenPerBondUpdated(_token, _rate);
    }

    function setUpScaleCollateral(address _token, uint256 _scale) external onlyAdmin {
        // 1000 scale is 100%
        collateralScalingFactor[_token] = _scale;
        emit UpScaleCollateralUpdated(_token, _scale);
    }

    function setThresholdLiquidityCollateral(address _token, uint256 _scale) external onlyAdmin {
        thresholdLiquidityCollateral[_token] = _scale;
    }

    function setPlatformFee(uint256 _newFee) external onlyAdmin {
        require(_newFee <= 1000, "Fee must be less than or equal to 1000");
        uint256 oldFee = platformFeePercent;
        platformFeePercent = _newFee;
        emit PlatformFeeUpdated(oldFee, _newFee);
    }

    function setIssuanceDateWaitingLoan(uint256 _waitingPeriod) external onlyAdmin {
        issuanceDateWaitingLoan = _waitingPeriod;
    }

    function calculateLoanTokenToBondToken(address _loanToken, uint256 _loanAmount) public view returns (uint256) {
        require(loanTokenRatePerBond[_loanToken] > 0, "Rate for loan token not set.");
        return _loanAmount / loanTokenRatePerBond[_loanToken];
    }

    function calculateBondTokenToLoanToken(address _loanToken, uint256 _bondTokenAmount) public view returns (uint256) {
        require(loanTokenRatePerBond[_loanToken] > 0, "Rate for loan token not set.");
        return _bondTokenAmount * loanTokenRatePerBond[_loanToken];
    }

    function collateralAmountCalculation(
        address _loanToken,
        uint256 _loanAmount,
        address _collateralToken
    ) public view returns (uint256) {
        (uint256 collateralRate, ) = priceFeed.getLatestPrice(_collateralToken, _loanToken);
        require(collateralRate > 0, "Invalid price from price feed");
        return (_loanAmount * 1e8) / collateralRate;
    }

    function collateralAmountCalculationWithScale(
        address _loanToken,
        uint256 _loanAmount,
        address _collateralToken
    ) public view returns (uint256) {
        (uint256 collateralRate, ) = priceFeed.getLatestPrice(_collateralToken, _loanToken);
        require(collateralRate > 0, "Invalid price from price feed");
        uint256 scale = collateralScalingFactor[_collateralToken];
        require(scale > 0, "Upscale factor for collateral token is not set");
        return ((((_loanAmount * 1e8) / collateralRate) * scale) / 1000);
    }

    function calculateBondDates(
        uint256 _bondDuration
    ) private view returns (uint256 issuanceDate, uint256 maturityDate) {
        issuanceDate = block.timestamp + issuanceDateWaitingLoan;
        maturityDate = issuanceDate + (_bondDuration * 1 hours);
    }

    function createBond(
        string memory _name,
        address _loanToken,
        uint256 _loanAmount,
        uint256 _bondDuration, // in hours
        uint256 _borrowerInterestRate,
        uint256 _lenderInterestRate,
        address _collateralToken
    ) public {
        uint256 volumeBond = calculateLoanTokenToBondToken(_loanToken, _loanAmount);
        require(volumeBond > 0, "Volume bond must be greater than 1");
        require(
            _lenderInterestRate + platformFeePercent == _borrowerInterestRate,
            "Lender Interest Rate and Platform Fee must equal Borrower Interest Rate"
        );

        uint256 issuanceDate;
        uint256 maturityDate;
        (issuanceDate, maturityDate) = calculateBondDates(_bondDuration);

        uint256 collateralAmount = collateralAmountCalculationWithScale(_loanToken, _loanAmount, _collateralToken);

        Bond memory newBond = Bond({
            name: _name,
            loanToken: _loanToken,
            loanAmount: _loanAmount,
            volumeBond: volumeBond,
            bondDuration: _bondDuration,
            borrowerInterestRate: _borrowerInterestRate,
            platformFeePercent: platformFeePercent,
            lenderInterestRate: _lenderInterestRate,
            collateralToken: _collateralToken,
            collateralAmount: collateralAmount,
            issuanceDate: issuanceDate,
            maturityDate: maturityDate,
            borrower: msg.sender,
            lenders: new Lender[](0),
            totalLend: 0,
            totalBond: 0,
            isActive: true,
            isBorrowerClaimed: false,
            readyToRepay: false,
            liquidationLoanTokenAmount: 0
        });

        if (useErc20Mode) {
            IERC20 collateralToken = IERC20(newBond.collateralToken);
            require(
                collateralToken.transferFrom(msg.sender, address(this), newBond.collateralAmount),
                "Collateral transfer from borrower failed"
            );
        } else {
            safeTransferToken(newBond.collateralToken, msg.sender, vault, newBond.collateralAmount);
        }

        bonds.push(newBond);
        uint256 bondId = bonds.length - 1;
        userBonds[msg.sender].push(bondId);

        emit BondCreated(
            bondId,
            _name,
            msg.sender,
            _loanToken,
            _loanAmount,
            volumeBond,
            _bondDuration,
            _borrowerInterestRate,
            _lenderInterestRate,
            _collateralToken,
            collateralAmount,
            issuanceDate,
            maturityDate
        );
    }

    function buyBond(uint256 bondId, uint256 amount) external nonReentrant {
        require(bondId < bonds.length, "Bond does not exist");
        Bond storage bond = bonds[bondId];
        address lender = msg.sender;
        require(bond.isActive, "Bond must be active for this operation.");
        require(!bond.readyToRepay, "Bond is already repaid");
        require(block.timestamp <= bond.issuanceDate, "Bond was issuanced");

        uint256 amountLend = calculateBondTokenToLoanToken(bond.loanToken, amount);
        require(bond.totalLend + amountLend <= bond.loanAmount, "Borrower not need borrow more");

        if (useErc20Mode) {
            IERC20 loanToken = IERC20(bond.loanToken);
            require(loanToken.transferFrom(lender, address(this), amountLend), "Transfer failed");
        } else {
            safeTransferToken(bond.loanToken, lender, vault, amountLend);
        }

        bond.lenders.push(Lender({lender: lender, amountLend: amountLend, amountBond: amount}));
        bond.totalLend += amountLend;
        bond.totalBond += amount;
        bondToken.mint(lender, bondId, amount, "");

        emit LenderParticipated(bondId, lender, amountLend, amount);
    }

    function borrowerClaim(uint256 bondId) external nonReentrant {
        require(bondId < bonds.length, "Bond does not exist.");
        Bond storage bond = bonds[bondId];
        require(bond.isActive, "Bond must be active for this operation.");
        require(!bond.readyToRepay, "Bond is already repaid.");
        require(!bond.isBorrowerClaimed, "Claimed before");
        require(block.timestamp > bond.issuanceDate, "Claim must be after issuance date.");

        if (useErc20Mode) {
            IERC20 loanToken = IERC20(bond.loanToken);
            require(loanToken.transfer(bond.borrower, bond.totalLend), "Transfer to lend token to borrower failed");
        } else {
            safeTransferToken(bond.loanToken, vault, bond.borrower, bond.totalLend);
        }

        bond.isBorrowerClaimed = true;

        emit BorrowerClaimLoanToken(bondId, bond.borrower, bond.loanToken, bond.totalLend);
    }

    function borrowerRefund(uint256 bondId) external nonReentrant {
        require(bondId < bonds.length, "Bond does not exist.");
        Bond storage bond = bonds[bondId];
        require(bond.isActive, "Bond must be active for this operation.");
        require(!bond.readyToRepay, "Bond is already repaid.");
        require(!bond.isBorrowerClaimed, "Claimed before");
        require(bond.totalLend == 0, "Refund must be no lender participation.");
        if (block.timestamp <= bond.issuanceDate) {
            require(bond.borrower == msg.sender, "Only borrower refund in issuance date time.");
        }
        if (useErc20Mode) {
            IERC20 collateralToken = IERC20(bond.collateralToken);
            require(
                collateralToken.transfer(bond.borrower, bond.collateralAmount),
                "Transfer to collateral token to borrower failed"
            );
        } else {
            safeTransferToken(bond.collateralToken, vault, bond.borrower, bond.collateralAmount);
        }

        bond.isBorrowerClaimed = true;
        bond.isActive = false;

        emit BorrowerRefundoanToken(bondId, bond.borrower, bond.collateralToken, bond.collateralAmount);
    }

    function repayBond(uint256 bondId) external nonReentrant {
        require(bondId < bonds.length, "Bond does not exist");
        Bond storage bond = bonds[bondId];
        require(bond.isActive, "Bond must be active for this operation.");
        require(!bond.readyToRepay, "Bond is already repaid");
        require(block.timestamp > bond.issuanceDate, "Repay Bond be in issuance date");

        uint256 repaymentAmount = bond.totalLend + (bond.totalLend * bond.borrowerInterestRate) / 1000;
        uint256 interestPaid = repaymentAmount - bond.totalLend;

        uint256 platformFee = ((bond.totalLend * bond.platformFeePercent) / 1000) - 1;

        IERC20 loanToken = IERC20(bond.loanToken);
        IERC20 collateralToken = IERC20(bond.collateralToken);
        if (useErc20Mode) {
            require(
                loanToken.transferFrom(msg.sender, address(this), repaymentAmount),
                "Transfer from borrower failed"
            );
            require(
                collateralToken.transfer(bond.borrower, bond.collateralAmount),
                "Transfer of collateral to borrower failed"
            );
            require(loanToken.transfer(platformFeeAddress, platformFee), "Transfer of platform fee failed");
        } else {
            safeTransferToken(bond.collateralToken, vault, bond.borrower, bond.collateralAmount);
            safeTransferToken(bond.loanToken, msg.sender, vault, repaymentAmount);
            safeTransferToken(bond.loanToken, vault, platformFeeAddress, platformFee);
        }

        bond.readyToRepay = true;

        emit BondRepaid(bondId, bond.borrower, bond.totalLend, repaymentAmount, interestPaid, bond.collateralAmount);
    }

    function lenderClaim(uint256 bondId) external nonReentrant {
        require(bondId < bonds.length, "Bond does not exist");
        Bond storage bond = bonds[bondId];
        require(bond.isActive, "Bond must be active for this operation.");
        require(bond.readyToRepay, "Bond is not ready to repay");

        uint256 bondBalance = bondToken.balanceOf(msg.sender, bondId);
        require(bondBalance > 0, "Bond value insufficient");

        uint256 effectiveLoanAmount = (bond.liquidationLoanTokenAmount > 0)
            ? (bond.liquidationLoanTokenAmount * bondBalance) / bond.totalBond
            : (bond.totalLend * bondBalance) / bond.totalBond;

        uint256 repaymentAmount = effectiveLoanAmount + ((effectiveLoanAmount * bond.lenderInterestRate) / 1000);
        uint256 loanTokenAmount = calculateBondTokenToLoanToken(bond.loanToken, bondBalance);

        if (useErc20Mode) {
            IERC20 loanToken = IERC20(bond.loanToken);
            require(loanToken.transfer(msg.sender, repaymentAmount), "Transfer to lender failed");
        } else {
            safeTransferToken(bond.loanToken, vault, msg.sender, repaymentAmount);
        }

        bondToken.burn(msg.sender, bondId, bondBalance);

        emit LenderClaimed(
            bondId,
            msg.sender,
            bondBalance,
            loanTokenAmount,
            repaymentAmount - loanTokenAmount,
            repaymentAmount
        );
    }

    function isBondLiquidatable(uint256 bondId) public view returns (uint256, bool) {
        Bond memory bond = bonds[bondId];

        require(
            thresholdLiquidityCollateral[bond.collateralToken] > 0,
            "Threshold liquidity collateral not set for this token."
        );
        (uint256 currentRate, ) = priceFeed.getLatestPrice(bond.collateralToken, bond.loanToken);
        uint256 currentCollateralValue = (bond.collateralAmount * currentRate) / 1e8;
        return (
            currentCollateralValue,
            currentCollateralValue < (bond.totalLend * thresholdLiquidityCollateral[bond.collateralToken]) / 1000
        );
    }

    function liquidateBond(uint256 bondId) external nonReentrant {
        require(bondId < bonds.length, "Bond does not exist");
        Bond storage bond = bonds[bondId];
        require(bond.isActive && !bond.readyToRepay, "Bond cannot be liquidated");
        (uint256 currentCollateralValue, bool isLiquidate) = isBondLiquidatable(bondId);
        require(
            isLiquidate || block.timestamp > bond.maturityDate,
            "Liquidated must hight rich or after maturity date"
        );

        IERC20 loanToken = IERC20(bond.loanToken);
        uint256 swapLoanTokenReceive = 0;
        if (useErc20Mode) {
            swapLoanTokenReceive = 200 * 1e8; // mock
        } else {
            uint256[] memory amounts = swapCollateralToLoan(
                bond.collateralToken,
                bond.loanToken,
                bond.collateralAmount,
                0,
                block.timestamp + 15 minutes
            );
            swapLoanTokenReceive = amounts[1];
        }

        uint256 repaymentAmount = bond.totalLend + (bond.totalLend * bond.borrowerInterestRate) / 1000;
        uint256 platformFee = ((bond.totalLend * bond.platformFeePercent) / 1000) - 1;

        uint256 excessRefund = 0;
        if (swapLoanTokenReceive > repaymentAmount) {
            excessRefund = swapLoanTokenReceive - repaymentAmount;

            if (useErc20Mode) {
                require(loanToken.transfer(bond.borrower, excessRefund), "Transfer excess refund to borrower failed");
            } else {
                safeTransferToken(bond.loanToken, vault, bond.borrower, excessRefund);
            }
        }
        bond.liquidationLoanTokenAmount = swapLoanTokenReceive - excessRefund;
        bond.liquidationLoanTokenAmount = bond.liquidationLoanTokenAmount > bond.totalLend
            ? bond.totalLend
            : swapLoanTokenReceive - excessRefund;

        if (useErc20Mode) {
            require(loanToken.transfer(platformFeeAddress, platformFee), "Transfer of platform fee failed");
        } else {
            safeTransferToken(bond.loanToken, vault, platformFeeAddress, platformFee); //transfer fee
        }

        bond.readyToRepay = true;

        emit BondLiquidated(
            bondId,
            bond.borrower,
            bond.collateralAmount,
            currentCollateralValue,
            swapLoanTokenReceive,
            repaymentAmount,
            excessRefund
        );
    }

    function addCollateral(uint256 bondId, uint256 additionalCollateralAmount) external nonReentrant {
        require(bondId < bonds.length, "Bond does not exist");
        Bond storage bond = bonds[bondId];
        require(bond.isActive, "Bond must be active for this operation.");
        require(!bond.readyToRepay, "Bond is already repaid");

        if (useErc20Mode) {
            IERC20 collateralToken = IERC20(bond.collateralToken);
            require(
                collateralToken.transferFrom(msg.sender, address(this), additionalCollateralAmount),
                "Collateral transfer from borrower failed"
            );
        } else {
            safeTransferToken(bond.collateralToken, msg.sender, vault, additionalCollateralAmount);
        }

        bond.collateralAmount += additionalCollateralAmount;

        emit CollateralAdded(
            bondId,
            bond.borrower,
            bond.collateralToken,
            additionalCollateralAmount,
            bond.collateralAmount
        );
    }

    function swapCollateralToLoan(
        address collateralToken,
        address loanToken,
        uint256 amountIn,
        uint256 amountOutMin,
        uint256 deadline
    ) private returns (uint256[] memory) {
        require(amountIn > 0, "Amount in must be greater than 0");
        require(collateralToken != address(0) && loanToken != address(0), "Invalid token addresses");
        address[] memory path = new address[](2);
        path[0] = collateralToken;
        path[1] = loanToken;

        if (useErc20Mode) {
            IERC20(collateralToken).approve(address(saucerSwapRouter), amountIn);
        } else {
            safeApprove(collateralToken, address(saucerSwapRouter), amountIn);
        }

        uint256[] memory amounts = saucerSwapRouter.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            address(this),
            deadline
        );

        return amounts;
    }

    function getBond(uint256 bondId) external view returns (Bond memory) {
        require(bondId < bonds.length, "Bond does not exist");
        return bonds[bondId];
    }

    function getUserBonds(address user) external view returns (uint256[] memory) {
        return userBonds[user];
    }

    function tokenAssociate(address token) external onlyAdmin {
        safeAssociateToken(address(this), token);
    }
}
