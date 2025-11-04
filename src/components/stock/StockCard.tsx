// src/components/stock/StockCard.tsx

import type { Stock } from '../../types';
import Card from '../Card';

interface StockCardProps {
  stock: Stock;
  onRemove?: (symbol: string) => void;
}

const StockCard = ({ stock, onRemove }: StockCardProps) => {
  const isPositive = stock.change >= 0;
  const changeColor = isPositive ? 'text-success-400' : 'text-error-400';
  const changeIcon = isPositive ? '▲' : '▼';

  return (
    <Card className="relative">
      {onRemove && (
        <button
          onClick={() => onRemove(stock.symbol)}
          className="absolute right-2 top-2 text-dark-text-secondary hover:text-error-400 transition-colors text-xl leading-none"
          aria-label="Remove stock from watchlist"
        >
          ✕
        </button>
      )}

      <div className="space-y-2">
        <div>
          <h3 className="text-2xl font-bold font-mono">{stock.symbol}</h3>
          <p className="text-sm text-dark-text-secondary truncate">{stock.name}</p>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold font-mono">
            ${stock.price.toFixed(2)}
          </span>
          <div className={`flex items-center gap-1 ${changeColor} font-mono`}>
            <span>{changeIcon}</span>
            <span className="font-semibold">
              ${Math.abs(stock.change).toFixed(2)} ({Math.abs(stock.changePercent).toFixed(2)}%)
            </span>
          </div>
        </div>

        <p className="text-xs text-dark-text-secondary">
          Updated {stock.lastUpdated.toLocaleTimeString()}
        </p>
      </div>
    </Card>
  );
};

export default StockCard;
