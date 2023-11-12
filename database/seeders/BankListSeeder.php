<?php

namespace Database\Seeders;

use Http;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BankList;

class BankListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $response = Http::get('https://brasilapi.com.br/api/banks/v1');
        if ($response->successful()) {
            $data = $response->json();
            foreach ($data as $bank) {
                if(array_key_exists('code', $bank) && !empty($bank['code'])) {
                    $newBank = new BankList();
                    $newBank->ispb      = array_key_exists('ispb', $bank) ? $bank['ispb'] : '00000000';
                    $newBank->name      = array_key_exists('name', $bank) ? $bank['name'] : '';
                    $newBank->code      = array_key_exists('code', $bank) ? $bank['code'] : '0';
                    $newBank->fullname  = array_key_exists('fullName', $bank) ? $bank['fullName'] : '';
                    $newBank->save();
                }
            }
        }
    }
}
