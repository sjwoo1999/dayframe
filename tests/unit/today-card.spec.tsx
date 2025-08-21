import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TodayCard } from '@/components/core/TodayCard';

describe('TodayCard', () => {
  it('renders title and score', () => {
    render(<TodayCard score={88} summary={["line1"]} spend={1000} mood={7} />);
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('88')).toBeInTheDocument();
  });
});

