import { useState } from "react";
import { useBetween } from "use-between";

const useNavState = () => {
  const [navExpandedState, setNavExpandedState] = useState(false);
  return {
    navExpandedState
  };
};

const useSharedNavState = () => useBetween(useNavState);