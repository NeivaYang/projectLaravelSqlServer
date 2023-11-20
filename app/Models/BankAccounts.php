<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;
use App\Models\BankList;
use Carbon\Carbon;

class BankAccounts extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $appends = [
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

    public function scopeWithRelations($query, $relations = [])
    {
        if (empty($relations)) {
            $relations = ['user', 'bankList'];
        }
        return $query->with($relations);
    }

    public function getDisplayDateRequestAttribute() {
        return date('d/m/Y', strtotime($this->date_request));
    }

    public function fromDateTime($value)
    {
        return Carbon::parse(parent::fromDateTime($value))->format('d-m-Y H:i:s');
    }
}
