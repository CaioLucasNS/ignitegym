import { useState } from "react";
import { HStack, VStack } from "native-base";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";

export function Home() {
  const [groupSelected, setGroupSelected] = useState("costas");

  return (
    <VStack flex={1}>
      <HomeHeader />

      <HStack>
        <Group
          name="costas"
          isActive={groupSelected === "costas"}
          onPress={() => setGroupSelected("costas")}
        />
        <Group
          name="bíceps"
          isActive={groupSelected === "bíceps"}
          onPress={() => setGroupSelected("bíceps")}
        />
        <Group
          name="ombro"
          isActive={groupSelected === "ombro"}
          onPress={() => setGroupSelected("ombro")}
        />
      </HStack>
    </VStack>
  );
}
