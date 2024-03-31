function onconvert() {
  var inputNumber = document.getElementById('text').value.trim();
  var fromBase = parseInt(document.getElementById('sell').value);
  var toBase = parseInt(document.getElementById('sel2').value);

  if (!inputNumber) {
    alert('Please enter a number.');
    return;
  }

  var validChars = getValidChars(fromBase);
  var regex = new RegExp('^[-]?[' + validChars + '.]+$', 'i');
  if (!regex.test(inputNumber)) {
    alert('Invalid input for the specified base.');
    return;
  }

  var decimalNumber = convertToDecimal(inputNumber, fromBase);

  if (isNaN(decimalNumber)) {
    alert('Invalid input. Please enter a valid number.');
    return;
  }

  var result = convertFromDecimal(decimalNumber, toBase);

  document.getElementById('y').value = result;
}

function convertToDecimal(number, base) {
  if (base === 10) {
    return parseFloat(number);
  }

  var isNegative = false;
  if (number.startsWith('-')) {
    isNegative = true;
    number = number.substring(1);
  }

  var parts = number.split('.');
  var integerPart = parseInt(parts[0], base);
  var decimalPart = 0;

  if (parts.length === 2) {
    var decimalChars = parts[1].split('');
    var power = -1;

    for (var i = 0; i < decimalChars.length; i++) {
      decimalPart += getCharValue(decimalChars[i]) * Math.pow(base, power);
      power--;
    }
  }

  var result = parseFloat(integerPart + decimalPart);
  return isNegative ? -result : result;
}

function convertFromDecimal(number, base) {
  if (base === 10) {
    return number.toString();
  }

  var integerPart = Math.floor(number);
  var decimalPart = number - integerPart;
  var result = '';

  if (integerPart < 0) {
    result = (-integerPart).toString(base).toUpperCase();
    result = '-' + result;
  } else {
    result = integerPart.toString(base).toUpperCase();
  }

  if (decimalPart > 0) {
    var decimalResult = '';
    var maxDigits = 12;

    while (decimalPart > 0 && decimalResult.length < maxDigits) {
      decimalPart *= base;
      var nextDigit = Math.floor(decimalPart);
      decimalResult += getDigitChar(nextDigit);
      decimalPart -= nextDigit;
    }

    result += '.' + decimalResult;
  }

  return result;
}

function padLeft(str, length, char) {
  while (str.length < length) {
    str = char + str;
  }
  return str;
}

function truncateTo16Bits(binaryStr) {
  if (binaryStr.length > 16) {
    return binaryStr.substring(binaryStr.length - 16);
  }
  return binaryStr;
}

function getCharValue(char) {
  if (char >= '0' && char <= '9') {
    return parseInt(char);
  } else if (char >= 'A' && char <= 'Z') {
    return char.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
  } else if (char >= 'a' && char <= 'z') {
    return char.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
  }
  return 0;
}

function getDigitChar(value) {
  if (value >= 0 && value <= 9) {
    return value.toString();
  } else if (value >= 10 && value <= 35) {
    return String.fromCharCode('A'.charCodeAt(0) + value - 10);
  }
  return '';
}

function getValidChars(base) {
  var chars = '';

  switch (base) {
    case 2:
      chars = '01';
      break;
    case 8:
      chars = '01234567';
      break;
    case 10:
      chars = '0123456789';
      break;
    case 16:
      chars = '0123456789abcdefABCDEF';
      break;
  }

  return chars;
}

function onrst() {
  document.getElementById('text').value = '';
  document.getElementById('y').value = '';
}

function swap() {
  var sell = document.getElementById('sell');
  var sel2 = document.getElementById('sel2');
  var temp = sell.value;
  sell.value = sel2.value;
  sel2.value = temp;
}
