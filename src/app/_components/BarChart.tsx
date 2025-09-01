import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';

interface BarData {
  [key: string]: string | number;
}

interface BarConfig {
  dataKey: string;
  fill: string;
  name?: string;
  stackId?: string;
}

interface BarChartProps {
  data: BarData[];
  bars: BarConfig[];
  title: string;
  height?: number;
  xAxisKey: string;
  formatTooltip?: (value: any, name: string) => [string, string];
}

export default function BarChart({ 
  data, 
  bars, 
  title, 
  height = 320,
  xAxisKey,
  formatTooltip
}: BarChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold text-gray-900 mb-4">{title}</h2>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip formatter={formatTooltip} />
            <Legend />
            {bars.map((bar, index) => (
              <Bar
                key={index}
                dataKey={bar.dataKey}
                fill={bar.fill}
                name={bar.name || bar.dataKey}
                stackId={bar.stackId}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}