<?php

class Request {
    private $ch;
    private $result;
    private $status_code;
    
    function __construct($url, $referer = 'http://www.whoscored.com', $cookies = '') {
        $this->ch = curl_init();
        curl_setopt($this->ch, CURLOPT_URL, $url);
        curl_setopt($this->ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:22.0) Gecko/20100101 Firefox/22.0');
        curl_setopt($this->ch, CURLOPT_REFERER, $referer);
        curl_setopt($this->ch, CURLOPT_ENCODING, 'gzip, deflate');
        if ( !empty($cookies) ) {
            curl_setopt($this->ch, CURLOPT_COOKIE, $cookies);
        }
        
        curl_setopt($this->ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($this->ch, CURLOPT_HTTPHEADER, array(
            'Host: www.whoscored.com',
            'Accept: text/plain, *//*; q=0.01',
            'Accept-Language: en-US,en;q=0.5',
            'X-Requested-With: XMLHttpRequest',
            'Connection: keep-alive'));
        curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($this->ch, CURLOPT_FAILONERROR, true);
    }
    
    public function execute() {
        $this->result = gzdecode(curl_exec($this->ch));
        $this->status_code = curl_getinfo($this->ch, CURLINFO_HTTP_CODE);
        return ( $this->result === false ) ? false : $this->status_code;
    }

    public function process($type = '') {
        if ( $type == 'array' ) {
            $array = eval('return ' . str_replace(array(',,', ',,'), array(',null,', ',null,'), $this->result) . ';');
            
            return $array;
        }
        else if ( $type == 'json' ) {
            return json_decode($this->result);
        }
        else {
            return $this->result;
        }
    }
    
    public function getErrors() {
        return array('errno' => curl_errno($this->ch), 'error' => curl_error($this->ch), 'status_code' => $this->status_code);
    }
    
    function __destruct() {
        curl_close($this->ch);
    }
}