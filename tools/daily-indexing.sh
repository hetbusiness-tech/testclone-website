#!/bin/zsh
export PATH="/opt/homebrew/opt/node@20/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
cd "/Applications/NEW CLIENTS/testclone-website-main"

echo "=== Running Daily Google Indexing: $(date) ===" >> tools/daily-indexing.log
npm run indexing >> tools/daily-indexing.log 2>&1
echo "=== Completed: $(date) ===\n" >> tools/daily-indexing.log
