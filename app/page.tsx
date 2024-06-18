"use client";

import styles from "./page.module.css";
import {Button, Card, Container, Flex, Heading, Inset, Text} from "@radix-ui/themes";
import { UpdateIcon, LightningBoltIcon, Share2Icon } from '@radix-ui/react-icons'
import React, {useState} from "react";

const firstExercises = [
  {
    name: "MuscleUps",
    sets: 3,
    reps: 10,
    restTime: 60,
  },
  {
    name: "PullUps",
    sets: 3,
    reps: 10,
    restTime: 60,
  }
]

export default function Home() {
  const [exercises, setExercises] = useState(firstExercises)
  return (
    <main>
      <Container size="2">
        <Flex direction="column" align="center" gapY="6">
          <Heading as="h1" className={styles.heading}>ShareTheGym</Heading>
          <Flex direction="column" align="center" gapY="4" className={styles.exercises}>
            {exercises.map((exercise, index) => (
              <Card key={index} className={styles.exerciseCard}>
                <Flex direction="column" align="center" gapY="3">
                  <Heading as="h2" size="5">{exercise.name}</Heading>
                  <Flex gapX="6">
                    <Flex direction="column" align="center">
                      <Flex align="center" gapX="1"><LightningBoltIcon/><Text>{exercise.reps}</Text></Flex>
                      <Text size="1" color="gray">reps</Text>
                    </Flex>
                    <Flex direction="column" align="center">
                      <Flex align="center" gapX="1"><UpdateIcon/><Text>{exercise.sets}</Text></Flex>
                      <Text size="1" color="gray">sets</Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Inset clip="border-box" side="bottom" className={styles.cardFooter}>
                  <Text size="1" color="gray">Rest Time: {exercise.restTime} seconds</Text>
                </Inset>
              </Card>
            ))}
            <Flex gapX="3">
              <Button
                onClick={() => setExercises([...exercises, {name: "New Exercise", sets: 3, reps: 10, restTime: 60}])}
                size="3"
              >
                Add Exercise
              </Button>
              <Button size="3" variant="soft">
                <Share2Icon /> Share
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </main>
  );
}
