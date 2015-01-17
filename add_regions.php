<?php

require_once 'bootstrap.php';

$regions = json_decode(file_get_contents("raw_data/regions.json"));

foreach ( $regions as $region ) {
    $reg = new Region();
    $reg->setName($region->name);
    $reg->setWsId($region->id);
    $reg->setType($region->type);

    foreach ( $region->tournaments as $tournament ) {
        $tour = new Tournament();
        $tour->setRegion($reg);
        $tour->setWsId($tournament->id);
        $tour->setName($tournament->name);

        $entityManager->persist($tour);
    }

    $entityManager->persist($reg);
}

$entityManager->flush();

echo 'Success';