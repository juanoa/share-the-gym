export type Exercise = {
  name: string;
  sets: number;
  reps: number;
  restTimeBetweenSets: number;

}

export const Exercise = {
  is: (value: any): value is Exercise => value && value.hasOwnProperty('name'),
  createDefault: (): Exercise => ({
    name: "Exercise",
    sets: 3,
    reps: 10,
    restTimeBetweenSets: 60,
  })
}