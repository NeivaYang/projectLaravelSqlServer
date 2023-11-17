<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class BankList extends Model
{
    use HasFactory;

    protected $table = 'bank_lists';

    public $timestamps = true;

    protected $fillable = [
        'ispb',
        'name',
        'code',
        'fullname',
    ];

    public function fromDateTime($value)
    { 
        return Carbon::parse(parent::fromDateTime($value))->format('d-m-Y H:i:s');
    }
}
