import React, { setState, useState } from 'react';

import api from "../../services/api";
import { login } from "../../services/auth";

import * as Yup from 'yup';
import { Center } from './styles.js';
import { Button, Container, Row, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Form, Input } from '@rocketseat/unform';
import { Link, useHistory } from 'react-router-dom';

const schema = Yup.object().shape({
    name: Yup.string()
        .required('O nome é obrigatorio'),
    email: Yup.string()
        .email('Insira um e-mail válido')
        .required('O e-mail é obrigatorio'),
    emailConfirmation: Yup.string()
        .oneOf([Yup.ref('email'), null], 'Os emails devem corresponder'),
    password: Yup.string()
        .required('A senha é obrigatoria'),
    c_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'As senhas devem corresponder')
})



export default function Login() {
    const history = useHistory();
    const [error, setError] = useState()

    async function handleSubmit(data) {
        const { name, email, password, c_password } = data;

        if (!email || !password || !name) {
            setError("Preencha todos os dados para se cadastrar");
        } else {
            try {
                const response = await api.post("/register", { name, email, password, c_password });
                login(response.data.token);
                history.push("/dashboard");

            } catch (err) {
                setError("Ocorreu um erro ao registrar sua conta.");
            }
        }
    }

    return (
        <Container >
            <Center>
                <Row className="d-flex justify-content-center align-items-center">

                    <Form schema={schema} onSubmit={handleSubmit} style={{ width: '300px' }}>
                        <h2 className="text-left">
                            <FontAwesomeIcon className="text-secondary" icon={faPlus} />
                            CADASTRO
                        </h2>
                        {error && <Alert variant='danger'> {error} </Alert>}
                        <div className="form-group">
                            <Input className="form-control" type="text" name="name" placeholder="Nome" required />
                        </div>

                        <div className="form-group">
                            <Input className="form-control" type="email" name="email" placeholder="E-mail" required />
                        </div>

                        <div className="form-group">
                            <Input className="form-control" type="email" name="emailConfirmation" placeholder="Confirmação de E-mail" required />
                        </div>

                        <div className="form-group">
                            <Input className="form-control" type="password" name="password" placeholder="Senha" required />
                        </div>

                        <div className="form-group">
                            <Input className="form-control" type="password" name="c_password" placeholder="Confirmação de Senha" required />
                        </div>

                        <Button variant="primary btn-block" type="submit">
                            CADASTRAR
                        </Button>

                        <hr />
                        <p className="forgot-password text-right">
                            Já possui conta?
                            <Link to="/login" className="text-warning"> Faça Login</Link>
                        </p>
                    </Form>
                </Row>
            </Center>
        </Container>
    )
}

