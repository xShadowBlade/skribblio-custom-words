/**
 * @file App component
 */
import React, { useState } from "react";
import WordsBox from "./settings";
import Solving from "./solving";

/**
 * App component
 * @returns App component
 */
function App () {
    const [words, setWords] = useState<string[]>([]);
    const [language, setLanguage] = useState<string>("en");

    return <>
        <WordsBox
            words={words}
            setWords={setWords}
            language={language}
            setLanguage={setLanguage}
        />
        <Solving
            words={words}
            // setWords={setWords}
            language={language}
            // setLanguage={setLanguage}
        />
    </>;
}

export default App;