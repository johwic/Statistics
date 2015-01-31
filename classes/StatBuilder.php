<?php

class StatBuilder {

    private $player;
    private $filters;
    private $counts;

    function __construct($matchId, $stageId) {
        $this->player = new MatchPlayerStatistics();
        $this->filters = json_decode(file_get_contents('Filters.json'));
    }

    public function add($e){
        if ( !isset($e->playerId) || $e->playerId != 33404) return;
        foreach ($this->filters as $filterIndex => $filter) {
            $satisfied = true;

            foreach ($filter->satisfier as $satisfier) {
                $key = $satisfier->func;
                $satisfied = $satisfied && EventFilter::$key($e, $satisfier->value);
            }

            if ($satisfied) $this->counts[$filterIndex][] = $e;
        }
    }

    public function getPlayerStats() {
        return $this->player;
    }

    public function finalize(){
        foreach ($this->filters as $filterIndex => $filter) {
            $this->player->{$filter->callback}(count($this->counts[$filterIndex]));
        }
    }
} 