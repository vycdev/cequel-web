import { useParams } from "react-router-dom"

// TODO: Lock the exercise behind a login

export default () => {
    const { id } = useParams();

    return <>
        <h1>Exercise {id}</h1>
    </>
}