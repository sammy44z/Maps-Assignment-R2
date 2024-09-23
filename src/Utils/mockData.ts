import Route from "../common/route";

  const mockRouteList: Route[] = [
    {
      Name: "Mumbai to Delhi Route",
      Direction: "UP",
      RouteId: "RID-1",
      Status: "Active",
      Stops: [
        {
          StopId: "SID-1-1",
          StopName: "Mumbai Central",
          Latitude: 18.9691,
          Longitude: 72.8193
        },
        {
          StopId: "SID-1-2",
          StopName: "Surat",
          Latitude: 21.1702,
          Longitude: 72.8311
        },
        {
          StopId: "SID-1-3",
          StopName: "Vadodara",
          Latitude: 22.3072,
          Longitude: 73.1812
        },
        {
          StopId: "SID-1-4",
          StopName: "New Delhi Railway Station",
          Latitude: 28.6419,
          Longitude: 77.2194
        }
      ]
    },
    {
      Name: "Bangalore to Chennai Route",
      Direction: "DOWN",
      RouteId: "RID-2",
      Status: "Active",
      Stops: [
        {
          StopId: "SID-2-1",
          StopName: "Bangalore City Junction",
          Latitude: 12.9784,
          Longitude: 77.5738
        },
        {
          StopId: "SID-2-2",
          StopName: "Krishnagiri",
          Latitude: 12.5265,
          Longitude: 78.2149
        },
        {
          StopId: "SID-2-3",
          StopName: "Vellore",
          Latitude: 12.9165,
          Longitude: 79.1325
        },
        {
          StopId: "SID-2-4",
          StopName: "Chennai Central",
          Latitude: 13.0827,
          Longitude: 80.2707
        }
      ]
    },
    {
      Name: "Kolkata to Hyderabad Route",
      Direction: "UP",
      RouteId: "RID-3",
      Status: "Inactive",
      Stops: [
        {
          StopId: "SID-3-1",
          StopName: "Kolkata Railway Station",
          Latitude: 22.5726,
          Longitude: 88.3639
        },
        {
          StopId: "SID-3-2",
          StopName: "Bhubaneswar",
          Latitude: 20.2961,
          Longitude: 85.8245
        },
        {
          StopId: "SID-3-3",
          StopName: "Visakhapatnam",
          Latitude: 17.6868,
          Longitude: 83.2185
        },
        {
          StopId: "SID-3-4",
          StopName: "Hyderabad Deccan Station",
          Latitude: 17.3850,
          Longitude: 78.4867
        }
      ]
    },
    {
      Name: "Ahmedabad to Jaipur Route",
      Direction: "DOWN",
      RouteId: "RID-4",
      Status: "Active",
      Stops: [
        {
          StopId: "SID-4-1",
          StopName: "Ahmedabad Junction",
          Latitude: 23.0225,
          Longitude: 72.5714
        },
        {
          StopId: "SID-4-2",
          StopName: "Udaipur",
          Latitude: 24.5854,
          Longitude: 73.7125
        },
        {
          StopId: "SID-4-3",
          StopName: "Ajmer",
          Latitude: 26.4499,
          Longitude: 74.6399
        },
        {
          StopId: "SID-4-4",
          StopName: "Jaipur Junction",
          Latitude: 26.9124,
          Longitude: 75.7873
        }
      ]
    },
    {
      Name: "Pune to Surat Route",
      Direction: "UP",
      RouteId: "RID-5",
      Status: "Active",
      Stops: [
        {
          StopId: "SID-5-1",
          StopName: "Pune Junction",
          Latitude: 18.5284,
          Longitude: 73.8739
        },
        {
          StopId: "SID-5-2",
          StopName: "Nashik",
          Latitude: 19.9975,
          Longitude: 73.7898
        },
        {
          StopId: "SID-5-3",
          StopName: "Vadodara",
          Latitude: 22.3072,
          Longitude: 73.1812
        },
        {
          StopId: "SID-5-4",
          StopName: "Surat Railway Station",
          Latitude: 21.2049,
          Longitude: 72.8408
        }
      ]
    }
  ];

export default mockRouteList