RED='\033[0;31m'   # Red foreground
GREEN='\033[0;32m' # Green foreground
BLUE='\033[0;34m'  # Blue foreground
NC='\033[0m'       # No Color (resets formatting)

if [ "$1" == "from" ]; then
  cp ~/Documents/coding/PSO/frontend/src/util/* ~/Documents/coding/PSO/experimental_project/js_prototype/util/ -r
  echo -e "$GREEN Copied Util to this project $NC"
else
  cp ~/Documents/coding/PSO/experimental_project/js_prototype/util/* ~/Documents/coding/PSO/frontend/src/util/ -r
  echo -e "$GREEN Copied Util to frontend project $NC"
fi
