import mongoose from 'mongoose';
import dns from 'dns';

// Force Node.js DNS to use IPv4 and reliable Google/Cloudflare DNS servers for Windows SRV queries
try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Fallback if environment restricts custom DNS servers
}

let isConnected = false;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }

  const connUri = process.env.MONGODB_URI;
  if (!connUri) {
    isConnected = false;
    console.log('[QORVEX DB] No MONGODB_URI provided. Operating in dynamic memory mode.');
    return;
  }

  try {
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`[QORVEX DB] MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.warn(`[QORVEX DB] MongoDB connection warning (${error.message}). Operating with dynamic memory mode.`);
  }
};

export const getIsConnected = () => isConnected;
