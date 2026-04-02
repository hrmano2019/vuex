interface CommodityStateProps {
  title: string;
  description?: string;
  count?: number;
}

const CommodityState: React.FC<CommodityStateProps> = ({ title, description, count }) => (
  <div>
    <h2>{title}</h2>
    {description && <p>{description}</p>}
    {count !== undefined && <span>{count}</span>}
  </div>
);
