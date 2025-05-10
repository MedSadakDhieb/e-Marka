import { useContext } from 'react';
import { StorageContext } from '../context/StorageContext';

export const useStorage = () => {
  return useContext(StorageContext);
};