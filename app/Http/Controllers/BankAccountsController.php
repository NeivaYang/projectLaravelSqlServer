<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BankAccountsController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function getBanks()
    {
        $data = BankList::all();

        return $data;
    }
}
