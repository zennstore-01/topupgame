const axios = require('axios');

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

    const { username, product } = req.body;
    
    // API KEY DIAMBIL DARI VERCEL SETTINGS (ENVIRONMENT VARIABLE)
    const MY_API_KEY = process.env.ROBLOX_API_KEY;

    try {
        // GANTI URL DI BAWAH INI DENGAN URL API PROVIDER ANDA
        const response = await axios.post('https://api.pemasok-game.com/v1/order', {
            key: MY_API_KEY,
            target: username,
            product_id: product,
            ref_id: "INV-" + Date.now()
        });

        return res.status(200).json({ 
            success: true, 
            message: "Pesanan berhasil diproses!",
            data: response.data 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            success: false, 
            message: "Gagal menghubungi provider API." 
        });
    }
}
