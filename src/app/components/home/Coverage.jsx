// 'use client';

// import React, { useRef, useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';
// import 'leaflet/dist/leaflet.css';

// // Dynamic Leaflet imports (SSR disabled)
// const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
// const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
// const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
// const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// // Leaflet icon fix - dynamic import inside useEffect
// export default function Coverage({ centers }) {
//   const mapRef = useRef(null);
//   const [serviceCenters, setServiceCenters] = useState([]);

//   useEffect(() => {
//     // Only import Leaflet on client-side
//     import('leaflet').then(L => {
//       delete L.Icon.Default.prototype._getIconUrl;
//       L.Icon.Default.mergeOptions({
//         iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
//         iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
//         shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
//       });
//     });

//     if (centers) {
//       setServiceCenters(centers);
//     } else {
//       fetch('/data/Centers.json')
//         .then(res => res.json())
//         .then(data => setServiceCenters(data))
//         .catch(err => console.error('Failed to load centers:', err));
//     }
//   }, [centers]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     const location = e.target.location.value.trim().toLowerCase();
//     if (!location) return alert('Please enter a district.');

//     const center = serviceCenters.find(c => c.district.toLowerCase() === location);.

//     conosle.log("centers: ",center)
//     if (center && mapRef.current) {
//       mapRef.current.flyTo([center.latitude, center.longitude], 12, { duration: 1.5 });
//     } else {
//       alert(`No service center found in "${location}".`);
//     }
//   };

//   return (
//     <div className="w-full px-4 pb-10">
//       <h1 className="text-4xl font-bold text-center mt-10 mb-6">
//         We are available in 64 districts of Bangladesh
//       </h1>

//       <form onSubmit={handleSearch} className="flex justify-center mb-10 gap-2 w-full max-w-md">
//         <input
//           type="search"
//           name="location"
//           placeholder="Search district..."
//           className="flex-1 p-2 border rounded focus:outline-none"
//         />
//         <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Search</button>
//       </form>

//       <div className="border w-full h-[800px] rounded-xl overflow-hidden shadow">
//         <MapContainer
//           center={[23.685, 90.356]}
//           zoom={7}
//           scrollWheelZoom={true}
//           className="w-full h-full"
//           whenCreated={map => (mapRef.current = map)}
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           {serviceCenters.map((center, idx) => (
//             <Marker key={idx} position={[center.latitude, center.longitude]}>
//               <Popup>
//                 <div>
//                   <h2 className="text-xl font-bold">{center.district}</h2>
//                   <p>{center.covered_area?.join(', ')}</p>
//                   {center.status && <p>Status: {center.status}</p>}
//                 </div>
//               </Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       </div>
//     </div>
//   );
// }