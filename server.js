const express = require('express');
const path = require('path');

const app = express();
const PORT = 8000;

// 静的ファイルを提供するディレクトリ
app.use(express.static(path.join(__dirname, 'public')));

// MP3再生ページを提供
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
