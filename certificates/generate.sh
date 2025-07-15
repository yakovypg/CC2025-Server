#!/bin/bash

days=$1
host=$2
output_name=$3

if [[ -z $days ]]; then
    days=365
fi

if [[ -z $host ]]; then
    host=localhost
fi

if [[ -z $output_name ]]; then
    output_name=server
fi

openssl req \
    -nodes \
    -new \
    -x509 \
    -keyout "${output_name}.key" \
    -out "${output_name}.cert" \
    -days $days \
    -subj "/CN=${host}"
