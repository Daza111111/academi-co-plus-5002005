import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Users, FileText, CheckSquare } from "lucide-react";
import StudentsListTab from "./ClassDetailsDialog/StudentsListTab";
import GradesManagementTab from "./ClassDetailsDialog/GradesManagementTab";
import AttendanceManagementTab from "./ClassDetailsDialog/AttendanceManagementTab";

interface ClassDetailsDialogProps {
  classId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ClassDetailsDialog = ({ classId, open, onOpenChange }: ClassDetailsDialogProps) => {
  const [classData, setClassData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && classId) {
      fetchClassData();
    }
  }, [classId, open]);

  const fetchClassData = async () => {
    try {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .eq("id", classId)
        .single();

      if (error) throw error;
      setClassData(data);
    } catch (error) {
      console.error("Error fetching class data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">Cargando...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{classData?.name}</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Código: <span className="font-mono font-semibold">{classData?.code}</span>
          </p>
        </DialogHeader>

        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="students">
              <Users className="h-4 w-4 mr-2" />
              Estudiantes
            </TabsTrigger>
            <TabsTrigger value="grades">
              <FileText className="h-4 w-4 mr-2" />
              Calificaciones
            </TabsTrigger>
            <TabsTrigger value="attendance">
              <CheckSquare className="h-4 w-4 mr-2" />
              Asistencia
            </TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="mt-4">
            <StudentsListTab classId={classId} />
          </TabsContent>

          <TabsContent value="grades" className="mt-4">
            <GradesManagementTab classId={classId} />
          </TabsContent>

          <TabsContent value="attendance" className="mt-4">
            <AttendanceManagementTab classId={classId} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ClassDetailsDialog;
