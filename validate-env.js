#!/usr/bin/env node

/**
 * Environment Variable Validation Script
 * Bu script environment değişkenlerinin doğru şekilde tanımlandığını kontrol eder
 */

const fs = require('fs');
const path = require('path');

// Gerekli environment değişkenleri
const requiredVars = [
  'MYSQL_ROOT_PASSWORD',
  'MYSQL_DATABASE',
  'MYSQL_USER',
  'MYSQL_PASSWORD',
  'SPRING_DATASOURCE_URL',
  'SPRING_DATASOURCE_USERNAME',
  'SPRING_DATASOURCE_PASSWORD',
  'NEXT_PUBLIC_BACKEND_API_URL',
  'NEXT_PUBLIC_API_URL',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'NODE_ENV',
  'SSL_EMAIL',
  'DOMAIN_NAME'
];

function validateEnvironment(envFile = '.env.prod') {
  const envPath = path.join(__dirname, envFile);
  
  if (!fs.existsSync(envPath)) {
    console.error(`❌ Environment file not found: ${envFile}`);
    console.log(`📝 Please copy .env.example to ${envFile} and fill in the values`);
    process.exit(1);
  }

  // .env dosyasını oku
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...valueParts] = trimmed.split('=');
      envVars[key] = valueParts.join('=');
    }
  });

  // Eksik değişkenleri kontrol et
  const missingVars = requiredVars.filter(varName => !envVars[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    process.exit(1);
  }

  // Güvenlik kontrolleri
  const securityWarnings = [];
  
  if (envVars.MYSQL_ROOT_PASSWORD === 'rootroot') {
    securityWarnings.push('MYSQL_ROOT_PASSWORD is using default value');
  }
  
  if (envVars.MYSQL_PASSWORD === 'mertauto123456') {
    securityWarnings.push('MYSQL_PASSWORD is using default value');
  }
  
  if (envVars.NEXTAUTH_SECRET && envVars.NEXTAUTH_SECRET.length < 32) {
    securityWarnings.push('NEXTAUTH_SECRET should be at least 32 characters long');
  }

  if (securityWarnings.length > 0) {
    console.warn('⚠️  Security warnings:');
    securityWarnings.forEach(warning => console.warn(`   - ${warning}`));
  }

  console.log('✅ Environment validation passed!');
  console.log(`📁 Validated file: ${envFile}`);
  console.log(`🔢 Found ${Object.keys(envVars).length} environment variables`);
}

// Script olarak çalıştırıldığında
if (require.main === module) {
  const envFile = process.argv[2] || '.env.prod';
  validateEnvironment(envFile);
}

module.exports = { validateEnvironment };

