#!/bin/bash
pnpm run dev > /dev/null 2>&1 &
echo $! > app_pid.txt
