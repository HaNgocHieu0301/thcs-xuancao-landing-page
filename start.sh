#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"
CMS_DIR="$ROOT_DIR/cms"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Error: required command '$1' is not available in PATH." >&2
    exit 1
  fi
}

compose() {
  if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
    docker compose "$@"
  elif command -v docker-compose >/dev/null 2>&1; then
    docker-compose "$@"
  else
    echo "Error: docker compose is not available." >&2
    exit 1
  fi
}

cleanup() {
  echo "\nStopping local services..."
  if [[ -n "${CMS_PID:-}" ]] && ps -p "${CMS_PID}" >/dev/null 2>&1; then
    kill "${CMS_PID}" 2>/dev/null || true
  fi
  if [[ -n "${FRONTEND_PID:-}" ]] && ps -p "${FRONTEND_PID}" >/dev/null 2>&1; then
    kill "${FRONTEND_PID}" 2>/dev/null || true
  fi
  wait 2>/dev/null || true
}

main() {
  require_command docker
  require_command npm

  if [[ ! -d "$FRONTEND_DIR" ]]; then
    echo "Error: frontend directory not found at $FRONTEND_DIR" >&2
    exit 1
  fi

  if [[ ! -d "$CMS_DIR" ]]; then
    echo "Error: cms directory not found at $CMS_DIR" >&2
    exit 1
  fi

  trap cleanup INT TERM EXIT

  echo "Starting Docker services..."
  compose up -d

  echo "Starting CMS (Strapi)..."
  (
    cd "$CMS_DIR"
    npm run develop
  ) &
  CMS_PID=$!

  echo "Starting frontend (Next.js)..."
  (
    cd "$FRONTEND_DIR"
    npm run dev
  ) &
  FRONTEND_PID=$!

  echo "\nAll services are running. Press Ctrl+C to stop."

  wait -n || true
  wait || true
}

main "$@"
