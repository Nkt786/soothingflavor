#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const nextDir = path.join(process.cwd(), '.next');

function cleanNextDirectory() {
  try {
    // Check if .next directory exists
    if (!fs.existsSync(nextDir)) {
      console.log('✅ .next directory does not exist, nothing to clean');
      return;
    }

    const platform = process.platform;
    let command;

    if (platform === 'win32') {
      // Windows - check if we're in PowerShell or CMD
      try {
        // Try PowerShell first
        command = 'Remove-Item -Recurse -Force .next';
        execSync(command, { shell: 'powershell', stdio: 'pipe' });
        console.log('✅ Cleaned .next directory using PowerShell');
      } catch (error) {
        // Fallback to CMD
        command = 'rmdir /s /q .next';
        execSync(command, { shell: 'cmd', stdio: 'pipe' });
        console.log('✅ Cleaned .next directory using CMD');
      }
    } else {
      // Unix-like systems (Linux, macOS)
      command = 'rm -rf .next';
      execSync(command, { stdio: 'pipe' });
      console.log('✅ Cleaned .next directory using rm');
    }
  } catch (error) {
    console.error('❌ Error cleaning .next directory:', error.message);
    process.exit(1);
  }
}

// Run the cleanup
cleanNextDirectory();
