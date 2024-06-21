export type Rest = {
  time: number;
}

export const Rest = {
  is: (value: any): value is Rest => value && value.hasOwnProperty('time')
}