import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, MoreHorizontal } from "lucide-react";

const sessions = [
  {
    id: 1,
    name: "Empowerment",
    formateur: "Alexis Cottinet",
    client: "inter-entreprises",
    duration: "14h",
    createdAt: "12/01/2024",
  },
  {
    id: 2,
    name: "Culture sécurité - Suippes 2",
    formateur: "Jean François Patte",
    client: "Lebronze alloys",
    duration: "7h",
    createdAt: "12/02/2025",
  },
  {
    id: 3,
    name: "Culture sécurité DF2",
    formateur: "Jean François Patte",
    client: "Dillinger France",
    duration: "7h",
    createdAt: "05/06/2025",
  },
  {
    id: 4,
    name: "Groupe 2",
    formateur: "Jean François Patte",
    client: "JACQUET BROSSARD",
    duration: "7h",
    createdAt: "07/02/2024",
  },
  {
    id: 5,
    name: "Groupe 1",
    formateur: "Jean François Patte",
    client: "JACQUET BROSSARD",
    duration: "7h",
    createdAt: "07/02/2024",
  },
  {
    id: 6,
    name: "Safety Leadership 44",
    formateur: "Jean François Patte",
    client: "HEIDELBERG MATERIALS",
    duration: "14h",
    createdAt: "26/03/2024",
  },
];

export default function Sessions() {
  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Historique</h1>
          <p className="text-muted-foreground mt-1">
            Gérez et suivez toutes vos sessions de formation
          </p>
        </div>

        {/* Actions */}
        <div>
          <Button className="gradient-primary text-primary-foreground hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Commencer une session
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="w-12">
                  <Checkbox className="border-muted-foreground" />
                </TableHead>
                <TableHead className="text-muted-foreground font-medium">Session</TableHead>
                <TableHead className="text-muted-foreground font-medium">Formateur</TableHead>
                <TableHead className="text-muted-foreground font-medium">Client</TableHead>
                <TableHead className="text-muted-foreground font-medium">Durée</TableHead>
                <TableHead className="text-muted-foreground font-medium">Créé le</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow
                  key={session.id}
                  className="border-border hover:bg-secondary/30 transition-colors"
                >
                  <TableCell>
                    <Checkbox className="border-muted-foreground" />
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {session.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {session.formateur}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {session.client}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {session.duration}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {session.createdAt}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
