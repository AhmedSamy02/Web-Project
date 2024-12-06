<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Stadium extends Model
{
    /** @use HasFactory<\Database\Factories\StadiumFactory> */
    use HasFactory;

    protected $table = 'stadia';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'name',
        'rows',
        'seats_per_row',
    ];
}
