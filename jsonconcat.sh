#!/usr/bin/env bash
#dumb json concatenator
#first paraemter is the directory to process
#second paraemter is the new geojson file to write
#third parameter is the WOF files to download (if you want to) (or -wof do download all of whosonfirst)
DIRECTORY_TO_PROCESS="${1:-./data/}"
FILE_TO_WRITE="${2:-./data/jsonconcat.json}"
IFS=' ' read -r -a WOF_FILES_TO_RETRIEVE <<< "${3}"
#download all of them
if [ "${WOF_FILES_TO_RETRIEVE}" == "-wof" ]; then
    WOF="true"
    WOF_FILES_TO_RETRIEVE=($(sed 's/ -.*//g' `dirname "${0}"`/whosonfirstlist.txt))
fi

# jq '.properties|=with_entries(select(.key|test("name:|ne:|statoids:|mz:|lbl:|edtf:|mps:|qs:|src:|wd:|wof:belongsto|wof:breaches")|not))'
# jq -c . -s whosonfirst.geojson | more

pstr="##########"
pstr2=".........."

percentComplete() {
    pd=$(( $first * 10 / $numberFiles ))
    pd2=$(( 10 - ( $first * 10 / $numberFiles ) ))
    printf "\r%3d.%1d%% [%.${pd}s%.${pd2}s] ${eachMainDir}->${line: -17}" $(( $first * 100 / $numberFiles )) \
    $(( ($first * 1000 / $numberFiles) % 10 )) ${pstr} ${pstr2} #>&2
}

downloadWofFiles() {
    for eachWofFile in "${WOF_FILES_TO_RETRIEVE[@]}"; do
        (mkdir -p ${DIRECTORY_TO_PROCESS}/${directoryNumberToSortBy} \
        && cd ${DIRECTORY_TO_PROCESS}/${directoryNumberToSortBy} \
        && wget https://github.com/whosonfirst-data/${eachWofFile}/archive/master.zip \
        && unzip master.zip > /dev/null \
        && rm master.zip)
        # && wget https://dist.whosonfirst.org/bundles/${eachWofFile}.tar.bz2 \
        # && tar xvfj ${eachWofFile}.tar.bz2 > /dev/null \
        # && rm ${eachWofFile}.tar.bz2)
        directoryNumberToSortBy=$((directoryNumberToSortBy+1))
    done
}

processDirectory() {
    # for line in $(grep -riL "\"type\":\"Point\"" "${eachMainDir}" | grep -E "/[0-9]{8}[0-9]?\.geojson"); do # | \
    # only look for "wof:placetype":"locality / region / country
    for line in $(grep -rlE "\"wof:placetype\":\"locality|\"wof:placetype\":\"region|\"wof:placetype\":\"country" "${eachMainDir}" | grep -E "/[0-9]{8}[0-9]?\.geojson"); do # | \
        #Check to make sure it's a polygon or multi --- not a Point
        isPoly=$(grep -c "\"type\":\"Point\"" ${line})
        if [ "${isPoly}" == "0" ]; then
            if [ "${first}" != "0" ]; then
                printf "," >> ${FILE_TO_WRITE}
            fi
            jq -c \
            '.properties|=with_entries(select(.key|test("edtf:|geom:|iso:|name:|statoids:|mz:|lbl:|edtf:|mps:|qs:|src:|wd:|wof:belongsto|wof:breaches|wof:concordances|wof:geomhash|wof:hierarchy|wof:parent_id|wof:repo|wof:superseded_by|wof:supersedes|wof:tags")|not))' \
            "${line}" >> ${FILE_TO_WRITE}
        fi
        first=$((first+1))
        percentComplete
    done
}

#dowload the latest WOF files that are asked for via the third command line parameter
if [ "${WOF_FILES_TO_RETRIEVE}" != "" ]; then
    directoryNumberToSortBy=0
    downloadWofFiles
fi

# create new output file, with all the geojson files concatentated
printf '{"type": "FeatureCollection","features": [' > ${FILE_TO_WRITE}
#percentcomplete counter
first=0
#get rough estimate (quick and dirty) of number of files
numberFiles=$(find -E "${DIRECTORY_TO_PROCESS}" -regex ".*/[0-9]{8}[0-9]?\.geojson" | wc -l)
#numberFiles=$(grep -riL "\"type\":\"Point\"" "${DIRECTORY_TO_PROCESS}" | grep -E "/[0-9]{8}[0-9]?\.geojson" | wc -l)
# get the size of the directory to process string so that we can use it to sort the directories ... this is only really necessary when not using -wof
lenOfDirToProcess=${#DIRECTORY_TO_PROCESS}
lenOfDirToProcess=$((lenOfDirToProcess+1))
# process the files in each directory based on the directoryNumberToSortBy sort of the directory ( 0 first, then 1, then 2 ... etc)
if [ "${WOF}" != "true" ]; then
    for eachMainDir in `find "${DIRECTORY_TO_PROCESS}" -mindepth 1 -maxdepth 1 -type d | sort -nk1.${lenOfDirToProcess}`; do
        processDirectory
    done
else
    eachMainDir="${DIRECTORY_TO_PROCESS}"
    processDirectory
fi
printf "]}" >> ${FILE_TO_WRITE}
printf "\n" #>&2
