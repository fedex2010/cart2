export const formatNumbers = (number) => {
    number = number.replace(new RegExp('\\.', 'g'), ',')

    let regex   = new RegExp('[^,\\d]', 'g'),
    numberReplaced = number.replace(regex, '').toString(),
    split   = numberReplaced.split(","),
    rest    = split[0].length % 3,
    result    = split[0].substr(0, rest),
    thousands = split[0].substr(rest).match(/\d{3}/g);
  
  if (thousands) {
    let separator = rest ? "." : '';
    result += separator + thousands.join(".");
  }
  result = split[1] !== undefined ? result + "," + split[1] : result;

  return result
};

