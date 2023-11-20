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
use DateTime;

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
        } 
        if ($request->pixtype == 4) {
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
            $bank_accounts->date_request = now()->format('d-m-Y H:i:s');

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
        // dd($request->all());
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
        } 
        if ($request->pixtype == 4) {
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
            $bank_accounts = BankAccounts::find($request->account_id);
            $bank_accounts->ispb = strval($ispb);
            $bank_accounts->bank = $bank_name->name;
            $bank_accounts->agency = strval($request->agency);
            $bank_accounts->number = strval($request->number);
            $bank_accounts->digit = $request->digit;
            $bank_accounts->type = $request->type == '0' ? 'current' : 'savings';
            $bank_accounts->pix_type = $request->pix_type;
            $bank_accounts->pix_key = $request->pix_key;
            $bank_accounts->date_request = now()->format('d-m-Y H:i:s');
            $bank_accounts->status = 'pending';

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

    public function getBankAccounts(Request $request)
    {
        $filter = $request->filter ;
        parse_str($filter, $params);

        $filter_text_bool = false;
        $filter_text = '';

        $user = auth()->user()->role;

        $query = BankAccounts::with('user', 'bankList');

        $filter_active = !(empty($params['bank_filter'])) || !(empty($params['type_filter'])) || !(empty($params['pix_type_filter'])) || !(empty($params['pix_key_filter'])) || !(empty($params['user_filter'])) || !(empty($params['date_filter']));
        
        if($filter_active) {
            $filter_text_bool = true;
            $filter_text = '<b>FILTROS ATIVOS: </b>';
            if (isset($params['bank_filter']) && !empty($params['bank_filter'])) {
                $bank_name = BankList::where('ispb', $params['bank_filter'])->first();
                $filter_text .= 'Banco: ' . $bank_name->name . ' | ';
                $query->where('bank_accounts.ispb', $params['bank_filter']);
            }
            if (isset($params['type_filter']) && !empty($params['type_filter'])) {
                if($params['type_filter'] == '1') {
                    $type = 'current';
                    $filter_text .= 'Tipo: Conta Corrente | ';
                } else {
                    $type = 'savings';
                    $filter_text .= 'Tipo: Conta Poupança | ';
                }
                $query->where('bank_accounts.type', $type);
            }
            if (isset($params['pix_type_filter']) && !empty($params['pix_type_filter'])) {
                if($params['pix_type_filter'] == '1') {
                    $pix_type = 'cpf';
                    $filter_text .= 'Tipo PIX: CPF | ';
                } else if($params['pix_type_filter'] == '2') {
                    $pix_type = 'cnpj';
                    $filter_text .= 'Tipo PIX: CNPJ | ';
                } else if($params['pix_type_filter'] == '3') {
                    $pix_type = 'email';
                    $filter_text .= 'Tipo PIX: E-mail | ';
                } else if($params['pix_type_filter'] == '4') {
                    $pix_type = 'phone';
                    $filter_text .= 'Tipo PIX: Telefone | ';
                } else if($params['pix_type_filter'] == '5') {
                    $pix_type = 'random';
                    $filter_text .= 'Tipo PIX: Chave Aleatória | ';
                }
                $query->where('bank_accounts.pix_type', $pix_type);
            }
            if (isset($params['pix_key_filter']) && !empty($params['pix_key_filter'])) {
                $pix_key = str_replace(['.', '-', '/', '(', ')', ' ', '+'], '', $params['pix_key_filter']);
                $filter_text .= 'Chave PIX: ' . $pix_key . ' | ';
                $query->where('bank_accounts.pix_key', 'like', '%' . $pix_key . '%');
            }
            if (isset($params['user_filter']) && !empty($params['user_filter'])) {
                $filter_text .= 'Usuário: ' . $params['user_filter'] . ' | ';
                $query->join('users', 'bank_accounts.user_id', '=', 'users.id')
                ->whereRaw("LOWER(users.name) LIKE ?", ['%' . strtolower($params['user_filter']) . '%']);
            }
            if (isset($params['date_filter']) && !empty($params['date_filter'])) {
                $date = new DateTime($params['date_filter']);
                $filter_text .= 'Data: ' . $date->format('d-m-Y') . ' | ';
                $query->whereBetween('bank_accounts.date_request', [$date->format('d-m-Y 00:00:00'), $date->format('d-m-Y 23:59:59')]);
            }
        }

        if ($user == 'admin') {
            $bank_accounts = $query->orderBy('bank_accounts.id', 'desc')->paginate(10);
        } else {
            $bank_accounts = $query->where('bank_accounts.user_id', auth()->user()->id)
            ->orderBy('bank_accounts.id', 'desc')
            ->paginate(10);
        }
        $data = [
            'bank_accounts' => $bank_accounts,
            'user' => $user,
            'filter_text_bool' => $filter_text_bool,
            'filter_text' => $filter_text,
        ];
        return $data;
    }

    public function getBankAccountDetails($account_id) {
        $user_id = auth()->user()->id;
        $bank_account = BankAccounts::find($account_id);

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
                    'updated_at' => now()->format('d-m-Y H:i:s')
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
            $response = BankAccounts::where('id', $request->account_id_disapprove)->first()
                ->update([
                    'disapproval_justification' => $request->reason,
                    'status' => 'disapproved',
                    'updated_at' => now()->format('m-d-Y H:i:s')
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