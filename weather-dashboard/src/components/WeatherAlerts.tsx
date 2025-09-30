import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Badge } from "./ui/badge";
import { AlertTriangle, Info, Shield } from "lucide-react";

interface WeatherAlert {
  id: string;
  type: 'warning' | 'watch' | 'advisory';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  expiresAt: string;
}

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
}

export function WeatherAlerts({ alerts }: WeatherAlertsProps) {
  if (alerts.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-500" />
            <span>Weather Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-muted-foreground">No active weather alerts</p>
            <p className="text-sm text-green-600 mt-1">All clear for your location</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getAlertIcon = (type: string, severity: string) => {
    if (severity === 'high') {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    } else if (severity === 'medium') {
      return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    } else {
      return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          <span>Weather Alerts</span>
          <Badge variant="secondary">{alerts.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <Alert key={alert.id} className="border-l-4 border-l-orange-500">
              <div className="flex items-start space-x-3">
                {getAlertIcon(alert.type, alert.severity)}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{alert.title}</h4>
                    <Badge variant={getSeverityVariant(alert.severity) as any}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <AlertDescription className="text-sm">
                    {alert.description}
                  </AlertDescription>
                  <p className="text-xs text-muted-foreground">
                    Expires: {alert.expiresAt}
                  </p>
                </div>
              </div>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}