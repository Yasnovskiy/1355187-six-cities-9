import { cityNames } from './const';

export const randomInteger = (min: number, max: number) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const getRandomCity = () => {
  const indexOfArray = cityNames.length - 1;
  const index = randomInteger(0, indexOfArray);
  return cityNames[index];
};
