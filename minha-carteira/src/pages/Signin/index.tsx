import React, { useState } from "react";
import logoImg from "../../assets/logo.svg";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Container, Form, FormTitle, Logo } from "./styles";
import { useAuth } from "../../hooks/auth";

const SingIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  // teste@email.com
  const [password, setPassword] = useState<string>("");
  // 123
  const { singIn } = useAuth();

  return (
    <Container>
      <Logo>
        <img src={logoImg} alt="Minha Carteira" />
        <h2>Minha Carteira</h2>
      </Logo>
      <Form
        onSubmit={() => {
          singIn(email, password);
        }}
      >
        <FormTitle>Entrar</FormTitle>
        <Input
          type="email"
          placeholder="e-mail"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="senha"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Acessar</Button>
      </Form>
    </Container>
  );
};

export default SingIn;
