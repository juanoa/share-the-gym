import {Button, Flex, Heading, Text} from "@radix-ui/themes";
import React from "react";
import {PlusIcon} from "@radix-ui/react-icons";
import styles from "./header.module.css";
import Link from "next/link";

export const Header = () => {
  return (
    <header className={styles.root}>
      <Flex justify="between" align="center" className={styles.header}>
        <Flex align="center" direction="column">
          <Heading as="h1">ShareTheGym</Heading>
          <Text size="1" color="gray">Create your own workout routine</Text>
        </Flex>
        <Link href="/">
          <Button><PlusIcon/> New</Button>
        </Link>
      </Flex>
    </header>
  );
}