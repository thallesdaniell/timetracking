import React, { useState, useEffect } from 'react';
import { Fab } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Col, Row, Button, Modal } from 'react-bootstrap';
import { faPlus, faPlay, faPause, faSyncAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Wrapper, Sidebar, Content } from './styles';
import { Input, Form } from '@rocketseat/unform';

import api from '../../services/api';


export default function Dashboard() {

    const [showNewTask, setShowNewTask] = useState(false);

    const handleCloseNewTask = () => setShowNewTask(false);

    const handleShowNewTask = () => setShowNewTask(true);


    const [showReopenTask, setShowReopenTask] = useState(false);

    const handleCloseReopenTask = () => setShowReopenTask(false);

    const handleShowReopenTask = () => setShowReopenTask(true);

    const [idTask, setIdTask] = useState('');


    const [tasks, setTaks] = useState([
        /*   { id: 1, name: 'task 1', users: '', created_at: '2020-05-20', 'seconds': 300, status: 'created', 'time': '00:05:00' },
           { id: 2, name: 'task 2', users: '', created_at: '2020-05-13', 'seconds': 50, status: 'started', 'time': '00:00:50' },
           { id: 3, name: 'Agendar reuniões', users: '', created_at: '2020-05-24', 'seconds': 900, status: 'stopped', 'time': '00:15:00' },
           { id: 4, name: 'Despachar documentos', users: '', created_at: '2020-05-24', 'seconds': 560, status: 'started', 'time': '00:09:20' },
           { id: 5, name: 'Validar documentos', users: '', created_at: '2020-05-24', 'seconds': 5532, status: 'completed', 'time': '01:32:12' }*/
    ]);

    useEffect(() => {
        async function loadTasks() {
            const response = await api.get('/tasks');
            const tasks = response.data.map(task => {
                return {
                    ...task,
                    'created_at': formatDate(task.created_at),
                    'time': formatMinutes(task.seconds)
                }
            });
            setTaks(tasks);
        }
        loadTasks()
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            tick()
        }, 980);
        return () => clearInterval(interval);
    }, [tasks]);

    function tick() {
        const newTask = tasks.map(task => {
            if (task.status === 'started') {
                return {
                    ...task,
                    seconds: task.seconds + 1,
                    'time': formatMinutes(task.seconds)
                }
            }
            return task
        });
        setTaks(newTask);
    }

    function handleTaskToggle(id, data) {
        const { status } = data;
        const newTask = tasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    seconds: task.seconds + 1,
                    status: status
                }
            }
            return task
        });
        setTaks(newTask);
        requestTasks(id, data)
    }

    function handleReopen(id) {
        setIdTask(id)
        handleShowReopenTask()
    }

    async function handleSubmitReopen(data) {
        const { reason } = data;
        handleTaskToggle(idTask, { status: 'started', reason: reason })
        handleCloseReopenTask()
    }

    function formatMinutes(time) {
        let date = new Date(null);
        date.setSeconds(time);
        return date.toISOString().substr(11, 8);
    }

    function formatDate(year) {
        let date = new Date(year);
        return date.toLocaleDateString();
    }

    async function handleSubmit(data) {
        const { name, description } = data;
        try {
            const response = await api.post("/tasks", { name, description });
            const task = response.data
            setTaks([...tasks, {
                ...task,
                'created_at': formatDate(task.created_at),
                'time': formatMinutes(task.seconds)
            }])
        } catch (err) {

        }
        handleCloseNewTask()
    }

    async function requestTasks(id, data) {
        const { status } = data;
        if (status != 'created') {
            await api.put(`/tasks/${id}`, data);
        }
    }

    return (
        <Wrapper>
            <Sidebar>
                <div className="sidebar-header">
                    <h3>TIME CODE</h3>
                </div>
                <ul className="list-unstyled components">
                    <li>
                        <a href="#">Menu 1</a>
                    </li>
                    <li>
                        <a href="#">Menu 2</a>
                    </li>
                </ul>
            </Sidebar>
            <Content>
                <div>
                    <h1 className="mt-5">
                        Advocacia
                    </h1>
                </div>
                <hr></hr>

                <Row className="mb-5">
                    <Col>
                        <Input type="text" name="name" className="form-control mb-1" placeholder="Nome da tarefa, descrição ou usuário…" />
                    </Col>
                    <Col>
                        <Input type="checkbox" name="started" label="Em andamento" type="checkbox" id="1" />
                        <Input type="checkbox" name="completed" label="Concluídas" type="checkbox" id="2" />
                    </Col>
                </Row>

                <Table hover>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.name}</td>
                                <td>{task.users}</td>
                                <td>{task.created_at}</td>
                                <td>link descricao</td>
                                <td> link logs</td>
                                <td>{task.time}</td>
                                <td>
                                    <div>
                                        {{
                                            created: <>
                                                <Button variant="warning" onClick={() => handleTaskToggle(task.id, { status: 'started' })} className="text-white" ><FontAwesomeIcon icon={faPlay} /></Button>
                                            </>,
                                            started: <>
                                                <Button variant="warning" onClick={() => handleTaskToggle(task.id, { status: 'stopped' })} className="text-white"><FontAwesomeIcon icon={faPause} /></Button>
                                                <Button variant="success" onClick={() => handleTaskToggle(task.id, { status: 'completed' })} className="text-white"><FontAwesomeIcon icon={faCheck} /></Button>
                                            </>,
                                            stopped: <>
                                                <Button variant="warning" onClick={() => handleTaskToggle(task.id, { status: 'started' })} className="text-white"><FontAwesomeIcon icon={faPlay} /></Button>
                                                <Button variant="success" onClick={() => handleTaskToggle(task.id, { status: 'completed' })} className="text-white"><FontAwesomeIcon icon={faCheck} /></Button>
                                            </>,
                                            completed: <Button variant="info" onClick={() => handleReopen(task.id)} className="text-white"><FontAwesomeIcon icon={faSyncAlt} /> Reabrir </Button>
                                        }[task.status]}
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Modal show={showNewTask} onHide={handleCloseNewTask}>
                    <Modal.Header closeButton>
                        <Modal.Title>Criar nova tarefa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Input type="text" name="name" className="form-control mb-1" placeholder="Título" required />
                            <Input multiline className="form-control mb-1" name="description" rows="5" placeholder="Descrição" required />
                            <Button variant="primary" type="submit">
                                Criar
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                <Modal show={showReopenTask} onHide={handleCloseReopenTask}>
                    <Modal.Header closeButton>
                        <Modal.Title>Reabrir Tarefa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmitReopen}>
                            <label>Por favor, indique o motivo da reabertura desta tarefa:</label>
                            <Input multiline className="form-control mb-1" name="reason" rows="5" placeholder="Motivo..." required />
                            <Button variant="primary" type="submit">
                                <FontAwesomeIcon icon={faSyncAlt} /> Reabrir
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                <Fab
                    mainButtonStyles={{
                        backgroundColor: '#FF6808'
                    }}
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={handleShowNewTask}
                >
                </Fab>

            </Content >
        </Wrapper >
    )
}

