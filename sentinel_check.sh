#!/bin/bash
echo "Looking for other vision API key usage..."
grep -rnw '.' -e 'NEXT_PUBLIC_OPENAI_API_KEY' | grep -v 'node_modules' | grep -v '\.git' | grep -v 'sentinel_check.sh'
echo "Checking DigitalTwinMode client status..."
head -n 5 ./components/DigitalTwinMode.tsx
