// Delivery calculation utilities
export interface Location {
  lat: number;
  lng: number;
}

export interface DeliveryInfo {
  distance: number; // in kilometers
  deliveryCharge: number; // in rupees
  isFreeDelivery: boolean;
}

// Restaurant location - Ajni Metro, Nagpur
export const RESTAURANT_LOCATION: Location = {
  lat: 21.1325,
  lng: 79.0882
};

/**
 * Calculate delivery charge based on distance and order value
 * @param distanceInKm - Distance from restaurant in kilometers
 * @param orderValue - Total order value in rupees
 * @returns DeliveryInfo object with distance, charge, and free delivery status
 */
export function calculateDeliveryCharge(distanceInKm: number, orderValue: number = 0): DeliveryInfo {
  const isFreeDelivery = orderValue >= 500;
  const deliveryCharge = isFreeDelivery ? 0 : Math.ceil(distanceInKm * 10);
  
  return {
    distance: Math.round(distanceInKm * 10) / 10, // Round to 1 decimal place
    deliveryCharge,
    isFreeDelivery
  };
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param lat1 - First latitude
 * @param lng1 - First longitude
 * @param lat2 - Second latitude
 * @param lng2 - Second longitude
 * @returns Distance in kilometers
 */
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Get distance using Google Distance Matrix API
 * @param destination - Customer's location
 * @returns Promise with distance in kilometers
 */
export async function getDistanceFromGoogle(destination: Location): Promise<number> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    throw new Error('Google Maps API key not found. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.');
  }

  const origin = `${RESTAURANT_LOCATION.lat},${RESTAURANT_LOCATION.lng}`;
  const dest = `${destination.lat},${destination.lng}`;
  
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${dest}&units=metric&key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK' && data.rows[0]?.elements[0]?.status === 'OK') {
      const distanceValue = data.rows[0].elements[0].distance.value; // in meters
      return distanceValue / 1000; // Convert to kilometers
    } else if (data.status === 'REQUEST_DENIED') {
      throw new Error('Google Maps API key is invalid or restricted. Please check your API key configuration.');
    } else if (data.status === 'OVER_QUERY_LIMIT') {
      throw new Error('Google Maps API quota exceeded. Please try again later.');
    } else {
      throw new Error(`Distance calculation failed: ${data.status}`);
    }
  } catch (error) {
    console.error('Error calculating distance:', error);
    throw error;
  }
}

/**
 * Get coordinates from address using Google Geocoding API
 * @param address - Customer's address
 * @returns Promise with Location object
 */
export async function getCoordinatesFromAddress(address: string): Promise<Location> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    throw new Error('Google Maps API key not found. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.');
  }

  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng
      };
    } else if (data.status === 'REQUEST_DENIED') {
      throw new Error('Google Maps API key is invalid or restricted. Please check your API key configuration.');
    } else if (data.status === 'OVER_QUERY_LIMIT') {
      throw new Error('Google Maps API quota exceeded. Please try again later.');
    } else {
      throw new Error(`Address geocoding failed: ${data.status}`);
    }
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
}
