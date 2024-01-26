/**
 * @file File that handles text input and display of the words
 */
import React, { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { solve } from "./solver";

/**
 * Fetch CSV file
 * @param url URL of CSV file
 * @returns Array of lines
 */
async function fetchCSVWords (url: string): Promise<string[]> {
    const data = await fetch(url)
        .then(response => response.text());
    let array = data.split("\n"); // split by newline to get an array of lines

    // Remove the first line
    array.shift();

    // Only get the first column
    array = array.map((array) => {
        return array.split(",")[0];
    });

    // console.log(array);
    return array;
}

Word.propTypes = {
    word: PropTypes.string.isRequired,
};
/**
 * Component for words
 * @param root0
 * @param root0.word
 */
function Word ({ word }: { word: string }) {
    /**
     * Copy the word to the clipboard
     */
    function copyWordToClipboard () {
        navigator.clipboard.writeText(word);
    }

    return <Button
        variant="primary"
        onClick={copyWordToClipboard}
        title="Click to copy"
    >
        {word}
    </Button>;
}


Solving.propTypes = {
    words: PropTypes.arrayOf(PropTypes.string).isRequired,
    // setWords: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
    // setLanguage: PropTypes.func.isRequired,
};
/**
 * Solving component
 * @param param - Solving props
 * @param param.words
 * @param param.language
 * @returns Solving component
 */
function Solving ({ words, language}: { words: string[], language: string }) {
    const [wordComponentsList, setWordComponentsList] = useState<React.JSX.Element[]>([]); // TODO: Fix

    // let defaultEng: string[] = [];
    const [defaultEng, setDefaultEng] = useState<string[]>([]);
    // Fetch the default English words
    useEffect(() => {
        const fetchDefaultEng = async () => {
            const defaultEngFetch = await fetchCSVWords("https://gist.githubusercontent.com/mvark/9e0682c62d75625441f6ded366245203/raw/aec8a476a210db88086c50d3735507510ea295f2/Skribbl-words.csv");
            // setWords(defaultEng);
            // defaultEng = defaultEngFetch;
            setDefaultEng(defaultEngFetch);
        };

        fetchDefaultEng(); // TODO: Fix
    }, [words, language]);

    /**
     * Solve and display the words
     */
    function solveAndDisplay () {
        const input = document.getElementById("floatingInput") as HTMLInputElement;
        const output = document.getElementById("output") as HTMLInputElement;
        const possibleWords = solve(input.value, words.length !== 0 ? words : defaultEng);
        // console.log(possibleWords);
        // For each word, create a Word component
        const wordComponents = possibleWords.map((word, i) => {
            return <Word key={i} word={word} />;
        });
        // console.log(wordComponents);
        // Display the words
        setWordComponentsList(wordComponents);
    }

    return <div>
        <FloatingLabel
            controlId="floatingInput"
            label="Search by blanks. Can have spaces. Unknown letters should be represented by a question mark (?), asterisk (*), underscore (_), or period (.)"
            className="mb-3"
        >
            <Form.Control
                type="text"
                placeholder="name@example.com"
                onChange={solveAndDisplay}
            />
        </FloatingLabel>
        <br />
        <div id="output">
            {/* <Word word="test" /> */}
            {wordComponentsList}
        </div>
    </div>;
}
export default Solving;