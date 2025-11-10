import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ClassData {
  id: string;
  name: string;
}

interface StudentGradesViewProps {
  classes: ClassData[];
}

interface GradeData {
  grade_item_name: string;
  corte: number;
  percentage: number;
  score: number;
}

const StudentGradesView = ({ classes }: StudentGradesViewProps) => {
  const [gradesByClass, setGradesByClass] = useState<Record<string, GradeData[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGrades();
  }, [classes]);

  const fetchGrades = async () => {
    try {
      const gradesData: Record<string, GradeData[]> = {};

      for (const classItem of classes) {
        const { data, error } = await supabase
          .from("grades")
          .select(`
            score,
            grade_items (
              name,
              corte,
              percentage
            )
          `)
          .eq("student_id", (await supabase.auth.getUser()).data.user?.id)
          .in("grade_item_id", 
            await supabase
              .from("grade_items")
              .select("id")
              .eq("class_id", classItem.id)
              .then(({ data }) => data?.map((item) => item.id) || [])
          );

        if (!error && data) {
          gradesData[classItem.id] = data.map((grade: any) => ({
            grade_item_name: grade.grade_items.name,
            corte: grade.grade_items.corte,
            percentage: grade.grade_items.percentage,
            score: grade.score,
          }));
        }
      }

      setGradesByClass(gradesData);
    } catch (error) {
      console.error("Error fetching grades:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateCorteAverage = (grades: GradeData[], corte: number) => {
    const corteGrades = grades.filter((g) => g.corte === corte);
    if (corteGrades.length === 0) return null;

    const totalWeighted = corteGrades.reduce(
      (sum, grade) => sum + (grade.score * grade.percentage / 100),
      0
    );
    return totalWeighted.toFixed(2);
  };

  const calculateFinalGrade = (grades: GradeData[]) => {
    const corte1 = calculateCorteAverage(grades, 1);
    const corte2 = calculateCorteAverage(grades, 2);
    const corte3 = calculateCorteAverage(grades, 3);

    if (!corte1 && !corte2 && !corte3) return null;

    const final =
      (parseFloat(corte1 || "0") * 0.3) +
      (parseFloat(corte2 || "0") * 0.35) +
      (parseFloat(corte3 || "0") * 0.35);

    return final.toFixed(2);
  };

  if (loading) {
    return <p className="text-center py-8 text-muted-foreground">Cargando notas...</p>;
  }

  return (
    <div className="space-y-6">
      {classes.map((classItem) => {
        const classGrades = gradesByClass[classItem.id] || [];
        const finalGrade = calculateFinalGrade(classGrades);

        return (
          <Card key={classItem.id} className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{classItem.name}</CardTitle>
                  <CardDescription>Calificaciones por Corte</CardDescription>
                </div>
                {finalGrade && (
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Nota Final</p>
                    <p className="text-2xl font-bold text-primary">{finalGrade}</p>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {classGrades.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">
                  No hay calificaciones registradas
                </p>
              ) : (
                <div className="space-y-6">
                  {[1, 2, 3].map((corte) => {
                    const corteGrades = classGrades.filter((g) => g.corte === corte);
                    const corteAvg = calculateCorteAverage(classGrades, corte);
                    const cortePercentage = corte === 1 ? 30 : 35;

                    return corteGrades.length > 0 ? (
                      <div key={corte}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Corte {corte}</h4>
                          <Badge variant="outline">
                            {corteAvg} / 5.0 ({cortePercentage}%)
                          </Badge>
                        </div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Evaluación</TableHead>
                              <TableHead className="text-right">Porcentaje</TableHead>
                              <TableHead className="text-right">Nota</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {corteGrades.map((grade, idx) => (
                              <TableRow key={idx}>
                                <TableCell>{grade.grade_item_name}</TableCell>
                                <TableCell className="text-right">{grade.percentage}%</TableCell>
                                <TableCell className="text-right font-medium">
                                  {grade.score.toFixed(2)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StudentGradesView;
