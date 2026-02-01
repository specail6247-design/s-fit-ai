
import os

def replace_in_file(filepath, search, replace):
    try:
        with open(filepath, 'r') as f:
            content = f.read()

        if search not in content:
            print(f"Warning: '{search}' not found in {filepath}")
            return

        new_content = content.replace(search, replace)
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    except FileNotFoundError:
        print(f"Error: {filepath} not found")

# 1. PhotoFitting: Remove unused useEffect
replace_in_file(
    'components/PhotoFitting.tsx',
    'import React, { useState, useEffect } from "react";',
    'import React, { useState } from "react";'
)

# 2. FittingRoom: Remove unused opacity
# Exact string from grep:
# function Mannequin({
#   height = 170, opacity = 1.0
# }: { height?: number; opacity?: number; bodyShape?: string; proportions?: PoseProportions | null }) {
search_str = """function Mannequin({
  height = 170, opacity = 1.0
}: { height?: number; opacity?: number; bodyShape?: string; proportions?: PoseProportions | null }) {"""

replace_str = """function Mannequin({
  height = 170
}: { height?: number; opacity?: number; bodyShape?: string; proportions?: PoseProportions | null }) {"""

replace_in_file(
    'components/FittingRoom.tsx',
    search_str,
    replace_str
)

# 3. ErrorBoundary: Fix unused _
replace_in_file(
    'components/ErrorBoundary.tsx',
    'public static getDerivedStateFromError(_: Error): State {',
    '// eslint-disable-next-line @typescript-eslint/no-unused-vars\n  public static getDerivedStateFromError(_: Error): State {'
)
