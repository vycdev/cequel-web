import { Button, FormSelect } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import Editor from '@monaco-editor/react';
import { useState } from "react";

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

export default () => {
    const [code, setCode] = useState("print('Hello World!')");
    const [output, setOutput] = useState("Run your code for the output to change.");
    const [language, setLanguage] = useState("Romanian");


    const Run = async (_) => {
        const result = await InterpretDemo(code, language);

        setOutput((result.success ? result.output : result.message) + "\nExecution Time: " + result.executionTime )
    }

    return (
        <div id="codeEditorWrapper">
            <div className="toolbarWrapper">
                <FormSelect className="selector" value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option>Romanian</option>
                    <option>English</option>
                </FormSelect>
                <Button className="button" variant="outline-success" onClick={Run}><FontAwesomeIcon icon={faPlay} /> Run</Button>
            </div>
            <div className="inputBoxWrapper">
                <Editor value={code} onChange={(value, _) => setCode(value ?? "")} options={{ padding: { top: 10, bottom: 10 }, minimap: { enabled: false } }} className="editor" theme="vs-dark"></Editor>
            </div>
            <div className="outputBoxWrapper">
                <textarea value={output} spellCheck={false} disabled></textarea>
            </div>
        </div>
    );
}
