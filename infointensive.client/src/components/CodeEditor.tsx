import { Button, FormSelect } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faRotate } from '@fortawesome/free-solid-svg-icons';

import Editor from '@monaco-editor/react';
import { useState, useEffect, useContext } from "react";
import { UserContext, authorizedRequest } from "../App";

// This config defines the editor's view.
export const options = {
    padding: { top: 10, bottom: 10 },
    minimap: { enabled: false }
}

// This config defines how the language is displayed in the editor.
const languageDef = {
    keywords: [
        'citeste', 'scrie', 'daca', 'atunci', 'altfel', 'cat', 'timp', 'executa', 'repeta', 'pana', 'cand', 'pentru',
        'read', 'write', 'if', 'then', 'else', 'while', 'do', 'repeat', 'until', 'for'
    ],

    operators: [
        '<-', '=', '>', '<', '!', '~', '==', '<=', '>=', '!=',
        '&&', '||', '+', '-', '*', '/', '&', '|', '^', '%',
        '<<', '>>', '**'
    ],

    // we include these common regular expressions
    symbols: /[=><!~?:&|+\-*\/\^%]+/,

    // C# style strings
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    // The main tokenizer for our languages
    tokenizer: {
        root: [
            // identifiers and keywords
            [/[a-z_$][\w$]*/, {
                cases: {
                    '@keywords': 'keyword',
                    '@default': 'identifier'
                }
            }],

            // whitespace
            { include: '@whitespace' },

            // common
            { include: 'common' },

            // delimiters and operators
            [/[{}()\[\]]/, '@brackets'],
            [/[<>](?!@symbols)/, '@brackets'],
            [/@symbols/, {
                cases: {
                    '@operators': 'operator',
                    '@default': ''
                }
            }],

            // numbers
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/\d+/, 'number'],

            // delimiter: after number because of .\d floats
            [/[;,.]/, 'delimiter'],
        ],

        common: [
            [/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
            [/'([^'\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
            [/"/, 'string', '@string_double'],
            [/'/, 'string', '@string_single'],
        ],

        comment: [
            [/(\/\/)([^\n\r]+)/, 'comment'],
        ],

        string_double: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/, 'string', '@pop']
        ],

        string_single: [
            [/[^\\']+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/'/, 'string', '@pop']
        ],

        whitespace: [
            [/[ \t\r\n]+/, 'white'],
            [/\/\/.*$/, 'comment'],
        ],
    }
};

const completionProvider = (monaco) => (model, position) => {
    let word = model.getWordUntilPosition(position);
    let range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
    };

    return {
        suggestions: [
            {
                label: 'scrie',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: "Write a variable, a literal or an expression to the output window.",
                insertText: 'scrie ',
                range,
            },
            {
                label: 'write',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: "Write a variable, a literal or an expression to the output window.",
                insertText: 'write ',
                range,
            },
            {
                label: 'daca',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: "Simple conditional expression",
                insertText: 'daca ${1:expresie} atunci\n\t${2:instructiuni 1}\naltfel\n\t${3:instructiuni 2}',
                insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range,
            },
            {
                label: 'if',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: "Simple conditional expression",
                insertText: 'if ${1:expression} atunci\n\t${2:instructions 1}\nelse\n\t${3:instructions 2}',
                insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range,
            },
            {
                label: 'pentru',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: "Instructiune repetitiva cu numar cunoscut de pasi",
                insertText: 'pentru ${1:variabila} <- ${2:expresie initiala}, ${3:expresie finala}, ${4:pas} executa\n\t${5:instructiuni}',
                insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range,
            },
            {
                label: 'for',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: "Repetitive instruction with known number of steps",
                insertText: 'for ${1:variable} <- ${2:initial expression}, ${3:final expression}, ${4:step} do\n\t${5:instructions}',
                insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range,
            },
            {
                label: 'cat timp',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: "Instructiune repetitiva cu numar necunoscut de pasi",
                insertText: 'cat timp ${1:expresie} executa\n\t${2:instructiuni}',
                insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range,
            },
            {
                label: 'while',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: "Repetitive instruction with unknown number of steps",
                insertText: 'while ${1:expression} do\n\t${2:instructions}',
                insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range,
            },
            {
                label: 'executa',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: "Instructiune repetitiva cu numar necunoscut de pasi",
                insertText: 'executa \n\t${1:instructiuni}\ncat timp ${2:expresie}',
                insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range,
            },
            {
                label: 'do',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: "Repetitive instruction with unknown number of steps",
                insertText: 'do \n\t${1:instructions}\nwhile ${2:expression}',
                insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range,
            },
            {
                label: 'repeta',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: "Instructiune repetitiva cu numar necunoscut de pasi",
                insertText: 'repeta \n\t${1:instructiuni}\npana cand ${2:expresie}',
                insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range,
            },
            {
                label: 'repeat',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: "Repetitive instruction with unknown number of steps",
                insertText: 'repeat \n\t${1:instructions}\nuntil ${2:expression}',
                insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range,
            },
        ]
    }
}

// This config defines the editor's behavior.
const configuration = {
    comments: {
        lineComment: "\/\/",
    },
    brackets: [
        ["[", "]"], ["(", ")"],
    ],
}

const editorWillMount = monaco => {
    if (!monaco.languages.getLanguages().some(({ id }) => id === 'cequel')) {
        // Register a new language
        monaco.languages.register({ id: 'cequel' })
        // Register a tokens provider for the language
        monaco.languages.setMonarchTokensProvider('cequel', languageDef);
        // Set the editing configuration for the language
        monaco.languages.setLanguageConfiguration('cequel', configuration);
        // Register a completion item provider for the language
        monaco.languages.registerCompletionItemProvider('cequel', {
            provideCompletionItems: completionProvider(monaco)
        });
    }
}

// Requests

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

    const Reset = (_) => {
        if (language === "Romanian")
            setCode("// Simple hello world in pseudocode\nscrie 'Hello World!'\n")
        else
            setCode("// Simple hello world in pseudocode\nwrite 'Hello World!'\n")
    }

    const OnLanguageChange = (e) => {
        if (e.target.value === "English")
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

    return (
        <div id="codeEditorWrapper">
            <div className="toolbarWrapper">
                <div className="characterCount" style={{ color: characterCountColor }}>{characterCount}/{maxCharacterCount}</div>
                <FormSelect
                    className="selector"
                    value={language}
                    onChange={OnLanguageChange}
                >
                    <option>Romanian</option>
                    <option>English</option>
                </FormSelect>
                <Button
                    className="button"
                    variant="outline-danger"
                    onClick={Reset}
                >
                    <FontAwesomeIcon icon={faRotate} /> Reset</Button>
                <Button
                    className="button"
                    variant="outline-success"
                    onClick={Run}
                    disabled={buttonDisabled || characterCount > maxCharacterCount}
                >
                    <FontAwesomeIcon icon={faPlay} /> Run
                </Button>
            </div>
            <div className="inputBoxWrapper">
                <Editor
                    value={code}
                    language="cequel"
                    onChange={(value, _) => setCode(value ?? "")}
                    options={options}
                    className="editor"
                    theme="vs-dark"
                    beforeMount={editorWillMount}
                ></Editor>
            </div>
            <div className="outputBoxWrapper">
                <textarea value={output} spellCheck={false} disabled></textarea>
            </div>
        </div>
    );
}
