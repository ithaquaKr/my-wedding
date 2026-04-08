#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
exec /opt/homebrew/bin/node node_modules/.bin/next dev --port 3000
