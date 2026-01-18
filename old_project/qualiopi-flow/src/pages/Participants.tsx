import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreHorizontal, Pencil, Archive, Users, UserCheck, UserX, Building2 } from "lucide-react";
import { ParticipantFormDialog, ParticipantFormData } from "@/components/participants/ParticipantFormDialog";

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  status: "active" | "archived";
  createdAt: string;
}

const initialParticipants: Participant[] = [
  {
    id: "p1",
    firstName: "Isabelle",
    lastName: "Deveze",
    email: "isabelle.deveze@eqiom.com",
    company: "Eqiom",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "p2",
    firstName: "Corentin",
    lastName: "Petit",
    email: "corentin.petit@eqiom.com",
    company: "Eqiom",
    status: "active",
    createdAt: "2024-01-18",
  },
  {
    id: "p3",
    firstName: "Ludovic",
    lastName: "Leblanc",
    email: "ludovic.leblanc@eqiom.com",
    company: "Eqiom",
    status: "active",
    createdAt: "2024-02-05",
  },
  {
    id: "p4",
    firstName: "Hani",
    lastName: "Deveaux",
    email: "hani.deveaux@eqiom.com",
    company: "Eqiom",
    status: "archived",
    createdAt: "2024-02-10",
  },
  {
    id: "p5",
    firstName: "Caroline",
    lastName: "Canchon",
    email: "caroline.canchon@heidelberg.com",
    company: "Heidelberg Materials",
    status: "active",
    createdAt: "2024-03-01",
  },
];

export default function Participants() {
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [searchQuery, setSearchQuery] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);

  const filteredParticipants = participants.filter((p) => {
    const matchesSearch =
      p.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = showArchived ? p.status === "archived" : p.status === "active";
    return matchesSearch && matchesStatus;
  });

  const activeCount = participants.filter((p) => p.status === "active").length;
  const archivedCount = participants.filter((p) => p.status === "archived").length;
  const companiesCount = new Set(participants.filter((p) => p.status === "active").map((p) => p.company)).size;

  const handleCreate = () => {
    setEditingParticipant(null);
    setDialogOpen(true);
  };

  const handleEdit = (participant: Participant) => {
    setEditingParticipant(participant);
    setDialogOpen(true);
  };

  const handleArchive = (id: string) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === "active" ? "archived" : "active" } : p
      )
    );
  };

  const handleSubmit = (data: ParticipantFormData) => {
    if (editingParticipant) {
      setParticipants((prev) =>
        prev.map((p) =>
          p.id === editingParticipant.id
            ? { ...editingParticipant, ...data }
            : p
        )
      );
    } else {
      const newParticipant: Participant = {
        id: `p${Date.now()}`,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        company: data.company,
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setParticipants((prev) => [newParticipant, ...prev]);
    }
    setDialogOpen(false);
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Participants</h1>
            <p className="text-muted-foreground mt-1">
              Gérez les participants à vos formations
            </p>
          </div>
          <Button onClick={handleCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            Ajouter un participant
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{participants.length}</p>
                <p className="text-sm text-muted-foreground">Total participants</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeCount}</p>
                <p className="text-sm text-muted-foreground">Actifs</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <UserX className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{archivedCount}</p>
                <p className="text-sm text-muted-foreground">Archivés</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{companiesCount}</p>
                <p className="text-sm text-muted-foreground">Entreprises</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un participant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={!showArchived ? "default" : "outline"}
              size="sm"
              onClick={() => setShowArchived(false)}
            >
              Actifs ({activeCount})
            </Button>
            <Button
              variant={showArchived ? "default" : "outline"}
              size="sm"
              onClick={() => setShowArchived(true)}
            >
              Archivés ({archivedCount})
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                <TableHead className="font-semibold">Prénom</TableHead>
                <TableHead className="font-semibold">Nom</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Entreprise</TableHead>
                <TableHead className="font-semibold">Statut</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredParticipants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p>Aucun participant trouvé</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredParticipants.map((participant) => (
                  <TableRow key={participant.id} className="group">
                    <TableCell className="font-medium">{participant.firstName}</TableCell>
                    <TableCell className="font-medium text-muted-foreground">{participant.lastName}</TableCell>
                    <TableCell className="text-muted-foreground">{participant.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal">
                        {participant.company}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={participant.status === "active" ? "default" : "outline"}
                        className={participant.status === "active" ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}
                      >
                        {participant.status === "active" ? "Actif" : "Archivé"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(participant)}>
                            <Pencil className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleArchive(participant.id)}>
                            <Archive className="w-4 h-4 mr-2" />
                            {participant.status === "active" ? "Archiver" : "Restaurer"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <ParticipantFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={editingParticipant || undefined}
      />
    </AppLayout>
  );
}
