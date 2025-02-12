#!/bin/bash

# wait-for-it.sh

# Usage: ./wait-for-it.sh host:port [-s] [-t timeout] [-- command args]
#   -h HOST | --host=HOST       Host or IP under test
#   -p PORT | --port=PORT       TCP port under test
#       Optional:
#   -s | --strict               Only execute subcommand if the test succeeds
#   -q | --quiet                Don't output any status messages
#   -t TIMEOUT | --timeout=TIMEOUT
#                               Timeout in seconds, zero for no timeout
#   -- COMMAND ARGS             Execute command with args after the test finishes

function print_usage() {
    echo "Usage: $0 host:port [-s] [-t timeout] [-- command args]"
    echo "   -h HOST | --host=HOST       Host or IP under test"
    echo "   -p PORT | --port=PORT       TCP port under test"
    echo "       Optional:"
    echo "   -s | --strict               Only execute subcommand if the test succeeds"
    echo "   -q | --quiet                Don't output any status messages"
    echo "   -t TIMEOUT | --timeout=TIMEOUT"
    echo "                               Timeout in seconds, zero for no timeout"
    echo "   -- COMMAND ARGS             Execute command with args after the test finishes"
}

# Process arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
        *:* )
        HOST=$(printf "%s\n" "$1" | cut -d : -f 1)
        PORT=$(printf "%s\n" "$1" | cut -d : -f 2)
        shift 1
        ;;
        --host=* )
        HOST="${1#*=}"
        shift 1
        ;;
        --port=* )
        PORT="${1#*=}"
        shift 1
        ;;
        -s | --strict )
        STRICT=1
        shift 1
        ;;
        -q | --quiet )
        QUIET=1
        shift 1
        ;;
        -t=* | --timeout=* )
        TIMEOUT="${1#*=}"
        shift 1
        ;;
        --timeout )
        TIMEOUT="${2}"
        shift 2
        ;;
        -- )
        shift
        break
        ;;
        --help )
        print_usage
        exit 0
        ;;
        * )
        echo "Unknown argument: $1"
        print_usage
        exit 1
        ;;
    esac
done

if [[ "$HOST" == "" || "$PORT" == "" ]]; then
    print_usage
    exit 1
fi

TIMEOUT=${TIMEOUT:-15}
QUIET=${QUIET:-0}
STRICT=${STRICT:-0}

function echoerr() {
    if [ "$QUIET" -ne 1 ]; then
        printf "%s\n" "$*" 1>&2
    fi
}

function check_tcp_port() {
    (echo > /dev/tcp/"$HOST"/"$PORT") >/dev/null 2>&1
    return $?
}

while :
do
    if check_tcp_port; then
        if [ "$QUIET" -ne 1 ]; then
            echo "tcp/$HOST:$PORT is available"
        fi
        break
    else
        if [ "$TIMEOUT" -gt 0 ]; then
            TIMEOUT=$((TIMEOUT - 1))
            if [ "$TIMEOUT" -eq 0 ]; then
                echoerr "timeout occurred after waiting $ORIGINAL_TIMEOUT seconds for tcp/$HOST:$PORT"
                exit 1
            fi
        fi
        if [ "$QUIET" -ne 1 ]; then
            echoerr "waiting for tcp/$HOST:$PORT without timeout"
        fi
        sleep 1
    fi
done

if [ "$STRICT" -eq 1 ]; then
    exec "$@"
else
    "$@"
    exit $?
fi