<?php

class Url {
    private static $domain = 'http://www.whoscored.com';
    private static $template = [
        'livescores'                    =>  '/matchesfeed/',
        'livescoreincidents'            =>  '/matchesfeed/{id}/IncidentsSummary/',
        'stagefixtures'                 =>  '/tournamentsfeed/{stageId}/Fixtures/',
        'teamfixtures'                  =>  '/teamsfeed/{teamId}/Fixtures/',
        'standings'                     =>  '/stagesfeed/{stageId}/standings/',
        'forms'                         =>  '/stagesfeed/{stageId}/forms/',
        'history'                       =>  '/stagesfeed/{stageId}/history/',
        'streaks'                       =>  '/stagesfeed/{stageId}/streaks/',
        'goals'                         =>  '/tournamentsfeed/{stageId}/PlayerStatistics/',
        'cards'                         =>  '/tournamentsfeed/{stageId}/PlayerStatistics/',
        'team-goals'                    =>  '/teamsfeed/{teamId}/PlayerStatistics/',
        'team-cards'                    =>  '/teamsfeed/{teamId}/PlayerStatistics/',
        'previousmeetings'              =>  '/teamsfeed/{homeTeamId}/PreviousMeetings/',
        'statistics'                    =>  '/statisticsfeed/',
        'side-box-statistics'           =>  '/statisticsfeed/{statsType}/SideBoxStatistics/',
        'regionteams'                   =>  '/teamsfeed/{id}/region',
        'ws-stage-stat'                 =>  '/stagestatfeed/',
        'ws-teams-stage-stat'           =>  '/stagestatfeed/{stageId}/stageteams/',
        'ws-stage-filtered-team-stat'   =>  '/stagestatfeed/{stageId}/teamsstagefiltered/',
        'ws-teams-filtered-stage-stat'  =>  '/stagestatfeed/{stageId}/stageteamsfiltered/',
        'stage-top-player-stats'        =>  '/stagestatfeed/{stageId}/stagetopplayers',
        'live-team-stat'                =>  '/optamatchstatfeed/',
        'team-fixtures'                 =>  '/teamsfeed/{teamId}/H2HFixtures/',
        'match-header'                  =>  '/matchesfeed/{id}/MatchHeader',
        'match-live-update'             =>  '/matchesfeed/{id}/LiveMatch',
        'match-commentary'              =>  '/matchesfeed/{id}/MatchCommentary',
        'live-player-stats'             =>  '/matchesfeed/{id}/LivePlayerStats',
        'betting-stats'                 =>  '/bettingstatfeed/',
        'overall-player-stat'           =>  '/stageplayerstatfeed/{playerId}/Overall',
        'stage-player-stat'             =>  '/stageplayerstatfeed/',
        'overall-team-stat'             =>  '/stageteamstatfeed/{teamId}/Overall',
        'stage-team-stat'               =>  '/stageteamstatfeed/',
        'stage-h2h-player-stat'         =>  '/stageplayerstatfeed/{stageId}/H2HTeamPlayers',
        'player-tournament-stat'        =>  '/stageplayerstatfeed/{playerId}/PlayerTournamentStats',
        'facts-filter'                  =>  '/Facts/Data',
        'player-heatmap'                =>  '/Players/{id}/Heatmap',
        'match-centre'                  =>  '/matchesfeed/{id}/MatchCentre'
    ];
    
    public static function get($key, $parameters = []) {
        $url = self::$template[$key];
        $matches = [];
        while ( preg_match('/\{(\w*)\}/', $url, $matches) ) {
            $url = str_replace($matches[0], $parameters[$matches[1]], $url);
            unset($parameters[$matches[1]]);
        }
        
        $queryString = self::queryString($parameters);
        $url = self::$domain . $url . ( ($queryString) ? '?' . $queryString : '' );
        return $url;
    }
    
    public static function queryString($parameters) {
        if ( empty($parameters) ) {
            return '';
        }
        
        ksort($parameters);
        $queryString = [];
        foreach ( $parameters as $key => $value ) {
            if ( !empty($key) && isset($value) ) {
                $queryString[] = $key . '=' . $value;
            }
        }
        
        return implode('&', $queryString);
    }
}