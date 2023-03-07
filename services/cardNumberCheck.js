module.exports = (input) => {
  // Remove any spaces or dashes from the input
  input = input.replace(/[\s-]/g, "");

  // Check if the input is a 16-digit number
  if (!/^\d{16}$/.test(input)) {
    //return false if it is not a real credit number
    return false;
  }

  // Calculate the sum of the digits
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    let digit = parseInt(input[i], 10);

    // Double every other digit starting from the second-to-last
    if (i % 2 === input.length % 2) {
      digit *= 2;

      // If the doubled digit is greater than 9, subtract 9
      if (digit > 9) {
        digit -= 9;
      }
    }

    // Add the digit to the sum
    sum += digit;
  }

  // Check if the sum is a multiple of 10 and return true if it is a real credit number
  return sum % 10 === 0;
};
