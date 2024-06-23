import { useParams } from "react-router-dom"


export default () => {
    const { id } = useParams();

    return <>
        <h1>Exercise {id}</h1>
    </>
}