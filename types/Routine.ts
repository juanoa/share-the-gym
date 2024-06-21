import {Exercise} from "@/types/Exercise";
import {Rest} from "@/types/Rest";

export type Routine = {
  name: string;
  steps: Array<Exercise | Rest>
}

export const Routine = {
  createDefault: (): Routine => ({
    name: "Routine Name ",
    steps: [Exercise.createDefault()]
  }),
  getLastRestTime: (routine: Routine, index: number): number => routine.steps.reduce((acc, step, i) => {
    if (i < index && Rest.is(step)) {
      return step.time
    }
    return acc
  }, 0),
  addExerciseBasedInLastOrDefault: (routine: Routine): Routine => {
    const lastExercise = routine.steps.findLast(step => Exercise.is(step))
    if (!lastExercise) {
      return {...routine, steps: [...routine.steps, Exercise.createDefault()]}
    }
    return {...routine, steps: [...routine.steps, {...lastExercise, name: "Exercise"}]}
  },
  deleteByIndex: (routine: Routine, index: number): Routine => {
    const newSteps = [...routine.steps]
    newSteps.splice(index, 1)
    return {...routine, steps: newSteps}
  },
  deleteByIndexAndRelatedRest: (routine: Routine, index: number): Routine => {
    // Delete the step
    // If only have a rest before, delete it
    // If only have a rest after, delete it
    // If have a rest before and after, delete the after
    // If doesn't have any rest, do nothing
    const newSteps = [...routine.steps]
    newSteps.splice(index, 1)
    const before = newSteps[index - 1]
    const after = newSteps[index]
    if (Rest.is(before) && !Rest.is(after)) {
      newSteps.splice(index - 1, 1)
      return {...routine, steps: newSteps}
    } else if (!Rest.is(before) && Rest.is(after)) {
      newSteps.splice(index, 1)
      return {...routine, steps: newSteps}
    } else if (Rest.is(before) && Rest.is(after)) {
      newSteps.splice(index, 1)
      return {...routine, steps: newSteps}
    }
    return {...routine, steps: newSteps}
  },
  addInIndex: (routine: Routine, index: number, step: Exercise | Rest): Routine => {
    const newSteps = [...routine.steps]
    newSteps.splice(index, 0, step)
    return {...routine, steps: newSteps}
  },
  updateStepByIndex: (routine: Routine, index: number, step: Exercise | Rest): Routine => {
    const newSteps = [...routine.steps]
    newSteps[index] = step
    return {...routine, steps: newSteps}
  }
}