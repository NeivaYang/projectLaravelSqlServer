<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use App\Models\BankList;
use App\Models\BankAccounts;

class YSpaceController extends Controller
{
    use Common;
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function index(): View
    {
        $data = [
            'bank_list' => BankList::all(),
        ];
        return view('y-space.y-space', $data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'bank' => 'required',
            'agency' => 'required|max:255',
            'number' => 'required|max:255',
            'digit' => 'required|max_digits:2',
            'type' => 'required|max:255',
            'pix_type' => 'required|max:255',
            'pix_key' => 'required|max:255',
        ]);

        if ($request->pix_type == '2' || $request->pix_type == '1') {
            $request->pix_key = str_replace(['.', '-'], '', $request->pix_key);
            $valid = $this->cpfCnpjAreValid($request->pix_key);
            if (!$valid) {
                $data = [
                    'status' => 'error',
                    'message' => 'CPF/CNPJ inválido.'
                ];
                return $data;
            }
        }
        if ($request->pix_type != '3'){
            $request->pix_key = str_replace(['.', '-', '/', '(', ')', ' ', '+'], '', $request->pix_key);
        } else if ($request->pixtype == 4) {
            $request->pix_key = $this->sanitizePhone($request->pix_key);
        }

        $bank = explode('-', $request->bank);

        $code = $bank[0];
        $ispb = $bank[1];

        $bank_accounts_list = DB::table('bank_accounts_lists')->insert([
            'user_id' => $user_id,
            'ispb' => $ispb,
            'bank' => $code,
            'agency' => $request->agency,
            'number' => $request->number,
            'digit' => $request->digit,
            'type' => $request->type,
            'pix_type' => $request->pix_type,
            'pix_key' => $request->pix_key,
            'status' => '0',
        ]);

        if ($bank_accounts_list) {
            $data = [
                'status' => 'success',
                'message' => 'Conta bancária adicionada com sucesso!'
            ];
            return $data;
        } else {
            $data = [
                'status' => 'error',
                'message' => 'Não foi possível adicionar a conta bancária.'
            ];
            return $data;
        };
        dd($request->all());
    }

    public function getBankAccounts()
    {
        if (auth()->user()->role == 'admin') {
            $bank_accounts = BankAccounts::select('bank_accounts.*', 'bank_lists.name', 'bank_lists.code', 'bank_lists.fullname', 'bank_lists.ispb')
            ->join('bank_lists', 'bank_accounts.ispb', '=', 'bank_lists.ispb')
            ->join('users', 'users.id', '=', 'bank_accounts.user_id')
            ->paginate(10);
        } else {
            $bank_accounts = BankAccounts::select('bank_accounts.*', 'bank_lists.name', 'bank_lists.code', 'bank_lists.fullname', 'bank_lists.ispb')
            ->join('bank_lists', 'bank_accounts.ispb', '=', 'bank_lists.ispb')
            ->join('users', 'users.id', '=', 'bank_accounts.user_id')
            ->where('bank_accounts.user_id', auth()->user()->id)
            ->paginate(10);
        }

        return ($bank_accounts);
    }
}