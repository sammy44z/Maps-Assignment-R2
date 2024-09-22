import Route from "../common/route";

const mockRouteList: Route[] = [
    {
      Name: "Route 1",
      Direction: "DOWN",
      RouteId: "RID-1",
      Status: "Inactive",
      Stops: [
        {
          StopId: "SID-1-1",
          StopName: "Stop 1 of Route 1",
          Latitude: -57.927768,
          Longitude: 30.994787
        },
        {
          StopId: "SID-1-2",
          StopName: "Stop 2 of Route 1",
          Latitude: -38.8048,
          Longitude: -112.856831
        },
        {
          StopId: "SID-1-3",
          StopName: "Stop 3 of Route 1",
          Latitude: -38.41023,
          Longitude: -52.79766
        }
      ]
    },
    {
      Name: "Route 2",
      Direction: "UP",
      RouteId: "RID-2",
      Status: "Inactive",
      Stops: [
        {
          StopId: "SID-2-1",
          StopName: "Stop 1 of Route 2",
          Latitude: 9.591829,
          Longitude: 17.185991
        },
        {
          StopId: "SID-2-2",
          StopName: "Stop 2 of Route 2",
          Latitude: 49.595303,
          Longitude: -86.6075
        },
        {
          StopId: "SID-2-3",
          StopName: "Stop 3 of Route 2",
          Latitude: 76.735883,
          Longitude: 3.55497
        }
      ]
    },
    {
      Name: "Route 3",
      Direction: "DOWN",
      RouteId: "RID-3",
      Status: "Active",
      Stops: [
        {
          StopId: "SID-3-1",
          StopName: "Stop 1 of Route 3",
          Latitude: 50.440412,
          Longitude: -99.3806
        },
        {
          StopId: "SID-3-2",
          StopName: "Stop 2 of Route 3",
          Latitude: -19.708794,
          Longitude: 98.911641
        },
        {
          StopId: "SID-3-3",
          StopName: "Stop 3 of Route 3",
          Latitude: 61.885668,
          Longitude: -164.90515
        }
      ]
    },
    {
      Name: "Route 4",
      Direction: "DOWN",
      RouteId: "RID-4",
      Status: "Active",
      Stops: [
        {
          StopId: "SID-4-1",
          StopName: "Stop 1 of Route 4",
          Latitude: -19.232452,
          Longitude: -140.374199
        },
        {
          StopId: "SID-4-2",
          StopName: "Stop 2 of Route 4",
          Latitude: 48.422427,
          Longitude: -72.1721
        },
        {
          StopId: "SID-4-3",
          StopName: "Stop 3 of Route 4",
          Latitude: 38.556809,
          Longitude: -58.982927
        }
      ]
    },
    {
      Name: "Route 5",
      Direction: "DOWN",
      RouteId: "RID-5",
      Status: "Active",
      Stops: [
        {
          StopId: "SID-5-1",
          StopName: "Stop 1 of Route 5",
          Latitude: 5.768597,
          Longitude: -121.048069
        },
        {
          StopId: "SID-5-2",
          StopName: "Stop 2 of Route 5",
          Latitude: -72.966257,
          Longitude: 21.430104
        },
        {
          StopId: "SID-5-3",
          StopName: "Stop 3 of Route 5",
          Latitude: -66.870446,
          Longitude: -13.173485
        }
      ]
    }
  ];

export default mockRouteList