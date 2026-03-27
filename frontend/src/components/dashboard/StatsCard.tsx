import Card from '../ui/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
}

const StatsCard = ({ title, value, description }: StatsCardProps) => {
  return (
    <Card>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="mt-3 text-3xl font-bold text-slate-800">{value}</h3>
      {description ? (
        <p className="mt-2 text-sm text-slate-400">{description}</p>
      ) : null}
    </Card>
  );
};

export default StatsCard;