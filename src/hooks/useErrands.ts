'use client';

import { useState, useEffect, useCallback } from 'react';
import { errandService } from '@/services/errandService';
import { Errand } from '@/types';

export function useErrands() {
  const [errands, setErrands] = useState<Errand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchErrands = useCallback(async () => {
    try {
      setLoading(true);
      const data = await errandService.getAllErrands();
      setErrands(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch errands');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchErrands();
  }, [fetchErrands]);

  const updateErrand = async (id: string, errandData: Partial<Errand>) => {
    try {
      const updatedErrand = await errandService.updateErrand(id, errandData);
      setErrands(errands.map(errand => errand.id === id ? updatedErrand : errand));
      return updatedErrand;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update errand');
      throw err;
    }
  };

  const deleteErrand = async (id: string) => {
    try {
      await errandService.deleteErrand(id);
      setErrands(errands.filter(errand => errand.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete errand');
      throw err;
    }
  };

  const createErrand = async (errandData: Omit<Errand, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newErrand = await errandService.createErrand(errandData);
      setErrands([...errands, newErrand]);
      return newErrand;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create errand');
      throw err;
    }
  };

  return {
    errands,
    loading,
    error,
    refetch: fetchErrands,
    updateErrand,
    deleteErrand,
    createErrand,
  };
}