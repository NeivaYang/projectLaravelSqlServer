<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
