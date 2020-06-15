import React, { setState, useState } from 'react';

import api from "../../services/api";
import { login } from "../../services/auth";

import * as Yup from 'yup';
import { Center } from './styles.js';
import { Button, Container, Row, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { Form, Input } from '@rocketseat/unform';
import { Link, useHistory } from 'react-router-dom';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Insira um e-mail válido')
        .required('O e-mail é obrigatorio'),
    password: Yup.string()
        .required('A senha é obrigatoria')
})

export default function Login() {
    const history = useHistory();
    const [error, setError] = useState()
    const [email, setEmail] = useState()

    async function handleSubmit(data) {
        const { email, password } = data;

        if (!email || !password) {
            setError("Preencha todos os dados para o login");
        } else {
            try {
                const response = await api.post("/sessions", { email, password });
                login(response.data.token);
                setEmail(email);
                history.push("/dashboard");

            } catch (err) {
                setError("Ocorreu um erro ao tentar acessar sua conta.");
            }
        }
    }

    return (
        <Container >
            <Center>
                <Row className="d-flex justify-content-center align-items-center">


                    <Form schema={schema} onSubmit={handleSubmit} style={{ width: '300px' }}>
                        <h2 className="text-left">
                            <FontAwesomeIcon className="text-secondary" icon={faSignInAlt} />
                            LOGIN
                        </h2>
                        {error && <Alert variant='danger'> {error} </Alert>}
                        <div className="form-group">
                            <Input name="email" type="email" className="form-control" placeholder="example@email.com" />
                        </div>

                        <div className="form-group">
                            <Input className="form-control" name="password" type="password" placeholder="**************" />
                        </div>

                        <Button variant="primary btn-block" type="submit">
                            ACESSAR
                        </Button>
                        <div className="text-right">
                            <Link to="/reset">Esqueci minha senha</Link>
                        </div>

                        <hr />
                        <p className="forgot-password text-right">
                            <Link to="/register">
                                <Button variant="outline-secondary btn-block" type="submit">
                                    REGISTRAR
                                </Button>
                            </Link>
                        </p>
                    </Form>
                </Row>
            </Center>
        </Container>
    )
}

