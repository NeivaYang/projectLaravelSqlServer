<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use App\Models\BankList;
use App\Models\BankAccounts;
use App\Traits\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

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
        try {
            DB::beginTransaction();
            $bank_accounts = new BankAccounts();
            $bank_accounts->user_id = auth()->user()->id;
            $bank_accounts->ispb = strval($ispb);
            $bank_accounts->bank = strval($code);
            $bank_accounts->agency = strval($request->agency);
            $bank_accounts->number = strval($request->number);
            $bank_accounts->digit = $request->digit;
            $bank_accounts->type = $request->type;
            $bank_accounts->pix_type = $request->pix_type;
            $bank_accounts->pix_key = $request->pix_key;
            $bank_accounts->date_request = date('Y-m-d H:i:s');

            if ($bank_accounts->save()) {
                $data = [
                    'status' => 'success',
                    'message' => 'Conta bancária adicionada com sucesso!'
                ];
            } else {
                $data = [
                    'status' => 'error',
                    'message' => 'Não foi possível adicionar a conta bancária.'
                ];
            };
            DB::commit();
        } catch (\Exception $e) {
            $data = [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }

        return $data;
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