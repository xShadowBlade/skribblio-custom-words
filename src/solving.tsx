/**
 * @file File that handles text input and display of the words
 */
import React, { useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
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

    console.log(array);
    return array;
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
 * @returns Solving component
 */
function Solving ({ words, language}: { words: string[], language: string }) {
    // useEffect(() => {
    //     const fetchDefaultEng = async () => {
    //         const defaultEng = await fetchCSVWords("https://gist.githubusercontent.com/mvark/9e0682c62d75625441f6ded366245203/raw/aec8a476a210db88086c50d3735507510ea295f2/Skribbl-words.csv");
    //         setWords(defaultEng);
    //     };

    //     // fetchDefaultEng(); // TODO: Fix
    // }, [words, language]);

    function solveAndDisplay () {
        const input = document.getElementById("floatingInput") as HTMLInputElement;
        const output = document.getElementById("output") as HTMLInputElement;
        output.value = solve(input.value, words).join("\n");
    }

    return <>
        <FloatingLabel
            controlId="floatingInput"
            label="Search by blanks. Can have spaces. Unknown letters should be represented by a question mark (?), asterisk (*), underscore (_), or period (.)"
            className="mb-3"
        >
            <Form.Control type="text" placeholder="name@example.com" />
        </FloatingLabel>
    </>;
}
export default Solving;