import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Play, Pencil } from "lucide-react";
import { FormationFormDialog, FormationFormData } from "@/components/formations/FormationFormDialog";

interface Formation {
  id: number;
  name: string;
  createdAt: string;
  gradient: string;
  isQualiopi: boolean;
  duration: number;
  mainObjective: string;
  operationalObjectives: string[];
}

const initialFormations: Formation[] = [
  {
    id: 1,
    name: "Safety Leadership Heidelberg",
    createdAt: "06/10/2023",
    gradient: "gradient-card-1",
    isQualiopi: true,
    duration: 14,
    mainObjective: "Développer le leadership en sécurité",
    operationalObjectives: ["Identifier les risques", "Communiquer efficacement", "Prendre des décisions"],
  },
  {
    id: 2,
    name: "Safety Leadership Sens",
    createdAt: "07/02/2024",
    gradient: "gradient-card-1",
    isQualiopi: true,
    duration: 7,
    mainObjective: "Renforcer la culture sécurité",
    operationalObjectives: ["Analyser les situations", "Proposer des solutions", "Suivre les indicateurs"],
  },
  {
    id: 3,
    name: "PREVENTEUR COACH EMP...",
    createdAt: "12/01/2024",
    gradient: "gradient-card-2",
    isQualiopi: true,
    duration: 21,
    mainObjective: "Former les préventeurs",
    operationalObjectives: ["Coacher les équipes", "Évaluer les risques", "Mettre en place des actions"],
  },
  {
    id: 4,
    name: "Engagés pour notre sécurité...",
    createdAt: "29/04/2024",
    gradient: "gradient-card-3",
    isQualiopi: false,
    duration: 4,
    mainObjective: "Sensibiliser à la sécurité",
    operationalObjectives: ["Comprendre les enjeux", "Adopter les bons gestes", "Signaler les anomalies"],
  },
  {
    id: 5,
    name: "SAFETY MANAGEMENT",
    createdAt: "10/07/2024",
    gradient: "gradient-card-3",
    isQualiopi: true,
    duration: 14,
    mainObjective: "Maîtriser le management de la sécurité",
    operationalObjectives: ["Définir une politique", "Piloter les actions", "Mesurer les résultats"],
  },
];

export default function Formations() {
  const [formations, setFormations] = useState<Formation[]>(initialFormations);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFormation, setEditingFormation] = useState<Formation | undefined>();

  const handleCreate = () => {
    setEditingFormation(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (formation: Formation) => {
    setEditingFormation(formation);
    setDialogOpen(true);
  };

  const handleSubmit = (data: FormationFormData) => {
    if (editingFormation) {
      setFormations((prev) =>
        prev.map((f) =>
          f.id === editingFormation.id
            ? { ...editingFormation, ...data }
            : f
        )
      );
    } else {
      const gradients = ["gradient-card-1", "gradient-card-2", "gradient-card-3"];
      const newFormation: Formation = {
        id: Date.now(),
        name: data.name,
        isQualiopi: data.isQualiopi,
        duration: data.duration,
        mainObjective: data.mainObjective,
        operationalObjectives: data.operationalObjectives,
        createdAt: new Date().toLocaleDateString("fr-FR"),
        gradient: gradients[Math.floor(Math.random() * gradients.length)],
      };
      setFormations((prev) => [newFormation, ...prev]);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Formations</h1>
          <p className="text-muted-foreground mt-1">
            Créez et gérez vos programmes de formation
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-border text-foreground hover:bg-secondary"
            onClick={handleCreate}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle formation
          </Button>
          <Button className="gradient-primary text-primary-foreground hover:opacity-90">
            <Play className="w-4 h-4 mr-2" />
            Commencer une session
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {formations.map((formation) => (
            <div
              key={formation.id}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer"
              onClick={() => handleEdit(formation)}
            >
              {/* Gradient header */}
              <div className={`h-24 ${formation.gradient} rounded-lg m-3 relative`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 hover:bg-background/80"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(formation);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Content */}
              <div className="p-4 pt-0 space-y-3">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {formation.name}
                </h3>
                <div className="flex gap-2">
                  {formation.isQualiopi && (
                    <Badge variant="secondary" className="bg-secondary text-muted-foreground border-0">
                      qualiopi
                    </Badge>
                  )}
                  <Badge variant="outline" className="border-border text-muted-foreground">
                    {formation.duration}h
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Créé le {formation.createdAt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FormationFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        formation={editingFormation}
        onSubmit={handleSubmit}
      />
    </AppLayout>
  );
}
