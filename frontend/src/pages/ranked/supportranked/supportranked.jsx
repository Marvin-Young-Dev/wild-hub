import React, { useState, useEffect, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";

const ItemTypes = {
  CHAMPION: "champion",
};

function Champion({ champ, from }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CHAMPION,
    item: { ...champ, from },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [champ, from]);

  const imgSrc =`../../assets/icons/champion/${champ.name}.webp`; 

  return (
    <img
      ref={drag}
      src={imgSrc}
      alt={champ.name}
      className="champion-icon"
      title={champ.name}
    //   onError={(e) => { e.currentTarget.src = "/assets/icons/champion/placeholder.webp"; }}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "grab", width: 50, height: 50, objectFit: "contain" }}
      draggable={false}
    />
  );
}

function Slot({ slotType, team, index, champ, onDropChampion }) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.CHAMPION,
    drop: (item) => onDropChampion(item, slotType, team, index),
    canDrop: () => true,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`slot ${slotType} ${isOver ? "over" : ""} ${canDrop ? "can-drop" : ""}`}
      style={{
        width: 60,
        height: 60,
        border: "1px solid #ccc",
        margin: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isOver ? "#e0ffe0" : "#f9f9f9",
        borderRadius: 4,
        userSelect: "none",
      }}
    >
      {champ ? (
        <img
          src={`/assets/icons/champion/${champ.name}.webp`}
          alt={champ.name}
          title={champ.name}
        //   onError={(e) => { e.currentTarget.src = "/assets/icons/champion/placeholder.webp"; }}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          draggable={false}
        />
      ) : (
        <span style={{ fontSize: 12, color: "#666" }}>
          {slotType === "ban" ? "Ban" : "Pick"}
        </span>
      )}
    </div>
  );
}

const SupportRanked = () => {
  const [champions, setChampions] = useState([]);
  const [leftTeamPicks, setLeftTeamPicks] = useState(Array(5).fill(null));
  const [rightTeamPicks, setRightTeamPicks] = useState(Array(5).fill(null));
  const [leftTeamBans, setLeftTeamBans] = useState(Array(5).fill(null));
  const [rightTeamBans, setRightTeamBans] = useState(Array(5).fill(null));

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    axios.get("http://localhost:9000/api/champions", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setChampions(res.data))
      .catch(console.error);
  }, []);

  const onDropChampion = useCallback((champ, slotType, team, index) => {
    if (slotType === "pick") {
      if (team === "left") {
        setLeftTeamPicks(old => {
          const newArr = [...old];
          newArr[index] = champ;
          return newArr;
        });
      } else {
        setRightTeamPicks(old => {
          const newArr = [...old];
          newArr[index] = champ;
          return newArr;
        });
      }
    } else {
      if (team === "left") {
        setLeftTeamBans(old => {
          const newArr = [...old];
          newArr[index] = champ;
          return newArr;
        });
      } else {
        setRightTeamBans(old => {
          const newArr = [...old];
          newArr[index] = champ;
          return newArr;
        });
      }
    }
  }, []);

  const handleSubmit = () => {
    if (leftTeamPicks.some(p => !p) || rightTeamPicks.some(p => !p)) {
      alert("Bitte alle Picks auswählen!");
      return;
    }

    const payload = {
      ranked_bans: [
        ...leftTeamBans.map(b => b ? b.name : "None"),
        ...rightTeamBans.map(b => b ? b.name : "None"),
      ].join(", "),
      ranked_blue_team: leftTeamPicks.map(p => p.name).join(", "),
      ranked_red_team: rightTeamPicks.map(p => p.name).join(", "),
      ranked_winner: "",
      ranked_date: new Date().toISOString().split("T")[0],
    };

    alert("Daten erfolgreich abgeschickt!");
    console.log(payload);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="draft-container" style={{ padding: 16, maxWidth: 900, margin: "auto" }}>
        <h2>Wild Rift Draft Pick Phase</h2>

        <div className="bans" style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <div className="ban-team" style={{ flex: 1, marginRight: 8 }}>
            <h4>Linke Bans</h4>
            <div className="ban-row" style={{ display: "flex" }}>
              {leftTeamBans.map((champ, i) => (
                <Slot key={i} slotType="ban" team="left" index={i} champ={champ} onDropChampion={onDropChampion} />
              ))}
            </div>
          </div>
          <div className="ban-team" style={{ flex: 1, marginLeft: 8 }}>
            <h4>Rechte Bans</h4>
            <div className="ban-row" style={{ display: "flex" }}>
              {rightTeamBans.map((champ, i) => (
                <Slot key={i} slotType="ban" team="right" index={i} champ={champ} onDropChampion={onDropChampion} />
              ))}
            </div>
          </div>
        </div>

        <div className="draft-main" style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
          <div className="team team-left" style={{ flex: 1 }}>
            <h4>Linkes Team</h4>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {leftTeamPicks.map((champ, i) => (
                <Slot key={i} slotType="pick" team="left" index={i} champ={champ} onDropChampion={onDropChampion} />
              ))}
            </div>
          </div>

          <div className="champion-pool" style={{ flex: 2, margin: "0 16px" }}>
            <h4>Champion-Pool</h4>
            <div className="champion-grid" style={{ display: "flex", flexWrap: "wrap", gap: 8, maxHeight: 320, overflowY: "auto", border: "1px solid #ddd", padding: 8, borderRadius: 4 }}>
              {champions.map(champ => (
                <Champion key={champ.id} champ={champ} from="pool" />
              ))}
            </div>
          </div>

          <div className="team team-right" style={{ flex: 1 }}>
            <h4>Rechtes Team</h4>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {rightTeamPicks.map((champ, i) => (
                <Slot key={i} slotType="pick" team="right" index={i} champ={champ} onDropChampion={onDropChampion} />
              ))}
            </div>
          </div>
        </div>

        <div className="submit-row" style={{ textAlign: "center" }}>
          <button
            onClick={handleSubmit}
            style={{
              padding: "0.5rem 1rem",
              fontSize: 16,
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Picks & Bans absenden
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default SupportRanked;
