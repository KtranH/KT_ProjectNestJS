const redis = require('redis');

async function testRedis() {
  const client = redis.createClient({
    host: 'localhost',
    port: 6380
  });

  client.on('error', (err) => {
    console.log('Redis Client Error:', err);
  });

  client.on('connect', () => {
    console.log('Connected to Redis on port 6380');
  });

  try {
    await client.connect();
    
    // Test ping
    const pong = await client.ping();
    console.log('Ping result:', pong);
    
    // Test set/get
    await client.set('test', 'hello');
    const value = await client.get('test');
    console.log('Test value:', value);
    
    // Test verification code
    await client.set('verification:test@example.com', '123456', 'EX', 600);
    const code = await client.get('verification:test@example.com');
    console.log('Verification code:', code);
    
    await client.quit();
    console.log('Redis test completed successfully!');
  } catch (error) {
    console.error('Redis test failed:', error);
  }
}

testRedis(); 