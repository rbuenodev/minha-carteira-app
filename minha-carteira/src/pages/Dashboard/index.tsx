import React, { useCallback, useEffect, useMemo, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import { Container, Content } from "./style";
import monthsList from "../../utils/months";
import WalletBox from "../../components/WalletBox";
import MessageBox from "../../components/MessageBox";
import happyImg from "../../assets/happy.svg";
import sadImg from "../../assets/sad.svg";
import grinningImg from "../../assets/grinning.svg";
import CustomPieChart from "../../components/CustomPieChart";
import HistoryBox from "../../components/HistoryBox";
import BarChartBox from "../../components/BarChartBox";
import thinkingImg from "../../assets/thinking.png";
import { getAllRegistryByMonthAndYear } from "../../services/Registry/registryService";

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

const Dashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<IRegistry[]>([]);
  const [gains, setGains] = useState<IRegistry[]>([]);
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );

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
          const gain = response.data.filter((g) => g.type === "Entrada");
          setGains(gain);
          const expense = response.data.filter((e) => e.type === "Saida");
          setExpenses(expense);
        }
      }
    };
    exec();
  }, [monthSelected, yearSelected]);

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

  const totalExpenses = useMemo(() => {
    let total: number = 0;
    expenses.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error("Invalid amount. It must be a number");
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected, expenses]);

  const totalGains = useMemo(() => {
    let total: number = 0;
    gains.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error("Invalid amount. It must be a number");
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected, gains]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalGains, totalExpenses]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: "Que triste!",
        description: "Neste m??s voc?? gastou mais do que recebeu.",
        footerText:
          "Verifique seus gastos e tente cortar algumas coisas desnecess??rias.",
        icon: sadImg,
      };
    } else if (totalGains === 0 && totalExpenses === 0) {
      return {
        title: "Ops!",
        description: "Neste m??s n??o h?? registros.",
        footerText: "Parece que voc?? n??o fez nenhuma entrada ou sa??da",
        icon: thinkingImg,
      };
    } else if (totalBalance === 0) {
      return {
        title: "Ufa!",
        description: "Neste m??s voc?? gastou exatamento o que gastou.",
        footerText: "Cuidado. No pr??ximo m??s tente poupar o seu dinheiro",
        icon: grinningImg,
      };
    } else {
      return {
        title: "Muito Bem!",
        description: "Sua carteira est?? positiva.",
        footerText: "Continue assim. Considere investir o seu saldo.",
        icon: happyImg,
      };
    }
  }, [totalBalance, totalExpenses, totalGains]);

  const relationExpensesVsGains = useMemo(() => {
    const total = totalGains + totalExpenses;
    const gainsPercent = Number(((totalGains / total) * 100).toFixed(1));
    const expensesPercent = Number(((totalExpenses / total) * 100).toFixed(1));
    const data = [
      {
        name: "Entradas",
        value: totalGains,
        percent: gainsPercent ? gainsPercent : 0,
        color: "#f7931b",
      },
      {
        name: "Sa??das",
        value: totalExpenses,
        percent: expensesPercent ? expensesPercent : 0,
        color: "#e44c4e",
      },
    ];
    return data;
  }, [totalGains, totalExpenses]);

  const historyData = useMemo(() => {
    return monthsList
      .map((_, month) => {
        let amountInput = 0;
        gains.forEach((gain) => {
          const date = new Date(gain.date);
          const gainMonth = date.getMonth();
          const gainYear = date.getFullYear();

          if (gainMonth === month && gainYear === yearSelected) {
            try {
              amountInput += Number(gain.amount);
            } catch {
              throw new Error(
                "amountInput is invalid. amountInput must be valid number."
              );
            }
          }
        });

        let amountOutput = 0;
        expenses.forEach((expense) => {
          const date = new Date(expense.date);
          const expenseMonth = date.getMonth();
          const expenseYear = date.getFullYear();

          if (expenseMonth === month && expenseYear === yearSelected) {
            try {
              amountOutput += Number(expense.amount);
            } catch {
              throw new Error(
                "amountOutput is invalid. amountOutput must be valid number."
              );
            }
          }
        });

        return {
          monthNumber: month,
          month: monthsList[month].substring(0, 3),
          amountInput,
          amountOutput,
        };
      })
      .filter((item) => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        return (
          (yearSelected === currentYear && item.monthNumber <= currentMonth) ||
          yearSelected < currentYear
        );
      });
  }, [yearSelected, expenses, gains]);

  const relationExpensevesRecurrentVsEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses.forEach((expense) => {
      if (expense.frequency === "Recorrente") {
        return (amountRecurrent += Number(expense.amount));
      }
      if (expense.frequency === "Eventual") {
        return (amountEventual += Number(expense.amount));
      }
    });
    const total = amountEventual + amountRecurrent;

    const percentCurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));
    return [
      {
        name: "Recorrentes",
        amount: amountRecurrent,
        percent: percentCurrent >= 0 ? percentCurrent : 0,
        color: "#F7931B",
      },
      {
        name: "Eventual",
        amount: amountEventual,
        percent: percentEventual >= 0 ? percentEventual : 0,
        color: "#E44C4E",
      },
    ];
  }, [expenses]);

  const relationGainsRecurrentVsEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains.forEach((gain) => {
      if (gain.frequency === "Recorrente") {
        return (amountRecurrent += Number(gain.amount));
      }
      if (gain.frequency === "Eventual") {
        return (amountEventual += Number(gain.amount));
      }
    });
    const total = amountEventual + amountRecurrent;

    const percentCurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));
    return [
      {
        name: "Recorrentes",
        amount: amountRecurrent,
        percent: percentCurrent >= 0 ? percentCurrent : 0,
        color: "#F7931B",
      },
      {
        name: "Eventual",
        amount: amountEventual,
        percent: percentEventual >= 0 ? percentEventual : 0,
        color: "#E44C4E",
      },
    ];
  }, [gains]);

  const handleMonthSelected = useCallback((month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch {
      throw new Error("Invalid month value. Accepts only 0 - 24.");
    }
  }, []);

  const handleYearSelected = useCallback((year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch {
      throw new Error("Invalid year value.");
    }
  }, []);

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#F7931B">
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
      <Content>
        <WalletBox
          title="Saldo"
          amount={totalBalance}
          footerLabel="Atualizado com base nas entradas e sa??das"
          icon={"dolar"}
          color="#4e41f0"
        />
        <WalletBox
          title="Entradas"
          amount={totalGains}
          footerLabel="Atualizado com base nas entradas"
          icon={"arrowUp"}
          color="#f7931b"
        />
        <WalletBox
          title="Sa??das"
          amount={totalExpenses}
          footerLabel="Atualizado com base nas sa??das"
          icon={"arrowDown"}
          color="#e44c4e"
        />
        <MessageBox
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />
        <CustomPieChart data={relationExpensesVsGains} />
        <HistoryBox
          data={historyData}
          lineColorAmountInput="#f7931b"
          lineColorAmountOutput="#e44c4e"
        />
        <BarChartBox
          title="Sa??das"
          data={relationExpensevesRecurrentVsEventual}
        />
        <BarChartBox title="Entradas" data={relationGainsRecurrentVsEventual} />
      </Content>
    </Container>
  );
};

export default Dashboard;
