/**
 * @class
 */
class SimpleFlag {
  /**
   * Constructor of SimpleFlag.
   * @param {Object} flagEnum Enum that has its values in base 2
   * @param {(Number|String)} flagValue Value which will be cheked for flags
   * @param {Object} options options (check documentatio for all options)
   */
  constructor(flagEnum, flagValue, options = {}) {
    this.flagValue = undefined;
    this.flagEnum = undefined;
    this.keys = 0;
    const { validateEnum = true } = options;

    if (flagEnum) {
      if (validateEnum) {
        const keys = Object.keys(flagEnum);
        const values = Object.values(flagEnum).sort((a, b) => a - b);

        values.forEach(value => {
          if (!Number.isInteger(Number(value)))
            throw new Error('All values must be integer');
        });

        if (keys.length > 32)
          throw new Error('Your Enum should have only 32 keys');

        if (values[values.length - 1] > 2147483648)
          throw new Error(
            'Maximum value of a property should be equal or above 2147483648'
          );

        if ([...new Set(values)].length !== values.length)
          throw new Error('Duplicate values are not allowed');

        if ([...new Set(keys)].length !== keys.length)
          throw new Error('Duplicate keys are not allowed');

        // Check if the values are correct for a Flag System
        const flagArr = [];
        for (let i = 0; i < values.length; i++) {
          flagArr.push(Math.pow(2, this.keys)); // eslint-disable-line
          this.keys += 1;
        }

        if (!values.every(v => flagArr.includes(v)))
          throw new Error('FlagEnum has invalid values. Check documentation');
      }

      this.keys = this.keys === 0 ? Object.keys(flagEnum).length : this.keys;
      this.flagEnum = flagEnum;
    } else {
      throw new Error('flagEnum must be provided');
    }

    if (flagValue) {
      if (typeof flagValue === 'number') {
        this.flagValue = flagValue;
      } else if (typeof flagValue === 'string') {
        const flagValueNumber = Number(flagValue);
        if (Number.isInteger(flagValueNumber)) {
          this.flagValue = flagValueNumber;
        } else {
          throw new Error('FlagValue must be an integer (32-bit ints)');
        }
      } else {
        throw new Error('FlagValue must be an integer (32-bit ints)');
      }
    } else {
      throw new Error('FlagValue must be provided');
    }
  }

  /**
   * Check if the flagValue has the flag provided.
   * @param {(String|Number)} flag flag to be checked.
   * @returns Boolean indicating if the flag were found
   */
  hasFlag(flag) {
    if (!flag) return false;

    if (typeof flag === 'string' && this.flagEnum) {
      if (this.flagEnum.hasOwnProperty(flag)) { // eslint-disable-line
        return (
          (this.flagValue & this.flagEnum[flag]) === this.flagEnum[flag] // eslint-disable-line no-bitwise
        );
      }
    } else if (typeof flag === 'number') {
      return (this.flagValue & flag) === flag; // eslint-disable-line no-bitwise
    } else {
      throw new Error(
        'Flag must be an integer or a string that represents a number'
      );
    }

    return false;
  }

  /**
   * Check if the flagValue has all the flags provided.
   * @param {(String[]|Number[])} flags Array of flags to be checked. Flags can be just number or the property name.
   * @returns Boolean indicating if all flags were found in flagValue
   */
  hasAllFlags(flags) {
    if (!Array.isArray(flags)) return false;

    for (let i = 0; i < flags.length; i++) {
      if (!this.hasFlag(flags[i])) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if the flagValue has any of the flags provided.
   * @param {(String[]|Number[])}  flags Array of flags to be checked. Flags can be just number or the property name.
   * @returns Boolean indicating if any flag were found in flagValue
   */
  hasAnyFlag(flags) {
    if (!Array.isArray(flags)) return false;

    for (let i = 0; i < flags.length; i++) {
      if (this.hasFlag(flags[i])) {
        return true;
      }
    }

    return false;
  }
}

module.exports = SimpleFlag;
