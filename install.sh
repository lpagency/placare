#!/bin/sh
# @Author: Ricardo Silva
# @Date:   2018-05-05 17:37:44
# @Last Modified by:   Ricardo Silva
# @Last Modified time: 2018-05-07 16:00:50

if [[ ! -e cache_version ]]; then
    touch cache_version
    echo 0 >> cache_version
fi

version=$(perl -pe 's/^((\d+\.)*)(\d+)(.*)$/$1.($3+1).$4/e' < cache_version)
echo $version > cache_version
