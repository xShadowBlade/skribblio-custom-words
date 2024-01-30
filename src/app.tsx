/**
 * @file App component
 */
import React, { useState } from "react";
import Settings from "./settings";
import Solving from "./solving";
// import Credits from "./credits";

/**
 * App component
 * @returns App component
 */
function App () {
    const [words, setWords] = useState<string[]>([]);
    const [language, setLanguage] = useState<string>("en");

    return <>
        <Settings
            words={words}
            setWords={setWords}
            language={language}
            setLanguage={setLanguage}
        />
        {/* <Credits /> */}
        <Solving
            words={words}
            // setWords={setWords}
            language={language}
            // setLanguage={setLanguage}
        />
    </>;
}

export default App;