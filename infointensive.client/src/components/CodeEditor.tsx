import { Button, FormSelect } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import Editor from '@monaco-editor/react';
import { useState, useEffect, useContext } from "react";
import { UserContext, authorizedRequest } from "../App";

const InterpretDemo = async (code: string, language: string) => {
    let result;

    if (code[code.length - 1] != '\0')
        code += '\0';

    await fetch("api/interpreter/interpretdemo/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ code, language })
    })
    .then(d => d.json())
    .then(d => {
        result = d;
    })

    return result;
}

const Interpret = async (code: string, language: string) => {
    let result;

    if (code[code.length - 1] != '\0')
        code += '\0';

    await authorizedRequest("api/interpreter/interpret/", "POST", { code, language }) 
    .then(d => d.json())
    .then(d => {
        result = d;
    })

    return result;
}

export default () => {
    const userContext = useContext(UserContext);

    const [code, setCode] = useState("// Simple hello world in pseudocode\nwrite 'Hello World!' \n");
    const [output, setOutput] = useState("Run your code for the output to change.");
    const [language, setLanguage] = useState("English");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [characterCount, setCharacterCount] = useState(0);
    const [characterCountColor, setCharacterCountColor] = useState("black");
    const maxCharacterCount = userContext?.user ? 2000 : 500;

    const Run = async (_) => {
        setButtonDisabled(true);
        setOutput("Running code...");
        const result = userContext?.user ? await Interpret(code, language) : await InterpretDemo(code, language);
        setButtonDisabled(false);

        let resultString = (result.success ? result.output : result.message);
        if (result.success)
            resultString += "\nExecution Time: " + result.executionTime;

        setOutput(resultString);
    }

    const OnLanguageChange = (e) => {
        if (code === "// Simple hello world in pseudocode\nwrite 'Hello World!'\n")
            setCode("// Simple hello world in pseudocode\nscrie 'Hello World!'\n")
        else
            setCode("// Simple hello world in pseudocode\nwrite 'Hello World!'\n")

        setLanguage(e.target.value);
    }

    useEffect(() => {
        setCharacterCount(code.length);
        if (code.length > maxCharacterCount)
            setCharacterCountColor("red");
        else
            setCharacterCountColor("black");
    }, [code])

    // TODO: CHANGE LANGAUGE from javascript to something custom

    return (
        <div id="codeEditorWrapper">
            <div className="toolbarWrapper">
                <div className="characterCount" style={{ color: characterCountColor }}>{characterCount}/{maxCharacterCount}</div>
                <FormSelect className="selector" value={language} onChange={OnLanguageChange}>
                    <option>Romanian</option>
                    <option>English</option>
                </FormSelect>
                <Button className="button" variant="outline-success" onClick={Run} disabled={buttonDisabled || characterCount > maxCharacterCount}><FontAwesomeIcon icon={faPlay} /> Run</Button>
            </div>
            <div className="inputBoxWrapper">
                <Editor language="javascript" value={code} onChange={(value, _) => setCode(value ?? "")} options={{ padding: { top: 10, bottom: 10 }, minimap: { enabled: false } }} className="editor" theme="vs-dark"></Editor>
            </div>
            <div className="outputBoxWrapper">
                <textarea value={output} spellCheck={false} disabled></textarea>
            </div>
        </div>
    );
}
