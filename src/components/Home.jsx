import {
  AreaChart,
  ResponsiveContainer,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format, parseISO, subDays } from "date-fns";
import "../index.css";
import { createRef } from "react";
import { saveAs } from 'file-saver';

const data = [];
for (let num = 30; num >= 0; num--) {
  data.push({
    date: subDays(new Date(), num).toISOString().substring(0, 10),
    value: 1 + Math.random(),
    value2: 1 - Math.random(),
  });
}

function Home() {
  const chartRef = createRef();
  return (
    <div>
      <ResponsiveContainer width="100%" height={500} ref={chartRef}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4}></stop>
              <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05}></stop>
            </linearGradient>
          </defs>
          <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />
          <Area dataKey="value2" stroke="#ab31B7" fill="url(#color)" />

          <XAxis
            dataKey="date"
            tickCount={3}
            axisLine={false}
            tickLine={false}
            tickFormatter={(dateStr) => {
              // parseISO convierte un string en una instancia date
              const date = parseISO(dateStr);
              // getDate retorna el día del mes de la fecha data
              // si ese día es divisible entre 7 entonces se muestra, si no, retorna vacío
              if (date.getDate() % 7 === 0) {
                // retorna un date string en el formato dado
                return format(date, "MMM, d");
              }
              return "";
            }}
          />
          <YAxis
            dataKey="value"
            axisLine={false}
            tickLine={false}
            tickCount={8}
            tickFormatter={(number) => `$${number.toFixed(2)}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
      <button
        type="button"
        onClick={() => {
          exportChart(chartRef);
        }}
      >
        Export
      </button>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  // si el elemento está activo muestra esto, de lo contrario no muestres nada:
  if (active) {
    return (
      <div className="border-transparent rounded-md bg-slate-900 text-white p-6 shadow-2xl text-center">
        <h4>{format(parseISO(label), "eeee, d MMM")}</h4>
        <p>${payload[0].value.toFixed(2)} CAD</p>
        <p>${payload[1].value.toFixed(2)} US</p>
      </div>
    );
  }
  return null;
}

function exportChart(chartRef){
    console.log(chartRef.current)
    let chartSVG = chartRef.current.current;
    let svgURL = new XMLSerializer().serializeToString(chartSVG);
    let svgBlob = new Blob([svgURL], {type: "image/svg+xml;charset=utf-8"});
    saveAs(svgBlob, "chart.svg");
}

export default Home;
