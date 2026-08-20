import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useUIVisibility } from "../../UIVisibilityContext";
import DraggableWindow from "../common/DraggableWindow";
import PartyCard from "../card/PartyCard";
import { createParty, leaveParty } from "../../../store/ws";
import "../../../styles/sections/party-browser-section.css";

const MAX_PARTY_NAME = 30;

const PartyBrowserSection = () => {
  const { partyBrowser, togglePartyBrowser } = useUIVisibility();
  const partyList = useSelector((state) => state.parties.partyList);
  const currentParty = useSelector((state) => state.parties.currentParty);
  const [partyName, setPartyName] = useState("");

  const currentSessionId = useSelector((state) => state.player.sessionId);

  const handleCreate = useCallback(() => {
    if (!partyName.trim()) return;
    createParty(partyName.trim());
    setPartyName("");
  }, [partyName]);

  const handleLeave = useCallback(() => {
    leaveParty();
  }, []);

  const isInParty = !!currentParty;
  const isLeader = currentParty && currentParty.leaderId === currentSessionId;

  return (
    <DraggableWindow
      windowId="party-browser"
      title="Party"
      width={420}
      minHeight={400}
      isOpen={partyBrowser}
      onClose={togglePartyBrowser}
    >
      {isInParty ? (
        <div className="party-view">
          <div className="party-header">
            <h4 className="party-title">{currentParty.name}</h4>
            <span className="party-count-badge">
              {currentParty.memberCount}/{currentParty.maxPlayers}
            </span>
          </div>
          <div className="party-members">
            {currentParty.members.map((member) => (
              <div
                key={member.sessionId}
                className={`party-member ${member.isLeader ? "leader" : ""}`}
              >
                <span className="member-name">{member.nickname}</span>
                {member.isLeader && <span className="member-badge">Leader</span>}
              </div>
            ))}
          </div>
          <button
            type="button"
            className="party-leave-btn"
            onClick={handleLeave}
          >
            {isLeader ? "Dissolve Party" : "Leave Party"}
          </button>
        </div>
      ) : (
        <div className="party-browse">
          <div className="party-create">
            <input
              type="text"
              className="party-name-input"
              placeholder="Party name..."
              maxLength={MAX_PARTY_NAME}
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreate();
              }}
            />
            <button
              type="button"
              className="party-create-btn"
              disabled={!partyName.trim()}
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
          <div className="party-list">
            {partyList.length === 0 ? (
              <div className="party-list-empty">No parties available. Create one!</div>
            ) : (
              partyList.map((party) => (
                <PartyCard
                  key={party.id}
                  party={party}
                  isInParty={isInParty}
                  currentSessionId={currentSessionId}
                />
              ))
            )}
          </div>
        </div>
      )}
    </DraggableWindow>
  );
};

export default PartyBrowserSection;
