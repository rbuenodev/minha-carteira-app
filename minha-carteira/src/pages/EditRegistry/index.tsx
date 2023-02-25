import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentHeader from "../../components/ContentHeader";
import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import SelectInput from "../../components/SelectInput";
import {
  Container,
  ContainerFooter,
  ContainerInline,
  DeleteButton,
  Form,
  FormTitle,
} from "./styles";

interface IRegistry {
  description: string;
  amount: string;
  date: string;
  type: string;
  frequency: string;
  obs: string;
}
const EditRegistry: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [registry, setRegistry] = useState<IRegistry>({} as IRegistry);
  const navigate = useNavigate();

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
      { label: "Entrada", value: "Entrada" },
      { label: "Saída", value: "Saída" },
    ];
  }, []);

  const frequencies = useMemo(() => {
    return [
      { label: "Eventual", value: "Eventual" },
      { label: "Recorrente", value: "Recorrente" },
    ];
  }, []);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(registry);

      clearForm();
    }
  };

  const validateForm = () => {
    if (registry) {
      return true;
    }
    return false;
  };

  const clearForm = () => {
    setRegistry({
      description: "",
      amount: "",
      date: "",
      type: "",
      frequency: "",
      obs: "",
    });
  };

  return (
    <Container>
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
        <></>
      </ContentHeader>
      <div>
        <Form onSubmit={onSubmitForm}>
          <FormTitle>Descrição</FormTitle>
          <Input
            type="text"
            placeholder="Descrição"
            required
            onChange={(e) => {
              setRegistry({ ...registry, description: e.target.value });
            }}
            name="description"
            value={registry.description}
          />
          <ContainerInline>
            <div>
              <FormTitle>Tipo</FormTitle>
              <SelectInput
                options={types}
                OnChange={(e) => {
                  setRegistry({ ...registry, type: e.target.value });
                }}
              />
            </div>
            <div>
              <FormTitle>Data</FormTitle>
              <Input
                type="date"
                placeholder="Data"
                required
                onChange={(e) => {
                  setRegistry({ ...registry, date: e.target.value });
                }}
                name="date"
                value={registry.date}
              />
            </div>
            <div>
              <FormTitle>Frequencia</FormTitle>
              <SelectInput
                options={frequencies}
                OnChange={(e) => {
                  setRegistry({ ...registry, frequency: e.target.value });
                }}
              />
            </div>
            <div>
              <FormTitle>Valor</FormTitle>
              <Input
                type="number"
                step="0.01"
                min="0.01"
                placeholder="Valor"
                required
                onChange={(e) => {
                  setRegistry({ ...registry, amount: e.target.value });
                }}
                name="amount"
                value={registry.amount}
              />
            </div>
          </ContainerInline>
          <FormTitle>Observação</FormTitle>
          <Input
            type="text"
            placeholder="Observação"
            onChange={(e) => {
              setRegistry({ ...registry, obs: e.target.value });
            }}
            name="obs"
            value={registry.obs}
          />
          <ContainerFooter>
            <DeleteButton onClick={() => {}}>Excluir</DeleteButton>
            <div>
              <CustomButton
                isSuccess={false}
                onClick={() => {
                  navigate("/", { replace: true });
                }}
              >
                Voltar
              </CustomButton>
              <CustomButton isSuccess={true} onClick={() => {}}>
                {id === "0" ? "Cadastrar" : "Atualizar"}
              </CustomButton>
            </div>
          </ContainerFooter>
        </Form>
      </div>
    </Container>
  );
};

export default EditRegistry;
