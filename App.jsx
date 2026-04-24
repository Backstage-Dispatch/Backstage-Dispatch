import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarDays,
  Check,
  User,
  MessageSquare,
  DollarSign,
  Briefcase,
  Bell,
} from "lucide-react";

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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-sm text-muted-foreground text-right">
          backstagedispatch.com
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold">Backstage Dispatch</h1>
            <p className="text-muted-foreground">
              Backstage Dispatch — IATSE Union Stagehand Dispatch Platform for iOS + Android
            </p>
          </div>
          <Button className="rounded-2xl">
            <DollarSign className="w-4 h-4 mr-2" />
            Monthly Subscription Billing • sales@backstagedispatch.com
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <h2 className="text-xl font-semibold">Member Profile</h2>
              </div>

              <Input
                placeholder="Full Name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
              <Input
                placeholder="Local Union Number"
                value={profile.local}
                onChange={(e) => setProfile({ ...profile, local: e.target.value })}
              />
              <Input
                placeholder="Phone Number"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />

              <div>
                <h3 className="font-medium mb-2">Skills & Departments</h3>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map((skill) => (
                    <Button
                      key={skill}
                      variant={profile.skills.includes(skill) ? "default" : "outline"}
                      className="rounded-2xl"
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Button>
                  ))}
                </div>
              </div>

              <Textarea
                placeholder="Availability / Personal Schedule"
                value={profile.schedule}
                onChange={(e) =>
                  setProfile({ ...profile, schedule: e.target.value })
                }
              />
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5" />
                <h2 className="text-xl font-semibold">Dispatcher Calendar</h2>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-xl border"
              />
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-2xl">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Dispatch Calls</h2>
            </div>

            {calls.map((call) => (
              <div key={call.id} className="border rounded-2xl p-4 space-y-3">
                <div className="flex flex-col md:flex-row md:justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{call.event}</h3>
                    <p>{call.venue}</p>
                    <p className="text-sm text-muted-foreground">
                      Department: {call.department}
                    </p>
                  </div>
                  <Badge>{call.status}</Badge>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="rounded-2xl"
                    onClick={() => updateCallStatus(call.id, true)}
                  >
                    <Check className="w-4 h-4 mr-2" /> Accept Call
                  </Button>

                  <Button
                    variant="outline"
                    className="rounded-2xl"
                    onClick={() => updateCallStatus(call.id, false)}
                  >
                    Refuse Call
                  </Button>
                </div>

                {call.status === "Refused" && (
                  <Textarea
                    placeholder="Reason for refusing call"
                    value={call.refusalReason}
                    onChange={(e) =>
                      updateRefusalReason(call.id, e.target.value)
                    }
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Mass Union Messaging</h2>
            </div>

            <Textarea
              placeholder="Send message to all local union members..."
              value={massMessage}
              onChange={(e) => setMassMessage(e.target.value)}
            />

            <Button className="rounded-2xl">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Mass Message
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

  
