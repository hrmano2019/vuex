import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInventory } from './store/inventorySlice';

const InventoryPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.inventory.items);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  return <InventoryTable items={items} />;
};
