import { useParams } from "react-router-dom"
import ContentBox from "../components/ContentBox";
import CodeEditor from "../components/CodeEditor";

// TODO: Lock the exercise behind a login
// TODO: implement the endpoints for the exercises
const getExercise = (id: string) => {

    return {
        title: id + ": Biggest common divider",
        description: "# Biggest common divider\n## Requirements\nWrite a program that can determine the biggest common divider of two natural numbers. The numbers are already given in the code editor as variables.\n## Input\nTwo numbers `a` and `b` already declared with a given value.\n## Output\nThe evaluator will check the values of the variables at the end of the program execution. You can use any kind of `write` statements for debugging as they will not affect the evaluation.\n## Restrictions\n- `0 <= a, b < 1000000000`\n- if both numbers are equal to `0` the result will be `-1`",
        defaultCode: "// Example of the variables that will be used to check your solution \n// a <- 523\n// b <- 423\n// The variables are already declared internally so you can use them right away without redeclaring them.\n",
        difficulty: 5,
    }
}

export default () => {
    const { id } = useParams();
    const exercise = getExercise(id || "0");

    return <div id="homeWrapper">
        <div className="contentBoxWrapper">
            <ContentBox>{exercise.description}</ContentBox>
        </div>
        <div className="codeEditorWrapper">
            <CodeEditor defaultCode={exercise.defaultCode} />
        </div>
    </div>
}