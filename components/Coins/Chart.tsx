import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import capitalise from "../../utils/capitalise";

import styles from "./Chart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  coinName: string;
  data: {
    market_caps: Array<number>[];
    prices: Array<number>[];
    total_volumes: Array<number>[];
  };
}

const Chart: React.FC<ChartProps> = ({ coinName, data }) => {
  const labels = data.prices.map((price) => {
    const date = new Date(price[0]);
    return date.toString().slice(4, 16);
  });
  const chartData = {
    labels,
    datasets: [
      {
        label: capitalise(coinName),
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: data.prices.map((price) => price[1]),
      },
      // {
      //   label: `Market Cap of ${capitalise(coinName)}`,
      //   backgroundColor: "rgb(255, 99, 132)",
      //   borderColor: "rgb(255, 99, 132)",
      //   data: data.market_caps.map((marketCap) => marketCap[1]),
      // },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${capitalise(coinName)} Chart`,
      },
    },
  };
  return (
    <div className={styles.container}>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default Chart;
