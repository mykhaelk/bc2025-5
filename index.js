const http = require('http');
const fs = require('fs/promises');
const { program } = require('commander');

// Налаштування аргументів командного рядка
program
  .requiredOption('-h, --host <type>', 'Адреса сервера')
  .requiredOption('-p, --port <type>', 'Порт сервера')
  .requiredOption('-c, --cache <type>', 'Шлях до директорії для кешування');

program.parse(process.argv);

const { host, port, cache } = program.opts();

// Функція для створення директорії кешу, якщо вона не існує
const createCacheDir = async () => {
  try {
    await fs.mkdir(cache, { recursive: true });
    console.log('Директорію для кешу створено.');
  } catch (error) {
    console.error('Помилка при створенні директорії для кешу:', error);
    process.exit(1);
  }
};

const server = http.createServer((req, res) => {
  // Логіку обробки запитів ми додамо в наступних частинах
  res.writeHead(501, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Функціонал ще не реалізовано');
});

// Запуск сервера
server.listen(port, host, async () => {
  await createCacheDir();
  console.log(`Проксі-сервер запущено на http://${host}:${port}`);
  console.log(`Кешування увімкнено. Директорія для кешу: ${cache}`);
});
