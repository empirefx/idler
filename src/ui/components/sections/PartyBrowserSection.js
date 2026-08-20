import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useUIVisibility } from "../../UIVisibilityContext";
import DraggableWindow from "../common/DraggableWindow";
import { createParty, joinParty as sendJoinParty, leaveParty } from "../../../store/ws";
import { placesData } from "../../../../shared/data/places.js";
import "../../../styles/sections/party-browser-section.css";

const MAX_PARTY_NAME = 50;

const enemyPlaces = Object.values(placesData).filter((p) => p.spawn);

const PartyBrowserSection = () => {
  const { partyBrowser, togglePartyBrowser } = useUIVisibility();
  const partyList = useSelector((state) => state.parties.partyList);
  const currentParty = useSelector((state) => state.parties.currentParty);
  const currentSessionId = useSelector((state) => state.player.sessionId);
  const [partyName, setPartyName] = useState("");
  const [location, setLocation] = useState("");
  const [selectedPartyId, setSelectedPartyId] = useState(null);

  const isInParty = !!currentParty;
  const isLeader = currentParty && currentParty.leaderId === currentSessionId;
  const selectedParty = partyList.find((p) => p.id === selectedPartyId);
  const canJoin = selectedParty && !isInParty && selectedParty.memberCount < selectedParty.maxPlayers;

  const handleCreate = useCallback(() => {
    if (!partyName.trim()) return;
    createParty(partyName.trim(), location || "");
    setPartyName("");
    setLocation("");
  }, [partyName, location]);

  const handleJoin = useCallback(() => {
    if (!canJoin) return;
    sendJoinParty(selectedPartyId);
    setSelectedPartyId(null);
  }, [canJoin, selectedPartyId]);

  const handleLeave = useCallback(() => {
    leaveParty();
    setSelectedPartyId(null);
  }, []);

  return (
    <DraggableWindow
      windowId="party-browser"
      title="Party"
      width={700}
      minHeight={450}
      isOpen={partyBrowser}
      onClose={togglePartyBrowser}
    >
      {isInParty ? (
        <div className="party-view">
          <div className="party-stats-bar">
            <span className="party-stats-title">{currentParty.name}</span>
            <span className="party-stats-count">{currentParty.memberCount}/{currentParty.maxPlayers}</span>
            {currentParty.location && (
              <span className="party-stats-location">{currentParty.location}</span>
            )}
          </div>
          <div className="party-members-list">
            {currentParty.members.map((member) => (
              <div
                key={member.sessionId}
                className={`party-member-row ${member.isLeader ? "leader" : ""}`}
              >
                <span className="member-name">{member.nickname}</span>
                {member.isLeader && <span className="member-badge">Leader</span>}
              </div>
            ))}
          </div>
          <div className="party-bottom-actions">
            <button className="party-leave-btn" onClick={handleLeave}>
              {isLeader ? "Dissolve Party" : "Leave Party"}
            </button>
          </div>
        </div>
      ) : (
        <div className="party-browse">
          <div className="party-stats-bar">
            <span className="party-stats-title">{partyList.length} {partyList.length === 1 ? "party" : "parties"} available</span>
          </div>
          <div className="party-table-wrapper">
            <table className="party-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Place</th>
                  <th>Leader</th>
                  <th>Players</th>
                </tr>
              </thead>
              <tbody>
                {partyList.length === 0 ? (
                  <tr className="party-table-empty">
                    <td colSpan="4">No parties available. Create one!</td>
                  </tr>
                ) : (
                  partyList.map((party) => (
                    <tr
                      key={party.id}
                      className={`party-table-row ${selectedPartyId === party.id ? "selected" : ""} ${party.memberCount >= party.maxPlayers ? "full" : ""}`}
                      onClick={() => setSelectedPartyId(party.id === selectedPartyId ? null : party.id)}
                    >
                      <td className="party-col-name">{party.name}</td>
                      <td className="party-col-location">{party.location || "—"}</td>
                      <td className="party-col-leader">{party.leaderName || "Unknown"}</td>
                      <td className="party-col-count">{party.memberCount}/{party.maxPlayers}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="party-bottom-actions">
            <div className="party-create-row">
              <input
                id="party-name"
                name="party-name"
                className="party-name-input"
                placeholder="Party name..."
                maxLength={MAX_PARTY_NAME}
                value={partyName}
                onChange={(e) => setPartyName(e.target.value)}
              />
              <select
                id="party-location"
                name="party-location"
                className="party-location-select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">No location</option>
                {enemyPlaces.map((place) => (
                  <option key={place.id} value={place.name}>{place.name}</option>
                ))}
              </select>
              <button
                className="party-create-btn"
                disabled={!partyName.trim()}
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
            <button
              className={`party-join-btn ${canJoin ? "" : "disabled"}`}
              disabled={!canJoin}
              onClick={handleJoin}
            >
              Join
            </button>
          </div>
        </div>
      )}
    </DraggableWindow>
  );
};

export default PartyBrowserSection;
