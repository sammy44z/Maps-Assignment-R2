export interface Stop {
    StopId: string;
    StopName: string;
    Latitude: number;
    Longitude: number;
  }
  
interface Route {
    Name: string;
    Direction: 'UP' | 'DOWN';
    RouteId: string;
    Status: 'Active' | 'Inactive';
    Stops: Stop[];
  }

export default Route;

