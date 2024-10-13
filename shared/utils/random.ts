export function random(min: number, max: number, step: number): number {
  // Вычисляем количество шагов в заданном диапазоне
  const stepCount = Math.floor((max - min) / step);

  // Генерируем случайное целое число от 0 до stepCount
  const randomStep = Math.floor(Math.random() * (stepCount + 1));

  // Возвращаем случайное число с учетом шага
  return min + randomStep * step;
}
