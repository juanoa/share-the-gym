import {Card, Flex, Heading, IconButton, Inset, Strong, Text} from "@radix-ui/themes";
import {LightningBoltIcon, UpdateIcon} from "@radix-ui/react-icons";
import React from "react";
import styles from "@/components/exercise-card/exercise-card.module.css";
import {Exercise} from "@/types/Exercise";
import {InputBox} from "@/components/input-box/input-box";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

interface Props {
  exercise: Exercise;
  onUpdate: (exercise: Exercise) => void;
  onDelete: () => void;
}

export const ExerciseCard: React.FC<Props> = ({exercise, onUpdate, onDelete}) => {

  const handleOnChangeName = (value: string) => {
    onUpdate({...exercise, name: value})
  }

  const handleOnChangeReps = (value: string) => {
    onUpdate({...exercise, reps: parseInt(value)})
  }

  const handleOnChangeSets = (value: string) => {
    onUpdate({...exercise, sets: parseInt(value)})
  }

  const handleOnChangeRestBetweenSets = (value: string) => {
    onUpdate({...exercise, restTimeBetweenSets: parseInt(value)})
  }

  return (
    <Card className={styles.card}>
      <IconButton size="1" variant="surface" onClick={onDelete} className={styles.deleteIcon}>
        <CloseIcon/>
      </IconButton>
      <Flex direction="column" align="center" gapY="3">
        <InputBox value={exercise.name} onChange={handleOnChangeName} maxWidth="200px" size="1">
          <Heading as="h3" size="2">{exercise.name}</Heading>
        </InputBox>
        <Flex gapX="6">
          <Flex direction="column" align="center">
            <InputBox value={exercise.reps} onChange={handleOnChangeReps} type="number" maxWidth="35px">
              <Flex align="center" gapX="1"><LightningBoltIcon/><Text>{exercise.reps}</Text></Flex>
            </InputBox>
            <Text size="1" color="gray">reps</Text>
          </Flex>
          <Flex direction="column" align="center">
            <InputBox value={exercise.sets} onChange={handleOnChangeSets} type="number" maxWidth="35px">
              <Flex align="center" gapX="1"><UpdateIcon/><Text>{exercise.sets}</Text></Flex>
            </InputBox>
            <Text size="1" color="gray">sets</Text>
          </Flex>
        </Flex>
      </Flex>
      <Inset clip="border-box" side="bottom" className={styles.cardFooter}>
        <InputBox
          value={exercise.restTimeBetweenSets}
          onChange={handleOnChangeRestBetweenSets}
          type="number"
          maxWidth="150px"
          slot={<Text color="gray">sec.</Text>}
        >
          <Text size="1" color="gray">Rest time between sets: <Strong>{exercise.restTimeBetweenSets} sec.</Strong></Text>
        </InputBox>
      </Inset>
    </Card>
  )
}