export interface Stop {
    StopId: string;
    StopName: string | undefined;
    Latitude: number | undefined;
    Longitude: number | undefined;
  }
  
interface Route {
    Name: string;
    Direction: 'UP' | 'DOWN';
    RouteId: string;
    Status: 'Active' | 'Inactive';
    Stops: Stop[];
  }

export default Route;

