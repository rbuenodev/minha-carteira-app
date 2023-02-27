import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import ContentHeader from "../../components/ContentHeader";
import Input from "../../components/Input";
import SelectInput from "../../components/SelectInput";
import {
  deleteRegistryById,
  getRegistryById,
  postRegistry,
  putRegistry,
} from "../../services/Registry/registryService";
import {
  BlueButton,
  Container,
  ContainerFooter,
  ContainerInline,
  DeleteButton,
  Form,
  FormTitle,
} from "./styles";

interface IRegistry {
  id: number;
  description: string;
  amount: number | undefined;
  type: string;
  frequency: string;
  date: string;
  obs?: string;
  userId: number;
  userName: string;
}
const EditRegistry: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [registry, setRegistry] = useState<IRegistry>({
    id: 0,
    description: "",
    amount: undefined,
    date: "",
    type: "Entrada",
    frequency: "Eventual",
    obs: "",
    userId: 1,
    userName: "",
  } as IRegistry);
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

  useEffect(() => {
    const exec = async () => {
      if (id === "0") {
        return;
      }
      const response = await getRegistryById(id);
      if (!response) {
        return;
      }
      if (response.success) {
        setRegistry(response.data as IRegistry);
      }
    };
    exec();
  }, [id]);

  const types = useMemo(() => {
    return [
      { label: "Entrada", value: "Entrada" },
      { label: "Saida", value: "Saida" },
    ];
  }, []);

  const frequencies = useMemo(() => {
    return [
      { label: "Eventual", value: "Eventual" },
      { label: "Recorrente", value: "Recorrente" },
    ];
  }, []);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("registry", registry);
      if (id === "0") {
        const res = await insertRegistry();
        console.log("toast", res);
      } else {
        const res = await updateRegistry();
        console.log("toast", res);
      }
      clearForm();
    }
  };

  const validateForm = () => {
    if (registry) {
      return true;
    }
    return false;
  };

  const updateRegistry = async () => {
    const res = await putRegistry(registry);
    if (!res) {
      return;
    }

    if (res.success) {
      console.log(res);
      return true;
    }
    return false;
  };

  const insertRegistry = async () => {
    const res = await postRegistry(registry);
    if (!res) {
      return;
    }

    if (res.success) {
      console.log(res);
      return true;
    }
    return false;
  };

  const deleteRegistry = async () => {
    if (registry.id === 0) {
      return;
    }
    const res = await deleteRegistryById(registry.id.toString());
    if (!res) {
      return;
    }

    if (res.success) {
      console.log(res);
      clearForm();
      navigate("/edit/0");
      return true;
    }
    return false;
  };

  const clearForm = () => {
    setRegistry({
      id: 0,
      description: "",
      amount: undefined,
      date: "",
      type: "Entrada",
      frequency: "Eventual",
      obs: "",
      userId: 1,
      userName: "",
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
                defaultValue={registry.description}
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
                defaultValue={registry.description}
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
                  setRegistry({ ...registry, amount: +e.target.value });
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
            <DeleteButton
              onClick={() => {
                deleteRegistry();
              }}
            >
              Excluir
            </DeleteButton>
            <BlueButton>
              <Button>{id === "0" ? "Cadastrar" : "Atualizar"}</Button>
            </BlueButton>
          </ContainerFooter>
        </Form>
      </div>
    </Container>
  );
};

export default EditRegistry;
