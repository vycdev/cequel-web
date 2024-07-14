import { ProgressBar, Form } from 'react-bootstrap';

import {
    Table,
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
} from '@table-library/react-table-library/table';
import { UserContext, authorizedRequest } from '../App';
import { useContext, useEffect, useState } from 'react';
import ContentBox from '../components/ContentBox';

//const nodes = [
//    {
//        id: '0',
//        title: 'Biggest common divider',
//        completionDate: new Date(2020, 1, 15),
//        isComplete: true,
//        difficulty: 5,
//    },
//    {
//        id: '1',
//        title: 'Add two numbers',
//        completionDate: new Date(2021, 3, 22),
//        isComplete: true,
//        difficulty: 1,
//    },
//    {
//        id: '2',
//        title: 'Palindrome number checker',
//        completionDate: null,
//        isComplete: false,
//        difficulty: 5,
//    },
//    {
//        id: '3',
//        title: 'Find nth number in fibonacci sequence',
//        completionDate: null,
//        isComplete: false,
//        difficulty: 4,
//    },
//    {
//        id: '4',
//        title: 'Prime Number Generator',
//        completionDate: null,
//        isComplete: false,
//        difficulty: 4,
//    },
//    {
//        id: '5',
//        title: 'Equation solution finder',
//        completionDate: null,
//        isComplete: false,
//        difficulty: 6,
//    },
//    {
//        id: '6',
//        title: 'Calculate the hypotenosis',
//        completionDate: new Date(2022, 8, 18),
//        isComplete: true,
//        difficulty: 2,
//    },
//    {
//        id: '7',
//        title: 'Invert a number',
//        completionDate: null,
//        isComplete: false,
//        difficulty: 4,
//    },
//    {
//        id: '8',
//        title: 'Find solution of 2nd degree equation',
//        completionDate: new Date(2022, 10, 14),
//        isComplete: true,
//        difficulty: 5,
//    },
//    {
//        id: '9',
//        title: 'Check if number is divisible with its inverse',
//        completionDate: new Date(2022, 11, 7),
//        isComplete: true,
//        difficulty: 6,
//    },
//    {
//        id: '10',
//        title: 'Triangle area calculator',
//        completionDate: null,
//        isComplete: false,
//        difficulty: 2,
//    },
//    {
//        id: '11',
//        title: 'Find the smallest digit in a number',
//        completionDate: new Date(2023, 1, 20),
//        isComplete: true,
//        difficulty: 5,
//    },
//    {
//        id: '12',
//        title: 'Roman to Integer Conversion',
//        completionDate: null,
//        isComplete: false,
//        difficulty: 3,
//    },
//    {
//        id: '13',
//        title: 'Find the biggest digit in a number',
//        completionDate: new Date(2023, 3, 18),
//        isComplete: true,
//        difficulty: 4,
//    },
//    {
//        id: '14',
//        title: 'Add digits of the number together',
//        completionDate: null,
//        isComplete: false,
//        difficulty: 5,
//    },
//];

const getVariant = (difficulty) => {
    if (difficulty <= 3)
        return 'success'
    if (difficulty > 3 && difficulty <= 6)
        return 'warning'
    if (difficulty > 6)
        return 'danger'
}

export default () => {
    const userContext = useContext(UserContext);
    const [nodes, setNodes] = useState([]);

    const getExercises = async () => {
        await authorizedRequest("/api/exercise/getExercises", "GET", {})
            .then(d => d.json())
            .then(d => {
                setNodes(d);
            })
    }

    useEffect(() => {
        getExercises();
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

    return <div id="exercisesWrapper">
        <div className="contentBox">
            <h3>Exercises</h3>
            <Table className="table" data={{ nodes }}>
                {(tableList) => (
                    <>
                        <Header>
                            <HeaderRow>
                                <HeaderCell resize gridColumnStart={0} gridColumnEnd={50} className="idHeader">Id</HeaderCell>
                                <HeaderCell resize>Title</HeaderCell>
                                <HeaderCell resize>Difficulty</HeaderCell>
                                <HeaderCell resize className="completedHeader">Completed</HeaderCell>
                                <HeaderCell resize>Completion Date</HeaderCell>
                            </HeaderRow>
                        </Header>

                        <Body>
                            {tableList.map((item) => (
                                <Row className="row" key={item.id} item={item} onClick={(item, _) => window.location.href = "/exercise/" + item.id}>
                                    <Cell className="idCell">{item.id}</Cell>
                                    <Cell>{item.title}</Cell>
                                    <Cell><ProgressBar variant={getVariant(item.difficulty)} now={item.difficulty * 10}></ProgressBar></Cell>
                                    <Cell className="completedCell"><Form.Check inline checked={item.isComplete} readOnly></Form.Check></Cell>
                                    <Cell>{item.completionDate?.toLocaleString('ro-RO')}</Cell>
                                </Row>
                            ))}
                        </Body>
                    </>
                )}
            </Table>

        </div>
    </div>
}