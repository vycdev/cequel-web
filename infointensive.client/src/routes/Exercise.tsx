import { useParams } from "react-router-dom"
import ContentBox from "../components/ContentBox";
import CodeEditor from "../components/CodeEditor";
import { useContext, useEffect, useState } from "react";
import { UserContext, authorizedRequest } from "../App";

interface IExercise {
    title: string,
    description: string,
    defaultCode: string,
    difficulty: number
}

export default () => {
    const userContext = useContext(UserContext);
    const { id } = useParams();
    const [exercise, setExercise] = useState<IExercise | null>(null);

    const getExercise = async (id) => {
        await authorizedRequest("/api/exercise/getExercise?id=" + id, "GET", {})
            .then(d => d.json())
            .then(d => {
                setExercise(d);
            })
    }

    useEffect(() => {
        getExercise(id);
    }, []);

    if (userContext.user === null) {
        return (
            <div id="homeWrapper" >
                <div className="contentBoxWrapper">
                    <ContentBox>{"# Unauthorized\nYou have to be logged in to access exercises"}</ContentBox>
                </div>
            </div>
        )
    }

    return (
        <div id="homeWrapper" >
            <div className="contentBoxWrapper">
                <ContentBox>{exercise?.description}</ContentBox>
            </div>
            {exercise != null ? 
                <div className="codeEditorWrapper">
                    <CodeEditor defaultCode={exercise?.defaultCode} />
                </div>
            : <></>}
        </div>
    )
}