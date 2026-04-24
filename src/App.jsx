import React, { useState } from "react";
const skillOptions = [
  "Audio",
  "Video",
  "Lighting",
  "Truck Loader",
  "Carpenter",
  "Flyman",
  "Props",
  "Rigger",
  "Wardrobe",
  "Forklift Operator",
  "Boomlift Operator",
  "Department Head - A1",
  "Department Head - L1",
  "Department Head - V1",
  "Department Head - C1",
  "Department Head - W1",
];

const initialCalls = [
  {
    id: 1,
    event: "Concert Load In",
    venue: "Berglund Center",
    department: "Lighting",
    status: "Pending",
    accepted: null,
    refusalReason: "",
  },
  {
    id: 2,
    event: "Broadway Touring Show",
    venue: "Civic Center",
    department: "Audio",
    status: "Accepted",
    accepted: true,
    refusalReason: "",
  },
];

export default function App() {
  const [calls, setCalls] = useState(initialCalls);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [profile, setProfile] = useState({
    name: "",
    local: "",
    phone: "",
    skills: [],
    schedule: "",
  });
  const [massMessage, setMassMessage] = useState("");

  const toggleSkill = (skill) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const updateCallStatus = (id, accepted) => {
    setCalls((prev) =>
      prev.map((call) =>
        call.id === id
          ? {
              ...call,
              accepted,
              status: accepted ? "Accepted" : "Refused",
            }
          : call
      )
    );
  };

  const updateRefusalReason = (id, reason) => {
    setCalls((prev) =>
      prev.map((call) =>
        call.id === id ? { ...call, refusalReason: reason } : call
      )
    );
  };

    return (
    <div style={{ minHeight: "100vh", padding: "24px", fontFamily: "Arial, sans-serif", background: "#f8fafc" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "right", marginBottom: "16px", color: "#666" }}>
          backstagedispatch.com
        </div>

        <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>Backstage Dispatch</h1>
        <p style={{ marginBottom: "24px", color: "#555" }}>
          IATSE Union Stagehand Dispatch Platform for iOS + Android
        </p>

        <div style={{ background: "white", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
          <h2>Member Profile</h2>
          <input placeholder="Full Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} style={{ width: "100%", padding: "10px", margin: "8px 0" }} />
          <input placeholder="Local Union Number" value={profile.local} onChange={(e) => setProfile({ ...profile, local: e.target.value })} style={{ width: "100%", padding: "10px", margin: "8px 0" }} />
          <input placeholder="Phone Number" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} style={{ width: "100%", padding: "10px", margin: "8px 0" }} />

          <h3>Skills & Departments</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            {skillOptions.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #ccc" }}
              >
                {skill}
              </button>
            ))}
          </div>

          <textarea
            placeholder="Availability / Personal Schedule"
            value={profile.schedule}
            onChange={(e) => setProfile({ ...profile, schedule: e.target.value })}
            style={{ width: "100%", minHeight: "100px", padding: "10px" }}
          />
        </div>

        <div style={{ background: "white", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
          <h2>Dispatch Calls</h2>
          {calls.map((call) => (
            <div key={call.id} style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "16px", marginBottom: "12px" }}>
              <h3>{call.event}</h3>
              <p>{call.venue}</p>
              <p>Department: {call.department}</p>
              <p>Status: {call.status}</p>

              <button onClick={() => updateCallStatus(call.id, true)} style={{ marginRight: "10px" }}>
                Accept Call
              </button>
              <button onClick={() => updateCallStatus(call.id, false)}>
                Refuse Call
              </button>

              {call.status === "Refused" && (
                <textarea
                  placeholder="Reason for refusing call"
                  value={call.refusalReason}
                  onChange={(e) => updateRefusalReason(call.id, e.target.value)}
                  style={{ width: "100%", marginTop: "12px", minHeight: "80px" }}
                />
              )}
            </div>
          ))}
        </div>

        <div style={{ background: "white", padding: "20px", borderRadius: "12px" }}>
          <h2>Mass Union Messaging</h2>
          <textarea
            placeholder="Send message to all local union members..."
            value={massMessage}
            onChange={(e) => setMassMessage(e.target.value)}
            style={{ width: "100%", minHeight: "100px", padding: "10px" }}
          />
        </div>
      </div>
    </div>
  );
}
