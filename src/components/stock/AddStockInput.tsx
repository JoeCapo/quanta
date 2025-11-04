// src/components/stock/AddStockInput.tsx

import { useState } from 'react';
import Button from '../Button';
import Input from '../Input';

interface AddStockInputProps {
  onAdd: (symbol: string) => Promise<void>;
  disabled?: boolean;
  currentCount: number;
  maxCount: number;
}

const AddStockInput = ({ onAdd, disabled, currentCount, maxCount }: AddStockInputProps) => {
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!symbol.trim()) return;

    try {
      setLoading(true);
      setError('');
      await onAdd(symbol.toUpperCase());
      setSymbol('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add stock');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    if (value === '' || /^[A-Z]{0,5}$/.test(value)) {
      setSymbol(value);
      setError('');
    }
  };

  const isFull = currentCount >= maxCount;

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder="Symbol (e.g., AAPL)"
            value={symbol}
            onChange={handleChange}
            disabled={disabled || loading || isFull}
            error={error}
            maxLength={5}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          disabled={!symbol || loading || isFull}
          isLoading={loading}
        >
          Add
        </Button>
      </div>
      <p className="text-sm text-dark-text-secondary">
        {currentCount}/{maxCount} stocks
        {isFull && <span className="text-error-400 ml-2">(Watchlist full)</span>}
      </p>
    </form>
  );
};

export default AddStockInput;
