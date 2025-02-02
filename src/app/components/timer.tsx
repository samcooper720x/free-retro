import { useEffect, useState } from "react";
import * as State from "../state";
import { Button, Group, Menu, Text } from "@mantine/core";
import { IconBellRinging, IconClock } from "@tabler/icons-react";

export const Timer = () => {
  const onTimerSet = (seconds: number) => State.startTimer(seconds);
  const settings = () => State.getAppState().timer;
  const calculateTimeLeft = () => {
    const timeLeft = Math.floor(
      ((settings()?.duration ?? 0) * 1000 -
        (new Date().getTime() - (settings()?.start ?? 0))) /
        1000
    );
    if (settings() === null) {
      return undefined;
    } else if (timeLeft <= 0) {
      return 0;
    } else {
      return timeLeft;
    }
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // update timer every second
  let interval: NodeJS.Timer;
  const startInterval = () => {
    interval = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(interval);
  });

  const reset = () => {
    State.resetTimer();
    setTimeLeft(undefined);
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="subtle">
          <Group spacing={2}>
            {timeLeft !== undefined && timeLeft > 0 && (
              <Text weight={"bold"} color="red">
                {`${Math.floor(timeLeft / 60)}`.padStart(2, "0")}:
                {`${timeLeft % 60}`.padStart(2, "0")}
              </Text>
            )}
            {timeLeft === 0 && <IconBellRinging color="orange" size={25} />}
            {timeLeft !== 0 && (
              <IconClock
                color={(timeLeft ?? 0) > 0 ? "red" : undefined}
                size={25}
              />
            )}
          </Group>
        </Button>
      </Menu.Target>
      {(timeLeft ?? 0) > 0 && (
        <Menu.Dropdown>
          <Menu.Item color={"red"} onClick={reset}>
            Reset
          </Menu.Item>
        </Menu.Dropdown>
      )}
      {(timeLeft === 0 || timeLeft === undefined) && (
        <Menu.Dropdown>
          <Menu.Item onClick={() => onTimerSet?.(120)}>2 minutes</Menu.Item>
          <Menu.Item onClick={() => onTimerSet?.(5 * 60)}>5 minutes</Menu.Item>
          <Menu.Item onClick={() => onTimerSet?.(10 * 60)}>
            10 minutes
          </Menu.Item>
        </Menu.Dropdown>
      )}
    </Menu>
  );
};
