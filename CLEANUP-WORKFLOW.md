# 🧹 Cross-Platform Cache Cleanup Workflow

## Overview
This project now includes a cross-platform cache cleanup system that automatically detects your operating system and uses the appropriate cleanup command.

## 🚀 Quick Start

### Clean and Start Dev Server (Recommended)
```bash
npm run clean:dev
```
This command will:
1. Clean the `.next` directory using the appropriate OS command
2. Start the development server

### Manual Cleanup
```bash
npm run clean
```
This command only cleans the `.next` directory without starting the server.

## 🔧 How It Works

The cleanup script (`scripts/clean.js`) automatically detects your operating system:

- **Windows PowerShell**: Uses `Remove-Item -Recurse -Force .next`
- **Windows CMD**: Falls back to `rmdir /s /q .next`
- **Linux/macOS**: Uses `rm -rf .next`

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run clean` | Cleans `.next` directory using OS-appropriate command |
| `npm run clean:dev` | Cleans `.next` then starts dev server |
| `npm run dev` | Starts dev server without cleaning |

## 🧪 Testing the Cleanup

To test the cleanup functionality:

```bash
# Create test .next directory
node scripts/test-clean.js

# Test cleanup
npm run clean

# Verify cleanup worked
Test-Path .next  # Should return False
```

## 🛠️ Troubleshooting

### Common Issues

1. **Permission Denied**: Run PowerShell as Administrator
2. **Script Not Found**: Ensure `scripts/clean.js` exists
3. **Node Not Found**: Install Node.js

### Manual Cleanup Commands

If the script fails, you can manually clean:

**Windows PowerShell:**
```powershell
Remove-Item -Recurse -Force .next
```

**Windows CMD:**
```cmd
rmdir /s /q .next
```

**Linux/macOS:**
```bash
rm -rf .next
```

## 🔄 Workflow Integration

### Development Workflow
```bash
# Start fresh development session
npm run clean:dev

# Or clean manually then start
npm run clean
npm run dev
```

### Build Workflow
```bash
# Clean before building
npm run clean
npm run build
```

## 📁 File Structure

```
scripts/
├── clean.js          # Main cleanup script
└── test-clean.js     # Test script for verification

package.json          # Contains cleanup scripts
```

## ✅ Benefits

- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Automatic Detection**: No need to remember OS-specific commands
- **Safe**: Checks if directory exists before attempting cleanup
- **Integrated**: Easy to use with existing npm scripts
- **Error Handling**: Graceful fallbacks and clear error messages
