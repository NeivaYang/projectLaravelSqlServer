<?php

namespace App\Traits;

use Error;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

trait Common
{
    public function sanitizeCpfCnpj($doc)
    {
        return str_replace(['.', '-', '/', ' '], '', $doc);
    }

    public function sanitizePhone($phone)
    {
        return str_replace(['.', '-', '/', '(', ')', ' ', '+'], '', $phone);
    }

    public function cpfIsValid($cpf)
    {
        $cpf = preg_replace('/[^0-9]/is', '', $cpf);
        if (strlen($cpf) != 11) {
            return false;
        }
        if (preg_match('/(\d)\1{10}/', $cpf)) {
            return false;
        }
        for ($t = 9; $t < 11; $t++) {
            for ($d = 0, $c = 0; $c < $t; $c++) {
                $d += $cpf[$c] * (($t + 1) - $c);
            }
            $d = ((10 * $d) % 11) % 10;
            if ($cpf[$c] != $d) {
                return false;
            }
        }
        return true;
    }

    public function cnpjIsValid($cnpj)
    {
        $cnpj = preg_replace('/[^0-9]/', '', (string) $cnpj);

        if (strlen($cnpj) != 14)
            return false;

        if (preg_match('/(\d)\1{13}/', $cnpj))
            return false;

        for ($i = 0, $j = 5, $soma = 0; $i < 12; $i++) {
            $soma += $cnpj[$i] * $j;
            $j = ($j == 2) ? 9 : $j - 1;
        }

        $resto = $soma % 11;

        if ($cnpj[12] != ($resto < 2 ? 0 : 11 - $resto))
            return false;

        for ($i = 0, $j = 6, $soma = 0; $i < 13; $i++) {
            $soma += $cnpj[$i] * $j;
            $j = ($j == 2) ? 9 : $j - 1;
        }

        $resto = $soma % 11;

        return $cnpj[13] == ($resto < 2 ? 0 : 11 - $resto);
    }

    public function cpfCnpjAreValid($cpfCnpj)
    {
        $cpfCnpj = preg_replace('/[^0-9]/is', '', $cpfCnpj);
        if (strlen($cpfCnpj) === 11) {
            return $this->cpfIsValid($cpfCnpj);
        } else {
            return $this->cnpjIsValid($cpfCnpj);
        }
    }

    public function fromDateTime($value)
    {
        return Carbon::parse(parent::fromDateTime($value))->format('Y-d-m H:i:s');
    }
}
