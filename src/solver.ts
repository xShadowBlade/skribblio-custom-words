/**
 * @file Function to output words from a given set of letters and a dictionary
 */

const specialChars = ["?", "*", "_", ".", "+", "^", "$", "(", ")", "[", "]", "{", "}", "|", "\\", "/"]; // Special characters that need to be escaped in regex

/**
 * Function to output words from a given set of letters and a dictionary
 * @param letters - The letters to use. Can have spaces. Unknown letters should be represented by a question mark (?), asterisk (*), underscore (_), or period (.)
 * @param dictionary - The dictionary to use
 * @returns The words that can be made from the letters
 */
function solve (letters: string, dictionary: string[]): string[] {
    const words: string[] = [];
    let lettersArr: string[] = letters.trim().split("");
    lettersArr = lettersArr.map((letter) => {
        letter = letter.toLowerCase();
        if (specialChars.includes(letter)) {
            letter = "[a-zA-Z]"; // . is a wildcard for use in regex
        }
        return letter;
    });
    // console.log(lettersArr);
    // const lettersSet = new Set(lettersArr);
    const lettersRegex = new RegExp(`^${lettersArr.join("")}$`);
    // console.log(lettersRegex);
    for (const word of dictionary) {
        // }
        if (word.match(lettersRegex)) {
            words.push(word);
        }
    }

    return words;
}

// Debugging
// // @ts-expect-error - Replaced by webpack
// if (MODE as boolean) (window as any).solve = solve;

export { solve };