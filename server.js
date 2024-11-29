const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 3000;

// 静的ファイルを提供するディレクトリ
app.use(express.static(path.join(__dirname, 'public')));

// プロキシエンドポイント
app.get('/proxy', async (req, res) => {
    const mp3Url = req.query.url;

    if (!mp3Url) {
        return res.status(400).send('URL is required');
    }

    try {
        const response = await axios.get(mp3Url, { responseType: 'stream' });
        res.set('Content-Type', 'audio/mpeg');
        response.data.pipe(res);
    } catch (error) {
        console.error('Error fetching MP3:', error.message);
        res.status(500).send('Failed to fetch the MP3 file');
    }
});

// サーバー起動
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
