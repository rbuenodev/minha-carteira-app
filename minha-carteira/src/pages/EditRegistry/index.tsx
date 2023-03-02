import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import ContentHeader from "../../components/ContentHeader";
import Input from "../../components/Input";
import SelectInput from "../../components/SelectInput";
import toast from "react-hot-toast";
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
import AlertDialog from "../../components/AlertDialog";

interface IRegistry {
  id: number;
  description: string;
  amount: number | string;
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
    amount: "",
    date: "",
    type: "Entrada",
    frequency: "Eventual",
    obs: "",
    userId: 1,
    userName: "",
  } as IRegistry);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const navigate = useNavigate();
  const notifyError = (msg: string) => toast.error(msg);
  const notifySuccess = (msg: string) => toast.success(msg);

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

  const disabledDeleteBtn = useMemo(() => {
    if (id) return id === "0";
    return false;
  }, [id]);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      if (id === "0") {
        const res = await insertRegistry();
        if (res) {
          notifySuccess("Registro cadastrado com sucesso!");
          clearForm();
          return;
        }
      } else if (id !== "0") {
        console.log(registry);
        const res = await updateRegistry();
        if (res) {
          notifySuccess("Registro atualizado com sucesso!");
          clearForm();
          return;
        }
      }
      notifyError("Houve uma falha ao gravar.");
      return;
    }
  };

  const validateForm = () => {
    if (registry) {
      if (registry.description.length > 4 && registry.amount > 0) return true;
    }
    return false;
  };

  const updateRegistry = async () => {
    const res = await putRegistry(registry);
    if (!res) {
      return;
    }
    return res.success;
  };

  const insertRegistry = async () => {
    const res = await postRegistry(registry);
    if (!res) {
      return;
    }
    return res.success;
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
      clearForm();
      navigate("/edit/0");
      notifySuccess("Registro deletado com sucesso!");
      openModal();
      return true;
    }
    notifySuccess("Houve uma falha ao deletar.");
    return false;
  };

  const clearForm = () => {
    setRegistry({
      id: 0,
      description: "",
      amount: "",
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
            value={registry.obs || ""}
          />
          <ContainerFooter>
            <AlertDialog
              showModal={showModal}
              setShowModal={setShowModal}
              description="Essa ação não poderá ser revertida. Você perderá o registro."
              title="Tem certeza que deseja excluir?"
              confirmDescritpion="Sim, deletar registro!"
              handleConfirm={deleteRegistry}
            />

            <DeleteButton
              disabled={disabledDeleteBtn}
              type="button"
              onClick={openModal}
            >
              Excluir
            </DeleteButton>
            <BlueButton>
              <Button type="submit">
                {id === "0" ? "Cadastrar" : "Atualizar"}
              </Button>
            </BlueButton>
          </ContainerFooter>
        </Form>
      </div>
    </Container>
  );
};

export default EditRegistry;
