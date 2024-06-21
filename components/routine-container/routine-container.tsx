import styles from "./routine-container.module.css";
import {Button, Callout, Container, Flex, Heading, Text} from "@radix-ui/themes";
import {InfoCircledIcon, StopwatchIcon} from '@radix-ui/react-icons'
import React, {useState} from "react";
import {Routine} from "@/types/Routine";
import {ExerciseCard} from "@/components/exercise-card/exercise-card";
import {Exercise} from "@/types/Exercise";
import {InputBox} from "@/components/input-box/input-box";
import {Rest} from "@/types/Rest";
import {ShareRoutineButton} from "@/components/share-routine-button/share-routine-button";
import Link from "next/link";

interface Props {
  routineValue: Routine
}

export const RoutineContainer: React.FC<Props> = ({routineValue}) => {
  const [routine, setRoutine] = useState<Routine>(routineValue)

  const handleChangeExercise = (index: number, exercise: Exercise) => {
    setRoutine(Routine.updateStepByIndex(routine, index, exercise))
  }

  const handleChangeRest = (index: number, rest: Rest) => {
    if (rest.time === 0 || isNaN(rest.time)) {
      return setRoutine(Routine.deleteByIndex(routine, index))
    }
    setRoutine(Routine.updateStepByIndex(routine, index, rest))
  }

  const addRestInPosition = (index: number, rest: Rest) => {
    setRoutine(Routine.addInIndex(routine, index + 1, rest))
  }

  const handleDeleteExercise = (index: number) => {
    setRoutine(Routine.deleteByIndexAndRelatedRest(routine, index))
  }

  const handleUpdateName = (value: string) => {
    setRoutine({...routine, name: value})
  }

  return (
    <main>
      <Container size="2">
        <Flex direction="column" align="center" gapY="6">
          <InputBox value={routine.name} onChange={handleUpdateName} maxWidth="100%" size="2">
            <Heading as="h2" size="5" weight="regular">🏋️‍♂️ {routine.name}</Heading>
          </InputBox>
          <Flex direction="column" align="center" gapY="4" className={styles.exercises}>
            {
              routine.steps.length === 0 && (
                <Callout.Root variant="outline">
                  <Callout.Icon>
                    <InfoCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>
                    Your routine is empty, add some exercises to start
                  </Callout.Text>
                </Callout.Root>
              )
            }
            {routine.steps.map((step, index, steps) => {
              if (Exercise.is(step)) {
                return (
                  <>
                    <ExerciseCard
                      key={index}
                      exercise={step}
                      onUpdate={(exercise) => handleChangeExercise(index, exercise)}
                      onDelete={() => handleDeleteExercise(index)}
                    />
                    {
                      Exercise.is(steps[index + 1]) && (
                        <InputBox
                          value={Routine.getLastRestTime(routine, index)}
                          onChange={(value) => addRestInPosition(index, {time: parseInt(value)})}
                          slot={<Text color="gray">sec.</Text>}
                          maxWidth="75px"
                        >
                          <Flex align="center" gapX="2">
                            <Button variant="surface" size="1"><StopwatchIcon/> Add rest time</Button>
                          </Flex>
                        </InputBox>
                      )
                    }
                  </>
                )
              }
              return (
                <InputBox
                  key={index}
                  value={step.time}
                  onChange={(value) => handleChangeRest(index, {time: parseInt(value)})}
                  slot={<Text color="gray">sec.</Text>}
                  maxWidth="75px"
                >
                  <Flex align="center" gapX="2" key={index}><StopwatchIcon/><Text size="1">{step.time} sec.</Text></Flex>
                </InputBox>
              )
            })}
            <Flex gapX="3">
              <Button
                onClick={() => setRoutine(Routine.addExerciseBasedInLastOrDefault(routine))}
                size="3"
              >
                Add Exercise
              </Button>
              <ShareRoutineButton routine={routine}/>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </main>
  );
}
