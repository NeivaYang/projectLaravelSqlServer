<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TextTranslationController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function dashboardTranslation()
    {
        $client = new http\Client;
        $request = new http\Client\Request;
    
        $request->setRequestUrl('https://text-translator2.p.rapidapi.com/getLanguages');
        $request->setRequestMethod('GET');
        $request->setHeaders([
            'X-RapidAPI-Key' => 'a9392cf9c7mshfe43261eda3831bp19cd0ejsn74407fb485be',
            'X-RapidAPI-Host' => 'text-translator2.p.rapidapi.com'
        ]);
    
        $client->enqueue($request)->send();
        $response = $client->getResponse();
    
        echo $response->getBody();
    }
}