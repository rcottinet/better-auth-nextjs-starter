import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const formationSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis").max(100, "100 caractères max"),
  isQualiopi: z.boolean(),
  duration: z.number().min(1, "La durée doit être d'au moins 1 heure"),
  mainObjective: z.string().trim().min(1, "L'objectif principal est requis").max(500, "500 caractères max"),
  operationalObjectives: z
    .array(z.string().trim())
    .min(3, "Minimum 3 objectifs opérationnels")
    .max(8, "Maximum 8 objectifs opérationnels"),
});

export type FormationFormData = z.infer<typeof formationSchema>;

interface FormationFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formation?: FormationFormData & { id?: number };
  onSubmit: (data: FormationFormData) => void;
}

export function FormationFormDialog({
  open,
  onOpenChange,
  formation,
  onSubmit,
}: FormationFormDialogProps) {
  const isEditing = !!formation?.id;
  
  const form = useForm<FormationFormData>({
    resolver: zodResolver(formationSchema),
    defaultValues: formation || {
      name: "",
      isQualiopi: true,
      duration: 7,
      mainObjective: "",
      operationalObjectives: ["", "", ""],
    },
  });

  const operationalObjectives = form.watch("operationalObjectives");

  const addObjective = () => {
    if (operationalObjectives.length < 8) {
      form.setValue("operationalObjectives", [...operationalObjectives, ""]);
    }
  };

  const removeObjective = (index: number) => {
    if (operationalObjectives.length > 3) {
      const newObjectives = operationalObjectives.filter((_, i) => i !== index);
      form.setValue("operationalObjectives", newObjectives);
    }
  };

  const handleSubmit = (data: FormationFormData) => {
    // Filter out empty objectives and validate
    const filteredObjectives = data.operationalObjectives.filter((obj) => obj.trim() !== "");
    
    if (filteredObjectives.length < 3) {
      toast.error("Vous devez renseigner au moins 3 objectifs opérationnels");
      return;
    }
    
    onSubmit({ ...data, operationalObjectives: filteredObjectives });
    toast.success(isEditing ? "Formation mise à jour" : "Formation créée");
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            {isEditing ? "Modifier la formation" : "Nouvelle formation"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Informations générales */}
            <div className="space-y-4 p-4 rounded-lg bg-secondary/30 border border-border">
              <h3 className="font-semibold text-foreground">Informations générales</h3>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Nom de la formation</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Le nom de ma formation"
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="isQualiopi"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-3 rounded-lg bg-input border border-border">
                      <FormLabel className="text-foreground cursor-pointer">Qualiopi</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Durée - h</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          className="bg-input border-border text-foreground"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Objectifs */}
            <div className="space-y-4 p-4 rounded-lg bg-secondary/30 border border-border">
              <h3 className="font-semibold text-foreground">Objectifs de la formation</h3>
              
              <FormField
                control={form.control}
                name="mainObjective"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Objectif principal</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Définir la conduite du changement"
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <FormLabel className="text-foreground">
                  Objectif(s) opérationnel(s) <span className="text-muted-foreground">(min 3, max 8)</span>
                </FormLabel>
                
                {operationalObjectives.map((_, index) => (
                  <div key={index} className="flex gap-2">
                    <FormField
                      control={form.control}
                      name={`operationalObjectives.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder={`Objectif opérationnel ${index + 1}`}
                              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {operationalObjectives.length > 3 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeObjective(index)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}

                {operationalObjectives.length < 8 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addObjective}
                    className="w-full border-dashed border-border text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un objectif
                  </Button>
                )}
                
                <p className="text-xs text-muted-foreground">
                  Ces objectifs opérationnels apparaîtront dans les bilans de compétences générés
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-border text-foreground"
              >
                Annuler
              </Button>
              <Button type="submit" className="gradient-primary text-primary-foreground">
                {isEditing ? "Enregistrer" : "Créer la formation"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
