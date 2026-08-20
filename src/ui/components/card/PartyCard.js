import { sendWsMessage } from "../../../store/ws";

const PartyCard = ({ party, isInParty, currentSessionId }) => {
  const isFull = party.memberCount >= party.maxPlayers;

  return (
    <div className="party-card">
      <div className="party-card-info">
        <span className="party-name">{party.name}</span>
        <span className="party-leader">Leader: {party.leaderNickname || party.leaderId}</span>
        <span className={`party-count ${isFull ? "full" : ""}`}>
          {party.memberCount}/{party.maxPlayers}
        </span>
      </div>
      {!isInParty && (
        <button
          type="button"
          className="party-join-btn"
          disabled={isFull}
          onClick={() => sendWsMessage({ type: "JOIN_PARTY", partyId: party.id })}
        >
          Join
        </button>
      )}
    </div>
  );
};

export default PartyCard;
