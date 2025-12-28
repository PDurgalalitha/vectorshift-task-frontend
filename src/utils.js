export const checkParenthesis = (str) => {
  let i = 0;
  let openCount = 0;
  if (str == null || str == undefined) return false;
  while (i < str.length) {
    if (str[i] === "{" && str[i + 1] === "{") {
      openCount++;
      i += 2; // Jump past both opening braces
    } else if (str[i] === "}" && str[i + 1] === "}") {
      if (openCount > 0) openCount--;
      i += 2; // Jump past both closing braces
    } else {
      i++; // Ignore any other character (a, s, d, single {, etc.)
    }
  }
  return openCount > 0;
};
