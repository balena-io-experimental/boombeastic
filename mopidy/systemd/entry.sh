#!/bin/bash

set -m

# Send SIGTERM to child processes of PID 1.
function signal_handler()
{
	kill "$pid"
}

function init_systemd()
{
	GREEN='\033[0;32m'
	echo -e "${GREEN}Systemd init system enabled."
	for var in $(compgen -e); do
		printf '%q=%q\n' "$var" "${!var}"
	done > /etc/docker.env
	echo 'source /etc/docker.env' >> ~/.bashrc

	printf '#!/bin/bash\n exec ' > /etc/balenaApp.sh
	printf '%q ' "$@" >> /etc/balenaApp.sh
	chmod +x /etc/balenaApp.sh

	mkdir -p /etc/systemd/system/balena.service.d
	cat <<-EOF > /etc/systemd/system/balena.service.d/override.conf
		[Service]
		WorkingDirectory=$(pwd)
	EOF

	sleep infinity &
	exec env DBUS_SYSTEM_BUS_ADDRESS=unix:path=/run/dbus/system_bus_socket /sbin/init quiet systemd.show_status=0
}

function init_non_systemd()
{
	# trap the stop signal then send SIGTERM to user processes
	trap signal_handler SIGRTMIN+3 SIGTERM

	# echo error message, when executable file doesn't exist.
	if CMD=$(command -v "$1" 2>/dev/null); then
		shift
		"$CMD" "$@" &
		pid=$!
		wait "$pid"
		exit_code=$?
		fg &> /dev/null || exit "$exit_code"
	else
		echo "Command not found: $1"
		exit 1
	fi
}

INITSYSTEM=$(echo "$INITSYSTEM" | awk '{print tolower($0)}')

case "$INITSYSTEM" in
	'1' | 'true')
		INITSYSTEM='on'
	;;
esac

if [ "$INITSYSTEM" = "on" ]; then
	init_systemd "$@"
else
	init_non_systemd "$@"
fi
