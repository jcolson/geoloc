#!/usr/bin/env bash
# this doesn't actually work because geojson is BROKEN - (streaming merge just REMOVES data)

# We actually process one more file than this at a time
NUM_TO_PROCESS=5
NUM_TO_PROCESS_FINAL=3
DIRECTORY_TO_PROCESS="${1:-./data/}"
TEMPDIRECTORY=$(mktemp -d) || exit 1
FINAL_PRODUCT=whosonfirst-data.geojson
STREAM=""
#export NODE_OPTIONS="--max_old_space_size=12288"

processfiles() {
    #printf "Files to process: ${filetoprocess[*]}\n"
    #printf "$((filecount*NUM_TO_PROCESS)) - "
    if $(grep -q FeatureCollection "${filetoprocess[1]}"); then
        STREAM="-s"
    fi
     (geojson-merge ${STREAM} ${filetoprocess[*]} > "${TEMPDIRECTORY}/${FINAL_PRODUCT}.${filecount}" && printf "."|| exit 1) &
    pids[${filecount}]=$!
    filecount=$((filecount+1))
    # TMPFILE="$(mktemp)"
    unset filetoprocess
}

findandProcess() {
    printf "processing \"${DIRECTORY_TO_PROCESS}\" "
    printf "into \"${TEMPDIRECTORY}\"\n"
    declare -a filetoprocess
    # TMPFILE="$(mktemp)"
    i=1
    filecount=1
    if [ -e "${TEMPDIRECTORY}/${FINAL_PRODUCT}.${filecount}" ]; then
        printf "you need to cleanup your directory\n"
        exit 1
    fi
    for each in `find ${DIRECTORY_TO_PROCESS} -name "*.geojson*"`; do
        filetoprocess[$i]=${each}
        if [ "${i}" == "${NUM_TO_PROCESS}" ]; then
            #printf "on number: %s\n" ${i}
            processfiles
            i=1
        else
            i=$((i+1))
        fi
    done
    # we could have more files in the array because the loop exited prior to hitting our num_to_process
    if [ "${filetoprocess[1]}" != "" ]; then
        #printf "final batch: ${filetoprocess[*]}\n"
        processfiles
    fi
    printf "waiting on geojson-merge pids: ${pids[*]}\n"
    for pid in ${pids[*]}; do
        wait $pid
    done
    unset pids
    printf "\nCompleted Batches\n"
}

findandProcess
#exit
#TEMPDIRECTORY="./test"
NUM_TO_PROCESS=${NUM_TO_PROCESS_FINAL}
# recursivly process files in the tempdirectory until there are less than 2 - then move that file to final_product
while true; do
    numberFiles=$(find ${TEMPDIRECTORY} -name "*.geojson*" | wc -l)
    #printf "n${numberFiles}."
    (( numberFiles < 2)) && break
    DIRECTORY_TO_PROCESS="${TEMPDIRECTORY}/"
    TEMPDIRECTORY=$(mktemp -d) || exit 1
    #process the rest - these are bigger, so do less
    findandProcess
    rm -Rf "${DIRECTORY_TO_PROCESS}"
done
filecount=$((filecount-1))
mv "${TEMPDIRECTORY}/${FINAL_PRODUCT}.${filecount}" "${FINAL_PRODUCT}"
rmdir "${TEMPDIRECTORY}"
printf "Completed Final --> ${FINAL_PRODUCT}\n"
