#!/usr/bin/env bash
#dumb json concatenator
DIRECTORY_TO_PROCESS="${1:-./data/}"
pstr="#######################################################################"
pstr2="......................................................................."

percentComplete() {
    pd=$(( $first * 73 / $numberFiles ))
    pd2=$(( 73 - ( $first * 73 / $numberFiles ) ))
    printf "\r%3d.%1d%% [%.${pd}s%.${pd2}s]" $(( $first * 100 / $numberFiles )) $(( ($first * 1000 / $numberFiles) % 10 )) $pstr $pstr2 >&2
}

#numberFiles=$(find ${DIRECTORY_TO_PROCESS} -name "*.geojson*" | wc -l)
numberFiles=$(grep -riL "\"type\":\"Point\"" "${DIRECTORY_TO_PROCESS}" | grep ".geojson" | wc -l)
(grep -riL "\"type\":\"Point\"" "${DIRECTORY_TO_PROCESS}" | grep ".geojson" | \
# (find ${DIRECTORY_TO_PROCESS} -name "*.geojson*" | \
while IFS= read -r line; do
    if [ "${first}" != "" ]; then
        printf ","
        first=$((first+1))
    else
        printf '{"type": "FeatureCollection","features": ['
        first=1
    fi
    percentComplete
    cat "${line}"
done && \
printf "]}") #| jq -c .
printf "\n" >&2

#### need to determine if the data i downloaded has what we want