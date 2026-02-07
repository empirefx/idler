import React from "react";
import { useSelector } from "react-redux";

import "../../../styles/sections/player-entity-section.css";
import { selectPlayer } from "../../../store/slices/playerSlice";
import EntityCard from "../card/EntityCard";

const PlayerEntitySection = () => {
  const playerInfo = useSelector(selectPlayer);
  if (!playerInfo) return null;
  return (
    <section className="player-entity-section">
      <EntityCard entity={playerInfo} avatarFolder="players" />
    </section>
  );
};

export default PlayerEntitySection;
