#!/bin/bash
FILENAME=$1
id=`sed -n 1,1p ${FILENAME}`
title=`sed -n 2,2p ${FILENAME}`
url=`sed -n 3,3p ${FILENAME}`
description=`sed -n 4,4p ${FILENAME}`
tag=`sed -n 5,5p ${FILENAME}`
content=`sed -n 6,6p ${FILENAME}`
echo "INSERT INTO contents(id, title, url, description, tag, content) VALUES(${id}, '${title}', '${url}', '${description}', '${tag}', '${content}')"