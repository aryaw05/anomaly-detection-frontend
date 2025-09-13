import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  X,
  MapPin,
  Building,
  Clock,
  FileText,
  CheckCircle,
  AlertTriangle,
  Activity,
  User,
} from "lucide-react";
import { InfrastructureDetail } from "@/types/infrastructure";
import { Badge } from "./ui/badge";

interface InfrastructureDetailPanelProps {
  infrastructureDetail: InfrastructureDetail | null;
  onClose: () => void;
  onStatusAnomalyUpdate?: (
    infrastructureId: string,
    update: any
  ) => void | null;
  isOpen: boolean;
}
export default function InfrastructureDetailPanel({
  infrastructureDetail,
  onClose,
  onStatusAnomalyUpdate,
  isOpen,
}: InfrastructureDetailPanelProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CLOSED":
        return <Badge className="bg-green-600">Closed</Badge>;
      case "ON_PROGRESS":
        return <Badge className="bg-yellow-400">On Progress</Badge>;
      case "OPEN":
        return <Badge className="bg-red-400">Open</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CLOSED":
        return <CheckCircle className="w-4 h-4  text-green-400" />;
      case "ON_PROGRESS":
        return <Activity className="w-4 h-4 text-yellow-400" />;
      case "OPEN":
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (!isOpen) return null;

  console.log("infrastructureDetail", infrastructureDetail);

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Mobile overlay */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />

      {/* Panel content */}
      <Card className="fixed bottom-0 left-0 right-0 max-h-[70vh] lg:static lg:max-h-none lg:w-96 lg:min-h-screen shadow-elevation border-t lg:border lg:rounded-lg bg-card/95 backdrop-blur-sm ">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">
            Infrastructure Detail
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <ScrollArea className="flex-1">
          <CardContent className="space-y-6">
            {/* Header Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold">
                  {infrastructureDetail?.infrastructure_name}
                </h3>

                <p className="text-sm text-muted-foreground">
                  UPT: {infrastructureDetail?.upt.upt_name}
                </p>
              </div>
            </div>
            <Separator />
            {/* Infrastructure Details */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Building className="w-4 h-4" />
                Infrastructure Info
              </h4>

              <div className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <Badge variant="outline">
                    {
                      infrastructureDetail?.infrastructure_type
                        .infrastructure_type
                    }
                  </Badge>
                </div>
                <div className="flex justify-between"></div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Location:</span>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="font-mono text-xs">
                        {infrastructureDetail?.latitude.toFixed(4)},
                        {infrastructureDetail?.longitude.toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* {infrastructureDetail &&
            infrastructureDetail.infrastructure_task.length > 0 ? (
              <div className="space-y-2">
                {infrastructureDetail?.infrastructure_task.map((task) => (
                  <div key={task.id} className="p-2 border rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Updated {formatDate(new Date(task.created_at))}
                      </span>
                      {getStatusBadge(task.status)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {task.notes}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <User className="w-3 h-3" />
                      {task.operator}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-xs text-muted-foreground">No Task</span>
            )} */}
            <Separator />
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Tasks
              </h4>

              <div className="space-y-3">
                {infrastructureDetail?.infrastructure_task.map(
                  (item, index) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex flex-col items-center">
                        {getStatusIcon(item.status)}
                        {index <
                          infrastructureDetail?.infrastructure_task.length -
                            1 && <div className="w-px h-8 bg-border mt-2" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-3">
                          {getStatusBadge(item.status)}
                          <span className="text-xs text-muted-foreground">
                            {formatDate(new Date(item.created_at))}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Tasks : {item.tasks}
                          </p>
                        </div>
                        {/* {item. && (
                          <p className="text-sm text-muted-foreground">
                            {action.notes}
                          </p>
                        )} */}
                        {/* <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <User className="w-3 h-3" />
                          {action.operator}
                        </p> */}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}
