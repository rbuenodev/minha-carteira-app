import { useMemo } from "react";
import { useParams } from "react-router-dom";
import ContentHeader from "../../components/ContentHeader";
import Input from "../../components/Input";
import SelectInput from "../../components/SelectInput";
import {
  Container,
  ContainerForm,
  ContainerInline,
  Form,
  FormTitle,
} from "./styles";

const EditRegistry: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pageData = useMemo(() => {
    return id === "0"
      ? {
          title: "Cadastrar",
          lineColor: "#4e41F0",
        }
      : {
          title: "Editar",
          lineColor: "#E44C4E",
        };
  }, [id]);

  const types = useMemo(() => {
    return [
      { label: "Saída", value: "Saída" },
      { label: "Entrada", value: "Entrada" },
    ];
  }, []);

  const frequencies = useMemo(() => {
    return [
      { label: "Eventual", value: "Eventual" },
      { label: "Recorrente", value: "Recorrente" },
    ];
  }, []);

  return (
    <Container>
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
        <></>
      </ContentHeader>
      <ContainerForm>
        <Form>
          <FormTitle>Título</FormTitle>
          <Input type="text" placeholder="Título" required />
          <ContainerInline>
            <Container>
              <FormTitle>Tipo</FormTitle>
              <SelectInput options={types} OnChange={(e) => {}} />
            </Container>
            <Container>
              <FormTitle>Data</FormTitle>
              <Input type="date" placeholder="Data" required />
            </Container>
            <Container>
              <FormTitle>Frequencia</FormTitle>
              <SelectInput options={frequencies} OnChange={(e) => {}} />
            </Container>
            <Container>
              <FormTitle>Valor</FormTitle>
              <Input type="number" placeholder="Valor" required />
            </Container>
          </ContainerInline>
          <FormTitle>Descrição</FormTitle>
          <Input type="text" placeholder="Descrição" required />
        </Form>
      </ContainerForm>
    </Container>
  );
};

export default EditRegistry;
