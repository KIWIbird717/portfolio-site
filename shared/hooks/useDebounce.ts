import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  // Состояние для хранения "отложенного" значения
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Устанавливаем таймер, который обновляет значение через задержку
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Очищаем таймер при изменении значения или задержки
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Зависимости: обновление при изменении value или delay

  return debouncedValue;
}
