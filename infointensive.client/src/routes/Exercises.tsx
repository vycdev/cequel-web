import { Button, ProgressBar, Form } from 'react-bootstrap';

import {
    Table,
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
} from '@table-library/react-table-library/table';

const nodes = [
    {
        id: '0',
        title: 'Smallest common divider',
        completionDate: new Date(2020, 1, 15),
        isComplete: true,
        difficulty: 5,
    },
    {
        id: '1',
        title: 'Array Rotation',
        completionDate: new Date(2021, 3, 22),
        isComplete: true,
        difficulty: 3,
    },
    {
        id: '2',
        title: 'Palindrome Checker',
        completionDate: null,
        isComplete: false,
        difficulty: 2,
    },
    {
        id: '3',
        title: 'Binary Search Algorithm',
        completionDate: new Date(2021, 6, 5),
        isComplete: true,
        difficulty: 4,
    },
    {
        id: '4',
        title: 'Fibonacci Sequence Generator',
        completionDate: null,
        isComplete: false,
        difficulty: 3,
    },
    {
        id: '5',
        title: 'Merge Sort Implementation',
        completionDate: new Date(2021, 9, 21),
        isComplete: true,
        difficulty: 5,
    },
    {
        id: '6',
        title: 'Matrix Multiplication',
        completionDate: null,
        isComplete: false,
        difficulty: 4,
    },
    {
        id: '7',
        title: 'Longest Common Subsequence',
        completionDate: new Date(2021, 12, 25),
        isComplete: true,
        difficulty: 5,
    },
    {
        id: '8',
        title: 'Prime Number Generator',
        completionDate: null,
        isComplete: false,
        difficulty: 9,
    },
    {
        id: '9',
        title: 'Graph Traversal (DFS)',
        completionDate: null,
        isComplete: false,
        difficulty: 4,
    },
    {
        id: '10',
        title: 'Tic-Tac-Toe Game',
        completionDate: new Date(2022, 5, 12),
        isComplete: true,
        difficulty: 6,
    },
    {
        id: '11',
        title: 'Quick Sort Algorithm',
        completionDate: new Date(2022, 7, 10),
        isComplete: false,
        difficulty: 5,
    },
    {
        id: '12',
        title: 'Knapsack Problem',
        completionDate: new Date(2022, 8, 18),
        isComplete: true,
        difficulty: 5,
    },
    {
        id: '13',
        title: 'Dijkstra\'s Algorithm',
        completionDate: new Date(2022, 9, 25),
        isComplete: false,
        difficulty: 4,
    },
    {
        id: '14',
        title: 'Tower of Hanoi',
        completionDate: new Date(2022, 10, 14),
        isComplete: true,
        difficulty: 3,
    },
    {
        id: '15',
        title: 'Binary Tree Traversal (Inorder)',
        completionDate: new Date(2022, 11, 7),
        isComplete: true,
        difficulty: 3,
    },
    {
        id: '16',
        title: 'Heap Sort Implementation',
        completionDate: new Date(2023, 0, 12),
        isComplete: false,
        difficulty: 5,
    },
    {
        id: '17',
        title: 'Anagram Checker',
        completionDate: new Date(2023, 1, 20),
        isComplete: true,
        difficulty: 2,
    },
    {
        id: '18',
        title: 'Roman to Integer Conversion',
        completionDate: new Date(2023, 2, 5),
        isComplete: false,
        difficulty: 3,
    },
    {
        id: '19',
        title: 'Sudoku Solver',
        completionDate: new Date(2023, 3, 18),
        isComplete: true,
        difficulty: 4,
    },
    {
        id: '20',
        title: 'LRU Cache Implementation',
        completionDate: new Date(2023, 4, 27),
        isComplete: false,
        difficulty: 5,
    },
];

const getVariant = (difficulty) => {
    if (difficulty <= 3) 
        return 'success'
    if (difficulty > 3 && difficulty <= 6)
        return 'warning'
    if (difficulty > 6)
        return 'danger'
}

export default () => {
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