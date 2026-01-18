import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, BookOpen, Users, FileCheck, TrendingUp, Clock } from "lucide-react";

const stats = [
  {
    title: "Sessions ce mois",
    value: "12",
    change: "+3 vs mois dernier",
    icon: Calendar,
    gradient: "gradient-card-1",
  },
  {
    title: "Formations actives",
    value: "8",
    change: "2 nouvelles",
    icon: BookOpen,
    gradient: "gradient-card-2",
  },
  {
    title: "Participants",
    value: "156",
    change: "+24 ce mois",
    icon: Users,
    gradient: "gradient-card-3",
  },
  {
    title: "Documents Qualiopi",
    value: "94%",
    change: "Conformité",
    icon: FileCheck,
    gradient: "gradient-primary",
  },
];

const recentSessions = [
  { name: "Safety Leadership", client: "Heidelberg Materials", date: "15/01/2026", status: "En cours" },
  { name: "Culture sécurité", client: "Dillinger France", date: "12/01/2026", status: "Terminée" },
  { name: "Empowerment", client: "Inter-entreprises", date: "10/01/2026", status: "Terminée" },
];

const upcomingSessions = [
  { name: "Management HSE", client: "Total Energies", date: "20/01/2026", duration: "14h" },
  { name: "Leadership avancé", client: "Safran", date: "25/01/2026", duration: "7h" },
];

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Bienvenue, voici un aperçu de votre activité
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card border-border overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                    <p className="text-xs text-primary mt-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.gradient} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Two columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Sessions */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">Sessions récentes</CardTitle>
              <a href="/sessions" className="text-sm text-primary hover:underline">
                Voir tout
              </a>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSessions.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg gradient-card-1 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{session.name}</p>
                        <p className="text-sm text-muted-foreground">{session.client}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-foreground">{session.date}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          session.status === "En cours"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {session.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Sessions */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">Sessions à venir</CardTitle>
              <a href="/sessions" className="text-sm text-primary hover:underline">
                Planifier
              </a>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSessions.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg gradient-card-2 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{session.name}</p>
                        <p className="text-sm text-muted-foreground">{session.client}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-foreground">{session.date}</p>
                      <p className="text-xs text-muted-foreground">{session.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
