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
      case "normal":
        return <Badge className="status-normal">Normal</Badge>;
      case "progress":
        return <Badge className="status-progress">On Progress</Badge>;
      case "trouble":
        return <Badge className="status-trouble">Trouble</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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
      <Card className="fixed bottom-0 left-0 right-0 max-h-[70vh] lg:static lg:max-h-none lg:w-96 lg:h-full shadow-elevation border-t lg:border lg:rounded-lg bg-card/95 backdrop-blur-sm">
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
                  ID: {infrastructureDetail?.id}
                </p>
                <p className="text-sm text-muted-foreground">
                  UPT: {infrastructureDetail?.upt.upt_name}
                </p>
              </div>

              {/* looping task */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {/* Updated{" "}
                  {formatDate(
                    infrastructureDetail?.infrastructure_task[0]
                      .created_at as Date
                  )} */}
                </span>
                {infrastructureDetail &&
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
                )}
              </div>
            </div>

            <Separator />

            {/* Infrastructure Details */}
            {/* <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Building className="w-4 h-4" />
                Infrastructure Info
              </h4>

              <div className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <Badge variant="outline">{anomaly.type}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">UPT:</span>
                  <span className="font-medium">{anomaly.upt}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Location:</span>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="font-mono text-xs">
                        {anomaly.location.lat.toFixed(4)},{" "}
                        {anomaly.location.lng.toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <Separator />

            {/* Anomaly Description */}
            {/* <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Description
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {anomaly.description}
              </p>
            </div> */}

            <Separator />

            {/* Status Update Form */}
            {/* <StatusUpdateForm
              currentStatus={anomaly.status}
              onSubmit={(update) => onStatusUpdate(anomaly.id, update)}
            /> */}
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}
