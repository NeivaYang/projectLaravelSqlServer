<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use App\Models\BankList;
use App\Models\BankAccounts;
use App\Traits\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

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
        ], [
            'bank.required' => 'É necessário informar o banco.',
            'agency.required' => 'É necessário informar a agência.',
            'number.required' => 'É necessário informar o número da conta.',
            'digit.required' => 'É necessário informar o dígito da conta.',
            'digit.max_digits' => 'O dígito da conta deve ter no máximo 2 dígitos.',
            'type.required' => 'É necessário informar o tipo da conta.',
            'pix_type.required' => 'É necessário informar o tipo da chave PIX.',
            'pix_key.required' => 'É necessário informar a chave PIX.',
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

        $ispb = $request->bank;

        $bank_name = BankList::where('ispb', $ispb)->first();

        if ($request->pix_type == '1') {
            $request->pix_type = 'cpf';
        } else if ($request->pix_type == '2') {
            $request->pix_type = 'cnpj';
        } else if ($request->pix_type == '3') {
            $request->pix_type = 'email';
        } else if ($request->pix_type == '4') {
            $request->pix_type = 'phone';
        } else if ($request->pix_type == '5') {
            $request->pix_type = 'random';
        }

        try {
            DB::beginTransaction();
            $bank_accounts = new BankAccounts();
            $bank_accounts->user_id = auth()->user()->id;
            $bank_accounts->ispb = strval($ispb);
            $bank_accounts->bank = $bank_name->name;
            $bank_accounts->agency = strval($request->agency);
            $bank_accounts->number = strval($request->number);
            $bank_accounts->digit = $request->digit;
            $bank_accounts->type = $request->type == '0' ? 'current' : 'savings';
            $bank_accounts->pix_type = $request->pix_type;
            $bank_accounts->pix_key = $request->pix_key;
            $bank_accounts->date_request = now()->format('Y-d-m H:i:s');

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
            DB::rollBack();
            $data = [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }

        return $data;
    }

    public function update(Request $request)
    {
        $request->validate([
            'bank' => 'required',
            'agency' => 'required|max:255',
            'number' => 'required|max:255',
            'digit' => 'required|max_digits:2',
            'type' => 'required|max:255',
            'pix_type' => 'required|max:255',
            'pix_key' => 'required|max:255',
        ], [
            'bank.required' => 'É necessário informar o banco.',
            'agency.required' => 'É necessário informar a agência.',
            'number.required' => 'É necessário informar o número da conta.',
            'digit.required' => 'É necessário informar o dígito da conta.',
            'digit.max_digits' => 'O dígito da conta deve ter no máximo 2 dígitos.',
            'type.required' => 'É necessário informar o tipo da conta.',
            'pix_type.required' => 'É necessário informar o tipo da chave PIX.',
            'pix_key.required' => 'É necessário informar a chave PIX.',
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

        $ispb = $request->bank;

        $bank_name = BankList::where('ispb', $ispb)->first();

        if ($request->pix_type == '1') {
            $request->pix_type = 'cpf';
        } else if ($request->pix_type == '2') {
            $request->pix_type = 'cnpj';
        } else if ($request->pix_type == '3') {
            $request->pix_type = 'email';
        } else if ($request->pix_type == '4') {
            $request->pix_type = 'phone';
        } else if ($request->pix_type == '5') {
            $request->pix_type = 'random';
        }

        try {
            DB::beginTransaction();
            $bank_accounts = new BankAccounts();
            $bank_accounts->user_id = auth()->user()->id;
            $bank_accounts->ispb = strval($ispb);
            $bank_accounts->bank = $bank_name->name;
            $bank_accounts->agency = strval($request->agency);
            $bank_accounts->number = strval($request->number);
            $bank_accounts->digit = $request->digit;
            $bank_accounts->type = $request->type == '0' ? 'current' : 'savings';
            $bank_accounts->pix_type = $request->pix_type;
            $bank_accounts->pix_key = $request->pix_key;
            $bank_accounts->date_request = now()->format('Y-d-m H:i:s');

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
            DB::rollBack();
            $data = [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }

        return $data;
    }

    public function getBankAccounts()
    {
        $user = auth()->user()->role;
        if ($user == 'admin') {
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
        $data = [
            'bank_accounts' => $bank_accounts,
            'user' => $user,
        ];
        return $data;
    }

    public function getBankAccountDetails($account_id) {

        $user_id = auth()->user()->id;
        $bank_account = BankAccounts::where('bank_accounts.user_id', $user_id)
                ->where('bank_accounts.id', $account_id)
                ->first();

        $data = [
            'bank_account' => $bank_account,
        ];
        return $data;
    }

    public function destroy($account_id) {
        $user_id = auth()->user()->id;

        try {
            DB::beginTransaction();
            $response = BankAccounts::where('user_id', $user_id)
            ->where('id', $account_id)
            ->delete();

            if (!$response) {
                $data = [
                    'status' => 'error',
                    'message' => 'Não foi possível remover a conta bancária.'
                ];
            } else {
                $data = [
                    'status' => 'success',
                    'message' => 'Conta bancária removida com sucesso!'
                ];
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            $data = [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
        return $data;
    }

    public function approve(Request $request) 
    {
        try {
            DB::beginTransaction();
            $response = BankAccounts::where('id', $request->account_id)->first()
                ->update([
                    'disapproval_justification' => '',
                    'status' => 'approved',
                    'updated_at' => now()->format('Y-d-m H:i:s')
                ]);

            if (!$response) {
                $data = [
                    'status' => 'error',
                    'message' => 'Não foi possível alterar o status da conta bancária.'
                ];
            } else {
                $data = [
                    'status' => 'success',
                    'message' => 'Status da conta bancária alterado com sucesso!'
                ];
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            $data = [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
        return $data;
    }

    public function disapprove(Request $request) 
    {
        $request->validate([
            'reason' => 'required',
        ], [
            'reason.required' => 'É necessário informar o motivo da reprovação.',
        ]);

        try {
            DB::beginTransaction();
            $response = BankAccounts::where('id', $request->account_id)->first()
                ->update([
                    'disapproval_justification' => $request->reason,
                    'status' => 'disapproved',
                    'updated_at' => now()->format('Y-d-m H:i:s')
                ]);
            if (!$response) {
                $data = [
                    'status' => 'error',
                    'message' => 'Não foi possível alterar o status da conta bancária.'
                ];
            } else {
                $data = [
                    'status' => 'success',
                    'message' => 'Status da conta bancária alterado com sucesso!'
                ];
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            $data = [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
        return $data;
    }
}