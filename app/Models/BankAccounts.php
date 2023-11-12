<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BankAccounts extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $appends = [
        'display_bank_name',
        'display_owner_name',
        'display_date_request',
    ];

    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'ispb',
        'bank',
        'agency',
        'number',
        'digit',
        'type',
        'pix_type',
        'pix_key',
        'status',
        'disapproval_justification',
        'date_request'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bankList()
    {
        return $this->belongsTo(BankList::class, 'ispb', 'ispb');
    }

    // public function scopeWithRelations($query, $relations = [])
    // {
    //     if (empty($relations)) {
    //         $relations = ['user', 'bankList'];
    //     }

    //     return $query->with($relations);
    // }

    public function getDisplayBankNameAttribute() {
        $bank = BankList::query()->select('name')->where('ispb', '=', $this->ispb)->first();
        return $bank->name;
    }

    public function getDisplayOwnerNameAttribute() {
        $user = User::query()->select('name')->where('id', '=', $this->user_id)->first();
        return $user->name;
    }

    public function getDisplayDateRequestAttribute() {
        return date('d/m/Y', strtotime($this->date_request));
    }
}
