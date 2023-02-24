import React, { useCallback, useMemo, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import { Container, Content } from "./style";
import monthsList from "../../utils/months";
import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import WalletBox from "../../components/WalletBox";
import MessageBox from "../../components/MessageBox";
import happyImg from "../../assets/happy.svg";
import sadImg from "../../assets/sad.svg";
import grinningImg from "../../assets/grinning.svg";
import CustomPieChart from "../../components/CustomPieChart";
import HistoryBox from "../../components/HistoryBox";
import BarChartBox from "../../components/BarChartBox";
import thinkingImg from "../../assets/thinking.png";

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );

  const years = useMemo(() => {
    let uniqueYears: number[] = [];
    [...expenses, ...gains].forEach((item) => {
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
  }, [monthSelected, yearSelected]);

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
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalGains, totalExpenses]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: "Que triste!",
        description: "Neste mês você gastou mais do que recebeu.",
        footerText:
          "Verifique seus gastos e tente cortar algumas coisas desnecessárias.",
        icon: sadImg,
      };
    } else if (totalGains === 0 && totalExpenses === 0) {
      return {
        title: "Ops!",
        description: "Neste mês não há registros.",
        footerText: "Parece que você não fez nenhuma entrada ou saída",
        icon: thinkingImg,
      };
    } else if (totalBalance === 0) {
      return {
        title: "Ufa!",
        description: "Neste mês você gastou exatamento o que gastou.",
        footerText: "Cuidado. No próximo mês tente poupar o seu dinheiro",
        icon: grinningImg,
      };
    } else {
      return {
        title: "Muito Bem!",
        description: "Sua carteira está positiva.",
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
        name: "Saídas",
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
  }, [yearSelected]);

  const relationExpensevesRecurrentVsEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses
      .filter((expense) => {
        const date = new Date(expense.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach((expense) => {
        if (expense.frequency === "recorrente") {
          return (amountRecurrent += Number(expense.amount));
        }
        if (expense.frequency === "eventual") {
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
  }, [monthSelected, yearSelected]);

  const relationGainsRecurrentVsEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains
      .filter((gain) => {
        const date = new Date(gain.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach((gain) => {
        if (gain.frequency === "recorrente") {
          return (amountRecurrent += Number(gain.amount));
        }
        if (gain.frequency === "eventual") {
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
  }, [monthSelected, yearSelected]);

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
          footerLabel="Atualizado com base nas entradas e saídas"
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
          title="Saídas"
          amount={totalExpenses}
          footerLabel="Atualizado com base nas saídas"
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
          title="Saídas"
          data={relationExpensevesRecurrentVsEventual}
        />
        <BarChartBox title="Entradas" data={relationGainsRecurrentVsEventual} />
      </Content>
    </Container>
  );
};

export default Dashboard;
