import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useTodayState } from '@/hooks/useTodayState';

describe('useTodayState', () => {
  it('initializes and allows mood updates', () => {
    const { result } = renderHook(() => useTodayState('2025-01-01'));
    const initialMood = result.current.data.mood;
    act(() => {
      result.current.actions.addMood(5);
    });
    expect(result.current.data.mood).toBeGreaterThanOrEqual(0);
    // ensure state changed from initial (mock store increments mood history)
    expect(result.current.data.mood).not.toBe(initialMood);
  });
});

