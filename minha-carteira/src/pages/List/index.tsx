import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ContentHeader from "../../components/ContentHeader";
import HistoryCardFinance from "../../components/HistoryFinanceCard";
import SelectInput from "../../components/SelectInput";
import { Container, Content, Filters } from "./styles";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import monthsList from "../../utils/months";
import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
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
  >(["recorrente", "eventual"]);

  const pageData = useMemo(() => {
    return type === "entry-balance"
      ? {
          title: "Entradas",
          lineColor: "#4e41F0",
          listData: gains,
        }
      : {
          title: "Saídas",
          lineColor: "#E44C4E",
          listData: expenses,
        };
  }, [type]);

  const years = useMemo(() => {
    const { listData } = pageData;

    let uniqueYears: number[] = [];
    listData.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });
    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, [pageData]);

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
    const { listData } = pageData;
    const filteredDate = listData.filter((item) => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return (
        month === monthSelected &&
        year === yearSelected &&
        frequencyFilterSelected.includes(item.frequency)
      );
    });

    const formattedData = filteredDate.map((item) => {
      return {
        id: uuidv4(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#4e41F0" : "#e44c4e",
      };
    });

    setData(formattedData);
  }, [pageData, monthSelected, yearSelected, frequencyFilterSelected]);

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
          className={`tag-filter tag-filter-recurrent ${frequencyFilterSelected.includes(
            "recorrente"
          ) && "tag-actived"}`}
          onClick={() => handleFrequencyClick("recorrente")}
        >
          Recorrentes
        </button>
        <button
          type="button"
          className={`tag-filter tag-filter-eventual ${frequencyFilterSelected.includes(
            "eventual"
          ) && "tag-actived"}`}
          onClick={() => handleFrequencyClick("eventual")}
        >
          Eventuais
        </button>
      </Filters>
      <Content>
        {data.map((item) => (
          <HistoryCardFinance
            key={item.id}
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
