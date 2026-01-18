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
import { Plus, Search, MoreHorizontal, Pencil, Archive, GraduationCap, UserCheck, UserX, Tag } from "lucide-react";
import { FormateurFormDialog, FormateurFormData } from "@/components/formateurs/FormateurFormDialog";

interface Formateur {
  id: string;
  reference: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: "internal" | "external";
  specialties: string[];
  status: "active" | "archived";
  createdAt: string;
}

const initialFormateurs: Formateur[] = [
  {
    id: "f1",
    reference: "i4rxs",
    firstName: "Alexis",
    lastName: "Cottinet",
    email: "alexis.cottinet@example.com",
    phone: "06 12 34 56 78",
    type: "internal",
    specialties: ["Management", "Leadership"],
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "f2",
    reference: "f796kb9",
    firstName: "Jean François",
    lastName: "Patte",
    email: "jf.patte@example.com",
    phone: "06 23 45 67 89",
    type: "internal",
    specialties: ["Sécurité", "HSE"],
    status: "active",
    createdAt: "2024-01-20",
  },
  {
    id: "f3",
    reference: "5xfl4j",
    firstName: "Damien",
    lastName: "Ducornet",
    email: "d.ducornet@external.com",
    phone: "06 34 56 78 90",
    type: "external",
    specialties: ["Bureautique", "Digital"],
    status: "active",
    createdAt: "2024-02-01",
  },
  {
    id: "f4",
    reference: "7kaq8",
    firstName: "Véronique",
    lastName: "Aukuso",
    email: "v.aukuso@external.com",
    phone: "06 45 67 89 01",
    type: "external",
    specialties: ["RH", "Communication"],
    status: "archived",
    createdAt: "2024-02-15",
  },
];

export default function Formateurs() {
  const [formateurs, setFormateurs] = useState<Formateur[]>(initialFormateurs);
  const [searchQuery, setSearchQuery] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [typeFilter, setTypeFilter] = useState<"all" | "internal" | "external">("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFormateur, setEditingFormateur] = useState<Formateur | null>(null);

  const filteredFormateurs = formateurs.filter((f) => {
    const matchesSearch =
      f.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = showArchived ? f.status === "archived" : f.status === "active";
    const matchesType = typeFilter === "all" || f.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const activeCount = formateurs.filter((f) => f.status === "active").length;
  const archivedCount = formateurs.filter((f) => f.status === "archived").length;
  const internalCount = formateurs.filter((f) => f.status === "active" && f.type === "internal").length;
  const externalCount = formateurs.filter((f) => f.status === "active" && f.type === "external").length;

  const handleCreate = () => {
    setEditingFormateur(null);
    setDialogOpen(true);
  };

  const handleEdit = (formateur: Formateur) => {
    setEditingFormateur(formateur);
    setDialogOpen(true);
  };

  const handleArchive = (id: string) => {
    setFormateurs((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: f.status === "active" ? "archived" : "active" } : f
      )
    );
  };

  const generateReference = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let ref = "";
    for (let i = 0; i < 6; i++) {
      ref += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return ref;
  };

  const handleSubmit = (data: FormateurFormData) => {
    if (editingFormateur) {
      setFormateurs((prev) =>
        prev.map((f) =>
          f.id === editingFormateur.id
            ? { ...editingFormateur, ...data }
            : f
        )
      );
    } else {
      const newFormateur: Formateur = {
        id: `f${Date.now()}`,
        reference: generateReference(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        type: data.type,
        specialties: data.specialties,
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setFormateurs((prev) => [newFormateur, ...prev]);
    }
    setDialogOpen(false);
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Formateurs</h1>
            <p className="text-muted-foreground mt-1">
              Gérez votre équipe de formateurs internes et externes
            </p>
          </div>
          <Button onClick={handleCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            Ajouter un formateur
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{formateurs.length}</p>
                <p className="text-sm text-muted-foreground">Total formateurs</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{internalCount}</p>
                <p className="text-sm text-muted-foreground">Internes</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <UserX className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{externalCount}</p>
                <p className="text-sm text-muted-foreground">Externes</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Archive className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{archivedCount}</p>
                <p className="text-sm text-muted-foreground">Archivés</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un formateur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={typeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("all")}
            >
              Tous
            </Button>
            <Button
              variant={typeFilter === "internal" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("internal")}
            >
              Internes
            </Button>
            <Button
              variant={typeFilter === "external" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("external")}
            >
              Externes
            </Button>
          </div>
          <div className="flex items-center gap-2 ml-auto">
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
                <TableHead className="font-semibold w-24">Référence</TableHead>
                <TableHead className="font-semibold">Nom</TableHead>
                <TableHead className="font-semibold">Prénom</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Spécialités</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFormateurs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <div className="text-muted-foreground">
                      <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p>Aucun formateur trouvé</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredFormateurs.map((formateur) => (
                  <TableRow key={formateur.id} className="group">
                    <TableCell className="font-mono text-muted-foreground text-sm">
                      {formateur.reference}
                    </TableCell>
                    <TableCell className="font-medium">{formateur.lastName}</TableCell>
                    <TableCell className="text-muted-foreground">{formateur.firstName}</TableCell>
                    <TableCell className="text-muted-foreground">{formateur.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={formateur.type === "internal" ? "default" : "secondary"}
                        className={
                          formateur.type === "internal"
                            ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                            : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                        }
                      >
                        {formateur.type === "internal" ? "Interne" : "Externe"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {formateur.specialties.slice(0, 2).map((s) => (
                          <Badge key={s} variant="outline" className="text-xs">
                            {s}
                          </Badge>
                        ))}
                        {formateur.specialties.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{formateur.specialties.length - 2}
                          </Badge>
                        )}
                      </div>
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
                          <DropdownMenuItem onClick={() => handleEdit(formateur)}>
                            <Pencil className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleArchive(formateur.id)}>
                            <Archive className="w-4 h-4 mr-2" />
                            {formateur.status === "active" ? "Archiver" : "Restaurer"}
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

      <FormateurFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={editingFormateur || undefined}
      />
    </AppLayout>
  );
}
