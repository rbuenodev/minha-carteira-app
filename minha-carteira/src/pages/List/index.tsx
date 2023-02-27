import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ContentHeader from "../../components/ContentHeader";
import HistoryCardFinance from "../../components/HistoryFinanceCard";
import SelectInput from "../../components/SelectInput";
import { Container, Content, Filters } from "./styles";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import monthsList from "../../utils/months";
import { getAllRegistryByMonthAndYear } from "../../services/Registry/registryService";

interface IData {
  id: number;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

interface IRegistry {
  id: number;
  description: string;
  amount: number;
  type: string;
  frequency: string;
  date: string;
  obs?: string;
  userId: number;
  userName: string;
}

const List: React.FC = () => {
  const { type } = useParams<{ type: string }>();

  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );

  const [frequencyFilterSelected, setFrequencyFilterSelected] = useState<
    string[]
  >(["Recorrente", "Eventual"]);

  const [listData, setListData] = useState<IRegistry[]>([]);

  useEffect(() => {
    const exec = async () => {
      const response = await getAllRegistryByMonthAndYear(
        "1",
        monthSelected,
        yearSelected
      );
      if (!response) {
        return;
      }
      if (response.success) {
        if (response.data) {
          if (type === "entry-balance") {
            setListData(response.data.filter((g) => g.type === "Entrada"));
          } else {
            setListData(response.data.filter((e) => e.type === "Saida"));
          }
        }
      }
    };
    exec();
  }, [monthSelected, yearSelected, type]);

  const pageData = useMemo(() => {
    return type === "entry-balance"
      ? {
          title: "Entradas",
          lineColor: "#4e41F0",
        }
      : {
          title: "Saídas",
          lineColor: "#E44C4E",
        };
  }, [type]);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];
    const year = new Date().getFullYear();
    for (let i = year - 5; i <= year; i++) {
      uniqueYears.push(i);
    }
    uniqueYears.sort((a, b) => b - a);
    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, []);

  const months = useMemo(() => {
    return monthsList.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = frequencyFilterSelected.findIndex(
      (item) => item === frequency
    );

    if (alreadySelected >= 0) {
      const filtered = frequencyFilterSelected.filter(
        (item) => item !== frequency
      );
      setFrequencyFilterSelected(filtered);
    } else {
      setFrequencyFilterSelected((prev) => [...prev, frequency]);
    }
  };

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch {
      throw new Error("Invalid month value. Accepts only 0 - 24.");
    }
  };

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch {
      throw new Error("Invalid year value.");
    }
  };

  useEffect(() => {
    const filteredData = listData.filter((item) =>
      frequencyFilterSelected.includes(item.frequency)
    );

    const formattedData = filteredData.map((item) => {
      return {
        id: item.id,
        description: item.description,
        amountFormatted: formatCurrency(item.amount),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === "Recorrente" ? "#4e41F0" : "#e44c4e",
      };
    });

    setData(formattedData);
  }, [
    pageData,
    monthSelected,
    yearSelected,
    frequencyFilterSelected,
    listData,
  ]);

  return (
    <Container>
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
        <SelectInput
          options={months}
          OnChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          OnChange={(e) => handleYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>
      <Filters>
        <button
          type="button"
          className={`tag-filter tag-filter-recurrent ${
            frequencyFilterSelected.includes("Recorrente") && "tag-actived"
          }`}
          onClick={() => handleFrequencyClick("Recorrente")}
        >
          Recorrentes
        </button>
        <button
          type="button"
          className={`tag-filter tag-filter-eventual ${
            frequencyFilterSelected.includes("Eventual") && "tag-actived"
          }`}
          onClick={() => handleFrequencyClick("Eventual")}
        >
          Eventuais
        </button>
      </Filters>
      <Content>
        {data.map((item) => (
          <HistoryCardFinance
            key={item.id}
            id={item.id.toString()}
            title={item.description}
            subtitle={item.dateFormatted}
            tagColor={item.tagColor}
            amount={item.amountFormatted}
          />
        ))}
      </Content>
    </Container>
  );
};

export default List;
