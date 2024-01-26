/**
 * @file Component for custom words box
 */
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

WordsBox.propTypes = {
    words: PropTypes.arrayOf(PropTypes.string).isRequired,
    setWords: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
    setLanguage: PropTypes.func.isRequired,
};

/**
 * WordsBox component
 * @param props WordsBox props
 * @param props.setWords
 * @param props.setLanguage
 * @returns WordsBox component
 */
function WordsBox ({ words, setWords, language, setLanguage }: { words: string[], setWords: (words: string[]) => void, language: string, setLanguage: (language: string) => void }) {
    // const [words, setWords] = useState<string[]>([]);
    // const [language, setLanguage] = useState<string>("en");
    // const customWordsInput = document.getElementById("custom-word-list") as HTMLInputElement;
    // const languageInput = document.getElementById("language-select") as HTMLInputElement;
    // const localSwitch = document.getElementById("local-switch") as HTMLInputElement;

    useEffect(() => {
        // Load settings from local storage
        console.log("DOM loaded");
        const storedSettings = localStorage.getItem("skribblio-solver-setting");
        if (!storedSettings) return;
        const settings = JSON.parse(atob(storedSettings));
        console.log(settings);
        setWords(settings.words);
        // customWordsInput.value = settings.words.join(", ");  // TODO: Only update if accordian is open

        setLanguage(settings.language);
        // languageInput.value = settings.language;  // TODO: Only update if accordian is open


    }, [setWords, setLanguage]);

    /**
     * Save the words to state and local storage (if enabled)
     */
    function saveWords (): void {
        const customWordsInput = document.getElementById("custom-word-list") as HTMLInputElement;
        const languageInput = document.getElementById("language-select") as HTMLInputElement;
        const localSwitch = document.getElementById("local-switch") as HTMLInputElement;
        // Get the words from the input
        let wordsInput = customWordsInput.value.split(",");

        // Trim the words
        wordsInput = wordsInput.map((word) => {
            word = word.trim();

            return word;
        });

        // Remove empty words
        wordsInput = wordsInput.filter((word) => {
            return word !== "";
        });
        console.log(wordsInput);
        setWords(wordsInput);

        // Format the input text display
        customWordsInput.value = wordsInput.join(", ");

        // Get the language
        setLanguage(languageInput.value);

        // Save locally
        const settings = {
            words: wordsInput,
            language: languageInput.value,
        };
        if (localSwitch.checked) {
            localStorage.setItem("skribblio-solver-setting", btoa(JSON.stringify(settings)));
        }
    }

    /**
     * Update the display if loaded from local storage, when the accordian is opened
     */
    function updateDisplay (): void {
        const customWordsInput = document.getElementById("custom-word-list") as HTMLInputElement;
        const languageInput = document.getElementById("language-select") as HTMLInputElement;
        // const localSwitch = document.getElementById("local-switch") as HTMLInputElement;
        customWordsInput.value = words.join(", ");
        languageInput.value = language;
    }

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Words settings</Accordion.Header>
                <Accordion.Body onEnter={updateDisplay}>
                    <FloatingLabel label="Language" className="mb-3">
                        <Form.Select id="language-select">
                            <option value="en">English</option>
                        </Form.Select>
                    </FloatingLabel>

                    <FloatingLabel
                        label="Custom Words List (separated by commas, leave blank for default)" className="mb-3" >
                        <Form.Control id="custom-word-list" type="text" placeholder=""/>
                    </FloatingLabel>
                    <Form.Check
                        type="switch"
                        id="local-switch"
                        label="Save settings locally"
                        defaultChecked={true}
                    />
                    <Button variant="primary" onClick={saveWords}>Save</Button>
                </Accordion.Body>
            </Accordion.Item>

        </Accordion>
    );
}

export default WordsBox;