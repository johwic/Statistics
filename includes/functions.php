<?php

function getStatValue($stats, $type) {
    if (!$stats) {
        return 0;
    }
    foreach ( $stats as $stat ) {
        if ( $stat[0] == $type ) {
            return $stat[1][0];
        }
    }
    return 0;
}