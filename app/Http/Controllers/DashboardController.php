<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\BankAccounts;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function index()
    {
        $data = [];
        if (auth()->user()->role == 'admin') {
            $total_users = User::count();
            $total_bank_accounts = BankAccounts::count();

            $total_pending = BankAccounts::where('status', 'pending')->count();
            $total_approved = BankAccounts::where('status', 'approved')->count();
            $total_disapproved = BankAccounts::where('status', 'disapproved')->count();
            $pix_type_cpf = BankAccounts::where('pix_type', 'cpf')->count();

            $pix_type_cnpj = BankAccounts::where('pix_type', 'cnpj')->count();
            $pix_type_email = BankAccounts::where('pix_type', 'email')->count();
            $pix_type_phone = BankAccounts::where('pix_type', 'phone')->count();
            $pix_type_random = BankAccounts::where('pix_type', 'random')->count();

            $data = [
                'total_users' => $total_users,
                'total_bank_accounts' => $total_bank_accounts,
                'total_pending' => $total_pending,
                'total_approved' => $total_approved,
                'total_disapproved' => $total_disapproved,
                'pix_type_cpf' => $pix_type_cpf,
                'pix_type_cnpj' => $pix_type_cnpj,
                'pix_type_email' => $pix_type_email,
                'pix_type_phone' => $pix_type_phone,
                'pix_type_random' => $pix_type_random,
            ];
        }

        return view('dashboard', $data);
    }
}
