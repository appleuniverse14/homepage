#!/bin/bash
FILENAME=$1
updateid=`sed -n 1,1p ${FILENAME}`
id=`sed -n 2,2p ${FILENAME}`
title=`sed -n 3,3p ${FILENAME}`
url=`sed -n 4,4p ${FILENAME}`
description=`sed -n 5,5p ${FILENAME}`
tag=`sed -n 6,6p ${FILENAME}`
content=`sed -n 7,7p ${FILENAME}`
echo "UPDATE contents SET id=${id}, title='${title}', url='${url}', description='${description}', tag='${tag}', content='${content}' WHERE id=${updateid}"