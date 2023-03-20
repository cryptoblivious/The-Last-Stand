import { Collection } from 'mongodb';

export const findUniqueNumber = (numbers: number[], max: number): number => {
  let newNo = 0;
  while (newNo <= max) {
    if (!numbers.includes(newNo)) {
      return newNo;
    }
    newNo++;
  }
  return -1;
};

export const unformatNumbers = (numbers: Array<string>) => numbers.map((no: string) => parseInt(no, 10));

export const formatNumber = (number: number) => number.toString().padStart(4, '0');


export const getUpperOddNumber = (number: number) => {
  return number % 2 === 0 ? number + 1 : number;
};

//ref ChatGPT
